# **Creating Records**

When creating record in Aureus ERP using Filament, you may need to modify form data before it is saved to the database. Filament provides the `mutateFormDataBeforeCreate()` method to handle this modification.

This method allows you to:

- **Set default values** for new records.
- **Modify or sanitize input data** before saving.

## **Usage Example**

### **Basic Implementation**

Modify the form data by assigning the authenticated user's ID before saving:

```php
protected function mutateFormDataBeforeCreate(array $data): array
{
    $data['creator_id'] = auth()->id();

    return $data;
}
```

In this case, `creator_id` is set to the currently authenticated user before the record is created.

## **Advanced Example: Assigning Additional Data**

In some cases, you may need to assign multiple values, such as timestamps, company-related fields, or default statuses:

```php
protected function mutateFormDataBeforeCreate(array $data): array
{
    $user = auth()->user();

    $data['creator_id'] = $user->id;
    $data['created_at'] = now();

    return $data;
}
```

This ensures that:

- **The creator is assigned** (`creator_id`).
- **The creation timestamp is set** (`created_at`).

## **Mutating Data in Modal Actions**

If you're using modal actions instead of standard create pages, refer to the **Filament Actions Documentation** for handling mutations inside modal-based actions.

For example, when using modal-based form submissions:

```php
use Filament\Actions\CreateAction;

CreateAction::make()
    ->mutateFormDataUsing(fn (array $data) => [
        ...$data,
        'creator_id' => auth()->id(),
    ]);
```

## **Example: Implementing CreatePost**

A `CreatePost` class can be implemented using Filament’s `CreateRecord`.

```php
<?php

namespace Webkul\Blog\Filament\Clusters\Posts\Resources\PostResource\Pages;

use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;
use Webkul\Blog\Models\Post;
use Webkul\Blog\Filament\Clusters\Posts\Resources\PostResource;

class CreatePost extends CreateRecord
{
    protected static string $resource = PostResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('view', ['record' => $this->getRecord()]);
    }

    protected function getCreatedNotification(): ?Notification
    {
        return Notification::make()
            ->success()
            ->title(__('Post created'))
            ->body(__('Post has been created successfully.'));
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $user = Auth::user();

        $data['creator_id'] = $user->id;
        $data['created_at'] = now();

        return $data;
    }

    protected function afterCreate(): void
    {
    }
}
```

## **Explanation**

- **Handles Post Creation**: This class ensures proper post creation, following best practices.
- **Data Mutation**: Assigns the `creator_id` and `company_id` before saving.
- **Post-Creation Processing**: Calls `updateStockLevels()` to recalculate stock availability after post creation.
- **Redirection & Notifications**: Redirects to the post view and notifies the user on successful creation.

For more details, check the **[Official Filament Documentation](https://filamentphp.com/docs/3.x/panels/resources/creating-records)**. 🚀
