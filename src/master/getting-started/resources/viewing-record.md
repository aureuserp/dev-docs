# **Viewing Records**

When viewing record in Aureus ERP using Filament, you may need to customize the displayed data and allow users to perform actions like publish and unpublish post status or deleting a post. Filament provides the `ViewRecord` class to handle viewing individual records.

This class allows you to:

- **Display post details** in a structured manner.
- **Allow users to publish and unpublish post labels** in different formats.
- **Provide an option to delete a post** with success notifications.

## **Usage Example**

### **Basic Implementation**

```php
protected static string $resource = PostResource::class;
```

This links the `ViewPost` class to the `PostResource`.

## **Actions Available in View Mode**

### **1. Chatter Action**

Allows users to discuss post details within the application.

```php
ChatterAction::make()->setResource(static::$resource),
```

### **2. Publish and Unpublish Actions**

Allows users to update post status to publish and unpublish.

```php
Actions\Action::make('publish')
    ->label(__('Publish'))
    ->color('primary')
    ->icon('heroicon-o-check-badge')
    ->visible(fn($record) => $record->status == PostStatus::UNPUBLISHED->value)
    ->action(function ($record) {
        $record->update(['status' => PostStatus::PUBLISHED->value])
    }),
Actions\Action::make('un_publish')
    ->label(__('Unpublish'))
    ->color('primary')
    ->icon('heroicon-o-x-circle')
    ->visible(fn($record) => $record->status == PostStatus::PUBLISHED->value)
    ->action(function ($record) {
        $record->update(['status' => PostStatus::UNPUBLISHED->value])
    }),
```

### **3. Delete Action**

Allows users to delete the post with a success notification.

```php
Actions\DeleteAction::make()
    ->successNotification(
        Notification::make()
            ->success()
            ->title(__('Post Deleted'))
            ->body(__('Post has been deleted successfully.')),
    ),
```

## **Final `ViewPost` Implementation**

```php
<?php

namespace Webkul\Blog\Filament\Resources\PostResource\Pages;

use Barryvdh\DomPDF\Facade\Pdf;
use Filament\Actions;
use Filament\Forms;
use Filament\Notifications\Notification;
use Filament\Pages\SubNavigationPosition;
use Filament\Resources\Pages\ViewRecord;
use Webkul\Chatter\Filament\Actions\ChatterAction;
use Webkul\Blog\Filament\Resources\PostResource;

class ViewPost extends ViewRecord
{
    protected static string $resource = PostResource::class;

    public function getSubNavigationPosition(): SubNavigationPosition
    {
        return SubNavigationPosition::Top;
    }

    protected function getHeaderActions(): array
    {
        return [
            ChatterAction::make()->setResource(static::$resource),
            Actions\Action::make('publish')
                ->label(__('Publish'))
                ->color('primary')
                ->icon('heroicon-o-check-badge')
                ->visible(fn($record) => $record->status == PostStatus::UNPUBLISHED->value)
                ->action(function ($record) {
                    $record->update(['status' => PostStatus::PUBLISHED->value])
                }),
            Actions\Action::make('un_publish')
                ->label(__('Unpublish'))
                ->color('primary')
                ->icon('heroicon-o-x-circle')
                ->visible(fn($record) => $record->status == PostStatus::PUBLISHED->value)
                ->action(function ($record) {
                    $record->update(['status' => PostStatus::UNPUBLISHED->value])
                }),
            Actions\DeleteAction::make()
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

- **Handles Post Viewing**: Displays post details in a structured format.
- **Publish and Unpublished Post Feature**: Allows users to publish and unpublished post status.
- **Delete Post Feature**: Provides an option to delete a post with notifications.
- **Chatter Integration**: Enables discussion around the post.
- **Navigation Position**: Places the page navigation at the top.

For more details, check the **[Official Filament Documentation](https://filamentphp.com/docs/4.x/panels/resources/viewing-records)**. 🚀
