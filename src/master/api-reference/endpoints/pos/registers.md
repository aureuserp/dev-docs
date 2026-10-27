# Registers

Part of the **Point of Sale** API. Base URL `https://your-domain.com/admin/api/v1/point-of-sale` — replace the host with your own installation and the token placeholder with a real Bearer token (see [Authentication](/master/api-reference/authentication)).

A **Register** is a POS configuration (`Config` model) representing a physical or virtual point-of-sale terminal. These endpoints let you list available registers and discard stuck sessions.

## List registers

<Badge type="tip" text="GET" /> `/admin/api/v1/point-of-sale/registers`

Retrieve all active POS registers the authenticated user can access, along with the ID of any session the current user already owns.

> 🔒 Requires a valid Bearer token.

::: code-group

```bash [cURL]
curl -X GET "https://your-domain.com/admin/api/v1/point-of-sale/registers" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/registers", {
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

$response = $client->request('GET', 'https://your-domain.com/admin/api/v1/point-of-sale/registers', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/registers"

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
  "data": [
    {
      "id": 1,
      "name": "Main Register",
      "is_active": true,
      "is_restaurant": false,
      "sort": 1
    }
  ],
  "own_session_id": null
}
```

`own_session_id` is the ID of an open session belonging to the authenticated user, or `null` if none exists.

---

## Discard register session

<Badge type="warning" text="POST" /> `/admin/api/v1/point-of-sale/registers/{config}/discard`

Discard (force-close without accounting) the live session for a register. Only allowed when the session is in a discardable state (e.g. opening control not yet confirmed).

> 🔒 Requires a valid Bearer token.

**Path parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | integer | Yes | The ID of the POS register (Config) |

**Responses**

| Status | Meaning |
|--------|---------|
| `200` | Session discarded. Returns `{ "data": null }`. |
| `403` | Authenticated user does not have access to this register. |
| `404` | No live session exists for this register. |
| `422` | Session is not in a discardable state. |

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/point-of-sale/registers/1/discard" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```javascript [JavaScript]
const response = await fetch("https://your-domain.com/admin/api/v1/point-of-sale/registers/1/discard", {
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

$response = $client->request('POST', 'https://your-domain.com/admin/api/v1/point-of-sale/registers/1/discard', [
    'headers' => [
        'Authorization' => 'Bearer {YOUR_AUTH_TOKEN}',
        'Accept' => 'application/json',
    ],
]);

$data = json_decode($response->getBody(), true);
```

```python [Python]
import requests

url = "https://your-domain.com/admin/api/v1/point-of-sale/registers/1/discard"

headers = {
    "Authorization": "Bearer {YOUR_AUTH_TOKEN}",
    "Accept": "application/json",
}

response = requests.post(url, headers=headers)

data = response.json()
print(data)
```

:::
