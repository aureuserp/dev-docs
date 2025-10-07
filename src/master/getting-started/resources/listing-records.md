# **Filtering Posts Using Tabs**

For filtering post records using **tabs** in the List page. You can define custom tabs in the `getTabs()` method.

## **Example Tabs:**

- **All Posts** → Displays all posts.
- **Archived** → Filters soft-deleted (trashed) posts.

**Code Example:**

```php
public function getTabs(): array
{
    return [
        'all' => Tab::make(__('All Posts'))->badge(Post::count()),
        'archived' => Tab::make(__('Archived'))->badge(Post::onlyTrashed()->count())
            ->modifyQueryUsing(fn ($query) => $query->onlyTrashed()),
    ];
}
```

## **2. Customizing the List Page for Posts**

To customize how posts are listed, you extend the `ListRecords` class.

### **Key Features:**

- Define the **resource** (`PostResource`).
- Add **header actions**, such as a button to create new posts.

**Code Example:**

```php
class ListPosts extends ListRecords
{
    protected static string $resource = PostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->icon('heroicon-o-plus-circle')
                ->label(__('New Post')),
        ];
    }
}
```

## **3. Using Preset Views for Filtering**

Aureus ERP supports **preset views** to provide predefined post listings.

### **Example Preset Views:**

- **All Posts** → Default view showing all records.
- **Archived** → Shows deleted posts.

**Code Example:**

```php
public function getPresetTableViews(): array
{
    return [
        'all_posts' => PresetView::make(__('All Posts'))
            ->icon('heroicon-s-clipboard-list')
            ->favorite()
            ->default()
            ->modifyQueryUsing(fn (Builder $query) => $query),
        'archived' => PresetView::make(__('Archived Posts'))
            ->icon('heroicon-s-archive-box')
            ->favorite()
            ->modifyQueryUsing(fn ($query) => $query->onlyTrashed()),
    ];
}
```

## **Conclusion**

- Use **tabs** for quick filtering.
- Customize the **list page** to include actions like post creation.
- Implement **preset views** for predefined post filters.

For more details, check the **[Official Filament Documentation](https://filamentphp.com/docs/4.x/panels/resources/listing-records)**. 🚀
