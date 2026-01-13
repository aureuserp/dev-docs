# Overview

The **Aureus ERP** Filament plugin provides robust project management capabilities integrated seamlessly into your Aureus ERP ecosystem. Built on **FilamentPHP**.

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
|   |   |   |   |   +-- Pages                       # Custom Filament pages
|   |   |   |   |   |   +-- Dashboard.php
|   |   |   |   |   |   +-- BlogList.php
|   |   |   |   |   |   +-- BlogStats.php
|   |   |   |   |   +-- Resources                   # Filament resources
|   |   |   |   |   |   +-- BlogResource.php
|   |   |   |   |   |   +-- CategoryResource.php
|   |   |   |   |   +-- Widgets                     # Dashboard widgets
|   |   |   |   |   |   +-- BlogsOverviewWidget.php
|   |   |   |   |   |   +-- RecentBlogsWidget.php
|   |   |   |   |   +-- Clusters                    # Feature clusters
|   |   |   |   +-- Models                          # Eloquent models
|   |   |   |   +-- Providers                       # Service providers & Plugins
|   |   |   |   |   |   +-- BlogPlugin.php          # Blogs Plugin
|   |   |   |   |   |   +-- BlogServiceProvider.php # Service Provider
```

## What are Filament Pages?

[Filament Pages](https://filamentphp.com/docs/3.x/panels/pages) are custom UI components that provide full-page interfaces within your admin panel.

### Key Page Features in FilamentPHP

- **Custom Layouts**: Design tailored layouts for specific functionality
- **Form Components**: Utilize over 60+ form components for data collection
- **Data Management**: Display and interact with data using tables, charts, and more
- **Action Management**: Create multi-step processes with modal forms and notifications
- **Widget Support**: Add widgets to pages for enhanced functionality

## Filament Pages Examples

### Dashboard Page

The Dashboard provides an overview of blog statistics with multiple filtering options and widgets.

#### **File:** `Filament/Pages/Dashboard.php`

```php
namespace Webkul\Blogs\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Form;
use Illuminate\Support\Carbon;
use Webkul\Blogs\Models\Category;

class Dashboard extends BaseDashboard
{
    protected static ?string $title = 'Blogs Dashboard';

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?int $navigationSort = 1;

    public function filtersForm(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('category')
                    ->label('Category')
                    ->options(Category::pluck('name', 'id'))
                    ->placeholder('All Categories')
                    ->live(),

                DatePicker::make('date_range')
                    ->label('Date Range')
                    ->default(Carbon::now()->subDays(30))
                    ->range()
                    ->live(),

                Select::make('status')
                    ->label('Status')
                    ->options([
                        'published' => 'Published',
                        'draft' => 'Draft',
                        'scheduled' => 'Scheduled',
                    ])
                    ->placeholder('All Statuses')
                    ->live(),
            ]);
    }

    public function getWidgets(): array
    {
        return [
            Widgets\BlogsOverviewWidget::class,
            Widgets\RecentBlogsWidget::class,
            Widgets\TopAuthorsWidget::class,
            Widgets\CategoryDistributionWidget::class,
        ];
    }
}
```

## BlogsPlugin Registration System

The BlogsPlugin class serves as the central registration point for all Filament components in the Aureus ERP system.

### Plugin Registration

```php
<?php

namespace Webkul\Blogs;

use Filament\Contracts\Plugin;
use Filament\Navigation\NavigationItem;
use Filament\Panel;
use Webkul\Blogs\Filament\Pages\Dashboard;
use Webkul\PluginManager\Package;

class BlogsPlugin implements Plugin
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
                        in: __DIR__.'/Filament/Resources',
                        for: 'Webkul\Blogs\Filament\Resources'
                    )
                    ->discoverPages(
                        in: __DIR__.'/Filament/Pages',
                        for: 'Webkul\Blogs\Filament\Pages'
                    )
                    ->discoverClusters(
                        in: __DIR__.'/Filament/Clusters',
                        for: 'Webkul\Blogs\Filament\Clusters'
                    )
                    ->discoverWidgets(
                        in: __DIR__.'/Filament/Widgets',
                        for: 'Webkul\Blogs\Filament\Widgets'
                    );
            });
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
```
