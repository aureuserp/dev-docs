# Overview

The `HasChatter` trait provides a flexible communication system for Laravel models within the Aureus ERP system. When applied to a model, it enables chatter functionality, including messages, activities, attachments, and follower management.

Additionally, the `HasLogActivity` trait works alongside `HasChatter` to automatically log model changes as activity messages. It monitors model events (create, update, delete) and records them as structured activity entries that can be displayed in the chatter feed.

## Using `HasChatter`

To enable chatter functionality in your model, use the `HasChatter` trait:

```php
use Webkul\Chatter\Traits\HasChatter;

class YourModel extends Model
{
    use HasChatter;

    // Rest of your model definition
}
```

## Using `HasChatter` with `HasLogActivity`

To log model changes as activity messages, include both `HasChatter` and `HasLogActivity` traits:

```php
use Webkul\Chatter\Traits\HasChatter;
use Webkul\Chatter\Traits\HasLogActivity;

class YourModel extends Model
{
    use HasChatter, HasLogActivity;

    // Rest of your model definition
}
```

## Logging Attributes

The following `$logAttributes` array defines the attributes that will be logged when changes occur in the model. This includes both direct model attributes and related model properties.

```php
protected array $logAttributes = [
    'medium.name'          => 'Medium',
    'utmSource.name'       => 'UTM Source',
    'partner.name'         => 'Customer',
    //
];
```

## Customizing Relationship Titles

If you want to change the title of a relationship attribute in the logs, you should update the corresponding key in the `$logAttributes` array.

For example, if you want to change the log title for the `partner.name` attribute from "Customer" to "Client", you can do:

```php
protected array $logAttributes = [
    'partner.name' => 'Client',
];
```

This ensures that when logging changes, the updated title will be reflected instead of the default one.

## Available Methods

### Message Management

#### `messages(): MorphMany`

Retrieves all non-activity messages for the model, ordered by creation date in descending order.

```php
// Example usage
$department = Department::find(1);
$allMessages = $department->messages;
```

#### `withFilters($filters)`

Retrieves messages with specified filters.

```php
// Example usage
$filters = [
    'type' => ['note', 'comment'],
    'is_internal' => true,
    'date_from' => '2025-01-01',
    'date_to' => '2025-03-13',
    'search' => 'important'
];
$filteredMessages = $department->withFilters($filters);
```

#### `unRead()`

Retrieves all unread messages for the model.

```php
$unreadMessages = $department->unRead();
```

#### `markAsRead(): int`

Marks all unread messages as read, returning the count of updated messages.

```php
$markedCount = $department->markAsRead();
```

#### `addMessage(array $data): Message`

Adds a new message to the model.

```php
$message = $department->addMessage([
    'subject' => 'New policy update',
    'body' => 'We are updating the department policies...',
    'type' => 'note'
]);
```

#### `replyToMessage(Message $parentMessage, array $data): Message`

Adds a reply to an existing message.

```php
$reply = $department->replyToMessage($existingMessage, [
    'body' => 'This is a reply to the previous message'
]);
```

#### `removeMessage($messageId, $type = 'messages'): bool`

Removes a message by its ID.

```php
$deleted = $department->removeMessage(5);
```

#### `pinMessage(Message $message): bool`

Pins a message to make it prominent.

```php
$pinned = $department->pinMessage($message);
```

#### `unpinMessage(Message $message): bool`

Unpins a previously pinned message.

```php
$unpinned = $department->unpinMessage($message);
```

#### `getPinnedMessages(): Collection`

Retrieves all pinned messages for the model.

```php
$pinnedMessages = $department->getPinnedMessages();
```

#### `getMessagesByType(string $type): Collection`

Retrieves messages of a specific type.

```php
$notes = $department->getMessagesByType('note');
```

#### `getInternalMessages(): Collection`

Retrieves all internal messages.

```php
$internalMessages = $department->getInternalMessages();
```

#### `getMessagesByDateRange(Carbon $startDate, Carbon $endDate): Collection`

Retrieves messages within a specified date range.

