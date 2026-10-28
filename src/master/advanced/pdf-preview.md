# Overview

AureusERP provides a `PDFHandler` trait and a `PreviewAction` pattern used on invoice, bill, credit-note, and quotation resource pages. This page shows how to add an in-modal PDF preview with a print/download button to any Filament resource.

## How It Works

`Webkul\Support\Traits\PDFHandler` wraps [`barryvdh/laravel-dompdf`](https://github.com/barryvdh/laravel-dompdf) and exposes four methods:

| Method | Returns | Description |
|---|---|---|
| `generatePDF(string $html)` | `Pdf` instance | Render HTML as A4 portrait PDF |
| `savePDF(string $html, ?string $fileName)` | `string` path | Save PDF to `storage/app/public/pdfs/` and return the relative path |
| `downloadPDF(string $html, ?string $fileName)` | `Response` | Generate and stream a download response |
| `saveAndDownloadPDF(string $html, ?string $fileName)` | `array` | Save the PDF and generate a download response. Returns `['path' => ..., 'download' => ...]` |

RTL support is handled automatically: if `SupportServiceProvider::isRtl()` returns true the HTML is pre-processed by `prepare_rtl_html()` before rendering.

## Built-in `PreviewAction`

`Webkul\Account\Filament\Resources\InvoiceResource\Actions\PreviewAction` is the canonical implementation. It:

1. Shows a modal with an inline preview rendered from a Blade template.
2. Adds a **Print** footer button that calls `savePDF()` and returns a file download.
3. Is only visible when the record state is `MoveState::POSTED`.

```php
use Webkul\Account\Filament\Resources\InvoiceResource\Actions\PreviewAction;

protected function getHeaderActions(): array
{
    return [
        PreviewAction::make()
            ->setTemplate('accounts::invoice/actions/preview.index'),
    ];
}
```

`setTemplate()` takes a view name. The view receives `$record` (the Eloquent model).

## Adding PDF Preview to a Custom Resource

### Step 1: Create the Blade template

```blade
<html>
<body>
  <h1>{{ $record->name }}</h1>
  <table>
    @foreach ($record->lines as $line)
      <tr>
        <td>{{ $line->description }}</td>
        <td>{{ $line->amount }}</td>
      </tr>
    @endforeach
  </table>
</body>
</html>
```

### Step 2: Create the action

```php
namespace Webkul\MyPlugin\Filament\Resources\OrderResource\Actions;

use Filament\Actions\Action;
use Webkul\Support\Traits\PDFHandler;

class PreviewAction extends Action
{
    use PDFHandler;

    public static function getDefaultName(): ?string
    {
        return 'my-plugin.order.preview';
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this
            ->label('Preview')
            ->color('gray')
            ->icon('heroicon-o-viewfinder-circle')
            ->modalHeading('Order Preview')
            ->modalSubmitAction(false)
            ->modalCancelActionLabel('Close')
            ->modalContent(fn ($record) => view('my-plugin::pdf.document', compact('record')))
            ->modalFooterActions(function (Action $action): array {
                return [
                    $action->getModalCancelAction(),
                    Action::make('print')
                        ->label('Download PDF')
                        ->icon('heroicon-o-printer')
                        ->color('primary')
                        ->action(function ($record) {
                            $path = $this->savePDF(
                                view('my-plugin::pdf.document', compact('record'))->render(),
                                'order-'.$record->id
                            );

                            return response()->download(storage_path('app/public/'.$path));
                        }),
                ];
            });
    }
}
```

### Step 3: Register in the Edit/View page

```php
use Webkul\MyPlugin\Filament\Resources\OrderResource\Actions\PreviewAction;

protected function getHeaderActions(): array
{
    return [
        PreviewAction::make(),
    ];
}
```

## Generating a PDF Without a Modal

Use `PDFHandler` directly in a controller or action when you need to stream a PDF without showing a preview first:

```php
use Webkul\Support\Traits\PDFHandler;

class OrderPdfController extends Controller
{
    use PDFHandler;

    public function download(Order $order)
    {
        return $this->downloadPDF(
            view('my-plugin::pdf.document', ['record' => $order])->render(),
            'order-'.$order->id
        );
    }
}
```

## DomPDF Options

`PDFHandler::generatePDF()` always sets:

- Paper: A4, portrait
- Default font: DejaVu Sans
- HTML5 parser: enabled
- Remote assets: enabled

To override these options, call `generatePDF()` and then chain DomPDF options before streaming:

```php
$pdf = $this->generatePDF($html);
$pdf->setPaper('A4', 'landscape');
return $pdf->download('report.pdf');
```
