# Overview

The **Customer Account** in AureusERP is a **website plugin** that enables frontend functionalities, including customer authentication, profile management, and content display. This plugin integrates with the `Partner` model for handling frontend authentication and user management.

## Installation

To install the **Website Plugin**, run the following command:

```sh
php artisan website:install
```

This command will install the necessary components to enable the frontend for customer access and authentication.

## Laravel Authentication Providers

AureusERP utilizes Laravel's authentication system with a custom provider configuration for customers. The authentication configuration in `config/auth.php` includes:

```php
use Webkul\Security\Models\User;
use Webkul\Website\Models\Partner;

'providers' => [
    'users' => [
        'driver' => 'eloquent',
        'model'  => env('AUTH_MODEL', User::class),
    ],

    'customers' => [
        'driver' => 'eloquent',
        'model'  => env('AUTH_MODEL', Partner::class),
    ],
],
```

A dedicated `customer` guard and a `customers` password broker are also defined:

```php
'guards' => [
    'web' => [
        'driver'   => 'session',
        'provider' => 'users',
    ],

    'customer' => [
        'driver'   => 'session',
        'provider' => 'customers',
    ],
],

'passwords' => [
    // ...

    'customers' => [
        'provider' => 'customers',
        'table'    => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
        'expire'   => 60,
        'throttle' => 60,
    ],
],
```

### Explanation

- **Users Provider:** Uses the `User` model from `Webkul\Security\Models\User` for backend authentication.
- **Customers Provider:** Uses the `Partner` model from `Webkul\Website\Models\Partner` for handling customer authentication on the frontend. This model extends `Webkul\Partner\Models\Partner` and adds the `password` and `is_active` fillables, hashed password casting, and login tracking (`last_login_at`).

## Customer Panel

The frontend is a dedicated Filament panel registered by `App\Providers\Filament\CustomerPanelProvider`. It is served from the site root and wired to the customer guard:

```php
use Filament\Panel;
use Filament\PanelProvider;

class CustomerPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('customer')
            ->path('/')
            ->homeUrl(url('/'))
            ->authPasswordBroker('customers')
            ->profile(isSimple: false)
            ->topNavigation()
            ->authGuard('customer');
    }
}
```

The Website plugin (`Webkul\Website\WebsitePlugin`) registers the customer-facing authentication pages and resources on this panel:

- **Login:** `Webkul\Website\Filament\Customer\Auth\Login`
- **Registration:** `Webkul\Website\Filament\Customer\Auth\Register`
- **Password Reset:** `Webkul\Website\Filament\Customer\Auth\PasswordReset\RequestPasswordReset` and `ResetPassword`
- **Account Cluster:** `Webkul\Website\Filament\Customer\Clusters\Account`, linked from the user menu as "My Account"
- **Pages:** the `Homepage` page and the customer `PageResource` for rendering website pages

```php
$panel
    ->when($panel->getId() == 'customer', function (Panel $panel) {
        $panel
            ->login(Login::class)
            ->registration(Register::class)
            ->passwordReset(RequestPasswordReset::class, ResetPassword::class)
            ->discoverResources(
                in: __DIR__.'/Filament/Customer/Resources',
                for: 'Webkul\\Website\\Filament\\Customer\\Resources'
            );

        // ...
    });
```

## Portal Access Management

Administrators manage customer (portal) access from the Contact admin pages. The Website plugin contributes a set of actions, located in `Webkul\Website\Filament\Admin\Actions\Portal`, to the Partner resource:

| Action                           | Purpose                                                     |
| -------------------------------- | ----------------------------------------------------------- |
| `GrantPortalAccessAction`        | Grants a contact access to the customer portal.             |
| `RevokePortalAccessAction`       | Revokes a contact's portal access.                          |
| `ChangePortalPasswordAction`     | Sets a new portal password for the contact.                 |
| `SendPortalPasswordResetAction`  | Emails the contact a password reset (set password) link.    |

These are wired in through `Webkul\Website\PortalContributions`, which also adds a portal status column, filter constraint, and infolist section to the Contact resource. The underlying logic lives in the `Webkul\Website\Support\PortalAccess` helper, where a partner is considered to have portal access when a password is set.

## Blog Module Installation

To enable blog functionality, install the **Blog Plugin** using:

```sh
php artisan blogs:install
```

### Features

- Displays blogs on the frontend.
- Allows users to manage and update their profiles.
- Dynamically updates menus based on installed plugins.

## Dynamic Plugin Management

AureusERP dynamically adjusts frontend menus based on installed plugins, ensuring:

- Only relevant sections are displayed to users.
- Seamless integration of new features without additional configuration.

When the Website plugin is not installed, the site root simply redirects to the admin login.
