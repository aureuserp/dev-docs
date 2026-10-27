# Custom Sequences

The **Custom Sequence** feature in AureusERP provides a flexible, database-backed document numbering system. Sequences generate formatted document identifiers — such as `SO/2025/00042` for a sales order or `INV/2025/00001` for an invoice — with configurable prefixes, suffixes, padding, counters, and automatic periodic resets.

## Key Benefits

- Consistent, human-readable document identifiers across all plugins
- Per-company and per-record-type numbering, all managed from a single place
- Automatic counter reset by year or month
- Concurrent-safe counter increments using database row-level locking
- Customisable through the admin panel without code changes

## How Sequences Work

Every sequence is stored as a row in the `sequences` table, represented by the `Webkul\Support\Models\Sequence` model. When a document needs a number, the `SequenceService` looks up the matching sequence row, locks it for update, increments the counter, and returns the formatted string — all inside a single database transaction to prevent race conditions.

A sequence can be:

- **Global** — identified by a `code` string (e.g. `sales.order`), optionally scoped to a company.
- **Scoped** — tied to a specific model instance (e.g. one sequence row per `OperationType` record), using a polymorphic `scope_type` / `scope_id` pair plus an optional `variant` string.

## The `Sequence` Model

`Webkul\Support\Models\Sequence` stores the following attributes:

| Attribute | Type | Description |
| --- | --- | --- |
| `code` | string | Identifier for global sequences |
| `name` | string | Human-readable label shown in the admin panel |
| `prefix` | string | Text prepended to the number (supports date tokens) |
| `suffix` | string | Text appended to the number |
| `padding` | integer | Zero-pad width (default `5`) |
| `next_number` | integer | Next counter value to use |
| `step` | integer | Increment per use (default `1`) |
| `reset_frequency` | enum | When the counter resets: `never`, `yearly`, `monthly` |
| `period_key` | string | Internal tracker for the current period |
| `company_id` | integer | Optional company scope |
| `scope_type` / `scope_id` | morph | Polymorphic scope for per-record sequences |

### Date Tokens in Prefix / Suffix

The `prefix` and `suffix` fields support the following date-interpolation tokens:

| Token | Output |
| --- | --- |
| `%(year)` | Four-digit year, e.g. `2025` |
| `%(y)` | Two-digit year, e.g. `25` |
| `%(month)` | Two-digit month, e.g. `07` |
| `%(day)` | Two-digit day, e.g. `04` |

For example, a prefix of `SO/%(year)/` produces `SO/2025/` for documents created in 2025.

## The `SequenceService`

`Webkul\Support\Services\SequenceService` is the single entry point for consuming sequence numbers. You never call `Sequence::create()` or `->consumeNumber()` directly from plugin code.

### Getting the Next Number for a Global Sequence

Use `SequenceService::next()` to consume the next number from a globally-coded sequence. If the sequence does not exist yet it is created automatically from the `$defaults` you supply.

```php
use Webkul\Support\Services\SequenceService;

$name = SequenceService::next(
    code: 'sales.order',       // unique code for this sequence type
    companyId: $this->company_id,
    defaults: [
        'name'         => 'Sales Order',
        'prefix'       => 'SO/%(year)/',
        'initial_from' => static::withoutGlobalScopes(), 
    ],
    date: null,                
);
```

`initial_from` accepts an Eloquent `Builder`; the service scans its `name` column for the highest trailing integer and starts the counter one above that value.

### Getting the Next Number for a Scoped Sequence

Use `SequenceService::nextFor()` when each instance of a model needs its own counter (for example, each warehouse operation type maintains an independent sequence):

```php
use Webkul\Support\Services\SequenceService;

$name = SequenceService::nextFor(
    scope: $this->operationType,     // the model instance that owns this sequence
    variant: '',                     // optional string to distinguish multiple sequences per scope
    companyId: $this->company_id,
    defaults: $this->operationType->sequenceDefaults(),
);
```

### Pre-creating a Sequence Without Consuming a Number

Use `ensure()` or `ensureFor()` when you want to guarantee a sequence row exists — for example, in a seeder or a model observer — without yet incrementing the counter:

```php
SequenceService::ensure('purchases.order', $companyId, [
    'name'   => 'Purchase Order',
    'prefix' => 'PO/%(year)/',
]);

SequenceService::ensureFor($operationType, '', $companyId, $defaults);
```

### Deleting Sequences

Use `purge()` to remove sequences by code or by scope model class, and `purgeScoped()` to remove sequences for specific scope IDs. These are typically called from a plugin's `uninstall()` method.

```php
SequenceService::purge(
    codes: ['sales.order', 'purchases.order'],
    scopeModels: [OperationType::class],
);

SequenceService::purgeScoped(OperationType::class, [1, 2, 3]);
```

## Registering a Sequence in Your Plugin

The recommended pattern is to trigger sequence creation whenever the relevant parent record is created. For a global sequence, call `SequenceService::ensure()` inside your model's `creating` observer or a `boot()` hook. For a scoped sequence, call `SequenceService::ensureFor()` on the scope model after it is saved.

Here is an abbreviated example for a hypothetical `Invoice` model:

```php
namespace Webkul\MyPlugin\Models;

use Webkul\Support\Services\SequenceService;

class Invoice extends Model
{
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (self $invoice): void {
            if (blank($invoice->name)) {
                $invoice->name = SequenceService::next('my-plugin.invoice', $invoice->company_id, [
                    'name'   => 'Invoice',
                    'prefix' => 'INV/%(year)/',
                ]);
            }
        });
    }
}
```

## Managing Sequences from the Admin Panel

Sequences can be viewed and edited from **Settings → Sequences** in the admin panel. The `SequenceResource` exposes two sections:

**General**

- **Name** — optional human-readable label.
- **Code** — the unique string identifier (read-only after creation).
- **Company** — optional company scope (read-only after creation).

**Format**

- **Prefix / Suffix** — text surrounding the padded number. Supports date tokens.
- **Padding** — minimum digit width for the counter portion (1–12, default 5).
- **Next Number** — the value that will be used on the next consumption. Can only be increased, never decreased.
- **Step** — how much the counter advances on each use.
- **Reset Frequency** — `never`, `yearly`, or `monthly`.

A **Next Preview** badge on the list page shows what the next generated number will look like without consuming the counter.

::: tip
Scoped sequences (those tied to a specific record, such as an operation type) also appear in the list and show an **Applies To** column that identifies the owning record. These sequences are managed automatically by the system and generally do not need manual editing.
:::

::: warning
Decreasing **Next Number** is not permitted through the admin panel. If you need to reset a sequence counter for testing purposes, do so directly in the database.
:::
