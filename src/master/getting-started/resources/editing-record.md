# **Editing Records**

When editing record in Aureus ERP using Filament, you may need to validate and modify form data before saving changes to the database. Filament provides the `mutateFormDataBeforeSave()` method to handle this modification.

This method allows you to:

- **Prevent incorrect data updates** (e.g., ensuring `company_id` remains unchanged).
- **Sanitize or modify input values** before saving.
- **Ensure business rules are followed** when updating product details.

## **Usage Example**

### **Basic Implementation**

Modify the form data to prevent changes to certain fields:

```php
protected function mutateFormDataBeforeSave(array $data): array
{
    unset($data['company_id']); // Prevents modification of company ID

    return $data;
}
```

In this case, the `company_id` remains unchanged even if a user attempts to modify it.

## **Mutating Data in Modal Actions**

If you're using modal actions instead of standard edit pages, you can modify form data within modal-based actions:

```php
use Filament\Actions\EditAction;

EditAction::make()
    ->mutateFormDataUsing(fn (array $data) => [
        ...$data,
        'updated_by' => auth()->id(),
    ]);
```

## **Example: Implementing EditProduct**

A `EditProduct` class can be implemented using Filament’s `EditRecord`.

```php
<?php

namespace Webkul\Product\Filament\Resources\ProductResource\Pages;

use Filament\Actions;
use Filament\Forms;
use Filament\Notifications\Notification;
use Filament\Pages\SubNavigationPosition;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;
use Webkul\Chatter\Filament\Actions\ChatterAction;
use Webkul\Product\Filament\Resources\ProductResource;

class EditProduct extends EditRecord
{
    protected static string $resource = ProductResource::class;

    public function getSubNavigationPosition(): SubNavigationPosition
    {
        return SubNavigationPosition::Top;
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('view', ['record' => $this->getRecord()]);
    }

    protected function getSavedNotification(): Notification
    {
        return Notification::make()
            ->success()
            ->title(__('Product updated'))
            ->body(__('Product has been updated successfully.'));
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $user = Auth::user();

        // Prevent unauthorized users from modifying critical fields
        if (!$user->hasPermissionTo('update_product_price')) {
            unset($data['price']);
        }

        $data['updated_by'] = $user->id;
        $data['updated_at'] = now();

        return $data;
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
                    }, 'Product-' . $record->name . '.pdf');
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

    protected function afterSave(): void
    {
        $this->getRecord()->variants->each(function ($variant) {
            $variant->update([
                'is_storable' => $this->getRecord()->is_storable,
            ]);
        });
    }
}
```

## **Explanation**

- **Handles Product Editing**: This class ensures product updates follow the necessary business rules.
- **Data Mutation**: Assigns the `updated_by` field and prevents unauthorized users from modifying certain fields.
- **Post-Edit Processing**: Updates product variants to reflect changes in storage settings.
- **Actions**: Includes printing, deletion, and Chatter integration for discussions.
- **Redirection & Notifications**: Redirects to the product view and notifies the user on successful update.

For more details, check the **[Official Filament Documentation](https://filamentphp.com/docs/3.x/panels/resources/editing-records)**. 🚀
