# Overview

The **AureusERP** Filament plugin provides robust project management capabilities integrated seamlessly into your AureusERP ecosystem. Built on **FilamentPHP**.

## Directory Structure

```
+-- plugins
|   +-- webkul
|   |   +-- blogs
|   |   |   +-- database
|   |   |   |   +-- factories                       # Model factories for testing
|   |   |   |   +-- migrations                      # Database schema migrations
|   |   |   |   +-- seeders                         # Database seeders
|   |   |   +-- resources
|   |   |   +-- src
|   |   |   |   +-- Filament                        # Filament components
|   |   |   |   |   +-- Admin                       # Admin panel components
|   |   |   |   |   |   +-- Pages                   # Custom Filament pages
|   |   |   |   |   |   |   +-- Dashboard.php
|   |   |   |   |   |   +-- Resources               # Filament resources
|   |   |   |   |   |   |   +-- PostResource.php
|   |   |   |   |   |   +-- Widgets                 # Dashboard widgets
|   |   |   |   |   |   +-- Clusters                # Feature clusters
|   |   |   |   |   +-- Customer                    # Customer panel components
|   |   |   |   |   |   +-- Pages
|   |   |   |   |   |   +-- Resources
|   |   |   |   +-- Models                          # Eloquent models
|   |   |   |   +-- BlogPlugin.php                  # Blog Plugin
|   |   |   |   +-- BlogServiceProvider.php         # Service Provider
```

## What are Filament Pages?

[Filament Pages](https://filamentphp.com/docs/5.x/navigation/custom-pages) are custom UI components that provide full-page interfaces within your admin panel.

### Key Page Features in FilamentPHP

- **Custom Layouts**: Design tailored layouts for specific functionality
- **Form Components**: Utilize over 60+ form components for data collection
- **Data Management**: Display and interact with data using tables, charts, and more
- **Action Management**: Create multi-step processes with modal forms and notifications
- **Widget Support**: Add widgets to pages for enhanced functionality

## Filament Pages Examples

### Dashboard Page

The following illustrative example shows a dashboard with multiple filtering options and widgets, following the pattern of the real `Dashboard` page in the projects plugin (the blogs plugin itself does not ship a dashboard).

#### **File:** `Filament/Admin/Pages/Dashboard.php`

```php
namespace Webkul\Blog\Filament\Admin\Pages;

use BackedEnum;
use Filament\Forms\Components\Select;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Schemas\Schema;
use UnitEnum;
use Webkul\Blog\Filament\Admin\Widgets\BlogsOverviewWidget;
use Webkul\Blog\Filament\Admin\Widgets\RecentBlogsWidget;
use Webkul\Blog\Models\Category;
use Webkul\Support\Enums\NavigationGroup;

class Dashboard extends BaseDashboard
{
    use BaseDashboard\Concerns\HasFiltersForm;

    protected static string $routePath = 'blog';

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-document-text';

    protected static ?int $navigationSort = 1;

    public static function getNavigationLabel(): string
    {
        return __('Blog Dashboard');
    }

    public static function getNavigationGroup(): string|UnitEnum
    {
        return NavigationGroup::Dashboard;
    }

    public function filtersForm(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('selectedCategories')
                    ->label(__('Category'))
                    ->multiple()
                    ->searchable()
                    ->preload()
                    ->options(fn () => Category::pluck('name', 'id'))
                    ->reactive(),

                Select::make('status')
                    ->label(__('Status'))
                    ->options([
                        'published' => __('Published'),
                        'draft'     => __('Draft'),
                    ])
                    ->placeholder(__('All Statuses'))
                    ->reactive(),
            ]);
    }

    public function getWidgets(): array
    {
        return [
            BlogsOverviewWidget::class,
            RecentBlogsWidget::class,
        ];
    }
}
```

::: info Filament 5 API
In Filament 5, page forms are built with `Filament\Schemas\Schema` (`->components([...])`) instead of the older `Filament\Forms\Form` (`->schema([...])`), and `$navigationIcon` is typed `string|BackedEnum|null`. The dashboard filters form requires the `HasFiltersForm` concern.
:::

## BlogPlugin Registration System

The BlogPlugin class serves as the central registration point for all Filament components in the AureusERP system. Each plugin registers its components per panel (for example, `admin` and `customer`), and skips registration entirely when the plugin is not installed.

### Plugin Registration

```php
<?php

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
                    )
                    ->discoverClusters(
                        in: __DIR__.'/Filament/Admin/Clusters',
                        for: 'Webkul\\Blog\\Filament\\Admin\\Clusters'
                    )
                    ->discoverWidgets(
                        in: __DIR__.'/Filament/Admin/Widgets',
                        for: 'Webkul\\Blog\\Filament\\Admin\\Widgets'
                    );
            })
            ->when($panel->getId() == 'customer', function (Panel $panel) {
                $panel
                    ->discoverResources(
                        in: __DIR__.'/Filament/Customer/Resources',
                        for: 'Webkul\\Blog\\Filament\\Customer\\Resources'
                    )
                    ->discoverPages(
                        in: __DIR__.'/Filament/Customer/Pages',
                        for: 'Webkul\\Blog\\Filament\\Customer\\Pages'
                    );
            });
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
```
