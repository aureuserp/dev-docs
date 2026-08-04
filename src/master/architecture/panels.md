# Admin Panel Provider

The Admin [Panel](https://filamentphp.com/docs/5.x/panel-configuration) Provider configures the administrative backend interface using FilamentPHP. It establishes authentication mechanisms, visual components, middleware configurations, and plugin integrations for administrative users. It is located at `app/Providers/Filament/AdminPanelProvider.php`.

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
->multiFactorAuthentication([
    AppAuthentication::make()
        ->recoverable(),
])
```

- `login()`: Enables the login page for administrators
- `passwordReset()`: Adds password reset functionality
- `emailVerification()`: Implements email verification for new admin accounts
- `profile()`: Provides user profile management capabilities
- `multiFactorAuthentication()`: Enables app-based two-factor authentication with recovery codes, using Filament's `AppAuthentication` (`Filament\Auth\MultiFactor\App\AppAuthentication`)

### Branding Configuration

```php
->favicon(asset('images/favicon.ico'))
->brandLogo(asset('images/logo.svg'))
->brandLogoHeight('2rem')
```

- `favicon()`: Sets the browser tab icon
- `brandLogo()`: Defines the default logo
- `brandLogoHeight()`: Controls the displayed logo height

These are only the defaults. The `ApplyBrandSettings` middleware (`App\Http\Middleware\ApplyBrandSettings`) overrides the logo, favicon, and colors at runtime with the values configured in the **Branding** settings page, which are stored via the `BrandSettings` class (`Webkul\Support\Settings\BrandSettings`).

### User Experience Enhancements

```php
->colors([
    'primary' => Color::Blue,
])
->unsavedChangesAlerts()
->topNavigation()
->maxContentWidth(Width::Full)
->databaseNotifications()
->databaseNotificationsPolling('30s')
->userMenuItems([
    'profile' => Action::make('profile')
        ->label(fn () => Auth::user()?->name)
        ->url(fn (): string => Profile::getUrl()),
])
```

- `colors()`: Defines the color scheme with blue as the primary color
- `unsavedChangesAlerts()`: Warns users when trying to navigate away with unsaved changes
- `topNavigation()`: Uses a horizontal navigation bar at the top of the page instead of a sidebar
- `maxContentWidth()`: Sets content width to full screen using the `Width` enum (`Filament\Support\Enums\Width`)
- `databaseNotifications()`: Enables Filament database notifications (used by Chatter and other plugins), polled every 30 seconds
- `userMenuItems()`: Adds a custom profile entry to the user menu that links to the Support plugin's `Profile` page (`Webkul\Support\Filament\Pages\Profile`)

The panel also uses a custom global search provider:

```php
->globalSearch(provider: GlobalSearchProvider::class)
```

where `GlobalSearchProvider` is `Webkul\Support\GlobalSearchProvider`. In addition, the Support plugin injects two UI components into the admin panel via render hooks: a **company switcher** (rendered before the global search, listing the companies the user is allowed to act in) and the **quick navigation** command palette (opened with `Ctrl+K` / `Cmd+K`).

## How Menus Are Registered

Menus are registered through **Filament Resources, Pages, Clusters, and Widgets** provided by each plugin.

When a plugin is loaded:

1. The plugin's service provider attaches its Filament plugin class to the panel
2. The plugin class discovers:
   * Resources
   * Pages
   * Clusters
   * Widgets
3. Each of these defines its own navigation configuration

Example inside a Cluster:

```php
use Filament\Clusters\Cluster;
use Webkul\Support\Enums\NavigationGroup;

class Orders extends Cluster
{
    protected static ?string $slug = 'sale/orders';

    public static function getNavigationLabel(): string
    {
        return __('sales::filament/clusters/orders.navigation.title');
    }

    public static function getNavigationGroup(): string|\UnitEnum
    {
        return NavigationGroup::Sale;
    }
}
```

This ensures:

* The menu appears in the correct group
* The icon is consistent
* The menu order is predictable (via `$navigationSort`)

## Navigation Groups (High-Level Menu Sections)

Navigation groups are **predefined at the panel level** in the `AdminPanelProvider`, generated from the `NavigationGroup` enum (`Webkul\Support\Enums\NavigationGroup`):

```php
use Filament\Navigation\NavigationGroup as FilamentNavigationGroup;
use Webkul\Support\Enums\NavigationGroup;

->navigationGroups(
    collect(NavigationGroup::cases())->mapWithKeys(
        fn (NavigationGroup $case) => [
            $case->name => FilamentNavigationGroup::make()
                ->label(fn () => $case->getLabel())
                ->icon(fn () => $case->getIcon()),
        ]
    )->all()
)
```

The enum defines one case per functional area — `Dashboard`, `Contact`, `Sale`, `Purchase`, `Maintenance`, `Manufacturing`, `Inventory`, `Invoice`, `Accounting`, `Project`, `Employee`, `TimeOff`, `Recruitment`, `Website`, `Barcode`, `Plugin`, `Setting`, and `Help` — along with a translated label and an icon for each.

These groups act as **containers**.
Plugins simply return the enum case from `getNavigationGroup()` when registering menus.

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
])
```

- `FilamentShieldPlugin`: Implements role-based permissions with responsive layouts for different screen sizes
  - `gridColumns()`: Configures the responsive column layout for permissions grid
  - `sectionColumnSpan()`: Defines how many columns a section should span
  - `checkboxListColumns()`: Sets responsive columns for checkbox lists
  - `resourceCheckboxListColumns()`: Controls columns for resource permission checkboxes

Note that AureusERP plugins are **not** listed here. Each plugin registers itself with every panel through its own service provider (see [Custom Plugin Manager](#custom-plugin-manager) below). You can still use the `plugins()` array to add any third-party Filament plugin.

### Middleware Configuration

```php
->middleware([
    EncryptCookies::class,
    AddQueuedCookiesToResponse::class,
    StartSession::class,
    AuthenticateSession::class,
    ShareErrorsFromSession::class,
    PreventRequestForgery::class,
    SubstituteBindings::class,
    DisableBladeIconComponents::class,
    DispatchServingFilamentEvent::class,
    SetLocale::class,
    ApplyBrandSettings::class,
])
->authMiddleware([
    Authenticate::class,
])
```

- `middleware()`: Registers middleware that executes on all panel routes:
  - Cookie encryption and management
  - Session handling
  - CSRF protection (`PreventRequestForgery`)
  - Route model binding
  - Filament-specific middleware
  - `SetLocale`: Applies the user's preferred locale
  - `ApplyBrandSettings`: Applies the branding configured in settings (logo, favicon, colors)
- `authMiddleware()`: Applies only to authenticated routes, ensuring users are properly logged in

## Customer Panel Provider

The Customer Panel Provider (`app/Providers/Filament/CustomerPanelProvider.php`) configures the frontend interface for customers, offering a streamlined experience with customer-specific authentication and features.

### Configuration Breakdown

### Basic Panel Settings

```php
->id('customer')
->path('/')
->homeUrl(url('/'))
```

- `id('customer')`: Assigns a unique 'customer' identifier
- `path('/')`: Sets the panel at the root URL path
- `homeUrl(url('/'))`: Defines the home page URL

### Authentication Features

```php
->authPasswordBroker('customers')
->profile(isSimple: false)
```

- `authPasswordBroker('customers')`: Specifies the password broker for customer authentication
- `profile(isSimple: false)`: Implements a full-featured profile management system

The login, registration, and password reset pages themselves are registered by the **Website plugin**, which provides custom page classes for the customer panel:

```php
->login(Login::class)
->registration(Register::class)
->passwordReset(RequestPasswordReset::class, ResetPassword::class)
```

### Branding Configuration

```php
->favicon(asset('images/favicon.ico'))
->brandLogo(asset('images/logo.svg'))
->darkMode(false)
->brandLogoHeight('2rem')
```

- `favicon()`: Sets the browser tab icon
- `brandLogo()`: Defines the customer panel logo
- `darkMode(false)`: Disables dark mode for customers by default
- `brandLogoHeight()`: Controls the displayed logo height

As with the admin panel, the `ApplyBrandSettings` middleware overrides these defaults with the branding configured in settings.

### UI and Navigation

```php
->colors([
    'primary' => Color::Blue,
])
->topNavigation()
->renderHook(
    PanelsRenderHook::GLOBAL_SEARCH_END,
    fn () => view('filament.components.language-switcher'),
)
```

- `colors()`: Sets blue as the primary color theme
- `topNavigation()`: Implements a horizontal navigation bar at the top of the page
- `renderHook()`: Injects a language switcher next to the global search

### Plugin Integration

The customer panel does not declare any plugins itself. Every AureusERP plugin attaches itself to all panels through its service provider, and each plugin class decides per panel which resources and pages to register (for example, the Website and Blogs plugins register customer-facing resources only when the panel id is `customer`).

### Middleware and Authentication

```php
->middleware([
    EncryptCookies::class,
    AddQueuedCookiesToResponse::class,
    StartSession::class,
    AuthenticateSession::class,
    ShareErrorsFromSession::class,
    PreventRequestForgery::class,
    SubstituteBindings::class,
    DisableBladeIconComponents::class,
    DispatchServingFilamentEvent::class,
    SetLocale::class,
    ApplyBrandSettings::class,
])
->authGuard('customer')
```

- Registers essential middleware similar to the admin panel
- `authGuard('customer')`: Specifies the 'customer' guard for authentication, ensuring customers only access customer-specific features

## Custom Plugin Manager

Plugin registration is handled by the **Plugin Manager** plugin (`plugins/webkul/plugin-manager`, namespace `Webkul\PluginManager`). Instead of a central list of plugin classes, every plugin registers itself with Filament through its own service provider, and the Plugin Manager tracks which plugins are installed in the `plugins` database table.

### Code Analysis

Every plugin's service provider extends `Webkul\PluginManager\PackageServiceProvider` and attaches the plugin's Filament plugin class to every panel:

```php
namespace Webkul\Blog;

use Filament\Panel;
use Webkul\PluginManager\Console\Commands\InstallCommand;
use Webkul\PluginManager\Console\Commands\UninstallCommand;
use Webkul\PluginManager\Package;
use Webkul\PluginManager\PackageServiceProvider;

class BlogServiceProvider extends PackageServiceProvider
{
    public static string $name = 'blogs';

    public function configureCustomPackage(Package $package): void
    {
        $package->name(static::$name)
            ->hasViews()
            ->hasTranslations()
            ->hasMigrations([
                '2025_03_06_093011_create_blogs_categories_table',
            ])
            ->runsMigrations()
            ->hasDependencies([
                'website',
            ])
            ->hasInstallCommand(function (InstallCommand $command) {
                $command
                    ->installDependencies()
                    ->runsMigrations();
            })
            ->hasUninstallCommand(function (UninstallCommand $command) {});
    }

    public function packageRegistered(): void
    {
        Panel::configureUsing(function (Panel $panel): void {
            $panel->plugin(BlogPlugin::make());
        });
    }
}
```

- `configureCustomPackage()`: Declares the package name, migrations, settings, seeders, dependencies, and install/uninstall commands via the `Package` fluent API
- `packageRegistered()`: Uses `Panel::configureUsing()` to attach the plugin's Filament plugin class to **every** panel

The plugin class itself implements Filament's `Plugin` contract:

```php
namespace Webkul\Blog;

use Filament\Contracts\Plugin;
use Filament\Panel;
use Webkul\PluginManager\Package;

class BlogPlugin implements Plugin
{
    public function getId(): string
    {
        return 'blogs';
    }

    public static function make(): static
    {
        return app(static::class);
    }

    public function register(Panel $panel): void
    {
        if (! Package::isPluginInstalled($this->getId())) {
            return;
        }

        $panel
            ->when($panel->getId() == 'admin', function (Panel $panel) {
                $panel
                    ->discoverResources(
                        in: __DIR__.'/Filament/Admin/Resources',
                        for: 'Webkul\\Blog\\Filament\\Admin\\Resources'
                    )
                    ->discoverPages(
                        in: __DIR__.'/Filament/Admin/Pages',
                        for: 'Webkul\\Blog\\Filament\\Admin\\Pages'
                    );
            });
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
```

- `getId()`: Returns a unique identifier for the plugin
- `make()`: Static factory method that returns an instance from the service container
- `register()`: First checks `Package::isPluginInstalled()` — resources and pages are only registered when the plugin is marked installed in the `plugins` table — then discovers Resources, Pages, Clusters, and Widgets for the appropriate panel
- `boot()`: Hook for additional bootstrapping once the panel is booted

### Plugin Registration Process

1. Each plugin's service provider is registered in `bootstrap/providers.php`
2. During registration, each service provider calls `Panel::configureUsing()` to attach its Filament plugin class to every panel
3. When a panel is configured, each plugin's `register()` method runs and checks the `plugins` table (via `Package::isPluginInstalled()`) to decide whether to register its resources, pages, clusters, and widgets
4. Installation state is managed through the `<plugin-name>:install` / `<plugin-name>:uninstall` Artisan commands, or the **Plugins** resource in the admin panel provided by the Plugin Manager

This allows modular functionality to be added to both admin and customer panels without modifying core code.

## Key Benefits

- **Separation of Concerns**: Admin and customer interfaces are cleanly separated
- **Modular Design**: The Plugin Manager enables extending functionality without core modifications
- **Security**: Different authentication guards ensure proper access control, with optional two-factor authentication for admins
- **Responsive Design**: Layout adjustments for different screen sizes
- **Enhanced UX**: Features like the quick navigation command palette, database notifications, company switcher, and unsaved changes alerts improve user experience

## Integration Example

To add a new plugin to the system:

1. Create a plugin class implementing Filament's `Plugin` contract and a service provider extending `Webkul\PluginManager\PackageServiceProvider`
2. Attach the plugin to panels with `Panel::configureUsing()` in the service provider's `packageRegistered()` method
3. Register the service provider in `bootstrap/providers.php`
4. Install the plugin with `php artisan <plugin-name>:install`

This architecture enables seamless extension of the AureusERP system with new modules and functionality.
