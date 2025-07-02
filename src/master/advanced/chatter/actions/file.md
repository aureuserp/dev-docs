# Overview

The `FileAction` class extends `Filament\Actions\Action`, creating a custom Filament action that allows users to upload, manage, and delete file attachments associated with a model. This action is particularly useful for chat or task management systems where users need to attach files to messages, tasks, or other entities.

## **Key Features of `FileAction`**

1. **File Uploading**
   - Supports multiple file uploads.
   - Files are stored in the `chats-attachments` directory.
   - Users can preview, download, reorder, and delete files.

2. **File Type Restrictions**
   - Accepts only specific file types such as images, PDFs, Word documents, Excel sheets, and plain text files.
   - Files are limited to a maximum size of **10 MB (10,240 KB).**

3. **Notifications**
   - Success notifications when files are uploaded or deleted.
   - Warning notifications if there are no new files to upload.
   - Error notifications in case of failures.

4. **Database Integration**
   - Uses an `attachments` relationship to fetch existing attachments.
   - Prevents duplicate file uploads by checking already uploaded files.
   - Deletes files both from the database and storage when removed.

5. **Filament UI Customizations**
   - Uses a **modal window** for file management.
   - Provides **a badge counter** showing the number of existing attachments.
   - Uses an **outlined gray button** with a tooltip for better UX.

## **Breakdown of `FileAction` Implementation**

### **Defining the Action Name**

```php
public static function getDefaultName(): ?string
{
    return 'file.action';
}
```

- This sets a unique action name (`file.action`) that can be referenced when using this action within Filament resources.

### **Setting Up the Action**

The `setUp()` method configures how this action behaves.

```php
protected function setUp(): void
{
    parent::setUp();

    // Rest of code
}
```

- Calls the parent `setUp()` method to ensure that Filament's default action setup runs.

### **UI Customization**

```php
$this
    ->color('gray')
    ->outlined()
    ->tooltip(__('chatter::filament/resources/actions/chatter/file-action.setup.tooltip'))
```

- The action button appears in **gray color** and outlined for subtle appearance.
- A tooltip provides additional guidance on what this action does.

### **Showing Attachment Count**

```php
->badge(fn ($record) => $record->attachments()->count())
```

- Displays a **badge counter** on the action button, indicating the number of attachments.

## **File Upload Component**

The form contains a `FileUpload` component:

```php
->form([
    Forms\Components\FileUpload::make('files')
        ->hiddenLabel()
        ->multiple()
        ->directory('chats-attachments')
        ->downloadable()
        ->openable()
        ->reorderable()
        ->previewable(true)
        ->deletable()
```

- Allows **multiple file uploads**.
- Stores files in the `chats-attachments` directory.
- Users can **download, preview, reorder, and delete** files.

## **File Validation**

```php
->acceptedFileTypes([
    'image/*',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
])
->maxSize(10240) // 10 MB
```

- Restricts files to **images, PDFs, Word, Excel, and text files**.
- Limits file size to **10 MB per file**.

## **Deleting Uploaded Files**

```php
->deleteUploadedFileUsing(function ($file, ?Model $record) {
    $attachment = $record->attachments()
        ->where('file_path', $file)
        ->first();

    if ($attachment) {
        $attachment->delete();

        Notification::make()
            ->success()
            ->title(__('chatter::filament/resources/actions/chatter/file-action.setup.form.fields.actions.delete.title'))
            ->body(__('chatter::filament/resources/actions/chatter/file-action.setup.form.fields.actions.delete.body'))
            ->send();
    }
})
```

- Finds the attachment in the database and **deletes** it upon user request.
- Sends a **success notification** when deletion is successful.

## **Setting Default File List (Preloaded Files)**

```php
->default(function (?Model $record) {
    if (! $record) {
        return [];
    }

    return $record->attachments()
        ->latest()
        ->get()
        ->pluck('file_path')
        ->toArray() ?? [];
}),
```

- Preloads existing **file paths** when the action is opened.

## **Handling the Action (Uploading Files to Model)**

```php
->action(function (FileAction $action, array $data, ?Model $record): void {
    try {
        $existingFiles = $record->attachments()
            ->latest()
            ->get()
            ->pluck('file_path')
            ->toArray();

        $newFiles = array_filter($data['files'] ?? [], function ($file) use ($existingFiles) {
            return ! in_array($file, $existingFiles);
        });

        if (! empty($newFiles)) {
            $record->addAttachments($newFiles);

            Notification::make()
                ->success()
                ->title(__('chatter::filament/resources/actions/chatter/file-action.setup.actions.notification.success.title'))
                ->body(__('chatter::filament/resources/actions/chatter/file-action.setup.actions.notification.success.body'))
                ->send();
        } else {
            Notification::make()
                ->info()
                ->title(__('chatter::filament/resources/actions/chatter/file-action.setup.actions.notification.warning.title'))
                ->body(__('chatter::filament/resources/actions/chatter/file-action.setup.actions.notification.warning.body'))
                ->send();
        }
    } catch (\Exception $e) {
        Notification::make()
            ->danger()
            ->title(__('chatter::filament/resources/actions/chatter/file-action.setup.actions.notification.error.title'))
            ->body(__('chatter::filament/resources/actions/chatter/file-action.setup.actions.notification.error.body'))
            ->send();

        report($e);
    }

    $action->resetFormData();
})
```

- **Filters out duplicate files** (prevents re-uploading existing files).
- Calls `$record->addAttachments($newFiles)` to attach new files to the model.
- Sends **success, warning, or error notifications** based on the outcome.
- **Handles exceptions** to prevent crashes.

## **Modal Customization**

```php
->modalHeading(__('chatter::filament/resources/actions/chatter/file-action.setup.title'))
->icon('heroicon-o-paper-clip')
->modalIcon('heroicon-o-paper-clip')
->iconPosition(IconPosition::Before)
->modalSubmitAction(
    fn ($action) => $action
        ->label('Upload')
        ->icon('heroicon-m-paper-airplane')
)
->modalWidth(MaxWidth::ThreeExtraLarge)
->slideOver(false);
```
