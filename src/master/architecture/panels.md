# Admin Panel Provider

The Admin [Panel](https://filamentphp.com/docs/3.x/panels/configuration) Provider configures the administrative backend interface using FilamentPHP. It establishes authentication mechanisms, visual components, middleware configurations, and plugin integrations for administrative users.

## Configuration Breakdown

### Basic Panel Settings

```php
->default()
->id('admin')
->path('admin')
```

- `default()`: Sets this as the default panel for the application
- `id('admin')`: Assigns a unique identifier to the panel
- `path('admin')`: Determines the URL path for accessing the admin panel (e.g., `example.com/admin`)

### Authentication Features

```php
->login()
->passwordReset()
->emailVerification()
->profile()
```

- `login()`: Enables the login page for administrators
- `passwordReset()`: Adds password reset functionality
- `emailVerification()`: Implements email verification for new admin accounts
- `profile()`: Provides user profile management capabilities

### Branding Configuration

```php
->favicon(asset('images/favicon.ico'))
->brandLogo(asset('images/logo-light.svg'))
->darkModeBrandLogo(asset('images/logo-dark.svg'))
->brandLogoHeight('2rem')
```

- `favicon()`: Sets the browser tab icon
- `brandLogo()`: Defines the logo displayed in light mode
- `darkModeBrandLogo()`: Specifies an alternative logo for dark mode
- `brandLogoHeight()`: Controls the displayed logo height

### User Experience Enhancements

```php
->colors([
    'primary' => Color::Blue,
])
->unsavedChangesAlerts()
->spa()
->sidebarCollapsibleOnDesktop()
->maxContentWidth(MaxWidth::Full)
```

- `colors()`: Defines the color scheme with blue as the primary color
- `unsavedChangesAlerts()`: Warns users when trying to navigate away with unsaved changes
- `spa()`: Enables Single Page Application mode for smoother transitions
- `sidebarCollapsibleOnDesktop()`: Makes the sidebar collapsible on desktop devices
- `maxContentWidth()`: Sets content width to full screen

## How Menus Are Registered

Menus are registered through **Filament Resources, Pages, and Widgets** provided by each plugin.

When a plugin is loaded:

1. The **PluginManager** registers the plugin into the panel
2. Filament automatically discovers:
   * Resources
   * Pages
   * Widgets
3. Each of these defines its own navigation configuration

Example inside a Resource:

```php
protected static ?string $navigationGroup = 'Sales';
protected static ?string $navigationIcon = 'icon-orders';
protected static ?int $navigationSort = 20;
```

This ensures:

* The menu appears in the correct group
* The icon is consistent
* The menu order is predictable

## Navigation Groups (High-Level Menu Sections)

Navigation groups are **predefined at the panel level** in the `AdminPanelProvider`:

```php
->navigationGroups([
    NavigationGroup::make()->label(__('admin.navigation.sale')),
    NavigationGroup::make()->label(__('admin.navigation.accounting')),
    NavigationGroup::make()->label(__('admin.navigation.inventory')),
])
```

These groups act as **containers**.
Plugins simply reference the group name when registering menus.

### Plugin Integration

```php
->plugins([
    FilamentShieldPlugin::make()
        ->gridColumns([
            'default' => 1,
            'sm' => 1,
            'lg' => 2,
            'xl' => 3,
        ])
        ->sectionColumnSpan(1)
        ->checkboxListColumns([
            'default' => 1,
            'sm' => 1,
            'lg' => 2,
            'xl' => 3,
        ])
        ->resourceCheckboxListColumns([
            'default' => 1,
            'sm' => 2,
        ]),
    PluginManager::make(),
])
```

- `FilamentShieldPlugin`: Implements role-based permissions with responsive layouts for different screen sizes
  - `gridColumns()`: Configures the responsive column layout for permissions grid
  - `sectionColumnSpan()`: Defines how many columns a section should span
  - `checkboxListColumns()`: Sets responsive columns for checkbox lists
  - `resourceCheckboxListColumns()`: Controls columns for resource permission checkboxes
- `PluginManager::make()`: Initializes the custom plugin manager (detailed below)

above panel's plugins array you can define own custom plugin, you can use any third party plugin here.

### Middleware Configuration

```php
->middleware([
    EncryptCookies::class,
    AddQueuedCookiesToResponse::class,
    StartSession::class,
    AuthenticateSession::class,
    ShareErrorsFromSession::class,
    VerifyCsrfToken::class,
    SubstituteBindings::class,
    DisableBladeIconComponents::class,
    DispatchServingFilamentEvent::class,
])
->authMiddleware([
    Authenticate::class,
])
```

- `middleware()`: Registers middleware that executes on all panel routes:
  - Cookie encryption and management
  - Session handling
  - CSRF protection
  - Route model binding
  - Filament-specific middleware
- `authMiddleware()`: Applies only to authenticated routes, ensuring users are properly logged in

## Customer Panel Provider

The Customer Panel Provider configures the frontend interface for customers, offering a streamlined experience with customer-specific authentication and features.

### Configuration Breakdown

### Basic Panel Settings

```php
->id('customer')
->path('/')
->homeUrl('/')
```

- `id('customer')`: Assigns a unique 'customer' identifier
- `path('/')`: Sets the panel at the root URL path
- `homeUrl('/')`: Defines the home page URL

### Authentication Features

```php
->login()
->authPasswordBroker('customers')
->passwordReset()
->registration()
->profile(isSimple: false)
```

- `login()`: Enables customer login functionality
- `authPasswordBroker('customers')`: Specifies the password broker for customer authentication
- `passwordReset()`: Adds password reset capabilities
- `registration()`: Enables self-registration for customers
- `profile(isSimple: false)`: Implements a full-featured profile management system

### Branding Configuration

```php
->favicon(asset('images/favicon.ico'))
->brandLogo(asset('images/logo-light.svg'))
->darkMode(false)
->brandLogoHeight('2rem')
```

- `favicon()`: Sets the browser tab icon
- `brandLogo()`: Defines the customer panel logo
- `darkMode(false)`: Disables dark mode for customers by default
- `brandLogoHeight()`: Controls the displayed logo height

### UI and Navigation

```php
->colors([
    'primary' => Color::Blue,
])
->topNavigation()
```

- `colors()`: Sets blue as the primary color theme
- `topNavigation()`: Implements a horizontal navigation bar at the top of the page

### Plugin Integration

```php
->plugins([
    PluginManager::make(),
])
```

- Initializes the custom plugin manager to load all registered plugins

### Middleware and Authentication

```php
->middleware([
    EncryptCookies::class,
    AddQueuedCookiesToResponse::class,
    StartSession::class,
    AuthenticateSession::class,
    ShareErrorsFromSession::class,
    VerifyCsrfToken::class,
    SubstituteBindings::class,
    DisableBladeIconComponents::class,
    DispatchServingFilamentEvent::class,
])
->authGuard('customer')
```

- Registers essential middleware similar to the admin panel
- `authGuard('customer')`: Specifies the 'customer' guard for authentication, ensuring customers only access customer-specific features

## Custom Plugin Manager

The Plugin Manager facilitates modular functionality by dynamically loading and registering plugins from across the application.

### Code Analysis

```php
namespace Webkul\Support;

use Filament\Contracts\Plugin;
use Filament\Panel;

use function Illuminate\Filesystem\join_paths;

class PluginManager implements Plugin
{
    public function getId(): string
    {
        return 'plugin-manager';
    }
```

- Implements Filament's `Plugin` contract
- `getId()`: Returns a unique identifier for the plugin manager

```php
    public function register(Panel $panel): void
    {
        $plugins = $this->getPlugins();

        foreach ($plugins as $modulePlugin) {
            $panel->plugin($modulePlugin::make());
        }
    }
```

- `register()`: Core method that:
  1. Retrieves all available plugins using `getPlugins()`
  2. Iterates through each plugin class
  3. Instantiates each plugin via its static `make()` method
  4. Registers each plugin with the panel

```php
    public function boot(Panel $panel): void {}

    public static function make(): static
    {
        return app(static::class);
    }

    public static function get(): static
    {
        /** @var static $plugin */
        $plugin = filament(app(static::class)->getId());

        return $plugin;
    }
```

- `boot()`: Empty implementation as no special bootstrapping is needed
- `make()`: Static factory method that returns a new instance from the service container
- `get()`: Retrieves the plugin instance that's registered with Filament

```php
    protected function getPlugins(): array
    {
        $plugins = require join_paths(base_path().'/bootstrap', 'plugins.php');

        $plugins = collect($plugins)
            ->unique()
            ->sort()
            ->values()
            ->toArray();

        return $plugins;
    }
}
```

- `getPlugins()`: Loads plugin definitions from a configuration file:
  1. Requires the `plugins.php` file from the bootstrap directory
  2. Converts the array to a collection
  3. Ensures entries are unique and sorted
  4. Returns the final array of plugin class names

### Plugin Registration Process

1. The system loads `plugins.php` from the bootstrap directory containing an array of plugin class names
2. The PluginManager removes duplicates and sorts the list
3. Each plugin is instantiated via its `make()` method
4. Filament registers each plugin with the panel

This allows modular functionality to be added to both admin and customer panels without modifying core code.

## Key Benefits

- **Separation of Concerns**: Admin and customer interfaces are cleanly separated
- **Modular Design**: The Plugin Manager enables extending functionality without core modifications
- **Security**: Different authentication guards ensure proper access control
- **Responsive Design**: Layout adjustments for different screen sizes
- **Enhanced UX**: Features like SPA mode and unsaved changes alerts improve user experience

## Integration Example

To add a new plugin to the system:

1. Create a plugin class implementing Filament's Plugin contract
2. Add the fully qualified class name to `bootstrap/plugins.php`
3. The PluginManager will automatically load and register it

This architecture enables seamless extension of the Aureus ERP system with new modules and functionality.
