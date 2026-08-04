# Overview

The `MessageAction` class is a custom FilamentPHP action designed for sending messages within the AureusERP system. It allows users to compose messages, mention other users, attach files, and notify followers.

## Features

- Rich text message composition with `@` user mentions
- Optional subject field
- File attachments
- Automatic notification to followers (database and email)

## Usage

### 1. Defining the Action

The `MessageAction` is an extension of FilamentPHP's `Action` class. It provides a structured form for users to create messages with optional attachments.

```php
use Webkul\Chatter\Filament\Actions\Chatter\MessageAction;

MessageAction::make();
```

### 2. Available Methods

#### `getDefaultName(): ?string`

Returns the default name of the action (`message.action`).

#### `setResource(string $resource): self`

Sets the resource associated with this action.

#### `setMessageMailView(?string $mailView): self`

Sets the mail view path stored on the action (default `chatter::mail.message-mail`). Ignores empty values.

#### `getMessageMailView(): string`

Retrieves the currently set email view.

#### `getResource(): string`

Returns the associated resource name.

### 3. Form Fields

The message form consists of the following fields:

| Field Name  | Type       | Description                                             |
| ----------- | ---------- | ------------------------------------------------------- |
| subject     | TextInput  | Optional subject for the message                        |
| body        | RichEditor | The main content of the message, with `@` user mentions |
| attachments | FileUpload | Multiple file attachments                               |
| type        | Hidden     | Default value is `comment`                              |

The attachments field stores files in the `messages-attachments` directory on the `public` disk, accepts images, PDFs, Word documents, Excel sheets, and plain text files, and limits each file to 10 MB.

### 4. Actions

- **Add Subject**: Allows users to toggle the visibility of the subject field.
- **Submit Message**: Saves the message via `addMessage()`, attaches uploaded files via `addAttachments()`, and dispatches a `chatter.refresh` Livewire event to refresh the chatter panel.

### 5. Notifications

Success and error messages are displayed using Filament's notification system:

- **Success:** Message successfully sent
- **Error:** Error occurred while sending message

### 6. Follower Notifications

Once the message is created, the `ChatterNotificationService` notifies the record's followers automatically:

- Followers receive a Filament database notification and an email (rendered with the `chatter::mail.message-mail` view) containing the message content and a link to the record.
- Users mentioned with `@` in the message body receive a dedicated mention notification and are added as followers of the record.
- The message author is excluded from the notifications.

### 7. Customization

#### Customize Attachments

Attachments are stored in `messages-attachments` and are linked to the message, so they can be retrieved using:

```php
$message->attachments;
```
