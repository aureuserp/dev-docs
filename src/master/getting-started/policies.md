# Overview

Policies in **AureusERP** provide a structured way to manage authorization for different resources in the system. These policies define the actions a user can perform based on their assigned roles and permissions. The authorization logic is primarily handled using **Laravel Policies** combined with the **Spatie Role & Permission** package.

## Implementing Policies

### 1. **Defining a Policy**

Policies are stored within the `Webkul\Blog\Policies` or `Webkul\{PluginName}\Policies` directory. Each policy class corresponds to a specific model and defines authorization rules for actions such as viewing, creating, updating, deleting, and restoring records.

Example structure:

```php
namespace Webkul\Blog\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Webkul\Blog\Models\Post;
use Webkul\Security\Models\User;
use Webkul\Security\Traits\HasScopedPermissions;

class PostPolicy
{
    use HandlesAuthorization, HasScopedPermissions;

    public function viewAny(User $user): bool
    {
        return $user->can('view_any_blog_post');
    }

    public function view(User $user, Post $post): bool
    {
        return $user->can('view_blog_post');
    }
}
```

## **Registering Policies**

FilamentPHP automatically registers policies based on naming conventions. However, if you need to manually define policies, you can do so using the `Gate` facade in your service provider's `boot` method:

```php
use Illuminate\Support\Facades\Gate;
use Webkul\Blog\Models\Post;
use Webkul\Blog\Policies\PostPolicy;

Gate::policy(Post::class, PostPolicy::class);
```

By default, Laravel will resolve policies automatically if they follow the standard convention (`ModelPolicy` in the plugin's `Policies` namespace next to its `Models` namespace). However, if your policies are located in a different namespace or you need explicit mapping, you can register them manually as shown above.

## Policy Methods

Each policy method determines whether a user has permission to perform a specific action. Common methods include:

| Method Name                       | Purpose                                              |
| --------------------------------- | ---------------------------------------------------- |
| `viewAny(User $user)`             | Check if the user can list all records.              |
| `view(User $user, $model)`        | Check if the user can view a specific record.        |
| `create(User $user)`              | Check if the user can create a new record.           |
| `update(User $user, $model)`      | Check if the user can update a record.               |
| `delete(User $user, $model)`      | Check if the user can delete a record.               |
| `deleteAny(User $user)`           | Check if the user can bulk delete records.           |
| `restore(User $user, $model)`     | Check if the user can restore a soft-deleted record. |
| `restoreAny(User $user)`          | Check if the user can bulk restore records.          |
| `forceDelete(User $user, $model)` | Check if the user can permanently delete a record.   |
| `forceDeleteAny(User $user)`      | Check if the user can permanently bulk delete.       |

## Scoped Permissions Using `HasScopedPermissions`

AureusERP policies use the `HasScopedPermissions` trait (from `Webkul\Security\Traits`) to provide additional control over access levels based on global, group, or individual permissions.

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
| `hasGroupAccess(User $user, Model $model, string $ownerAttribute = 'user'): bool`      | Determines if the user has access based on team-level permissions. The `ownerAttribute` specifies the model's ownership relationship (default: `'user'`).                                                   |
| `hasIndividualAccess(User $user, Model $model, string $ownerAttribute = 'user'): bool` | Verifies if the user has access only to records they own. The `ownerAttribute` represents the ownership relationship on the model (default: `'user'`).                                                      |
| `hasAccess(User $user, Model $model, string $ownerAttribute = 'user'): bool`           | Evaluates all access levels (`global`, `group`, and `individual`) to determine if the user has the necessary permissions. The `ownerAttribute` defines the model's ownership relationship, defaulting to `'user'`. |

All of these methods are declared as `protected`, so they are meant to be called from within your policy classes rather than externally.

### How Policy Permissions Are Generated in AureusERP

In AureusERP, **permission names** used in authorization policies are **automatically generated** by the `PermissionManager` leveraging **Filament Shield**. This approach ensures a consistent, modular, and conflict-free permission system across all plugins.

### Why Policies Use the Plugin Namespace

Policies are placed within each plugin’s own namespace (e.g., `Webkul\Blog\Policies`) to keep authorization logic:

* **Modular and Organized:** Each plugin manages its own models and policies separately.
* **Clear Ownership:** Policies are directly tied to the plugin’s models, simplifying maintenance.
* **Scalable:** Namespacing prevents clutter and collisions as more plugins are added.
* **Auto-Discovery Friendly:** Laravel and Filament automatically detect policies based on namespace conventions, reducing manual registration.

This design helps AureusERP maintain a **clean, scalable, and well-structured permission system** throughout the platform.

### Key Points About Permission Naming

* Permissions include the **action**, **plugin name**, and **entity** to clearly scope access and prevent conflicts.
* The **plugin key** is extracted from the entity’s namespace (e.g., `Webkul\Blog` becomes `blog`).
* Different permission name formats are used depending on the entity type (Resource, Page, Widget, etc.).

### Example Policy Methods and Permission Keys

| Policy Method | Purpose                           | Permission Checked    | Description                                    |
| ------------- | --------------------------------- | --------------------- | ---------------------------------------------- |
| `viewAny`     | Check if the user can list posts  | `view_any_blog_post`  | Allows the user to view the posts listing page |
| `view`        | Check if the user can view a post | `view_blog_post`      | Allows the user to view a specific post        |

---

This automatic permission naming system makes AureusERP’s authorization:

* **Consistent:** Permission keys follow a clear naming convention.
* **Scalable:** Easily supports many plugins without collision.
* **Maintainable:** Simplifies policy writing and permission management.
* **Modular:** Keeps each plugin’s permissions isolated and organized.

### **Example Usage in Policies**

The following example demonstrates how to implement these access control methods within a policy:

```php
public function update(User $user, Post $post): bool
{
    // Check if the user has permission to update posts
    if (! $user->can('update_blog_post')) {
        return false;
    }

    // Verify if the user has the necessary access rights for the specific post
    return $this->hasAccess($user, $post, 'creator');
}
```

- The `hasAccess` method accepts three arguments:
  1. **`$user`** – The authenticated user model.
  2. **`$model`** – The model instance being accessed (e.g., `Post`).
  3. **`$ownerAttribute`** _(optional, default: `'user'`)_ – The relationship that defines model ownership.

for example:

```php
public function update(User $user, Post $post): bool
{
    if (! $user->can('update_blog_post')) {
        return false;
    }

    return $this->hasAccess($user, $post, 'creator');
}
```

This structure ensures that users are granted access based on their global, group, or individual permissions. In this example, the ownership check uses the post's `creator` relationship, so unless the user has global or group access, only the creator of the post can update the record.
