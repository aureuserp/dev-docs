# **Filtering Posts Using Tabs**

For filtering post records using **tabs** in the List page. You can define custom tabs in the `getTabs()` method. The `Tab` component is imported from `Filament\Schemas\Components\Tabs\Tab`.

## **Example Tabs:**

- **All Posts** → Displays all posts.
- **Archived** → Filters soft-deleted (trashed) posts.

**Code Example:**

```php
use Filament\Schemas\Components\Tabs\Tab;

public function getTabs(): array
{
    return [
        'all' => Tab::make(__('All Posts'))
            ->badge(Post::count()),
        'archived' => Tab::make(__('Archived'))
            ->badge(Post::onlyTrashed()->count())
            ->modifyQueryUsing(fn ($query) => $query->onlyTrashed()),
    ];
}
```

## **2. Customizing the List Page for Posts**

To customize how posts are listed, you extend the `ListRecords` class.

### **Key Features:**

- Define the **resource** (`PostResource`).
- Add **header actions**, such as a button to create new posts. Page actions like `CreateAction` are imported from the unified `Filament\Actions` namespace.

**Code Example:**

```php
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Webkul\Blog\Filament\Admin\Resources\PostResource;

class ListPosts extends ListRecords
{
    protected static string $resource = PostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->label(__('New Post'))
                ->icon('heroicon-o-plus-circle'),
        ];
    }
}
```

## **3. Using Preset Views for Filtering**

AureusERP supports **preset views** to provide predefined post listings. To use them, add the `HasTableViews` trait from the `table-views` plugin to your list page and define the views in `getPresetTableViews()`.

### **Example Preset Views:**

- **My Posts** → Shows posts authored by the current user.
- **Archived** → Shows deleted posts.

**Code Example:**

```php
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Webkul\Blog\Filament\Admin\Resources\PostResource;
use Webkul\TableViews\Filament\Components\PresetView;
use Webkul\TableViews\Filament\Concerns\HasTableViews;

class ListPosts extends ListRecords
{
    use HasTableViews;

    protected static string $resource = PostResource::class;

    public function getPresetTableViews(): array
    {
        return [
            'my_posts' => PresetView::make(__('My Posts'))
                ->icon('heroicon-s-user')
                ->favorite()
                ->setAsDefault()
                ->modifyQueryUsing(fn (Builder $query) => $query->where('author_id', Auth::id())),
            'archived' => PresetView::make(__('Archived Posts'))
                ->icon('heroicon-s-archive-box')
                ->favorite()
                ->modifyQueryUsing(fn ($query) => $query->onlyTrashed()),
        ];
    }
}
```

## **Conclusion**

- Use **tabs** for quick filtering.
- Customize the **list page** to include actions like post creation.
- Implement **preset views** for predefined post filters.

For more details, check the **[Official Filament Documentation](https://filamentphp.com/docs/5.x/resources/listing-records)**. 🚀
