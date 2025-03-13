# **Overview**

Filament PHP resources are a core concept used to manage database models in an admin panel. They provide an abstraction layer over CRUD (Create, Read, Update, Delete) operations and allow developers to define how models are managed within the Filament admin panel.

## **What is a Resource in Aureus ERP?**

A **Resource** in Filament PHP is a class that represents a database model inside the Filament admin panel. It defines how records of that model are displayed, created, updated, and deleted.

Each resource is stored in the respective module's directory and typically consists of:

- A **resource class** (e.g., `ProductResource.php`)
- A set of related pages (e.g., `ListProducts`, `CreateProduct`, `EditProduct`, `ViewProduct`)
- Form and table configurations

## **Creating a Filament Resource**

To generate a Filament resource, use the following command:

```sh
php artisan make:filament-resource Product --view --model-namespace=Webkul\\Path\\Models
```

for more information visit [Filament Official Documentation](https://filamentphp.com/docs/3.x/panels/resources/getting-started#creating-a-resource)

Upon execution, the command prompts you to select a panel:

```bash
 ┌ Which panel would you like to create this in? ───────────────┐
 │ › ● admin                                                    │
 │   ○ customer                                                 │
 └──────────────────────────────────────────────────────────────┘
```

After selecting the panel, another prompt appears asking you to choose the namespace for the resource:

```bash
 ┌ Which namespace would you like to create this in? ────────────────────┐
 │ › ● Webkul\Contact\Filament\Clusters\Configurations\Resources         │
 │   ○ Webkul\Employee\Filament\Clusters\Configurations\Resources        │
 │   ○ Webkul\Employee\Filament\Clusters\Reportings\Resources            │
 │   ○ Webkul\Inventory\Filament\Clusters\Configurations\Resources       │
 │   ○ Webkul\Inventory\Filament\Clusters\Operations\Resources           │
 └───────────────────────────────────────────────────────────────────────┘
```

Here, you can specify where the resource should be generated based on the module structure.

Once generated, the resource files will be located in:

- `Webkul\Inventories\Filament\Admin\Resources\ProductResource.php`
- `Webkul\Inventories\Filament\Admin\Resources\ProductResource/Pages/`
  - `ListProducts.php`
  - `CreateProduct.php`
  - `EditProduct.php`
  - `ViewProduct.php` (if enabled)

For more detailed documentation, refer to the official [Filament PHP Documentation](https://filamentphp.com/docs/3.x/panels/resources/getting-started).

## **Anatomy of a Filament Resource**

### **(A) Resource Class (`ProductResource.php`)**

The main resource file defines:

- The model it represents
- Navigation settings (icon, group, etc.)
- The table display configuration
- The form fields for creating/editing records

#### **Example `ProductResource.php`**

```php
<?php

namespace Webkul\Inventories\Filament\Admin\Resources;

use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms;
use Filament\Tables\Table;
use Filament\Forms\Form;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Webkul\Inventories\Models\Product;
use Webkul\Inventories\Filament\Admin\Resources\ProductResource\Pages;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-product';
    protected static ?string $navigationGroup = 'Product Management';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->required()
                ->maxLength(255),
            Forms\Components\TextInput::make('slug')
                ->required()
                ->unique(Product::class, 'slug'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('slug')->searchable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime(),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist->schema([
            Infolists\Components\TextEntry::make('name')
                ->placeholder('—'),
            Infolists\Components\TextEntry::make('slug')
                ->placeholder('—'),
        ]);
    }

    public static function getRelations(): array
    {
        return [
            // Define relationships like posts, roles, etc.
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
            'view' => Pages\ViewProduct::route('/{record}'),
        ];
    }
}
```

For more advanced configurations and customizations, refer to the official Filament documentation. 🚀

### **(B) Pages**

Each resource has associated pages, found in `Webkul\Inventories\Filament\Admin\Resources\ProductResource\Pages`. These define how products interact with the model in the Filament panel.

#### **`ListProducts.php` (Listing Records)**

```php
<?php

namespace Webkul\Inventories\Filament\Admin\Resources\ProductResource\Pages;

use Filament\Resources\Pages\ListRecords;
use App\Filament\Resources\ProductResource;

class ListProducts extends ListRecords
{
    protected static string $resource = ProductResource::class;
}
```

- This page lists all `Product` records with the table columns and filters defined in `ProductResource.php`.

#### **`CreateProduct.php` (Creating a Record)**

```php
<?php

namespace Webkul\Inventories\Filament\Admin\Resources\ProductResource\Pages;

use Filament\Resources\Pages\CreateRecord;
use App\Filament\Resources\ProductResource;

class CreateProduct extends CreateRecord
{
    protected static string $resource = ProductResource::class;
}
```

- This page provides the form defined in `ProductResource.php` for creating a new product.

#### **`EditProduct.php` (Editing a Record)**

```php
<?php

namespace Webkul\Inventories\Filament\Admin\Resources\ProductResource\Pages;

use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\ProductResource;

class EditProduct extends EditRecord
{
    protected static string $resource = ProductResource::class;
}
```

- This page allows editing a product’s details using the form schema.

#### **`ViewProduct.php` (Viewing a Record)**

```php
<?php

namespace Webkul\Inventories\Filament\Admin\Resources\ProductResource\Pages;

use Filament\Resources\Pages\ViewRecord;
use App\Filament\Resources\ProductResource;

class ViewProduct extends ViewRecord
{
    protected static string $resource = ProductResource::class;
}
```

- If enabled, this allows detailed viewing of a single product record.

## **Advanced Features**

### **A) Custom Actions**

Filament provides table actions like edit, delete, and view, but you can also create custom actions.

Example: **Activate Product**

```php
Tables\Actions\Action::make('Activate')
    ->action(fn (Product $record) => $record->update(['status' => 'active']))
    ->requiresConfirmation()
    ->color('success');
```

### **B) Global Search**

You can enable global search for a resource:

```php
protected static ?string $recordTitleAttribute = 'name';

public static function getGloballySearchableAttributes(): array
{
    return ['name', 'slug'];
}
```

### **C) Relationships**

If a product has many posts:

```php
public static function getRelations(): array
{
    return [
        RelationManagers\PostsRelationManager::class,
    ];
}
```

And create a `PostsRelationManager` class inside **Webkul\Inventories\Filament\Admin\Resources\ProductResource\RelationManagers**

```php
<?php

namespace Webkul\Inventories\Filament\Admin\Resources\ProductResource\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Webkul\Employee\Traits\Resources\Employee\EmployeeSkillRelation;

class VariantsRelationManager extends RelationManager
{
    protected static string $relationship = 'variants';

    protected static ?string $title = 'Variants';
}

```
