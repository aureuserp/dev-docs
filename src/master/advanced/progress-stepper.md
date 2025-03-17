# **Overview**

The **Progress Stepper** component extends FilamentPHP’s `ToggleButtons` to visually represent order states. It is particularly useful for displaying the current progress of an entity, such as an order, with predefined states in **Aureus ERP**.

## **Definition**

To use the `ProgressStepper` component, ensure that the following class is present in your project:

```php
<?php

namespace Webkul\Field\Filament\Forms\Components;

use Filament\Forms\Components\ToggleButtons;

class ProgressStepper extends ToggleButtons
{
    protected string $view = 'fields::filament.forms.components.progress-stepper.index';
}
```

## **Usage in Forms**

To integrate the `ProgressStepper` component into a Filament form, use the following configuration:

```php
use Webkul\Field\Filament\Forms\Components\ProgressStepper;
use Filament\Forms\Form;

public static function form(Form $form): Form
{
    return $form
        ->schema([
            ProgressStepper::make('state')
                ->hiddenLabel()
                ->inline()
                ->options(fn ($record) => self::getStateOptions($record))
                ->default(OrderState::DRAFT->value)
                ->disabled()
                ->live()
                ->reactive(),
        ]);
}

protected static function getStateOptions($record): array
{
    $options = OrderState::options();

    if ($record && $record->state !== OrderState::CANCEL->value) {
        unset($options[OrderState::CANCEL->value]);
    }

    if (!$record) {
        unset($options[OrderState::CANCEL->value]);
    }

    return $options;
}
```

## **Changing Button Colors**

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

## **Example Output**

![Progress Stepper](./images/progress-stepper.png)

## **Key Features**

- **Extends Filament’s `ToggleButtons`**: Ensures seamless integration with Filament forms.
- **Dynamic Order State Management**: Automatically adjusts available states based on the current order state.
- **Live & Reactive**: Updates dynamically as data changes.
- **Customizable View**: Uses a dedicated Blade template for further customization.

## More Information

For more details, refer to the [FilamentPHP Toggle Buttons](https://filamentphp.com/docs/3.x/forms/fields/toggle-buttons).
