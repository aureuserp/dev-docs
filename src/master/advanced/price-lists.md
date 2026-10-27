# Price Lists

**Price Lists** in AureusERP let you define alternative pricing strategies for products — fixed prices, percentage discounts, cost-based markups, and formula-based rules — that override a product's default sales price. A sales order can reference one price list, and the system automatically resolves the correct unit price for every order line.

## Key Concepts

- A **Price List** defines a currency and groups one or more **Price Rule Items**.
- Each **Price Rule Item** specifies the pricing logic for a scope (all products, a category, a product, or a specific variant), an optional quantity minimum, and an optional date range.
- When resolving a price, the system selects the most specific applicable rule and applies it to a **base price** that can come from the product's sales price, its cost, or another price list.
- Price lists support up to five levels of chaining (one price list as the base of another), with cycle detection to prevent infinite loops.
- Price lists are per-company and support multi-currency conversion.

## Data Model

### `PriceList` (`products_product_price_lists`)

`Webkul\Product\Models\PriceList` represents a price list header.

| Attribute | Type | Description |
| --- | --- | --- |
| `name` | string | Display name |
| `currency_id` | integer | Currency all prices on this list are expressed in |
| `company_id` | integer | Owning company |
| `is_active` | boolean | Whether the list appears for selection on orders |
| `sort` | integer | Display order (sortable via Spatie EloquentSortable) |

The `items()` relationship returns the associated `PriceRuleItem` rows.

### `PriceRuleItem` (`products_price_rule_items`)

`Webkul\Product\Models\PriceRuleItem` stores one pricing rule within a price list.

| Attribute | Type | Description |
| --- | --- | --- |
| `price_list_id` | integer | Parent price list |
| `apply_to` | `PriceRuleApplyTo` | Scope: `global`, `category`, `product`, `variant` |
| `display_apply_to` | string | UI-level scope: `product` or `category` |
| `category_id` | integer | Product category this rule targets (when `apply_to = category`) |
| `product_id` | integer | Product or variant this rule targets |
| `min_quantity` | float | Minimum quantity for this rule to activate |
| `starts_at` / `ends_at` | datetime | Optional validity window |
| `type` | `PriceRuleType` | Pricing method: `fixed`, `percentage`, `formula` |
| `base` | `PriceRuleBase` | Starting price source: `list_price`, `standard_price`, `price_rules` |
| `base_price_list_id` | integer | Another price list to use as the base (when `base = price_rules`) |
| `fixed_price` | float | Absolute price (for `fixed` type) |
| `percent_price` | float | Discount percentage (for `percentage` type) |
| `price_discount` | float | Discount % off base (for `formula` type) |
| `price_surcharge` | float | Fixed amount added after discount (for `formula` type) |
| `price_round` | float | Round to nearest multiple (for `formula` type) |
| `price_markup` | float | Markup % when base is cost/standard price (for `formula` type) |
| `price_min_margin` | float | Minimum margin floor (for `formula` type) |
| `price_max_margin` | float | Maximum margin ceiling (for `formula` type) |

### Enums

**`PriceRuleType`** — the pricing method:

| Value | Description |
| --- | --- |
| `fixed` | Use `fixed_price` directly, ignoring the base |
| `percentage` | Apply a percentage discount off the base price |
| `formula` | Apply a discount, surcharge, rounding, and optional margin guardrails to the base |

**`PriceRuleBase`** — the starting price to calculate from:

| Value | Description |
| --- | --- |
| `list_price` | Product's sales price |
| `standard_price` | Product's cost price |
| `price_rules` | Price resolved from another price list (`base_price_list_id`) |

**`PriceRuleApplyTo`** — the rule's scope, ordered by precedence (most-specific wins):

| Value | Precedence | Description |
| --- | --- | --- |
| `variant` | 0 (highest) | Targets one specific product variant |
| `product` | 1 | Targets a product template and all its variants |
| `category` | 2 | Targets all products in a category (including ancestors) |
| `global` | 3 (lowest) | Applies to every product |

## Price Resolution

The `Webkul\Product\Services\PriceListResolver` service handles all price resolution. Inject it via the service container:

```php
use Webkul\Product\Services\PriceListResolver;
use Webkul\Product\Models\PriceList;
use Webkul\Product\Models\Product;

$resolver = app(PriceListResolver::class);

$price = $resolver->getProductPrice(
    priceList: $priceList,   // PriceList|null — pass null to get the product's default price
    product: $product,
    quantity: 5.0,           // used for min_quantity rule matching
    uom: null,               // UOM|null — convert if ordering in a different unit
    currency: null,          // Currency|null — defaults to the price list's currency
    date: null,              // DateTimeInterface|null — defaults to now()
    company: null,           // Company|null — defaults to current_company()
);
```

`getProductPrice()` returns a plain `float`. If you also need to know which rule was matched and what the base price was, use `resolve()` instead, which returns a `ResolvedPrice` value object with `->price`, `->rule`, and `->basePrice` properties.

To retrieve the matched rule without computing the price:

```php
$rule = $resolver->getProductPriceRule($priceList, $product, $quantity, $uom, $date);
// Returns PriceRuleItem|null
```

### Resolution Algorithm

1. If `$priceList` is `null`, the product's `price` (sales price) is returned after UOM and currency conversion.
2. Candidate rules for the price list are fetched — filtered by effective date and matching product / category / global scope — then sorted by precedence (variant > product > category > global), then by `min_quantity` descending, then by ID descending.
3. The first rule for which `isApplicableFor($product, $quantity, $categoryIds)` returns `true` is used.
4. If no rule matches, the product's `list_price` is used.
5. For `formula` rules, discounts, surcharges, rounding, and margin guardrails are applied in sequence.
6. For rules with `base = price_rules`, the base price is resolved recursively from `base_price_list_id` (up to a depth of 5; cycles are detected and short-circuited back to `list_price`).
7. Currency conversion is applied at every chaining step using the date-effective exchange rate.

## Using Price Lists on Sales Orders

The `Webkul\Sale\Models\Order` model has a `price_list_id` foreign key and a `priceList()` `BelongsTo` relationship. When a price list is selected on an order, the order's currency is automatically updated to match the price list's currency.

When order lines are added or priced via the API, `PriceListResolver::getProductPrice()` is called with the order's price list to resolve the unit price:

```php
// Inside the sales order API controller
$price = app(PriceListResolver::class)->getProductPrice(
    $order->priceList,
    $product,
    $quantity,
    $uom,
);
```

The Filament order form also reads the price list selection and passes it through `PriceListResolver` when the user picks a product line.

## Managing Price Lists in the Admin Panel

Price lists are managed under **Products → Price Lists** in the admin panel. Each price list form shows:

- **Name** and **Currency** at the top level.
- An inline **Items** repeater for adding and editing price rule items.

Each rule item exposes a condensed form (using Filament's `.compact()` table repeater) that collects the apply-to scope, type, base, quantity minimum, validity dates, and the type-specific pricing fields.

## Adding Price List Support to a Custom Plugin

To resolve prices from a price list in your own plugin, inject `PriceListResolver` and call `getProductPrice()` or `resolve()`. There is no interface to implement and no trait to apply — the resolver works with any `PriceList` and `Product` models.

To surface price list selection on your own order-type resource, add a `price_list_id` foreign key to your table, a `BelongsTo` relationship on your model, and a `Select` field wired to `PriceList::query()->active()` in your Filament form.

::: tip
Pass `priceList: null` to `PriceListResolver::getProductPrice()` when no price list is selected. The resolver falls back to the product's default sales price, with currency conversion applied, rather than throwing an exception.
:::
