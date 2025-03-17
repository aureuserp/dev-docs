# **Changing Button Colors**

To modify the colors of different states, use the `colors()` method:

```php
ProgressStepper::make('state')
    ->options([
        'draft' => 'Draft',
        'processing' => 'Processing',
        'completed' => 'Completed'
    ])
    ->colors([
        'draft' => 'gray',
        'processing' => 'info',
        'completed' => 'success',
    ]);
```

## **Adding Icons**

To display icons alongside state labels, use the `icons()` method:

```php
ProgressStepper::make('state')
    ->options([
        'draft' => 'Draft',
        'processing' => 'Processing',
        'completed' => 'Completed'
    ])
    ->icons([
        'draft' => 'heroicon-o-pencil',
        'processing' => 'heroicon-o-clock',
        'completed' => 'heroicon-o-check-circle',
    ]);
```

## **Using Enums for State Management**

Instead of defining options manually, you can use an Enum:

```php
use App\Enums\OrderState;

ProgressStepper::make('state')
    ->options(OrderState::options())
    ->colors(OrderState::colors())
    ->icons(OrderState::icons());
```

This keeps the state definitions centralized in an `OrderState` enum.

## **Handling Conditional States**

To prevent certain states from being displayed (e.g., hiding "Canceled" if the order is active):

```php
ProgressStepper::make('state')
    ->options(function ($record) {
        $options = OrderState::options();

        if ($record && $record->state != OrderState::CANCEL->value) {
            unset($options[OrderState::CANCEL->value]);
        }

        return $options;
    });
```
