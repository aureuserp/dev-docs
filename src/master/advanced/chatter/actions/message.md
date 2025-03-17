# Overview

The `MessageAction` class is a custom FilamentPHP action designed for sending messages within the Aureus ERP system. It allows users to compose messages, attach files, and notify followers via email.

## Features

- Rich text message composition
- Optional subject field
- File attachments
- Automatic notification to followers
- Email integration for message delivery

## Usage

### 1. Defining the Action

The `MessageAction` is an extension of FilamentPHP's `Action` class. It provides a structured form for users to create messages with optional attachments.

### 2. Available Methods

#### `getDefaultName(): ?string`

Returns the default name of the action (`message.action`).

#### `setResource(string $resource): self`

Sets the resource associated with this action.

#### `setMessageMailView(?string $mailView): self`

Defines a custom email view for message notifications.

#### `getMessageMailView(): string`

Retrieves the currently set email view.

#### `getResource(): string`

Returns the associated resource name.

### 3. Form Fields

The message form consists of the following fields:

| Field Name  | Type       | Description                      |
| ----------- | ---------- | -------------------------------- |
| subject     | TextInput  | Optional subject for the message |
| body        | RichEditor | The main content of the message  |
| attachments | FileUpload | Multiple file attachments        |
| type        | Hidden     | Default value is `comment`       |

### 4. Actions

- **Add Subject**: Allows users to toggle the visibility of the subject field.
- **Submit Message**: Saves the message, attaches files, and sends notifications.

### 5. Notifications

Success and error messages are displayed using Filament’s notification system:

- **Success:** Message successfully sent
- **Error:** Error occurred while sending message

### 6. Email Notifications

Messages trigger an email notification to all followers of the record. The email includes:

- Message content
- Attachments
- A link to the record

### 7. Customization

#### Change Email View

To modify the email view, use:

```php
$messageAction->setMessageMailView('your.custom.view');
```

#### Customize Attachments

Attachments are stored in `messages-attachments` and can be retrieved using:

```php
$message->attachments;
```
