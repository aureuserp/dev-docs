# Compact Admin Theme

The **compact admin theme** is a CSS density layer built into AureusERP that reduces padding, spacing, and element heights across the admin panel. It ships as a default part of the admin and customer panel stylesheets, giving the interface a tighter, data-dense look suitable for productivity-focused workflows.

## How It Works

The compact theme is defined in `resources/css/filament/shared/compact.css` and is automatically imported by both the admin and customer panel theme files:

```css
/* resources/css/filament/admin/theme.css */
@import '../shared/compact.css';

/* resources/css/filament/customer/theme.css */
@import '../shared/compact.css';
```

Because it is imported at the theme level, the compact styling is always active in both panels. There is no runtime toggle — it applies to all users by default.

## What It Affects

The compact CSS layer overrides Filament's default spacing for the following elements:

| Element | What changes |
| --- | --- |
| Page content and headers | Reduced `gap-y` and `py` values |
| Form sections | Tighter inner padding |
| Form fields and schema components | `gap-y` reduced to `1.5` |
| Input elements (`fi-input`, textarea, date-picker) | Vertical padding reduced to `py-1` |
| Select inputs | Minimum height reduced to `min-h-8` |
| Table header cells and body cells | Vertical padding reduced to `py-2.5` |
| Table toolbar and filter bars | Tighter `px`/`py` |
| Modal content | Reduced `gap-y` and `px`/`py` |
| Stats overview widgets | Reduced `px`/`py` |
| Pagination bar | Tighter `px`/`py` |
| Navigation items (topbar) | Reduced `px`/`py` |
| Dropdown items and headers | Reduced padding |
| Chatter modal | Tighter header, content, and footer spacing |
| Masonry layout | Two-column `lg:columns-2` with `break-inside-avoid` |

## Customising the Compact Theme

### Overriding Specific Rules

Add CSS after the `@import` statement in the relevant theme file to override individual compact rules. For example, to restore larger padding on form sections:

```css
/* resources/css/filament/admin/theme.css */
@import '../shared/compact.css';

/* Override: restore default section padding */
.fi-section:not(.fi-section-not-contained):not(.fi-divided)
  > .fi-section-content-ctn
  > .fi-section-content {
    @apply p-6;
}
```

### Disabling the Compact Theme

To remove the compact layer entirely from a panel, delete or comment out the `@import` line in the panel's theme CSS file:

```css
/* resources/css/filament/admin/theme.css */

/* Remove this line to disable compact styling: */
/* @import '../shared/compact.css'; */
```

After editing any theme CSS file, rebuild the frontend assets:

```bash
npm run build
```

Or use the development watcher:

```bash
npm run dev
```

### Extending `compact.css`

You can add your own density rules directly to `resources/css/filament/shared/compact.css`. Because both panels import this file, any additions apply everywhere. If you need panel-specific adjustments, add them to the individual panel theme file instead.

## Branding and Colour Customisation

Colours and logos are separate from the compact theme and are managed through the **Settings → Branding** page in the admin panel (`Webkul\Support\Filament\Clusters\Settings\Pages\ManageBranding`). From there you can set:

- Light and dark logos, favicon, and logo height.
- Primary, gray, danger, info, success, and warning panel colours.

These settings are stored via `Webkul\Support\Settings\BrandSettings` and applied at runtime through a middleware, independently of the compact CSS layer.
