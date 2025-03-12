# **Customer Panel Provider**

The **Customer Panel Provider** manages the frontend interface for customers. It ensures a smooth login, registration, and password reset process while providing a top navigation layout.

### **Key Features:**

- **Authentication:** Uses a custom guard (`customer`), supports registration and password reset.
- **Branding:** Custom logo, favicon, and dark mode toggle.
- **Navigation:** Implements a top navigation system.
- **Security:** Includes session and CSRF protection middleware.
- **Plugins:** Integrates PluginManager for modular expansion.

### **Code Implementation:**

```php
namespace App\Providers\Filament;

use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Webkul\Support\PluginManager;

class CustomerPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('customer')
            ->path('/')
            ->homeUrl('/')
            ->login()
            ->authPasswordBroker('customers')
            ->passwordReset()
            ->registration()
            ->profile(isSimple: false)
            ->favicon(asset('images/favicon.ico'))
            ->brandLogo(asset('images/logo-light.svg'))
            ->darkMode(false)
            ->brandLogoHeight('2rem')
            ->colors([
                'primary' => Color::Blue,
            ])
            ->topNavigation()
            ->plugins([
                PluginManager::make(),
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authGuard('customer');
    }
}
```
