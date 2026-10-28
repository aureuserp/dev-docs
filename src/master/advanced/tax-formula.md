# Overview

AureusERP supports a **code-based tax type** (`AmountType::CODE`) that lets you define the tax amount using an arithmetic formula rather than a fixed percentage or a fixed amount. The formula is evaluated at invoice time by `Webkul\Account\Services\TaxFormulaEvaluator`.

## Formula Syntax

Formulas are simple arithmetic expressions. Only the following constructs are allowed:

- **Numbers**: integer or decimal literals (e.g. `100`, `1.5`)
- **Variables**: `price_unit`, `quantity`, `price_subtotal`
- **Functions**: `min(a, b)`, `max(a, b)`
- **Operators**: `+`, `-`, `*`, `/`
- **Parentheses**: for grouping

Anything else (strings, PHP code, unknown identifiers) is rejected at save time by `TaxFormulaEvaluator::validate()`.

### Variables

| Variable | Value at evaluation time |
|---|---|
| `price_unit` | Unit price of the invoice line |
| `quantity` | Quantity on the invoice line |
| `price_subtotal` | Line subtotal (price_unit × quantity, after discount) |

### Functions

| Function | Behavior |
|---|---|
| `min(a, b, ...)` | Returns the smallest argument |
| `max(a, b, ...)` | Returns the largest argument |

### Division by zero

If a divisor evaluates to `0.0`, the result of that division is `0.0` instead of a runtime error.

## Examples

```
price_unit * quantity * 0.1
```
10 % of the subtotal.

```
min(price_subtotal * 0.18, 500)
```
18 % of the subtotal, capped at 500.

```
max(price_subtotal * 0.05, 10)
```
5 % of the subtotal with a minimum charge of 10.

```
(price_unit * quantity - 1000) * 0.3
```
30 % on the amount above 1 000.

## Using `TaxFormulaEvaluator` in Code

```php
use Webkul\Account\Services\TaxFormulaEvaluator;
use Webkul\Account\Exceptions\InvalidTaxFormulaException;

$evaluator = new TaxFormulaEvaluator;

$taxAmount = $evaluator->evaluate('min(price_subtotal * 0.18, 500)', [
    'price_unit'     => 120.00,
    'quantity'       => 5,
    'price_subtotal' => 600.00,
]);

try {
    $evaluator->validate($formulaFromRequest);
} catch (InvalidTaxFormulaException $e) {
}
```

`validate()` calls `evaluate()` with every variable set to `1.0`, so structural errors (unknown variable, unclosed parenthesis, empty formula) are caught immediately on form submission.

## `InvalidTaxFormulaException`

`Webkul\Account\Exceptions\InvalidTaxFormulaException` is thrown when:

| Condition | Example |
|---|---|
| Formula is empty | `""` |
| Unknown character | `price_unit @ 0.1` |
| Unknown variable | `price_net * 0.1` (no `price_net` variable) |
| Unknown function | `round(price_subtotal)` |
| Unclosed parenthesis | `min(price_subtotal * 0.1` |
| Unexpected token | `)price_unit` |
| Unexpected end of expression | `price_unit *` |

The exception message is translated via the `accounts::system.tax-formula.*` language keys and is safe to display in the UI.

## Admin Panel

Taxes with `AmountType::CODE` are created and edited under **Accounting → Configuration → Taxes**. The **Formula** field accepts the expression above. When you save a tax with a code formula, the system calls `TaxFormulaEvaluator::validate()` and rejects the record if the formula is invalid.

::: tip
Test formulas with small numbers in Tinker before saving:

```php
(new \Webkul\Account\Services\TaxFormulaEvaluator)->evaluate(
    'min(price_subtotal * 0.18, 500)',
    ['price_unit' => 100, 'quantity' => 3, 'price_subtotal' => 300]
);
```
:::
