# Overview

The `FollowerAction` class is a Filament action designed for adding followers to a record within the **Webkul Chatter** module. This action allows users to select multiple partners as followers, optionally send them notifications, and include a note in the notification email.

## **Key Features**

1. **Adding Followers:** Users can select multiple partners to add as followers to a record.
2. **Email Notification:** Optionally notify newly added followers with a customizable email template.
3. **Rich Editor for Notes:** If notifications are enabled, users can add a note that will be included in the email.
4. **Filament Integration:** The action integrates smoothly with Filament’s UI components like **Select**, **Toggle**, and **RichEditor**.
5. **Customizable Email View:** The email template for notifications can be set dynamically.
6. **Dynamic Resource URLs:** Generates URLs for viewing the record within Filament.

## **Class Properties**

### 1. `$mailView`

- Stores the view file path for the follower notification email.
- Default: `'chatter::mail.follower-mail'`

### 2. `$resource`

- Stores the related resource class (e.g., TaskResource, ProjectResource).
- Used to generate a link to the record in Filament.

## **Methods**

### **1. `setResource(string $resource): self`**

- Sets the associated Filament resource.
- Used for generating URLs in emails.

### **2. `setFollowerMailView(?string $mailView): self`**

- Updates the email template path dynamically.
- Ensures the mail view is not empty before setting.

### **3. `getFollowerMailView(): string`**

- Returns the configured email view file.

### **4. `getResource(): string`**

- Returns the resource class associated with the action.

## **Filament Action Setup (`setUp` Method)**

The `setUp` method defines how this action behaves in Filament.

### **UI and Behavior Configurations**

- **Icon & Tooltip:** Uses `heroicon-s-user` for the button and `heroicon-s-user-plus` for the modal.
- **Badge:** Displays the count of current followers.
- **Modal Size:** Uses `MaxWidth::TwoExtraLarge` for a large modal.
- **Slide Over Disabled:** Uses a standard modal instead.

### **Form Schema**

- **`Select::make('partners')`**
  - Allows users to select multiple partners to follow the record.
  - Uses a relationship-based selection (`followable` → `name`).
  - Supports search and preloading.
- **`Toggle::make('notify')`**
  - Toggles whether the followers should be notified via email.
- **`RichEditor::make('note')`**
  - Only visible if `notify` is enabled.
  - Supports basic text formatting and attachments.

### **Footer Content**

- Uses a Blade view (`chatter::filament.actions.follower-action`) to customize the modal footer.

## **Handling the Action**

When the action is triggered, the following happens:

1. Retrieves the selected partners from the form.
2. Iterates through each partner:
   - Adds them as a follower.
   - Sends an email if the `notify` toggle is enabled.
3. Displays a **success notification** for each successfully added follower.
4. Catches any errors and logs them, displaying an **error notification** if needed.

## **Email Notification Handling**

### **1. `notifyFollower(Model $record, Partner $partner, array $data)`**

- Uses the `EmailService` to send an email using the configured mail view.
- Passes the `preparePayload` method’s output as the email data.

### **2. `prepareResourceUrl(mixed $record): string`**

- Generates a URL to view the record in Filament.

### **3. `preparePayload(Model $record, Partner $partner, $data): array`**

- Builds the email payload with:
  - **Record URL**
  - **Record Name**
  - **Model Name**
  - **Subject (Localized)**
  - **Note Content**
  - **Recipient’s Email & Name**
