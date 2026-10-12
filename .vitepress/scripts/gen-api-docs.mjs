import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..', '..')

const SCRIBE_DIR =
  process.env.AUREUS_SCRIBE_DIR ||
  '/home/users/ramdeep.kesharwani/www/html/aureus/aureuserp/.scribe/endpoints'

const ENDPOINTS_DIR = path.join(REPO_ROOT, 'src', 'master', 'api-reference', 'endpoints')
const SIDEBAR_FILE = path.join(REPO_ROOT, '.vitepress', 'routes', 'api-reference.ts')
const LINK_BASE = '/master/api-reference/endpoints'

const BASE_URL = 'https://your-domain.com'
const TOKEN = '{YOUR_AUTH_TOKEN}'

const GROUP_MAP = {
  'Security API Management': { slug: 'security', title: 'Security & Authentication' },
  'Support API Management': { slug: 'support', title: 'Support' },
  'Partner API Management': { slug: 'partners', title: 'Partners' },
  'Product API Management': { slug: 'products', title: 'Products' },
  'Inventory API Management': { slug: 'inventory', title: 'Inventory' },
  'Sales API Management': { slug: 'sales', title: 'Sales' },
  'Account API Management': { slug: 'accounts', title: 'Accounts' },
}

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const groupInfo = (name) =>
  GROUP_MAP[name] || { slug: slugify(name.replace(/API Management/i, '')), title: name.replace(/\s*API Management/i, '').trim() }

const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\r?\n+/g, ' ').trim()
const stripHtml = (s) =>
  String(s ?? '').replace(/<\/?[^>]+>/g, '').replace(/&laquo;|&raquo;/g, '').replace(/\s+/g, ' ').trim()

function paramRows(params) {
  const rows = []
  for (const key of Object.keys(params || {})) {
    const p = params[key]
    if (!p || typeof p !== 'object') continue
    rows.push({
      name: p.name || key,
      type: p.type || 'string',
      required: p.required ? 'Yes' : 'No',
      description: stripHtml(p.description),
      example: p.example,
    })
  }
  return rows
}

function renderParamTable(title, rows, withExample) {
  if (!rows.length) return ''
  const head = withExample
    ? '| Parameter | Type | Required | Description | Example |\n|-----------|------|----------|-------------|---------|'
    : '| Parameter | Type | Required | Description |\n|-----------|------|----------|-------------|'
  const body = rows
    .map((r) => {
      const base = `| \`${esc(r.name)}\` | ${esc(r.type)} | ${r.required} | ${esc(r.description)} |`
      if (!withExample) return base
      const ex = r.example === null || r.example === undefined || r.example === '' ? '' : `\`${esc(r.example)}\``
      return `${base} ${ex} |`
    })
    .join('\n')
  return `**${title}**\n\n${head}\n${body}\n\n`
}

function fullUrl(ep) {
  const entries = Object.entries(ep.cleanQueryParameters || {})
  const qs = entries.length
    ? '?' + entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join('&')
    : ''
  return `${BASE_URL}/${ep.uri}${qs}`
}

function headerList(ep) {
  const h = []
  if (ep.metadata && ep.metadata.authenticated) h.push(['Authorization', `Bearer ${TOKEN}`])
  h.push(['Accept', 'application/json'])
  h.push(['Content-Type', 'application/json'])
  return h
}

function phpVal(v, indent) {
  const pad = '  '.repeat(indent)
  const pad1 = '  '.repeat(indent + 1)
  if (v === null) return 'null'
  if (typeof v === 'boolean') return v ? 'true' : 'false'
  if (typeof v === 'number') return String(v)
  if (Array.isArray(v)) {
    if (!v.length) return '[]'
    const items = v.map((x) => `${pad1}${phpVal(x, indent + 1)},`).join('\n')
    return `[\n${items}\n${pad}]`
  }
  if (typeof v === 'object') {
    const keys = Object.keys(v)
    if (!keys.length) return '[]'
    const items = keys.map((k) => `${pad1}'${k}' => ${phpVal(v[k], indent + 1)},`).join('\n')
    return `[\n${items}\n${pad}]`
  }
  return `'${String(v).replace(/'/g, "\\'")}'`
}

