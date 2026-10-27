# Sessions

Part of the **Point of Sale** API. Base URL `https://your-domain.com/admin/api/v1/point-of-sale` — replace the host with your own installation and the token placeholder with a real Bearer token (see [Authentication](/master/api-reference/authentication)).

A **Session** represents an active selling period on a POS register. The typical lifecycle is: open → confirm opening control → sell → request closing → close.

## Get current session

<Badge type="tip" text="GET" /> `/admin/api/v1/point-of-sale/configs/{config}/session`

Retrieve the current live session for a POS register. Returns `null` in `data` if no session is open.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | integer | Yes | The ID of the POS register (Config) |

::: code-group

```bash [cURL]
curl -X GET "https://your-domain.com/admin/api/v1/point-of-sale/configs/1/session" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/configs/1/session", {
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

$response = $client->request('GET', 'https://your-domain.com/admin/api/v1/point-of-sale/configs/1/session', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/configs/1/session"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
}

response = requests.get(url, headers=headers)

data = response.json()
print(data)
```

:::

**Example response** <Badge type="info" text="200" />

```json
{
  "data": {
    "id": 42,
    "name": "POS/2026/00001",
    "state": "opening_control",
    "config_id": 1
  }
}
```

---

## Open session

<Badge type="warning" text="POST" /> `/admin/api/v1/point-of-sale/configs/{config}/session`

Open a new session for a POS register. Fails if a live session already exists for that register.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | integer | Yes | The ID of the POS register (Config) |

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/point-of-sale/configs/1/session" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/configs/1/session", {
  method: "POST",
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

$response = $client->request('POST', 'https://your-domain.com/admin/api/v1/point-of-sale/configs/1/session', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/configs/1/session"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
}

response = requests.post(url, headers=headers)

data = response.json()
print(data)
```

:::

---

## Confirm opening control

<Badge type="warning" text="POST" /> `/admin/api/v1/point-of-sale/sessions/{session}/opening-control`

Confirm the opening cash count and transition the session from `opening_control` to `open`.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session` | integer | Yes | The ID of the session |

**Request body**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cash_balance_start` | numeric | Yes | Opening cash balance (≥ 0) |
| `opening_notes` | string | No | Optional notes recorded at opening |

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/opening-control" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"cash_balance_start": 100.00, "opening_notes": "Float counted and confirmed"}'
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/opening-control", {
  method: "POST",
  headers: {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    cash_balance_start: 100.00,
    opening_notes: "Float counted and confirmed",
  }),
});

const data = await response.json();
console.log(data);
```

```php [PHP]
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/opening-control', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
    ],
    'json' => [
        'cash_balance_start' => 100.00,
        'opening_notes' => 'Float counted and confirmed',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/opening-control"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

payload = {
    "cash_balance_start": 100.00,
    "opening_notes": "Float counted and confirmed",
}

response = requests.post(url, headers=headers, json=payload)

data = response.json()
print(data)
```

:::

---

## Request closing

<Badge type="warning" text="POST" /> `/admin/api/v1/point-of-sale/sessions/{session}/closing-control`

Transition the session to `closing_control` state, signalling that the cashier wants to close. No request body required.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session` | integer | Yes | The ID of the session |

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/closing-control" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/closing-control", {
  method: "POST",
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

$response = $client->request('POST', 'https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/closing-control', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/closing-control"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
}

response = requests.post(url, headers=headers)

data = response.json()
print(data)
```

:::

---

## Close session

<Badge type="warning" text="POST" /> `/admin/api/v1/point-of-sale/sessions/{session}/close`

Close the session with full accounting. Posts journal entries for cash and payment differences.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session` | integer | Yes | The ID of the session |

**Request body**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cash_balance_end_real` | numeric | No | Actual cash counted at close |
| `closing_notes` | string | No | Optional closing notes |
| `balancing_account_id` | integer | No | Account ID used to balance differences |
| `payment_differences` | object | No | Map of `{ payment_method_id: difference_amount }` for each payment method with a discrepancy |

**Error responses**

| Code | HTTP status | Meaning |
|------|-------------|---------|
| `draft-orders` | 422 | Session has unfinished draft orders that must be completed or cancelled first |
| `unbalanced` | 422 | Cash difference exceeds tolerance; response includes a `delta` field with the unbalanced amount |

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/close" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"cash_balance_end_real": 245.50, "closing_notes": "End of day", "payment_differences": {"1": -0.50}}'
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/close", {
  method: "POST",
  headers: {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    cash_balance_end_real: 245.50,
    closing_notes: "End of day",
    payment_differences: { "1": -0.50 },
  }),
});

