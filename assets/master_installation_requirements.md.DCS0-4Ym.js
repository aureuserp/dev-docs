import{_ as t,c as i,o as a,ah as o}from"./chunks/framework.C2OYgiIb.js";const c=JSON.parse('{"title":"Requirements","description":"","frontmatter":{},"headers":[],"relativePath":"master/installation/requirements.md","filePath":"master/installation/requirements.md","lastUpdated":1743655005000}'),s={name:"master/installation/requirements.md"};function n(r,e,l,p,d,g){return a(),i("div",null,e[0]||(e[0]=[o(`<h1 id="requirements" tabindex="-1">Requirements <a class="header-anchor" href="#requirements" aria-label="Permalink to &quot;Requirements&quot;">​</a></h1><h2 id="server-configuration" tabindex="-1">Server Configuration <a class="header-anchor" href="#server-configuration" aria-label="Permalink to &quot;Server Configuration&quot;">​</a></h2><ul><li><strong>Server</strong>: Apache 2 or NGINX</li><li><strong>RAM</strong>: 4GB or higher</li><li><strong>Node.js &amp; NPM</strong>: Latest stable versions</li><li><strong>PHP</strong>: 8.2 or higher</li><li><strong>Laravel</strong>: 11.x</li><li><strong>FilamentPHP</strong>: 3.x</li><li><strong>Composer</strong>: Latest version</li><li><strong>Database</strong>: MySQL 8.0+ or SQLite</li><li><strong>Browser</strong>: A modern browser (Chrome, Firefox, Edge)</li></ul><h2 id="php-extensions" tabindex="-1">PHP Extensions <a class="header-anchor" href="#php-extensions" aria-label="Permalink to &quot;PHP Extensions&quot;">​</a></h2><p>Ensure the following extensions are installed and enabled. You can check using the <strong><code>phpinfo()</code></strong> page or the <strong><code>php -m</code></strong> command.</p><ul><li><strong>php-intl</strong>: Required for internationalization support.</li><li><strong>php-gd</strong>: Required for image processing and manipulation.</li><li><strong>OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON</strong>: Essential extensions for Laravel and FilamentPHP.</li></ul><h2 id="php-configuration" tabindex="-1">PHP Configuration <a class="header-anchor" href="#php-configuration" aria-label="Permalink to &quot;PHP Configuration&quot;">​</a></h2><p>Modify your <strong><code>php.ini</code></strong> file with the following settings:</p><ul><li><strong>memory_limit</strong>: Set to <strong><code>4G</code></strong> or higher for optimal performance.</li><li><strong>max_execution_time</strong>: Adjust to <strong><code>360</code></strong> seconds or higher to allow long-running scripts.</li><li><strong>date.timezone</strong>: Set to your specific timezone (e.g., <strong><code>Asia/Kolkata</code></strong>).</li></ul><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">memory_limit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 4G</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">max_execution_time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 360</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">date.timezone</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = Asia/Kolkata </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; Change this to your timezone.</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">Remember to restart your web server</p><p>After modifying the PHP configuration, restart Apache or NGINX to apply changes.</p></div><h2 id="supported-database-servers" tabindex="-1">Supported Database Servers <a class="header-anchor" href="#supported-database-servers" aria-label="Permalink to &quot;Supported Database Servers&quot;">​</a></h2><p>The application supports the following database servers:</p><ul><li><strong>MySQL</strong>: Version 8.0+ is recommended for optimal performance.</li><li><strong>SQLite</strong>: Alternative lightweight database option.</li></ul><h3 id="database-collation" tabindex="-1">Database Collation <a class="header-anchor" href="#database-collation" aria-label="Permalink to &quot;Database Collation&quot;">​</a></h3><p>The recommended collation is <strong><code>utf8mb4_unicode_ci</code></strong>, ensuring proper Unicode and multilingual support.</p>`,16)]))}const u=t(s,[["render",n]]);export{c as __pageData,u as default};
