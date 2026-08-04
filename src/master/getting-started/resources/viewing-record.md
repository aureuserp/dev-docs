# **Viewing Records**

When viewing record in AureusERP using Filament, you may need to customize the displayed data and allow users to perform actions like publish and unpublish post status or deleting a post. Filament provides the `ViewRecord` class to handle viewing individual records.

This class allows you to:

- **Display post details** in a structured manner, using the resource's `infolist()` schema.
- **Allow users to publish and unpublish posts** directly from the view page.
- **Provide an option to delete a post** with success notifications.

As of v1.5.0, many resources' view pages mirror their edit pages' header actions, so users can perform state changes without switching to edit mode.

## **Usage Example**

### **Basic Implementation**

```php
protected static string $resource = PostResource::class;
```

This links the `ViewPost` class to the `PostResource`.

## **Actions Available in View Mode**

All Filament actions below are imported from the unified `Filament\Actions` namespace; plugin-provided actions like `ChatterAction` keep their own namespaces.

### **1. Chatter Action**

Allows users to discuss post details within the application. The `ChatterAction` class is imported from `Webkul\Chatter\Filament\Actions\ChatterAction`.

```php
ChatterAction::make()
    ->resource($this->getResource()),
```

### **2. Publish and Draft Actions**

Allows users to publish a post or move it back to draft.

```php
Action::make('publish')
    ->label(__('Publish'))
    ->icon('heroicon-o-check-circle')
    ->action(function (Post $record) {
        $record->update([
            'published_at' => now(),
            'is_published' => true,
        ]);
    })
    ->visible(fn (Post $record) => ! $record->is_published),
Action::make('draft')
    ->label(__('Move to draft'))
    ->icon('heroicon-o-archive-box')
    ->action(function (Post $record) {
        $record->update(['is_published' => false]);
    })
    ->visible(fn (Post $record) => $record->is_published),
```

### **3. Delete Action**

Allows users to delete the post with a success notification.

```php
DeleteAction::make()
    ->successNotification(
        Notification::make()
            ->success()
            ->title(__('Post Deleted'))
            ->body(__('Post has been deleted successfully.')),
    ),
```

## **Extended `ViewPost` Example**

The actual `ViewPost` page in the blogs plugin defines only the delete action; this extended example adds the publish and draft actions to show how a view page can mirror its edit page.

```php
<?php

namespace Webkul\Blog\Filament\Admin\Resources\PostResource\Pages;

use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ViewRecord;
use Webkul\Blog\Filament\Admin\Resources\PostResource;
use Webkul\Blog\Models\Post;

class ViewPost extends ViewRecord
{
    protected static string $resource = PostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('publish')
                ->label(__('Publish'))
                ->icon('heroicon-o-check-circle')
                ->action(function (Post $record) {
                    $record->update([
                        'published_at' => now(),
                        'is_published' => true,
                    ]);
                })
                ->visible(fn (Post $record) => ! $record->is_published),
            Action::make('draft')
                ->label(__('Move to draft'))
                ->icon('heroicon-o-archive-box')
                ->action(function (Post $record) {
                    $record->update(['is_published' => false]);
                })
                ->visible(fn (Post $record) => $record->is_published),
            DeleteAction::make()
                ->successNotification(
                    Notification::make()
                        ->success()
                        ->title(__('Post Deleted'))
                        ->body(__('Post has been deleted successfully.')),
                ),
        ];
    }
}
```

## **Explanation**

- **Handles Post Viewing**: Displays post details in a structured format using the resource's infolist schema.
- **Publish and Draft Feature**: Allows users to publish a post or move it back to draft, mirroring the edit page's header actions.
- **Delete Post Feature**: Provides an option to delete a post with notifications.
- **Chatter Integration**: Enables discussion around the record on resources that support it.

For more details, check the **[Official Filament Documentation](https://filamentphp.com/docs/5.x/resources/viewing-records)**. 🚀
