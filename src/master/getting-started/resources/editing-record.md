# **Editing Records**

When editing record in Aureus ERP using Filament, you may need to validate and modify form data before saving changes to the database. Filament provides the `mutateFormDataBeforeSave()` method to handle this modification.

This method allows you to:

- **Sanitize or modify input values** before saving.
- **Ensure business rules are followed** when updating post details.

## **Usage Example**

### **Basic Implementation**

Modify the form data to prevent changes to certain fields:

```php
protected function mutateFormDataBeforeSave(array $data): array
{
    return $data;
}
```

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

## **Example: Implementing EditPost**

A `EditPost` class can be implemented using Filament’s `EditRecord`.

```php
<?php

namespace Webkul\Blog\Filament\Resources\PostResource\Pages;

use Filament\Actions;
use Filament\Forms;
use Filament\Notifications\Notification;
use Filament\Pages\SubNavigationPosition;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;
use Webkul\Chatter\Filament\Actions\ChatterAction;
use Webkul\Blog\Filament\Resources\PostResource;

class EditPost extends EditRecord
{
    protected static string $resource = PostResource::class;

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
            ->title(__('Post updated'))
            ->body(__('Post has been updated successfully.'));
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $user = Auth::user();

        $data['updated_by'] = $user->id;
        $data['updated_at'] = now();

        return $data;
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

    protected function afterSave(): void
    {
        // This block of code executes when the record has been saved.
    }
}
```

## **Explanation**

- **Handles Post Editing**: This class ensures post updates follow the necessary business rules.
- **Data Mutation**: Assigns the `updated_by` field and prevents unauthorized users from modifying certain fields.
- **Actions**: Includes publish or unpublish, deletion, and Chatter integration for discussions.
- **Redirection & Notifications**: Redirects to the post view and notifies the user on successful update.

For more details, check the **<a href="https://filamentphp.com/docs/3.x/panels/resources/editing-records" rel="nofollow external noopener noreferrer" target="_blank">Official Filament Documentation</a>**. 🚀
