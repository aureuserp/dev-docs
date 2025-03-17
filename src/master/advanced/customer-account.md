# Overview

The **Customer Account** in Aureus ERP is a **website plugin** that enables frontend functionalities, including customer authentication, profile management, and content display. This plugin integrates with the `Partner` model for handling frontend authentication and user management.

## Installation

To install the **Website Plugin**, run the following command:

```sh
php artisan website:install
```

This command will install the necessary components to enable the frontend for customer access and authentication.

## Laravel Authentication Providers

Aureus ERP utilizes Laravel's authentication system with a custom provider configuration for customers. The authentication configuration in `config/auth.php` includes:

```php
'providers' => [
    'users' => [
        'driver' => 'eloquent',
        'model'  => env('AUTH_MODEL', Webkul\Security\Models\User::class),
    ],

    'customers' => [
        'driver' => 'eloquent',
        'model'  => env('AUTH_MODEL', Webkul\Website\Models\Partner::class),
    ],
],
```

### Explanation

- **Users Provider:** Uses the `User` model from `Webkul\Security\Models\User` for backend authentication.
- **Customers Provider:** Uses the `Partner` model from `Webkul\Website\Models\Partner` for handling customer authentication on the frontend.

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

Aureus ERP dynamically adjusts frontend menus based on installed plugins, ensuring:

- Only relevant sections are displayed to users.
- Seamless integration of new features without additional configuration.
