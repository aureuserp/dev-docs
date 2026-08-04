# Overview

The **Custom Filament Dashboard** in AureusERP extends Filament's default dashboard capabilities with per-plugin dashboard pages. This setup enables **widget-based analytics**, **data filtering**, and a modular approach to managing dashboard elements.

Each plugin ships its own dashboard page that extends `Filament\Pages\Dashboard` and registers itself under the shared **Dashboard** navigation group (`Webkul\Support\Enums\NavigationGroup`), providing a scalable and extensible structure. Access to each dashboard is guarded through Filament Shield page permissions.

## Dashboard Implementation (`Dashboard.php`)

Located in: `Webkul\Project\Filament\Pages\Dashboard.php`

### **Namespace & Imports**

```php
namespace Webkul\Project\Filament\Pages;

use BackedEnum;
use BezhanSalleh\FilamentShield\Traits\HasPageShield;
use Filament\Forms\Components\Select;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Contracts\Support\Htmlable;
use Webkul\Partner\Models\Partner;
use Webkul\Project\Filament\Widgets\StatsOverviewWidget;
use Webkul\Project\Filament\Widgets\TaskByStageChart;
use Webkul\Project\Filament\Widgets\TaskByStateChart;
use Webkul\Project\Filament\Widgets\TopAssigneesWidget;
use Webkul\Project\Filament\Widgets\TopProjectsWidget;
use Webkul\Project\Models\Project;
use Webkul\Project\Models\Tag;
use Webkul\Security\Models\User;
use Webkul\Support\Enums\NavigationGroup;
use Webkul\Support\Filament\Forms\Components\DashboardDateRange;
```

### **Extending Filament’s Dashboard**

This class extends `Filament\Pages\Dashboard`, inheriting base functionalities while adding custom logic. The `HasFiltersForm` concern enables the filters form, and `HasPageShield` restricts access through a page permission.

```php
class Dashboard extends BaseDashboard
{
    use BaseDashboard\Concerns\HasFiltersForm;
    use HasPageShield;
}
```

### **Key Properties & Methods**

| Member                 | Type     | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `$routePath`           | `string` | Defines the dashboard’s route (e.g., `project`).                       |
| `getPagePermission()`  | `method` | Returns the Shield permission key (`page_project_dashboard`).          |
| `getNavigationGroup()` | `method` | Places the page in the shared `NavigationGroup::Dashboard` group.      |
| `getNavigationIcon()`  | `method` | Returns the navigation icon (`null` here; the group provides its own). |

```php
protected static string $routePath = 'project';

protected static function getPagePermission(): ?string
{
    return 'page_project_dashboard';
}

public static function getNavigationGroup(): string|\UnitEnum
{
    return NavigationGroup::Dashboard;
}

public static function getNavigationIcon(): string|BackedEnum|Htmlable|null
{
    return null;
}
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
public function filtersForm(Schema $schema): Schema
```

## **Available Filters**

| Filter              | Type         | Data Source                                                  |
| ------------------- | ------------ | ------------------------------------------------------------ |
| `selectedProjects`  | Multi-select | Fetches projects (`Project::pluck('name', 'id')`).           |
| `selectedAssignees` | Multi-select | Fetches users (`User::pluck('name', 'id')`).                 |
| `selectedTags`      | Multi-select | Fetches task tags (`Tag::pluck('name', 'id')`).              |
| `selectedPartners`  | Multi-select | Fetches partners/customers (`Partner::pluck('name', 'id')`). |
| `date_range`        | Date range   | `DashboardDateRange` picker; defaults to the current year.   |

### **Implementation**

```php
public function filtersForm(Schema $schema): Schema
{
    return $schema
        ->components([
            Section::make()
                ->columns([
                    'default' => 1,
                    'sm'      => 2,
                    'md'      => 3,
                    'xl'      => 6,
                ])
                ->schema([
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
                    ...DashboardDateRange::make(
                        __('projects::filament/pages/dashboard.filters-form.date-range'),
                    ),
                ])->columnSpanFull(),
        ]);
}
```

## **Date Range Filter (`DashboardDateRange`)**

Located in: `Webkul\Support\Filament\Forms\Components\DashboardDateRange`

Introduced in v1.5.0, this shared component provides a consistent date-range filter across all dashboards. It wraps a `DateRangePicker` and mirrors the picked range into two hidden filter keys (`startDate` and `endDate`) so widgets can keep reading separate start/end values.

```php
public static function make(
    string $label,
    string $startKey = 'startDate',
    string $endKey = 'endDate',
    string $name = 'date_range',
): array
```

Key behaviors:

- **Defaults to the current year** (`defaultThisYear()`); the hidden keys default to `now()->startOfYear()` and `now()->endOfYear()`.
- **Preset ranges**: Today, Yesterday, This Month, Last Month, This Quarter, Last Quarter, This Year, and Last Year via the `ranges()` method.
- **Live updates**: when the picker changes, `afterStateUpdated()` splits the range and updates the `startDate`/`endDate` keys, so dependent widgets refresh immediately.

Because `make()` returns an array of components (the picker plus two hidden fields), spread it into your schema:

```php
...DashboardDateRange::make(__('projects::filament/pages/dashboard.filters-form.date-range')),
```

## **Widgets Integration**

Widgets provide real-time analytics and insights on dashboard data.

```php
public function getWidgets(): array
{
    return [
        StatsOverviewWidget::class,
        TaskByStageChart::class,
        TaskByStateChart::class,
        TopAssigneesWidget::class,
        TopProjectsWidget::class,
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

## **Other Plugin Dashboards**

The same pattern is used by other plugins. For example, the Time Off plugin (dashboard widgets added in v1.5.0) registers its dashboard inside the `MyTime` cluster and splits widgets between the header and the body:

```php
namespace Webkul\TimeOff\Filament\Pages;

use BezhanSalleh\FilamentShield\Traits\HasPageShield;
use Filament\Pages\Dashboard as BaseDashboard;
use Webkul\TimeOff\Filament\Clusters\MyTime;
use Webkul\TimeOff\Filament\Widgets\CalendarWidget;
use Webkul\TimeOff\Filament\Widgets\MyTimeOffWidget;

class Dashboard extends BaseDashboard
{
    use HasPageShield;

    protected static string $routePath = 'time-off';

    protected static ?string $cluster = MyTime::class;

    public function getWidgets(): array
    {
        return [
            CalendarWidget::class,
        ];
    }

    public function getHeaderWidgets(): array
    {
        return [
            MyTimeOffWidget::make(),
        ];
    }
}
```

The Inventory plugin likewise ships dashboard widgets (`OperationTypeCardWidget`, `OperationTypeOverviewWidget` in `Webkul\Inventory\Filament\Widgets`) added in v1.5.0.

## More Information

For more details, refer to the [FilamentPHP Widgets Documentation](https://filamentphp.com/docs/5.x/widgets/overview).