const data = await response.json();
console.log(data);
```

```php [PHP]
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/close', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
    ],
    'json' => [
        'cash_balance_end_real' => 245.50,
        'closing_notes' => 'End of day',
        'payment_differences' => ['1' => -0.50],
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/close"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

payload = {
    "cash_balance_end_real": 245.50,
    "closing_notes": "End of day",
    "payment_differences": {"1": -0.50},
}

response = requests.post(url, headers=headers, json=payload)

data = response.json()
print(data)
```

:::

---

## Record cash movement

<Badge type="warning" text="POST" /> `/admin/api/v1/point-of-sale/sessions/{session}/cash-movements`

Record a cash-in or cash-out movement against the session (e.g. drawer float additions or petty cash withdrawals).

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session` | integer | Yes | The ID of the session |

**Request body**

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `type` | string | Yes | Movement direction. One of: `in`, `out` | `in` |
| `amount` | numeric | Yes | Amount (must be > 0) | `50.00` |
| `reason` | string | No | Optional description of the movement | `Float top-up` |

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/cash-movements" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"type": "in", "amount": 50.00, "reason": "Float top-up"}'
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/cash-movements", {
  method: "POST",
  headers: {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    type: "in",
    amount: 50.00,
    reason: "Float top-up",
  }),
});

const data = await response.json();
console.log(data);
```

```php [PHP]
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/cash-movements', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
    ],
    'json' => [
        'type' => 'in',
        'amount' => 50.00,
        'reason' => 'Float top-up',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/cash-movements"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

payload = {
    "type": "in",
    "amount": 50.00,
    "reason": "Float top-up",
}

response = requests.post(url, headers=headers, json=payload)

data = response.json()
print(data)
```

:::

**Example response** <Badge type="info" text="200" />

```json
{
  "data": {
    "id": 7,
    "type": "in",
    "amount": 50.00,
    "reason": "Float top-up"
  }
}
```

---

## Boot session

<Badge type="tip" text="GET" /> `/admin/api/v1/point-of-sale/sessions/{session}/boot`

Load all data required to start the POS terminal for a session: configuration, payment methods, product catalog, floor plan, and open orders.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session` | integer | Yes | The ID of the session |

::: code-group

```bash [cURL]
curl -X GET "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/boot" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/boot", {
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

$response = $client->request('GET', 'https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/boot', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/boot"

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

## List session orders

<Badge type="tip" text="GET" /> `/admin/api/v1/point-of-sale/sessions/{session}/orders`

Retrieve a paginated list of orders belonging to a session, with optional search and status filtering.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session` | integer | Yes | The ID of the session |

**Query parameters**

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `search` | string | No | Filter by order name, reference, receipt code, or partner name | `POS-001` |
| `status` | string | No | `active` (default, excludes cancelled) or `canceled` | `active` |
| `per_page` | integer | No | Results per page (1–100, default 20) | `20` |

::: code-group

```bash [cURL]
curl -X GET "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/orders?status=active&per_page=20" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/orders?status=active&per_page=20", {
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

$response = $client->request('GET', 'https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/orders?status=active&per_page=20', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/orders?status=active&per_page=20"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
}

response = requests.get(url, headers=headers)

data = response.json()
print(data)
```

:::

**Example response** <Badge type="info" text="200" />

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 101,
      "name": "POS/2026/00042",
      "state": "paid",
      "receipt_code": "RC-00042"
    }
  ],
  "from": 1,
  "last_page": 3,
  "per_page": 20,
  "to": 20,
  "total": 58,
  "next_page_url": "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/orders?page=2",
  "prev_page_url": null
}
```

---

## Get closing control report

<Badge type="tip" text="GET" /> `/admin/api/v1/point-of-sale/sessions/{session}/closing-control-report`

Retrieve the closing control report for a session. Contains expected vs. actual payment totals per payment method.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session` | integer | Yes | The ID of the session |

::: code-group

```bash [cURL]
curl -X GET "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/closing-control-report" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/closing-control-report", {
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

$response = $client->request('GET', 'https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/closing-control-report', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/closing-control-report"

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

## Cancel draft orders

<Badge type="warning" text="POST" /> `/admin/api/v1/point-of-sale/sessions/{session}/cancel-draft-orders`

Cancel all draft (unsaved) orders in the session. Typically called before closing a session to clear abandoned orders.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session` | integer | Yes | The ID of the session |

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/cancel-draft-orders" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/cancel-draft-orders", {
  method: "POST",
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

$response = $client->request('POST', 'https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/cancel-draft-orders', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/cancel-draft-orders"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
}

response = requests.post(url, headers=headers)

data = response.json()
print(data)
```

:::

**Example response** <Badge type="info" text="200" />

```json
{
  "data": {
    "canceled": 3
  }
}
```

---

## Download sales details report

<Badge type="tip" text="GET" /> `/admin/api/v1/point-of-sale/sessions/{session}/sales-details`

Download a PDF sales details report for the session. The response is a streamed PDF file, not JSON.

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session` | integer | Yes | The ID of the session |

**Response**

Returns a `application/pdf` stream with `Content-Disposition: attachment` and a filename based on the session name.

::: code-group

```bash [cURL]
curl -X GET "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/sales-details" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  --output "sales-details.pdf"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/sales-details", {
  method: "GET",
  headers: {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
  },
});

const blob = await response.blob();
const url = URL.createObjectURL(blob);
// Trigger download
const a = document.createElement("a");
a.href = url;
a.download = "sales-details.pdf";
a.click();
```

```php [PHP]
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/sales-details', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
    ],
    'sink' => '/path/to/sales-details.pdf',
]);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/sessions/42/sales-details"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
}

response = requests.get(url, headers=headers)

with open("sales-details.pdf", "wb") as f:
    f.write(response.content)
```

:::
