# **Creating Records**

When creating record in AureusERP using Filament, you may need to modify form data before it is saved to the database. Filament provides the `mutateFormDataBeforeCreate()` method to handle this modification.

This method allows you to:

- **Set default values** for new records.
- **Modify or sanitize input data** before saving.

## **Usage Example**

### **Basic Implementation**

Modify the form data by assigning the authenticated user's ID before saving:

```php
protected function mutateFormDataBeforeCreate(array $data): array
{
    $data['creator_id'] = Auth::id();

    return $data;
}
```

In this case, `creator_id` is set to the currently authenticated user before the record is created.

## **Advanced Example: Assigning Additional Data**

In some cases, you may need to assign multiple values, such as company-related fields or default statuses:

```php
protected function mutateFormDataBeforeCreate(array $data): array
{
    $user = Auth::user();

    $data['creator_id'] = $user->id;
    $data['company_id'] = current_company_id();

    return $data;
}
```

This ensures that:

- **The creator is assigned** (`creator_id`).
- **The current company is assigned** (`company_id`).

## **Mutating Data in Modal Actions**

If you're using modal actions instead of standard create pages, refer to the **Filament Actions Documentation** for handling mutations inside modal-based actions. Actions now use the `mutateDataUsing()` method:

```php
use Filament\Actions\CreateAction;
use Illuminate\Support\Facades\Auth;

CreateAction::make()
    ->mutateDataUsing(function (array $data): array {
        $data['creator_id'] = Auth::id();

        return $data;
    });
```

## **Example: Implementing CreatePost**

A `CreatePost` class can be implemented using Filament’s `CreateRecord`.

```php
<?php

namespace Webkul\Blog\Filament\Admin\Resources\PostResource\Pages;

use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;
use Webkul\Blog\Filament\Admin\Resources\PostResource;

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
        $data['creator_id'] = Auth::id();

        return $data;
    }
}
```

## **Explanation**

- **Handles Post Creation**: This class ensures proper post creation, following best practices.
- **Data Mutation**: Assigns the `creator_id` before saving.
- **Redirection & Notifications**: Redirects to the post view and notifies the user on successful creation.

For more details, check the **[Official Filament Documentation](https://filamentphp.com/docs/5.x/resources/creating-records)**. 🚀
