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
            ProgressStepper::make('status')
                ->hiddenLabel()
                ->inline()
                ->options(fn ($record) => self::getStateOptions($record))
                ->default(PostStatus::DRAFT->value)
                ->disabled()
                ->live()
                ->reactive(),
        ]);
}

protected static function getStateOptions($record): array
{
    $options = PostStatus::options();

    if (
        $record
        && $record->status !== PostStatus::UNPUBLISHED->value
    ) {
        unset($options[PostStatus::UNPUBLISHED->value]);
    }

    if (! $record) {
        unset($options[PostStatus::UNPUBLISHED->value]);
    }

    return $options;
}
```

## **Changing Button Colors**

To modify the colors of different status, use the `colors()` method:

```php
ProgressStepper::make('status')
    ->options([
        'draft'       => 'Draft',
        'unpublished' => 'Unpublished',
        'published'   => 'Published'
    ])
    ->colors([
        'draft'       => 'gray',
        'unpublished' => 'info',
        'published'   => 'success',
    ]);
```

## **Adding Icons**

To display icons alongside state labels, use the `icons()` method:

```php
ProgressStepper::make('state')
    ->options([
        'draft'       => 'Draft',
        'unpublished' => 'Unpublished',
        'published'   => 'Published'
    ])
    ->icons([
        'draft'       => 'heroicon-o-pencil',
        'unpublished' => 'heroicon-o-circle',
        'published'   => 'heroicon-o-check-badge',
    ]);
```

## **Using Enums for State Management**

Instead of defining options manually, you can use an Enum:

```php
use App\Enums\PostStatus;

ProgressStepper::make('status')
    ->options(PostStatus::options())
    ->colors(PostStatus::colors())
    ->icons(PostStatus::icons());
```

This keeps the status definitions centralized in an `PostStatus` enum.

## **Handling Conditional Statuses**

To prevent certain statuses from being displayed (e.g., hiding "UNPUBLISHED" if the status is unpublished):

```php
ProgressStepper::make('status')
    ->options(function ($record) {
        $options = PostStatus::options();

        if (
            $record
            && $record->status != PostStatus::UNPUBLISHED->value
        ) {
            unset($options[PostStatus::UNPUBLISHED->value]);
        }

        return $options;
    });
```

## **Key Features**

- **Extends Filament’s `ToggleButtons`**: Ensures seamless integration with Filament forms.
- **Dynamic Order State Management**: Automatically adjusts available states based on the current order state.
- **Live & Reactive**: Updates dynamically as data changes.
- **Customizable View**: Uses a dedicated Blade template for further customization.

## More Information

For more details, refer to the <a href="https://filamentphp.com/docs/3.x/forms/fields/toggle-buttons" rel="nofollow external noopener noreferrer" target="_blank">FilamentPHP Toggle Buttons</a>.

