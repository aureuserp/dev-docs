# Overview

Policies in **Aureus ERP** provide a structured way to manage authorization for different resources in the system. These policies define the actions a user can perform based on their assigned roles and permissions. The authorization logic is primarily handled using **Laravel Policies** combined with the **Spatie Role & Permission** package.

## Implementing Policies

### 1. **Defining a Policy**

Policies are stored within the `Webkul\Blogs\Policies` or `Webkul\{PluginName}\Policies` directory. Each policy class corresponds to a specific model and defines authorization rules for actions such as viewing, creating, updating, deleting, and restoring records.

Example structure:

```php
namespace Webkul\Blogs\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Blogs\Models\Post;
use Modules\Security\Models\User;
use Modules\Security\Traits\HasScopedPermissions;

class PostPolicy
{
    use HandlesAuthorization, HasScopedPermissions;

    public function viewAny(User $user): bool
    {
        return $user->can('view_any_blogs_post');
    }

    public function view(User $user, Post $post): bool
    {
        return $user->can('view_blogs_post');
    }
}
```

## **Registering Policies**

FilamentPHP automatically registers policies based on naming conventions. However, if you need to manually define policies, you can do so in the `AuthServiceProvider`:

```php
use Modules\Blogs\Models\Post;
use Modules\Blogs\Policies\PostPolicy;

protected $policies = [
    Post::class => PostPolicy::class,
];
```

By default, Filament will resolve policies automatically if they follow the standard Laravel convention (`ModelPolicy` in the same namespace). However, if your policies are located in a different namespace or you need explicit mapping, you can register them manually as shown above.

## Policy Methods

Each policy method determines whether a user has permission to perform a specific action. Common methods include:

| Method Name                       | Purpose                                              |
| --------------------------------- | ---------------------------------------------------- |
| `viewAny(User $user)`             | Check if the user can list all records.              |
| `view(User $user, $model)`        | Check if the user can view a specific record.        |
| `create(User $user)`              | Check if the user can create a new record.           |
| `update(User $user, $model)`      | Check if the user can update a record.               |
| `delete(User $user, $model)`      | Check if the user can delete a record.               |
| `restore(User $user, $model)`     | Check if the user can restore a soft-deleted record. |
| `forceDelete(User $user, $model)` | Check if the user can permanently delete a record.   |

## Scoped Permissions Using `HasScopedPermissions`

Aureus ERP policies use the `HasScopedPermissions` trait to provide additional control over access levels based on global, group, or individual permissions.

### **Permission Levels**

1. **Global Access:** Users with this level can access all resources.
2. **Group Access:** Users can access only resources belonging to their assigned groups.
3. **Individual Access:** Users can access only the records they own.

### **Trait Methods**

The `HasScopedPermissions` trait includes methods to check these permissions:

### **Access Control Methods**

These methods are used to determine a user's access level based on global, group-based, and individual permissions.

| Method                                                                                 | Description                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hasGlobalAccess(User $user): bool`                                                    | Checks if the user has global permissions and returns `true` if granted.                                                                                                                                    |
| `hasGroupAccess(User $user, Model $model, string $ownerAttribute = 'user'): bool`      | Determines if the user has access based on group-level permissions. The `ownerAttribute` specifies the model's ownership attribute (default: `'user'`).                                                     |
| `hasIndividualAccess(User $user, Model $model, string $ownerAttribute = 'user'): bool` | Verifies if the user has access only to records they own. The `ownerAttribute` represents the ownership field in the model (default: `'user'`).                                                             |
| `hasAccess(User $user, Model $model, string $ownerAttribute = 'user'): bool`           | Evaluates all access levels (`global`, `group`, and `individual`) to determine if the user has the necessary permissions. The `ownerAttribute` defines the model's ownership field, defaulting to `'user'`. |

### **Example Usage in Policies**

The following example demonstrates how to implement these access control methods within a policy:

```php
public function update(User $user, Post $post): bool
{
    // Check if the user has permission to update posts
    if (! $user->can('update_blogs_post')) {
        return false;
    }

    // Verify if the user has the necessary access rights for the specific post
    return $this->hasAccess($user, $post);
}
```

- The `hasAccess` method accepts three arguments:
  1. **`$user`** – The authenticated user model.
  2. **`$model`** – The model instance being accessed (e.g., `Post`).
  3. **`$ownerAttribute`** _(optional, default: `'user'`)_ – The attribute that defines model ownership.

for example:

```php
public function update(User $user, Post $post): bool
{
    if (! $user->can('update_blogs_post')) {
        return false;
    }

    return $this->hasAccess($user, $post, 'created_by');
}
```

This structure ensures that users are granted access based on their global, group, or individual permissions, this means only the creator of the Post can update the record.
