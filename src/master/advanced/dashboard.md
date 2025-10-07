# Overview

The **Custom Filament Dashboard** in Aureus ERP extends Filament's default dashboard capabilities by integrating with a custom cluster (`DashboardCluster`). This setup enables **widget-based analytics**, **data filtering**, and a modular approach to managing dashboard elements.

Unlike the default Filament dashboard, this implementation utilizes **Webkul\Support\Filament\Clusters\Dashboard** for **centralized widget management**, providing a scalable and extensible structure.

## Dashboard Implementation (`Dashboard.php`)

Located in: `Webkul\Project\Filament\Pages\Dashboard.php`

### **Namespace & Imports**

```php
namespace Webkul\Project\Filament\Pages;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Pages\Dashboard as BaseDashboard;
use Webkul\Partner\Models\Partner;
use Webkul\Project\Filament\Widgets;
use Webkul\Project\Models\Project;
use Webkul\Project\Models\Tag;
use Webkul\Security\Models\User;
use Webkul\Support\Filament\Clusters\Dashboard as DashboardCluster;
```

### **Extending Filament’s Dashboard**

This class extends `Filament\Pages\Dashboard`, inheriting base functionalities while adding custom logic.

```php
class Dashboard extends BaseDashboard
{
    use BaseDashboard\Concerns\HasFiltersForm;
}
```

### **Key Properties**

| Property          | Type     | Description                                       |
| ----------------- | -------- | ------------------------------------------------- |
| `$routePath`      | `string` | Defines the dashboard’s route (e.g., `project`).  |
| `$navigationIcon` | `string` | Sets the dashboard’s icon (`heroicon-o-folder`).  |
| `$cluster`        | `class`  | Associates the dashboard with `DashboardCluster`. |

```php
protected static string $routePath = 'project';
protected static ?string $navigationIcon = 'heroicon-o-folder';
protected static ?string $cluster = DashboardCluster::class;
```

### **Navigation Label**

Defines the label used for navigation.

```php
public static function getNavigationLabel(): string
{
    return __('projects::filament/pages/dashboard.navigation.title');
}
```

## **Filters Form (Dynamic Data Filtering)**

## **Overview**

The `filtersForm()` method provides UI elements for filtering dashboard data dynamically.

```php
public function filtersForm(Form $form): Form
```

## **Available Filters**

| Filter              | Type         | Data Source                                                  |
| ------------------- | ------------ | ------------------------------------------------------------ |
| `selectedProjects`  | Multi-select | Fetches projects (`Project::pluck('name', 'id')`).           |
| `selectedAssignees` | Multi-select | Fetches users (`User::pluck('name', 'id')`).                 |
| `selectedTags`      | Multi-select | Fetches task tags (`Tag::pluck('name', 'id')`).              |
| `selectedPartners`  | Multi-select | Fetches partners/customers (`Partner::pluck('name', 'id')`). |
| `startDate`         | Date picker  | Restricts dates to past values.                              |
| `endDate`           | Date picker  | Restricts dates to future values.                            |

### **Implementation**

```php
return $form->schema([
    Section::make()->schema([
        Select::make('selectedProjects')
            ->label(__('projects::filament/pages/dashboard.filters-form.project'))
            ->multiple()
            ->searchable()
            ->preload()
            ->options(fn () => Project::pluck('name', 'id'))
            ->reactive(),
        Select::make('selectedAssignees')
            ->label(__('projects::filament/pages/dashboard.filters-form.assignees'))
            ->multiple()
            ->searchable()
            ->preload()
            ->options(fn () => User::pluck('name', 'id'))
            ->reactive(),
        DatePicker::make('startDate')
            ->label(__('projects::filament/pages/dashboard.filters-form.start-date'))
            ->maxDate(fn (Get $get) => $get('endDate') ?: now())
            ->default(now()->subMonth()->format('Y-m-d')),
    ])
]);
```

## **Widgets Integration**

Widgets provide real-time analytics and insights on dashboard data.

```php
public function getWidgets(): array
{
    return [
        Widgets\StatsOverviewWidget::class,
        Widgets\TaskByStageChart::class,
        Widgets\TaskByStateChart::class,
        Widgets\TopAssigneesWidget::class,
        Widgets\TopProjectsWidget::class,
    ];
}
```

| Widget                | Purpose                                  |
| --------------------- | ---------------------------------------- |
| `StatsOverviewWidget` | Displays key project statistics.         |
| `TaskByStageChart`    | Visualizes task progress by stages.      |
| `TaskByStateChart`    | Shows task distribution based on states. |
| `TopAssigneesWidget`  | Highlights users with the most tasks.    |
| `TopProjectsWidget`   | Displays the most active projects.       |

## Dashboard Cluster (`DashboardCluster.php`)

## **Class Overview**

Located in: `Webkul\Support\Filament\Clusters\Dashboard.php`

## **Namespace & Imports**

```php
namespace Webkul\Support\Filament\Clusters;

use Filament\Clusters\Cluster;
use Filament\Facades\Filament;
use Filament\Widgets\Widget;
```

### **Extending Cluster**

```php
class Dashboard extends Cluster
```

### **Key Properties**

| Property          | Type     | Description                                                       |
| ----------------- | -------- | ----------------------------------------------------------------- |
| `$slug`           | `string` | Sets the base slug (`/`).                                         |
| `$routePath`      | `string` | Defines the default route.                                        |
| `$navigationIcon` | `string` | Sets the dashboard’s icon (`heroicon-o-squares-2x2`).             |
| `$navigationSort` | `int`    | Determines navigation order (`0`).                                |
| `$view`           | `string` | Specifies the view template (`filament-panels::pages.dashboard`). |

### **Widget Management**

#### **Retrieve Registered Widgets**

```php
public function getWidgets(): array
{
    return Filament::getWidgets();
}
```

#### **Filter Visible Widgets**

```php
public function getVisibleWidgets(): array
{
    return $this->filterVisibleWidgets($this->getWidgets());
}
```

#### **Set Widget Columns**

```php
public function getColumns(): int|string|array
{
    return 2;
}
```

## More Information

For more details, refer to the [FilamentPHP Dashboard Documentation](https://filamentphp.com/docs/4.x/panels/dashboard).