function pyVal(v, indent) {
  const pad = '    '.repeat(indent)
  const pad1 = '    '.repeat(indent + 1)
  if (v === null) return 'None'
  if (typeof v === 'boolean') return v ? 'True' : 'False'
  if (typeof v === 'number') return String(v)
  if (Array.isArray(v)) {
    if (!v.length) return '[]'
    const items = v.map((x) => `${pad1}${pyVal(x, indent + 1)},`).join('\n')
    return `[\n${items}\n${pad}]`
  }
  if (typeof v === 'object') {
    const keys = Object.keys(v)
    if (!keys.length) return '{}'
    const items = keys.map((k) => `${pad1}"${k}": ${pyVal(v[k], indent + 1)},`).join('\n')
    return `{\n${items}\n${pad}}`
  }
  return `"${String(v).replace(/"/g, '\\"')}"`
}

function curlSnippet(method, url, headers, body) {
  const lines = [`curl -X ${method} "${url}"`]
  for (const [k, v] of headers) lines.push(`  -H "${k}: ${v}"`)
  if (body) lines.push(`  -d '${JSON.stringify(body, null, 2).replace(/'/g, "'\\''")}'`)
  return lines.map((l, i) => (i < lines.length - 1 ? l + ' \\' : l)).join('\n')
}

function jsSnippet(method, url, headers, body) {
  const hdr = headers.map(([k, v]) => `    "${k}": "${v}",`).join('\n')
  const opts = [`  method: "${method}",`, `  headers: {\n${hdr}\n  },`]
  if (body) opts.push(`  body: JSON.stringify(${JSON.stringify(body, null, 2)}),`)
  return [
    `const response = await fetch("${url}", {`,
    ...opts,
    `});`,
    ``,
    `const data = await response.json();`,
    `console.log(data);`,
  ].join('\n')
}

function phpSnippet(method, url, headers, body) {
  const hdr = headers.map(([k, v]) => `        '${k}' => '${v}',`).join('\n')
  const opts = [`    'headers' => [\n${hdr}\n    ],`]
  if (body) opts.push(`    'json' => ${phpVal(body, 1)},`)
  return [
    `<?php`,
    ``,
    `$client = new \\GuzzleHttp\\Client();`,
    ``,
    `$response = $client->request('${method}', '${url}', [`,
    ...opts,
    `]);`,
    ``,
    `$data = json_decode($response->getBody(), true);`,
  ].join('\n')
}

function pySnippet(method, url, headers, body) {
  const hdr = headers.map(([k, v]) => `    "${k}": "${v}",`).join('\n')
  const lines = [`import requests`, ``, `url = "${url}"`, ``, `headers = {\n${hdr}\n}`]
  if (body) lines.push(``, `payload = ${pyVal(body, 0)}`)
  const call = body
    ? `response = requests.${method.toLowerCase()}(url, headers=headers, json=payload)`
    : `response = requests.${method.toLowerCase()}(url, headers=headers)`
  lines.push(``, call, ``, `data = response.json()`, `print(data)`)
  return lines.join('\n')
}

function prettyJson(content) {
  if (content === undefined || content === null || content === '') return null
  try {
    return JSON.stringify(JSON.parse(content), null, 2)
  } catch {
    return String(content)
  }
}

function pickResponses(responses) {
  const list = Array.isArray(responses) ? responses : []
  const ok = list.find((r) => r.status >= 200 && r.status < 300) || list[0]
  const err = list.find((r) => r.status >= 400)
  return { ok, err }
}

function renderEndpoint(ep) {
  const m = ep.metadata || {}
  const method = (ep.httpMethods && ep.httpMethods[0]) || 'GET'
  const url = fullUrl(ep)
  const body = ep.cleanBodyParameters && Object.keys(ep.cleanBodyParameters).length ? ep.cleanBodyParameters : null
  const headers = headerList(ep)

  const out = []
  out.push(`## ${m.title || ep.uri}\n`)
  out.push(`<Badge type="tip" text="${method}" /> \`/${ep.uri}\`\n`)
  if (m.description) out.push(`${stripHtml(m.description)}\n`)
  if (m.authenticated) out.push('> 🔒 Requires a valid Bearer token.\n')

  out.push(renderParamTable('Path parameters', paramRows(ep.urlParameters), false))
  out.push(renderParamTable('Query parameters', paramRows(ep.queryParameters), true))
  out.push(renderParamTable('Body parameters', paramRows(ep.bodyParameters), false))

  out.push('::: code-group\n')
  out.push('```bash [cURL]\n' + curlSnippet(method, url, headers, body) + '\n```\n')
  out.push('```javascript [JavaScript]\n' + jsSnippet(method, url, headers, body) + '\n```\n')
  out.push('```php [PHP]\n' + phpSnippet(method, url, headers, body) + '\n```\n')
  out.push('```python [Python]\n' + pySnippet(method, url, headers, body) + '\n```\n')
  out.push(':::\n')

  const { ok, err } = pickResponses(ep.responses)
  const okJson = ok ? prettyJson(ok.content) : null
  const okIsError = ok && ok.status >= 400
  if (okJson) {
    const label = okIsError ? 'Error response' : 'Example response'
    out.push(`**${label}** <Badge type="${okIsError ? 'danger' : 'info'}" text="${ok.status || 200}" />\n`)
    out.push('```json\n' + okJson + '\n```\n')
  }
  if (err && err !== ok) {
    const errJson = prettyJson(err.content)
    if (errJson) {
      out.push(`::: details Error response — ${err.status}\n`)
      out.push('```json\n' + errJson + '\n```\n')
      out.push(':::\n')
    }
  }
  out.push('\n---\n')
  return out.join('\n')
}

