# **Overview**

Policies in AureusERP are used to enforce authorization rules for different models. They help restrict or allow user actions based on permissions and roles.

## **Key Features of Policies**

- Define authorization logic for each model.
- Grant or deny access based on user roles and permissions.
- Integrate with Laravel’s `Gate` and `authorize` methods.
- Automatically associate policies with models using conventions.
- Work seamlessly with Spatie’s role and permission package.

Policies help in defining access control for models, ensuring that only authorized users can perform specific actions.

## **Defining Policies in a Plugin**

Policies live in the plugin's `src/Policies` directory. Because the namespace follows Laravel's policy discovery convention (`Webkul\Blog\Models\Post` resolves to `Webkul\Blog\Policies\PostPolicy`), no manual registration is required. Each ability checks a Filament Shield permission on the `Webkul\Security\Models\User` model:

```php
<?php

namespace Webkul\Blog\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Webkul\Blog\Models\Post;
use Webkul\Security\Models\User;

class PostPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->can('view_any_blog_post');
    }

    public function view(User $user, Post $post): bool
    {
        return $user->can('view_blog_post');
    }

    public function create(User $user): bool
    {
        return $user->can('create_blog_post');
    }
}
```

The excerpt above shows only the first three methods — the full `PostPolicy` also defines `update`, `delete`, `deleteAny`, `restore`, `restoreAny`, `forceDelete`, and `forceDeleteAny` following the same pattern. The permissions themselves are generated and managed by Filament Shield, configured through the plugin's `config/filament-shield.php` file.

For more details, refer to [Policies](../getting-started/policies.md).
