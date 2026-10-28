# Upgrade Guide

This guide will help you upgrade your **AureusERP** installation to the latest version safely and efficiently.

> **Important:** Always perform upgrades on a **staging or test environment** before updating your production instance.

## Upgrading to v1.7.0

AureusERP **v1.7.0** ships the Point of Sale plugin and several security improvements. Before upgrading, review the following changes:

- **API token revocation.** API tokens remain non-expiring (`expiration` stays `null` in `config/sanctum.php`) but are now revoked when the user changes their password. Handle `401 Unauthorized` in your integrations and re-issue tokens after a password change.
- **API login hardening.** The API login endpoint is rate limited per email and IP address, and tokens that belong to inactive users are rejected.
- **Company ID validation on API writes.** A `company_id` that the user is not allowed to access is rejected with a `422 Unprocessable Entity` validation error. A blank `company_id` is accepted. Update API clients to send a company the user can access.
- **SVG uploads blocked.** SVG files are rejected on the public disk and original filenames are no longer preserved. Update any custom code that uploads SVGs or relies on preserved filenames.
- **`ASSET_URL`.** `config/app.php` reads an optional `ASSET_URL` from `.env` and falls back to `APP_URL`. Set it only if you serve assets from a CDN or another host.
- **Mass-assignment hardening.** Mass assignment no longer accepts attributes that are not valid for the model. Review custom code that passes request data straight to `create()` or `fill()`.
- **Plugin installation.** Plugin install runs its migrations, settings migrations, and seeders with `--force`, so they no longer prompt in production.
- **Filament upgrade.** Filament is updated to 5.10.2. Run `composer update` and `php artisan optimize:clear` after pulling.
- **Point of Sale plugin.** Install from **Settings → Plugin Manager** if you wish to use it.

::: warning
Tokens are revoked when a password changes. Re-issue tokens for any integration whose user password you rotate during the upgrade.
:::

---

## Upgrading to v1.6.0

AureusERP **v1.6.0** introduces structural refactors. If you maintain custom plugins, review the following:

- **User model.** The codebase now uses `Webkul\Security\Models\User` instead of `App\Models\User`. Update any direct imports or type-hints in custom plugins.
- **Resource folder structure.** Filament resource namespaces and file paths have been standardised across all plugins. Run `php artisan optimize:clear` after pulling and verify any overridden core resource classes still resolve.
- **Livewire `max_nesting_depth`.** Raised from 10 to 30 in `config/livewire.php`. Merge this value if you have published the config locally.
- **SQLite removed from test setup.** The default test environment now requires MySQL or PostgreSQL. Update `.env.testing` or CI if you were using SQLite.
- **Custom sequences.** A new `sequences` table and per-plugin sequence seed migrations ship with this release. Run `php artisan migrate` as usual.
- **Spatie Translatable.** `spatie/laravel-translatable` and `lara-zeus/spatie-translatable` are now dependencies in the root `composer.json`. Run `composer install` after pulling.
- **Filament upgrade.** Filament is updated to 5.7.6.

---

## Upgrading to v1.5.0

AureusERP **v1.5.0** upgrades the underlying stack. Before upgrading, make sure your server meets the new requirements:

- **PHP**: 8.3 or higher
- **Laravel**: 13.x
- **FilamentPHP**: 5.x

::: warning
If you have custom plugins or Filament customizations, review them against Filament 5 and Laravel 13 before upgrading, as these are major framework upgrades.
:::

---

## Upgrade Methods

You can upgrade AureusERP using one of the following methods:

