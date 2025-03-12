# Overview

Policies in **Aureus ERP** provide a structured way to manage authorization for different resources in the system. These policies define the actions a user can perform based on their assigned roles and permissions. The authorization logic is primarily handled using **Laravel Policies** combined with the **Spatie Role & Permission** package.

## Implementing Policies

### 1. **Defining a Policy**

Policies are stored within the `Webkul\Sale\Policies` or `Webkul\{PluginName}\Policies` directory. Each policy class corresponds to a specific model and defines authorization rules for actions such as viewing, creating, updating, deleting, and restoring records.

Example structure:

```php
namespace Webkul\Sale\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Sales\Models\Order;
use Modules\Security\Models\User;
use Modules\Security\Traits\HasScopedPermissions;

class OrderPolicy
{
    use HandlesAuthorization, HasScopedPermissions;

    public function viewAny(User $user): bool
    {
        return $user->can('view_any_order');
    }

    public function view(User $user, Order $order): bool
    {
        return $user->can('view_order');
    }
}
```

## **Registering Policies**

FilamentPHP automatically registers policies based on naming conventions. However, if you need to manually define policies, you can do so in the `AuthServiceProvider`:

```php
use Modules\Sales\Models\Order;
use Modules\Sales\Policies\OrderPolicy;

protected $policies = [
    Order::class => OrderPolicy::class,
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
| `replicate(User $user, $model)`   | Check if the user can duplicate a record.            |
| `reorder(User $user)`             | Check if the user can reorder records.               |

## Scoped Permissions Using `HasScopedPermissions`

Aureus ERP policies use the `HasScopedPermissions` trait to provide additional control over access levels based on global, group, or individual permissions.

### **Permission Levels**

1. **Global Access:** Users with this level can access all resources.
2. **Group Access:** Users can access only resources belonging to their assigned groups.
3. **Individual Access:** Users can access only the records they own.

### **Trait Methods**

The `HasScopedPermissions` trait includes methods to check these permissions:

| Method                                                                           | Description                                                                          |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `hasGlobalAccess(User $user)`                                                    | Returns `true` if the user has global permissions.                                   |
| `hasGroupAccess(User $user, Model $model, string $ownerAttribute = 'user')`      | Returns `true` if the user has group-based permissions.                              |
| `hasIndividualAccess(User $user, Model $model, string $ownerAttribute = 'user')` | Returns `true` if the user has access only to their own records.                     |
| `hasAccess(User $user, Model $model, string $ownerAttribute = 'user')`           | Combines all access checks and determines if the user has the necessary permissions. |

### **Example Usage in Policies**

```php
public function update(User $user, Order $order): bool
{
    if (! $user->can('update_order')) {
        return false;
    }

    return $this->hasAccess($user, $order);
}
```
