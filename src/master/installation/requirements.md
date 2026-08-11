# Requirements

## Server Configuration

- **Server**: Apache 2 or NGINX
- **RAM**: 4GB or higher
- **Node.js & NPM**: Node.js 18.x or higher with the latest stable NPM
- **PHP**: 8.3 or higher
- **Laravel**: 13.x
- **FilamentPHP**: 5.x
- **Composer**: Latest version (2.0+)
- **Database**: MySQL 8.0+ or PostgreSQL
- **Browser**: A modern browser (Chrome, Firefox, Edge)

## PHP Extensions

Ensure the following extensions are installed and enabled. You can check using the **`phpinfo()`** page or the **`php -m`** command.

- **php-intl**: Required for internationalization support.
- **php-gd**: Required for image processing and manipulation.
- **php-bcmath, php-curl, php-exif, php-gmp, php-soap, php-zip**: Required by the application and its dependencies (these are the extensions bundled in the official Docker image).
- **php-mysql** (or **php-pgsql**): The PDO driver matching your database server.
- **OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON**: Essential extensions for Laravel and FilamentPHP.

## PHP Configuration

Modify your **`php.ini`** file with the following settings:

- **memory_limit**: Set to **`4G`** or higher for optimal performance.
- **max_execution_time**: Adjust to **`360`** seconds or higher to allow long-running scripts.
- **date.timezone**: Set to your specific timezone (e.g., **`Asia/Kolkata`**).

```ini
memory_limit = 4G
max_execution_time = 360
date.timezone = Asia/Kolkata ; Change this to your timezone.
```

::: tip Remember to restart your web server
After modifying the PHP configuration, restart Apache or NGINX to apply changes.
:::

## Supported Database Servers

The application supports the following database servers:

- **MySQL**: Version 8.0+ is recommended for optimal performance.
- **PostgreSQL**: Supported as of v1.5.0.

### Database Collation

For MySQL, the recommended collation is **`utf8mb4_unicode_ci`**, ensuring proper Unicode and multilingual support.