function main() {
  if (!fs.existsSync(SCRIBE_DIR)) {
    console.error(`Scribe dir not found: ${SCRIBE_DIR}\nSet AUREUS_SCRIBE_DIR to override.`)
    process.exit(1)
  }

  const files = fs.readdirSync(SCRIBE_DIR).filter((f) => /\.ya?ml$/.test(f) && !f.startsWith('custom')).sort()

  const groups = new Map()
  let total = 0
  let order = 0

  for (const file of files) {
    const doc = yaml.load(fs.readFileSync(path.join(SCRIBE_DIR, file), 'utf8'))
    for (const ep of (doc && doc.endpoints) || []) {
      const gName = (ep.metadata && ep.metadata.groupName) || doc.name || 'Other'
      const gi = groupInfo(gName)
      if (!groups.has(gi.slug)) groups.set(gi.slug, { title: gi.title, order: order++, subgroups: new Map() })
      const g = groups.get(gi.slug)
      const subName = (ep.metadata && ep.metadata.subgroup) || g.title
      if (!g.subgroups.has(subName)) g.subgroups.set(subName, { slug: slugify(subName), endpoints: [] })
      g.subgroups.get(subName).endpoints.push(ep)
      total++
    }
  }

  fs.rmSync(ENDPOINTS_DIR, { recursive: true, force: true })
  fs.mkdirSync(ENDPOINTS_DIR, { recursive: true })

  const sidebarGroups = []
  let pageCount = 0

  for (const [gSlug, g] of [...groups.entries()].sort((a, b) => a[1].order - b[1].order)) {
    fs.mkdirSync(path.join(ENDPOINTS_DIR, gSlug), { recursive: true })
    const subItems = []

    for (const [subName, sub] of g.subgroups) {
      const md = []
      md.push('<!-- AUTO-GENERATED by .vitepress/scripts/gen-api-docs.mjs — do not edit by hand. -->\n')
      md.push(`# ${subName}\n`)
      md.push(
        `Part of the **${g.title}** API. Base URL \`${BASE_URL}/admin/api/v1\` — replace the host with your ` +
          'own installation and the token placeholder with a real Bearer token ' +
          '(see [Authentication](/master/api-reference/authentication)).\n'
      )
      for (const ep of sub.endpoints) md.push(renderEndpoint(ep))

      const rel = path.join(gSlug, `${sub.slug}.md`)
      fs.writeFileSync(path.join(ENDPOINTS_DIR, rel), md.join('\n'))
      subItems.push({ text: subName, link: `${LINK_BASE}/${gSlug}/${sub.slug}` })
      pageCount++
    }

    sidebarGroups.push({ text: g.title, slug: gSlug, items: subItems })
  }

  const node = {
    text: 'AureusERP API',
    collapsed: false,
    items: [
      { text: 'Introduction', link: '/master/api-reference/index' },
      { text: 'Authentication', link: '/master/api-reference/authentication' },
      { text: 'Making Requests', link: '/master/api-reference/making-requests' },
      { text: 'Errors & Status Codes', link: '/master/api-reference/errors' },
      ...sidebarGroups.map((sg) => ({ text: sg.text, collapsed: true, items: sg.items })),
    ],
  }
  const banner = '// AUTO-GENERATED by .vitepress/scripts/gen-api-docs.mjs — do not edit by hand.\n'
  fs.writeFileSync(SIDEBAR_FILE, banner + 'const apiReference = ' + JSON.stringify(node, null, 2) + '\n\nexport default apiReference\n')

  console.log(`Wrote ${pageCount} pages across ${groups.size} groups, ${total} endpoints total.`)
  for (const sg of sidebarGroups) console.log(`  ${sg.slug.padEnd(12)} ${String(sg.items.length).padStart(3)} subgroups`)
  console.log(`Sidebar fragment: ${path.relative(REPO_ROOT, SIDEBAR_FILE)}`)
}

main()
