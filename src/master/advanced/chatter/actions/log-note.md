# Overview

The `LogAction` is a FilamentPHP action designed for logging internal messages or notes related to a specific record within Aureus ERP. It allows users to add detailed logs with subjects, rich-text descriptions, and file attachments while ensuring that internal messages remain properly categorized and attributed to the correct user.

## Features

- Supports adding a subject line optionally.
- Utilizes a rich text editor for detailed message descriptions.
- Allows file attachments with multiple file formats.
- Associates logs with the authenticated user.
- Provides real-time visibility toggling for the subject field.
- Displays success and error notifications.
- Uses a modal for user input.

## Action Registration

The `LogAction` is a FilamentPHP action that should be registered within your Filament resource or component:

```php
use Webkul\Chatter\Filament\Actions\Chatter\LogAction;

LogAction::make()
    ->label('Log Message')
    ->modalHeading('Add Log Entry')
    ->icon('heroicon-o-chat-bubble-oval-left');
```

## Form Schema

The form consists of:

1. **Subject (optional)**: Can be toggled using the `add_subject` action.
2. **Rich Text Editor**: Captures the detailed log message.
3. **File Attachments**: Allows uploading images, PDFs, Word documents, Excel sheets, and plain text files.
4. **Hidden Field**: Ensures the type is set to `note`.

### Toggle Subject Field

A button labeled `Add Subject` or `Hide Subject` controls the visibility of the subject input field dynamically.

### Rich Text Editor

- Enables detailed descriptions with text formatting.
- Supports file attachments within the editor.
- Disables Grammarly to prevent conflicts.

### File Upload

- Supports multiple file types: images, PDFs, Word, Excel, and text files.
- Uploads files to the `log-attachments` directory.
- Displays preview for uploaded files.

## Action Execution

When executed, `LogAction`:

1. Retrieves the authenticated user and attaches the log entry to the respective record.
2. Saves the message as an internal note (`is_internal = true`).
3. Attaches uploaded files to the log message.
4. Displays success or error notifications based on the operation result.

```php
->action(function (array $data, ?Model $record = null) {
    try {
        $user = filament()->auth()->user();

        $data['name'] = $record->name;
        $data['causer_type'] = $user->getMorphClass();
        $data['causer_id'] = $user->id;
        $data['is_internal'] = true;

        $message = $record->addMessage($data, $user->id);

        if (! empty($data['attachments'])) {
            $record->addAttachments($data['attachments'], ['message_id' => $message->id]);
        }

        Notification::make()
            ->success()
            ->title('Log entry added successfully')
            ->send();
    } catch (\Exception $e) {
        report($e);
        Notification::make()
            ->danger()
            ->title('Failed to add log entry')
            ->send();
    }
})
```