* [Upgrade via GitHub (Recommended for Developers)](#_2-upgrade-via-github)
* [Upgrade via Website Download (Recommended for Manual Installation)](#_3-upgrade-via-website-download)

---

## 1. Backup Your Project

Before you begin, make sure to **back up** both your **database** and **project files**.

### Database Backup

```bash
# Example (MySQL)
mysqldump -u root -p aureus_db > backup_aureus_$(date +%F).sql
```

### Project Files Backup

Copy your entire AureusERP directory as a backup:

```bash
cp -r aureuserp aureuserp_backup_$(date +%F)
```

---

## 2. Upgrade via GitHub

If you cloned the project using Git, follow these steps.

### Step 1: Navigate to the Project Directory

```bash
cd /path/to/aureuserp
```

### Step 2: Pull the Latest Code

Pull the latest updates from the main repository:

```bash
git pull origin master
```

If you have local modifications that conflict with the update, temporarily stash them:

```bash
git stash
git pull origin master
git stash pop
```

**GitHub Repository:** [https://github.com/aureuserp/aureuserp](https://github.com/aureuserp/aureuserp)

---

## 3. Upgrade via Website Download

If you installed AureusERP manually (without Git), you can download the latest version from the official website.

### Step 1: Download Latest Package

Visit the official download page:
[https://aureuserp.com/download/](https://aureuserp.com/download/)

### Step 2: Extract and Replace Files

1. Extract the downloaded ZIP package.
2. Replace your existing AureusERP files, **except**:

   * `.env`
   * `storage/`
   * `vendor/` (will be regenerated)
   * `public/storage` symlink

### Step 3: Continue with the Dependency Update Steps Below

---

## 4. Update Dependencies

Once you have the latest code, update the Composer dependencies:

```bash
composer install --no-dev --optimize-autoloader
```

If you’re using Filament, update it as well:

```bash
composer update filament/filament --with-all-dependencies
```

**Note:** AureusERP includes a post-autoload script that automatically runs `php artisan filament:upgrade` to handle Filament upgrades and compatibility changes.

---

## 5. Verify `.env` Configuration

Check your `.env` file and confirm that all configurations are correct:

| Key           | Description                        |
| ------------- | ---------------------------------- |
| `APP_URL`     | The application URL                |
| `APP_KEY`     | Laravel application encryption key |
| `DB_DATABASE` | Database name                      |
| `DB_USERNAME` | Database user                      |
| `DB_PASSWORD` | Database password                  |

If `.env` is missing, create it from the example file:

```bash
cp .env.example .env
php artisan key:generate
```

Ensure your `.env` file has a valid `APP_KEY`, or you’ll see `Illuminate\Encryption\MissingAppKeyException`.

---

## 6. Clear Cache and Optimize

Clean and rebuild all Laravel caches to ensure new configurations are applied:

```bash
php artisan optimize:clear
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

---

## 7. Run Database Migrations

Apply new database schema updates introduced in the latest version:

```bash
php artisan migrate
```

> **Caution:** If you have custom tables or modules, review migration files before applying them.

---

## 8. Update Storage and Symlink Public Assets

Ensure your storage is properly linked:

```bash
php artisan storage:link
```

If you maintain a backup of your storage directory, restore it:

```bash
cp -r storage-backup/app/public storage/app/public
```

---

## 9. Test Your Application

After the upgrade, thoroughly test the application:

```bash
php artisan serve
```

Then visit your app in a browser:

```
http://127.0.0.1:8000
```

Verify:

* User authentication
* Dashboard & reports
* Custom modules or integrations
* File uploads and logs

---

## 10. Troubleshooting

If you encounter issues, try the following commands:

```bash
php artisan config:clear
composer dump-autoload
php artisan optimize
```

Then check the Laravel log file for detailed error messages:

```bash
storage/logs/laravel.log
```

### Common Issues

| Issue                    | Cause                       | Solution                                               |
| ------------------------ | --------------------------- | ------------------------------------------------------ |
| `MissingAppKeyException` | Missing `APP_KEY` in `.env` | Run `php artisan key:generate`                         |
| `Class not found` errors | Outdated dependencies       | Run `composer install`                                 |
| Debugbar slow load       | Debugbar assets conflict    | Disable Laravel Debugbar in `.env` (`APP_DEBUG=false`) |

---

## 11. Restart Server or Services

If you’re running the app under XAMPP, Valet, or Apache:

* **XAMPP:** Restart Apache and MySQL from Control Panel.

* **Artisan:** Stop and restart the built-in server:

  ```bash
  php artisan serve
  ```

* **Queue Workers:** Restart them after upgrading:

  ```bash
  php artisan queue:restart
  ```

---

## Conclusion

You’ve successfully upgraded your **AureusERP** installation to the latest version.

Stay up to date with new releases, patches, and community updates:

* **GitHub Repository:** [https://github.com/aureuserp/aureuserp](https://github.com/aureuserp/aureuserp)
* **Official Website:** [https://aureuserp.com](https://aureuserp.com)
* **Download Page:** [https://aureuserp.com/download/](https://aureuserp.com/download/)
