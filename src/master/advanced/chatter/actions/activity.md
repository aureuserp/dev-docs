# Overview

The `ActivityAction` class is a FilamentPHP action that allows users to create and manage activities within the Chatter module. It provides an interactive form for selecting activity plans, defining due dates, assigning users, and logging activity details.

## Methods

### `getDefaultName()`

- **Returns:** `?string`
- **Description:** Returns the default action name, `'activity.action'`.

### `setActivityPlans(mixed $activityPlans)`

- **Parameters:** `$activityPlans` (mixed) - List of available activity plans.
- **Returns:** `self`
- **Description:** Sets the available activity plans.

### `getActivityPlans()`

- **Returns:** `mixed`
- **Description:** Retrieves the set activity plans.

### `setUp()`

- **Returns:** `void`
- **Description:** Initializes the action by defining its UI components and logic.

#### Form Fields

- `activity_plan_id`: Select dropdown for choosing an activity plan.
- `date_deadline`: Date picker for selecting the deadline.
- `plan_summary`: Displays the summary of the selected activity plan.
- `activity_type_id`: Select dropdown for choosing the activity type.
- `assigned_to`: Select dropdown for assigning the activity.
- `summary`: Text input for entering a summary.
- `body`: Rich editor for adding activity details.
- `type`: Hidden field storing the type of entry.

#### Action Handling

- Retrieves the authenticated user.
- Processes selected activity plans or types.
- Adds messages related to the activity.
- Displays success or error notifications.

### `action(array $data, ?Model $record = null)`

- **Parameters:**
  - `$data`: Array containing form data.
  - `$record`: The model instance the action is applied to.
- **Returns:** `void`
- **Description:** Handles the action execution by:
  - Assigning default values if needed.
  - Processing activity plans and types.
  - Logging messages into the chatter system.
  - Sending notifications.

### `modalSubmitAction()`

- **Parameters:** `$action`
- **Returns:** `void`
- **Description:** Customizes the submit button in the modal with a label and icon.

## Usage

This action can be registered within Filament resources to provide users the ability to create and manage activities directly from the UI.

Example registration:

```php
use Webkul\Chatter\Filament\Actions\Chatter\ActivityAction;

ActivityAction::make()
    ->setActivityPlans($availablePlans)
    ->modalIcon('heroicon-o-clock')
    ->label('Schedule Activity');
```
