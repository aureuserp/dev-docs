# Orders

Part of the **Point of Sale** API. Base URL `https://your-domain.com/admin/api/v1/point-of-sale` — replace the host with your own installation and the token placeholder with a real Bearer token (see [Authentication](/master/api-reference/authentication)).

These endpoints handle order synchronisation from the POS terminal, product catalog loading, refunds, invoicing, and receipt retrieval.

## Get product catalog

<Badge type="tip" text="GET" /> `/admin/api/v1/point-of-sale/configs/{config}/catalog`

Retrieve the product catalog available for a POS register, with optional keyword search.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | integer | Yes | The ID of the POS register (Config) |

**Query parameters**

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `search` | string | No | Filter products by name or reference | `coffee` |

::: code-group

```bash [cURL]
curl -X GET "https://your-domain.com/admin/api/v1/point-of-sale/configs/1/catalog?search=coffee" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/configs/1/catalog?search=coffee", {
  method: "GET",
  headers: {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
  },
});

const data = await response.json();
console.log(data);
```

```php [PHP]
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://your-domain.com/admin/api/v1/point-of-sale/configs/1/catalog?search=coffee', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/configs/1/catalog?search=coffee"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
}

response = requests.get(url, headers=headers)

data = response.json()
print(data)
```

:::

---

## Sync orders

<Badge type="warning" text="POST" /> `/admin/api/v1/point-of-sale/orders/sync`

Synchronise one or more orders from the POS terminal to the server. The terminal calls this endpoint to persist draft and completed orders. Returns successfully saved orders and any per-order errors.

> 🔒 Requires a valid Bearer token.

**Request body**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orders` | array | Yes | Array of order objects to sync |

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/point-of-sale/orders/sync" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"orders": [{"uid": "abc-123", "session_id": 42, "lines": [], "payments": []}]}'
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/orders/sync", {
  method: "POST",
  headers: {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    orders: [
      { uid: "abc-123", session_id: 42, lines: [], payments: [] },
    ],
  }),
});

const data = await response.json();
console.log(data);
```

```php [PHP]
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://your-domain.com/admin/api/v1/point-of-sale/orders/sync', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
    ],
    'json' => [
        'orders' => [
            ['uid' => 'abc-123', 'session_id' => 42, 'lines' => [], 'payments' => []],
        ],
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/orders/sync"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

payload = {
    "orders": [
        {"uid": "abc-123", "session_id": 42, "lines": [], "payments": []},
    ],
}

response = requests.post(url, headers=headers, json=payload)

data = response.json()
print(data)
```

:::

**Example response** <Badge type="info" text="200" />

```json
{
  "data": [
    { "id": 101, "uid": "abc-123", "name": "POS/2026/00042", "state": "paid" }
  ],
  "errors": []
}
```

---

## Get refundable lines

<Badge type="tip" text="GET" /> `/admin/api/v1/point-of-sale/orders/{order}/refundable-lines`

Retrieve the order lines eligible for refund, along with the quantities already returned and the maximum refundable quantity for each line.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `order` | integer | Yes | The ID of the POS order |

::: code-group

```bash [cURL]
curl -X GET "https://your-domain.com/admin/api/v1/point-of-sale/orders/101/refundable-lines" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/orders/101/refundable-lines", {
  method: "GET",
  headers: {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
  },
});

const data = await response.json();
console.log(data);
```

```php [PHP]
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://your-domain.com/admin/api/v1/point-of-sale/orders/101/refundable-lines', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/orders/101/refundable-lines"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
}

response = requests.get(url, headers=headers)

data = response.json()
print(data)
```

:::

---

## Create refund

<Badge type="warning" text="POST" /> `/admin/api/v1/point-of-sale/orders/{order}/refund`

Create a pending refund order for one or more lines of a paid POS order. Returns a pending refund object ready to be synced back as a new order.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `order` | integer | Yes | The ID of the POS order to refund |

**Request body**

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `quantities` | object | Yes | Map of `{ order_line_id: quantity_to_refund }` | `{"5": 2, "6": 1}` |

**Error responses**

| HTTP status | Meaning |
|-------------|---------|
| 422 | Order is not refundable, or requested quantity exceeds the amount sold |

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/point-of-sale/orders/101/refund" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"quantities": {"5": 2, "6": 1}}'
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/orders/101/refund", {
  method: "POST",
  headers: {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    quantities: { "5": 2, "6": 1 },
  }),
});

const data = await response.json();
console.log(data);
```

```php [PHP]
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://your-domain.com/admin/api/v1/point-of-sale/orders/101/refund', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
    ],
    'json' => [
        'quantities' => ['5' => 2, '6' => 1],
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/orders/101/refund"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

payload = {
    "quantities": {"5": 2, "6": 1},
}

response = requests.post(url, headers=headers, json=payload)

data = response.json()
print(data)
```

:::

---

## Create invoice for order

<Badge type="warning" text="POST" /> `/admin/api/v1/point-of-sale/orders/{order}/invoice`

Generate an accounting invoice for a completed POS order. Optionally assigns a partner to the order before invoicing.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `order` | integer | Yes | The ID of the POS order |

**Request body**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `partner_id` | integer | No | Partner (customer) ID to assign to the order before invoicing |

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/point-of-sale/orders/101/invoice" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"partner_id": 15}'
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/orders/101/invoice", {
  method: "POST",
  headers: {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ partner_id: 15 }),
});

const data = await response.json();
console.log(data);
```

```php [PHP]
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://your-domain.com/admin/api/v1/point-of-sale/orders/101/invoice', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
    ],
    'json' => ['partner_id' => 15],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/orders/101/invoice"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

payload = {"partner_id": 15}

response = requests.post(url, headers=headers, json=payload)

data = response.json()
print(data)
```

:::

---

## Download invoice PDF

<Badge type="tip" text="GET" /> `/admin/api/v1/point-of-sale/orders/{order}/invoice-pdf`

Download the accounting invoice PDF for a POS order. The response is a streamed PDF, not JSON.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `order` | integer | Yes | The ID of the POS order |

::: code-group

```bash [cURL]
curl -X GET "https://your-domain.com/admin/api/v1/point-of-sale/orders/101/invoice-pdf" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  --output "invoice.pdf"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/orders/101/invoice-pdf", {
  method: "GET",
  headers: {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
  },
});

const blob = await response.blob();
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "invoice.pdf";
a.click();
```

```php [PHP]
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://your-domain.com/admin/api/v1/point-of-sale/orders/101/invoice-pdf', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
    ],
    'sink' => '/path/to/invoice.pdf',
]);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/orders/101/invoice-pdf"

headers = {"Authorization": "Bearer {YOUR_AUTH_TOKEN}"}

response = requests.get(url, headers=headers)

with open("invoice.pdf", "wb") as f:
    f.write(response.content)
```

:::

---

## Get receipt

<Badge type="tip" text="GET" /> `/admin/api/v1/point-of-sale/orders/{order}/receipt`

Retrieve receipt data for a POS order. Returns a structured JSON object suitable for rendering a receipt in the terminal or printing via a thermal printer.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `order` | integer | Yes | The ID of the POS order |

::: code-group

```bash [cURL]
curl -X GET "https://your-domain.com/admin/api/v1/point-of-sale/orders/101/receipt" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/orders/101/receipt", {
  method: "GET",
  headers: {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
  },
});

const data = await response.json();
console.log(data);
```

```php [PHP]
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://your-domain.com/admin/api/v1/point-of-sale/orders/101/receipt', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/orders/101/receipt"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
}

response = requests.get(url, headers=headers)

data = response.json()
print(data)
```

:::
