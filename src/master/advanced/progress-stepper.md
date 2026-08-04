# **Overview**

The **Progress Stepper** component extends FilamentPHP’s `ToggleButtons` to visually represent order states. It is particularly useful for displaying the current progress of an entity, such as an order, with predefined states in **AureusERP**.

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

To integrate the `ProgressStepper` component into a Filament form schema, use the following configuration:

```php
use Filament\Schemas\Schema;
use Webkul\Field\Filament\Forms\Components\ProgressStepper;

public static function form(Schema $schema): Schema
{
    return $schema
        ->components([
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

## **Usage in Infolists**

A dedicated infolist variant of the component is also available for read-only pages. The `Webkul\Field\Filament\Infolists\Components\ProgressStepper` class extends Filament's `Filament\Infolists\Components\Entry` and renders the same stepper UI (view `fields::filament.infolists.components.progress-stepper`) from the record's state.

It exposes `options()` and `inline()` methods, and its `getColor()` helper highlights the option matching the current state (`primary` for the active state, `gray` otherwise):

```php
use Filament\Schemas\Schema;
use Webkul\Field\Filament\Infolists\Components\ProgressStepper;

public static function infolist(Schema $schema): Schema
{
    return $schema
        ->components([
            ProgressStepper::make('status')
                ->hiddenLabel()
                ->inline()
                ->options(fn ($record) => self::getStateOptions($record)),
        ]);
}
```

## **Key Features**

- **Extends Filament’s `ToggleButtons`**: Ensures seamless integration with Filament forms.
- **Dynamic Order State Management**: Automatically adjusts available states based on the current order state.
- **Live & Reactive**: Updates dynamically as data changes.
- **Customizable View**: Uses a dedicated Blade template for further customization.

## More Information

For more details, refer to the [FilamentPHP Toggle Buttons](https://filamentphp.com/docs/5.x/forms/toggle-buttons).
