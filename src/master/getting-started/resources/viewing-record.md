# **Viewing Records**

When viewing record in Aureus ERP using Filament, you may need to customize the displayed data and allow users to perform actions like printing product details or deleting a product. Filament provides the `ViewRecord` class to handle viewing individual records.

This class allows you to:

- **Display product details** in a structured manner.
- **Allow users to print product labels** in different formats.
- **Provide an option to delete a product** with success notifications.

## **Usage Example**

### **Basic Implementation**

```php
protected static string $resource = ProductResource::class;
```

This links the `ViewProduct` class to the `ProductResource`.

## **Actions Available in View Mode**

### **1. Chatter Action**

Allows users to discuss product details within the application.

```php
ChatterAction::make()->setResource(static::$resource),
```

### **2. Print Action**

Allows users to generate and print product labels in different formats.

```php
Actions\Action::make('print')
    ->label(__('Print Product'))
    ->color('gray')
    ->icon('heroicon-o-printer')
    ->form([
        Forms\Components\TextInput::make('quantity')
            ->label(__('Quantity'))
            ->required()
            ->numeric()
            ->minValue(1)
            ->maxValue(100),
        Forms\Components\Radio::make('format')
            ->label(__('Print Format'))
            ->options([
                'dymo'       => __('Dymo Label'),
                '2x7_price'  => __('2x7 Price Tag'),
                '4x7_price'  => __('4x7 Price Tag'),
                '4x12'       => __('4x12 Label'),
                '4x12_price' => __('4x12 Price Label'),
            ])
            ->default('2x7_price')
            ->required(),
    ])
    ->action(function (array $data, $record) {
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('products::filament.resources.products.actions.print', [
            'records'  => collect([$record]),
            'quantity' => $data['quantity'],
            'format'   => $data['format'],
        ]);

        $paperSize = match ($data['format']) {
            'dymo'  => [0, 0, 252.2, 144],
            default => 'a4',
        };

        $pdf->setPaper($paperSize, 'portrait');

        return response()->streamDownload(function () use ($pdf) {
            echo $pdf->output();
        }, 'Product-'.$record->name.'.pdf');
    }),
```

### **3. Delete Action**

Allows users to delete the product with a success notification.

```php
Actions\DeleteAction::make()
    ->successNotification(
        Notification::make()
            ->success()
            ->title(__('Product Deleted'))
            ->body(__('Product has been deleted successfully.')),
    ),
```

## **Final `ViewProduct` Implementation**

```php
<?php

namespace Webkul\Product\Filament\Resources\ProductResource\Pages;

use Barryvdh\DomPDF\Facade\Pdf;
use Filament\Actions;
use Filament\Forms;
use Filament\Notifications\Notification;
use Filament\Pages\SubNavigationPosition;
use Filament\Resources\Pages\ViewRecord;
use Webkul\Chatter\Filament\Actions\ChatterAction;
use Webkul\Product\Filament\Resources\ProductResource;

class ViewProduct extends ViewRecord
{
    protected static string $resource = ProductResource::class;

    public function getSubNavigationPosition(): SubNavigationPosition
    {
        return SubNavigationPosition::Top;
    }

    protected function getHeaderActions(): array
    {
        return [
            ChatterAction::make()->setResource(static::$resource),
            Actions\Action::make('print')
                ->label(__('Print Product'))
                ->color('gray')
                ->icon('heroicon-o-printer')
                ->form([
                    Forms\Components\TextInput::make('quantity')
                        ->label(__('Quantity'))
                        ->required()
                        ->numeric()
                        ->minValue(1)
                        ->maxValue(100),
                    Forms\Components\Radio::make('format')
                        ->label(__('Print Format'))
                        ->options([
                            'dymo'       => __('Dymo Label'),
                            '2x7_price'  => __('2x7 Price Tag'),
                            '4x7_price'  => __('4x7 Price Tag'),
                            '4x12'       => __('4x12 Label'),
                            '4x12_price' => __('4x12 Price Label'),
                        ])
                        ->default('2x7_price')
                        ->required(),
                ])
                ->action(function (array $data, $record) {
                    $pdf = Pdf::loadView('products::filament.resources.products.actions.print', [
                        'records'  => collect([$record]),
                        'quantity' => $data['quantity'],
                        'format'   => $data['format'],
                    ]);

                    $paperSize = match ($data['format']) {
                        'dymo'  => [0, 0, 252.2, 144],
                        default => 'a4',
                    };

                    $pdf->setPaper($paperSize, 'portrait');

                    return response()->streamDownload(function () use ($pdf) {
                        echo $pdf->output();
                    }, 'Product-'.$record->name.'.pdf');
                }),
            Actions\DeleteAction::make()
                ->successNotification(
                    Notification::make()
                        ->success()
                        ->title(__('Product Deleted'))
                        ->body(__('Product has been deleted successfully.')),
                ),
        ];
    }
}
```

## **Explanation**

- **Handles Product Viewing**: Displays product details in a structured format.
- **Print Product Feature**: Allows printing labels in different formats.
- **Delete Product Feature**: Provides an option to delete a product with notifications.
- **Chatter Integration**: Enables discussion around the product.
- **Navigation Position**: Places the page navigation at the top.

For more details, check the **[Official Filament Documentation](https://filamentphp.com/docs/3.x/panels/resources/viewing-records)**. 🚀
