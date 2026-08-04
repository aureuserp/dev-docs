# Overview

The `ActivityAction` class is a FilamentPHP action that allows users to create and manage activities within the Chatter module. It provides an interactive form for selecting activity plans, defining due dates, assigning users, and logging activity details.

## Methods

### `getDefaultName()`

- **Returns:** `?string`
- **Description:** Returns the default action name, `'activity.action'`.

### `setActivityPlans(mixed $activityPlans)`

- **Parameters:** `$activityPlans` (mixed) - List of available activity plans (collection or array).
- **Returns:** `self`
- **Description:** Sets the available activity plans.

### `getActivityPlans()`

- **Returns:** `Collection`
- **Description:** Retrieves the set activity plans as a collection. When no plans were set explicitly, it falls back to the record's `activityPlans()` method (provided by the `HasChatter` trait), and returns an empty collection otherwise.

### `setUp()`

- **Returns:** `void`
- **Description:** Initializes the action by defining its UI components and logic.

#### Form Fields

- `activity_plan_id`: Select dropdown for choosing an activity plan (hidden when no plans are available).
- `date_deadline`: Date picker for selecting the deadline (shown only when no plan is selected, and hidden for activity types in the `meeting` category; a separate plan-date picker appears when a plan is selected).
- `plan_summary`: Displays the summary of the selected activity plan's templates.
- `activity_type_id`: Select dropdown for choosing the activity type (visible when no plan is selected).
- `assigned_to`: Select dropdown for assigning the activity to a user.
- `summary`: Text input for entering a summary.
- `body`: Rich editor for adding activity details, with `@` user mentions.
- `type`: Hidden field storing the type of entry (default `activity`).

#### Action Handling

- Retrieves the authenticated user.
- Processes selected activity plans or types.
- Adds messages related to the activity.
- Displays success or error notifications.
- Dispatches a `chatter.refresh` Livewire event so the chatter panel reloads.

### `action(array $data, ?Model $record = null)`

- **Parameters:**
  - `$data`: Array containing form data.
  - `$record`: The model instance the action is applied to.
- **Returns:** `void`
- **Description:** Handles the action execution by:
  - Defaulting `assigned_to` to the authenticated user when not selected.
  - When an activity plan is selected, creating one activity message per plan template and a summary comment describing the started plan.
  - Otherwise, logging a single activity message into the chatter system.
  - Sending notifications. The assigned user also receives a Filament database notification once the activity is created.

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
