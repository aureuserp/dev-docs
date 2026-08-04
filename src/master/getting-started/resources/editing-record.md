# **Editing Records**

When editing record in AureusERP using Filament, you may need to validate and modify form data before saving changes to the database. Filament provides the `mutateFormDataBeforeSave()` method to handle this modification.

This method allows you to:

- **Sanitize or modify input values** before saving.
- **Ensure business rules are followed** when updating post details.

## **Usage Example**

### **Basic Implementation**

Modify the form data before it is saved, for example to track the last editor:

```php
protected function mutateFormDataBeforeSave(array $data): array
{
    $data['last_editor_id'] = Auth::id();

    return $data;
}
```

## **Mutating Data in Modal Actions**

If you're using modal actions instead of standard edit pages, you can modify form data within modal-based actions using the `mutateDataUsing()` method:

```php
use Filament\Actions\EditAction;
use Illuminate\Support\Facades\Auth;

EditAction::make()
    ->mutateDataUsing(function (array $data): array {
        $data['last_editor_id'] = Auth::id();

        return $data;
    });
```

## **Example: Implementing EditPost**

A `EditPost` class can be implemented using Filament’s `EditRecord`. Note that all page actions (`Action`, `DeleteAction`, etc.) are imported from the unified `Filament\Actions` namespace.

```php
<?php

namespace Webkul\Blog\Filament\Admin\Resources\PostResource\Pages;

use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;
use Webkul\Blog\Filament\Admin\Resources\PostResource;
use Webkul\Blog\Models\Post;

class EditPost extends EditRecord
{
    protected static string $resource = PostResource::class;

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $data['last_editor_id'] = Auth::id();

        return $data;
    }

    protected function getSavedNotification(): Notification
    {
        return Notification::make()
            ->success()
            ->title(__('Post updated'))
            ->body(__('Post has been updated successfully.'));
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('publish')
                ->label(__('Publish'))
                ->icon('heroicon-o-check-circle')
                ->action(function (Post $record) {
                    $record->update([
                        'last_editor_id' => Auth::id(),
                        'published_at'   => now(),
                        'is_published'   => true,
                    ]);

                    Notification::make()
                        ->success()
                        ->title(__('Post published'))
                        ->body(__('Post has been published successfully.'))
                        ->send();
                })
                ->visible(fn (Post $record) => ! $record->is_published),
            Action::make('draft')
                ->label(__('Move to draft'))
                ->icon('heroicon-o-archive-box')
                ->action(function (Post $record) {
                    $record->update(['is_published' => false]);

                    Notification::make()
                        ->success()
                        ->title(__('Post moved to draft'))
                        ->body(__('Post has been moved to draft successfully.'))
                        ->send();
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

- **Handles Post Editing**: This class ensures post updates follow the necessary business rules.
- **Data Mutation**: Assigns the `last_editor_id` field so the last editor is always tracked.
- **Actions**: Includes publish or move to draft, and deletion with a custom success notification.
- **Notifications**: Notifies the user on successful update.

::: tip Redirects and record state
By default, Filament keeps the user on the edit page after saving, and as a rule AureusERP edit pages follow this default — they do not override `getRedirectUrl()`. If saving mutates the record beyond the submitted form data, the form can become stale after saving. Some edit pages (for example `EditBill` in the accounts plugin) use the `RefreshesRecordState` trait from `Webkul\Support\Traits`, which refreshes the record and re-fills the form after save.
:::

For more details, check the **[Official Filament Documentation](https://filamentphp.com/docs/5.x/resources/editing-records)**. 🚀
