# **Filtering Products Using Tabs**

For filtering product records using **tabs** in the List page. You can define custom tabs in the `getTabs()` method.

## **Example Tabs:**

- **All Products** → Displays all products.
- **Archived** → Filters soft-deleted (trashed) products.
- **Out of Stock** → Shows products with `stock = 0`.

**Code Example:**

```php
public function getTabs(): array
{
    return [
        'all' => Tab::make(__('All Products'))->badge(Product::count()),
        'archived' => Tab::make(__('Archived'))->badge(Product::onlyTrashed()->count())
            ->modifyQueryUsing(fn ($query) => $query->onlyTrashed()),
        'out_of_stock' => Tab::make(__('Out of Stock'))->badge(Product::where('stock', 0)->count())
            ->modifyQueryUsing(fn ($query) => $query->where('stock', 0)),
    ];
}
```

---

## **2. Customizing the List Page for Products**

To customize how products are listed, you extend the `ListRecords` class.

### **Key Features:**

- Define the **resource** (`ProductResource`).
- Add **header actions**, such as a button to create new products.

**Code Example:**

```php
class ListProducts extends ListRecords
{
    protected static string $resource = ProductResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->icon('heroicon-o-plus-circle')
                ->label(__('New Product')),
        ];
    }
}
```

---

## **3. Using Preset Views for Filtering**

Aureus ERP supports **preset views** to provide predefined product listings.

### **Example Preset Views:**

- **All Products** → Default view showing all records.
- **Out of Stock** → Filters products with `stock = 0`.
- **Archived** → Shows deleted products.

**Code Example:**

```php
public function getPresetTableViews(): array
{
    return [
        'all_products' => PresetView::make(__('All Products'))
            ->icon('heroicon-s-clipboard-list')
            ->favorite()
            ->default()
            ->modifyQueryUsing(fn (Builder $query) => $query),
        'out_of_stock' => PresetView::make(__('Out of Stock'))
            ->icon('heroicon-s-exclamation-circle')
            ->favorite()
            ->modifyQueryUsing(fn (Builder $query) => $query->where('stock', 0)),
        'archived' => PresetView::make(__('Archived Products'))
            ->icon('heroicon-s-archive-box')
            ->favorite()
            ->modifyQueryUsing(fn ($query) => $query->onlyTrashed()),
    ];
}
```

---

## **Conclusion**

- Use **tabs** for quick filtering.
- Customize the **list page** to include actions like product creation.
- Implement **preset views** for predefined product filters.

For more details, check the **[Official Filament Documentation](https://filamentphp.com/docs/3.x/panels/resources/listing-records)**. 🚀
