# **Overview**

Filament PHP resources are a core concept used to manage database models in an admin panel. They provide an abstraction layer over CRUD (Create, Read, Update, Delete) operations and allow developers to define how models are managed within the Filament admin panel.

## **What is a Resource in Aureus ERP?**

A **Resource** in Filament PHP is a class that represents a database model inside the Filament admin panel. It defines how records of that model are displayed, created, updated, and deleted.

Each resource is stored in the respective module's directory and typically consists of:

- A **resource class** (e.g., `PostResource.php`)
- A set of related pages (e.g., `ListPosts`, `CreatePost`, `EditPost`, `ViewPost`)
- Form and table configurations

## **Creating a Filament Resource**

To generate a Filament resource, use the following command:

```sh
php artisan make:filament-resource Post --view --model-namespace=Webkul\\Path\\Models
```

For more information visit [Filament Official Documentation](https://filamentphp.com/docs/4.x/panels/resources/getting-started#creating-a-resource)

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

- `Webkul\Blog\Filament\Admin\Resources\PostResource.php`
- `Webkul\Blog\Filament\Admin\Resources\PostResource/Pages/`
  - `ListPosts.php`
  - `CreatePost.php`
  - `EditPost.php`
  - `ViewPost.php` (if enabled)

For more detailed documentation, refer to the official [Filament PHP Documentation](https://filamentphp.com/docs/4.x/panels/resources/getting-started).

## **Anatomy of a Filament Resource**

### **(A) Resource Class (`PostResource.php`)**

The main resource file defines:

- The model it represents
- Navigation settings (icon, group, etc.)
- The table display configuration
- The form fields for creating/editing records

#### **Example `PostResource.php`**

```php
<?php

namespace Webkul\Blog\Filament\Admin\Resources;

use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms;
use Filament\Tables\Table;
use Filament\Forms\Form;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Webkul\Blog\Models\Post;
use Webkul\Blog\Filament\Admin\Resources\PostResource\Pages;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static ?string $navigationIcon = 'heroicon-o-post';

    protected static ?string $navigationGroup = 'Blog';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->required()
                ->maxLength(255),
            Forms\Components\TextInput::make('slug')
                ->required()
                ->unique(Post::class, 'slug'),
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
            // Define relationships like comments, tags etc.
        ];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit'   => Pages\EditPost::route('/{record}/edit'),
            'view'   => Pages\ViewPost::route('/{record}'),
        ];
    }
}
```

For more advanced configurations and customizations, refer to the official Filament documentation. 🚀

### **(B) Pages**

Each resource has associated pages, found in `Webkul\Blog\Filament\Admin\Resources\PostResource\Pages`. These define how posts interact with the model in the Filament panel.

#### **`ListPosts.php` (Listing Records)**

```php
<?php

namespace Webkul\Blog\Filament\Admin\Resources\PostResource\Pages;

use Filament\Resources\Pages\ListRecords;
use Webkul\Blog\Filament\Admin\Resources\PostResource;

class ListPosts extends ListRecords
{
    protected static string $resource = PostResource::class;
}
```

- This page lists all `Post` records with the table columns and filters defined in `PostResource.php`.

#### **`CreatePost.php` (Creating a Record)**

```php
<?php

namespace Webkul\Blog\Filament\Admin\Resources\PostResource\Pages;

use Filament\Resources\Pages\CreateRecord;
use Webkul\Blog\Filament\Admin\Resources\PostResource;

class CreatePost extends CreateRecord
{
    protected static string $resource = PostResource::class;
}
```

- This page provides the form defined in `PostResource.php` for creating a new post.

#### **`EditPost.php` (Editing a Record)**

```php
<?php

namespace Webkul\Blog\Filament\Admin\Resources\PostResource\Pages;

use Filament\Resources\Pages\EditRecord;
use Webkul\Blog\Filament\Admin\Resources\PostResource;

class EditPost extends EditRecord
{
    protected static string $resource = PostResource::class;
}
```

- This page allows editing a post’s details using the form schema.

#### **`ViewPost.php` (Viewing a Record)**

```php
<?php

namespace Webkul\Blog\Filament\Admin\Resources\PostResource\Pages;

use Filament\Resources\Pages\ViewRecord;
use Webkul\Blog\Filament\Admin\Resources\PostResource;

class ViewPost extends ViewRecord
{
    protected static string $resource = PostResource::class;
}
```

- If enabled, this allows detailed viewing of a single post record.

## **Advanced Features**

### **Global Search**

You can enable global search for a resource:

```php
protected static ?string $recordTitleAttribute = 'name';

public static function getGloballySearchableAttributes(): array
{
    return ['name', 'slug'];
}
```

### **Relationships**

If a post has many posts:

```php
public static function getRelations(): array
{
    return [
        RelationManagers\CommentsRelationManager::class,
    ];
}
```

And create a `CommentsRelationManager` class inside **Webkul\Blog\Filament\Admin\Resources\PostResource\RelationManagers**

```php
<?php

namespace Webkul\Blog\Filament\Admin\Resources\PostResource\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Webkul\Employee\Traits\Resources\Employee\EmployeeSkillRelation;

class CommentsRelationManager extends RelationManager
{
    protected static string $relationship = 'comments';

    protected static ?string $title = 'Comments';
}

```