```php
$messages = $department->getMessagesByDateRange(
    Carbon::parse('2025-01-01'),
    Carbon::parse('2025-03-13')
);
```

#### `getMessagesByActivityType(int $activityTypeId): Collection`

Retrieves messages associated with a specific activity type.

```php
$activityMessages = $department->getMessagesByActivityType(3);
```

### Activity Management

#### `activities(): MorphMany`

Retrieves all activity messages for the model.

```php
$activities = $department->activities;
```

#### `activityPlans(): mixed`

Returns a collection of activity plans (empty by default, can be overridden).

```php
$plans = $department->activityPlans();
```

### Attachment Management

#### `attachments(): MorphMany`

Retrieves all attachments for the model.

```php
$allAttachments = $department->attachments;
```

#### `addAttachments(array $files, array $additionalData = []): Collection`

Adds multiple attachments to the model.

```php
$attachments = $department->addAttachments([
    'documents/policy.pdf',
    'images/organization.png'
], [
    'description' => 'Department documents'
]);
```

#### `removeAttachment($attachmentId): bool`

Removes an attachment by its ID.

```php
$removed = $department->removeAttachment(3);
```

#### `getAttachmentsByType(string $mimeType): Collection`

Retrieves attachments of a specific MIME type.

```php
$pdfAttachments = $department->getAttachmentsByType('application/pdf');
```

#### `getAttachmentsByDateRange(Carbon $startDate, Carbon $endDate): Collection`

Retrieves attachments within a specified date range.

```php
$recentAttachments = $department->getAttachmentsByDateRange(
    Carbon::now()->subDays(7),
    Carbon::now()
);
```

#### `getImageAttachments(): Collection`

Retrieves all image attachments.

```php
$images = $department->getImageAttachments();
```

#### `getDocumentAttachments(): Collection`

Retrieves all non-image document attachments.

```php
$documents = $department->getDocumentAttachments();
```

#### `attachmentExists($attachmentId): bool`

Checks if an attachment exists in storage.

```php
$exists = $department->attachmentExists(5);
```

### Follower Management

#### `followers(): MorphMany`

Retrieves all followers for the model.

```php
$followers = $department->followers;
```

#### `addFollower(Partner $partner): Follower`

Adds a partner as a follower of the model.

```php
$follower = $department->addFollower($partner);
```

#### `removeFollower(Partner $partner): bool`

Removes a partner as a follower of the model.

```php
$removed = $department->removeFollower($partner);
```

#### `isFollowedBy(Partner $partner): bool`

Checks if a partner is following the model.

```php
$isFollowing = $department->isFollowedBy($partner);
```

## Using HasChatter in Models

In your `Department` model, the `HasChatter` trait is already included, allowing you to use all of the above methods directly:

```php
$department = Department::find(1);

// Add a message
$message = $department->addMessage([
    'subject' => 'Department Update',
    'body' => 'New policy changes are in effect from today',
    'type' => 'announcement'
]);

// Add attachments
$department->addAttachments([
    'policies/updated_rules.pdf',
    'images/department_structure.png'
]);

// Check followers
$isFollowing = $department->isFollowedBy($somePartner);
```

## Filtering Options

When using the `withFilters` method, you can apply the following filters:

| Filter             | Description                          | Example                            |
| ------------------ | ------------------------------------ | ---------------------------------- |
| `type`             | Array of message types               | `['note', 'comment']`              |
| `is_internal`      | Boolean for internal messages        | `true` or `false`                  |
| `date_from`        | Start date for filtering             | `'2025-01-01'`                     |
| `date_to`          | End date for filtering               | `'2025-03-13'`                     |
| `causer_id`        | ID of the message creator            | `5`                                |
| `causer_type`      | Type of the message creator          | `'Webkul\\Security\\Models\\User'` |
| `assigned_to`      | ID of assigned user                  | `3`                                |
| `activity_type_id` | Activity type ID                     | `2`                                |
| `company_id`       | Company ID                           | `1`                                |
| `search`           | Search term for subject/body/summary | `'important'`                      |
