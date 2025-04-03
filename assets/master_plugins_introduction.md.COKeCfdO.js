import{_ as a,c as n,o as i,ah as e}from"./chunks/framework.C2OYgiIb.js";const u=JSON.parse('{"title":"Introduction","description":"","frontmatter":{},"headers":[],"relativePath":"master/plugins/introduction.md","filePath":"master/plugins/introduction.md","lastUpdated":1743655005000}'),t={name:"master/plugins/introduction.md"};function p(l,s,h,o,r,k){return i(),n("div",null,s[0]||(s[0]=[e(`<h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h1><p>Aureus ERP employs a plugin-based architecture that treats each business functionality as a standalone module. This approach provides superior modularity, enabling developers to extend the system without modifying core functionality.</p><h2 id="creating-a-new-plugin" tabindex="-1">Creating a New Plugin <a class="header-anchor" href="#creating-a-new-plugin" aria-label="Permalink to &quot;Creating a New Plugin&quot;">​</a></h2><h3 id="plugin-directory-structure" tabindex="-1">Plugin Directory Structure <a class="header-anchor" href="#plugin-directory-structure" aria-label="Permalink to &quot;Plugin Directory Structure&quot;">​</a></h3><p>Begin by creating a new directory in the <code>plugins/</code> folder with your plugin&#39;s name using kebab-case:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>plugins/</span></span>
<span class="line"><span>├── my-new-plugin/</span></span></code></pre></div><h3 id="setting-up-the-basic-structure" tabindex="-1">Setting Up the Basic Structure <a class="header-anchor" href="#setting-up-the-basic-structure" aria-label="Permalink to &quot;Setting Up the Basic Structure&quot;">​</a></h3><p>Every plugin must adhere to the following structure (using a blog plugin as an example):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+-- plugins</span></span>
<span class="line"><span>|   +-- blogs</span></span>
<span class="line"><span>|   |   +-- database</span></span>
<span class="line"><span>|   |   |   +-- factories                     # Factory classes for generating test data</span></span>
<span class="line"><span>|   |   |   +-- migrations                    # Plugin-specific database migrations</span></span>
<span class="line"><span>|   |   |   +-- seeders                       # Plugin-specific database seeders</span></span>
<span class="line"><span>|   |   |   +-- settings                      # Plugin-specific database settings</span></span>
<span class="line"><span>|   |   +-- resources</span></span>
<span class="line"><span>|   |   |   +-- views                         # Blade views for UI templates</span></span>
<span class="line"><span>|   |   |   +-- lang                          # Language translations</span></span>
<span class="line"><span>|   |   +-- src</span></span>
<span class="line"><span>|   |   |   +-- Filament</span></span>
<span class="line"><span>|   |   |   |   +-- Clusters</span></span>
<span class="line"><span>|   |   |   |   +-- Resources</span></span>
<span class="line"><span>|   |   |   |   +-- Pages</span></span>
<span class="line"><span>|   |   |   +-- Livewire                      # Livewire components for UI interactivity</span></span>
<span class="line"><span>|   |   |   +-- Models                        # Plugin-specific Eloquent models</span></span>
<span class="line"><span>|   |   |   +-- Policies                      # Authorization policies for plugin entities</span></span>
<span class="line"><span>|   |   |   +-- Routes</span></span>
<span class="line"><span>|   |   |   |   +-- web.php                   # Web routes (if needed)</span></span>
<span class="line"><span>|   |   |   |   +-- api.php                   # API routes (if needed)</span></span>
<span class="line"><span>|   |   |   +-- Services                      # Business logic encapsulated in service classes</span></span>
<span class="line"><span>|   |   |   +-- BlogPlugin.php                # Registers Filament-related stuff</span></span>
<span class="line"><span>|   |   |   +-- BlogServiceProvider.php       # Handles migrations, settings, install &amp; uninstall</span></span>
<span class="line"><span>|   |   +-- .gitignore                        # Github related file.</span></span>
<span class="line"><span>|   |   +-- config                            # Plugin-specific configuration files (if needed)</span></span>
<span class="line"><span>|   |   +-- package.json                      # Package.json</span></span>
<span class="line"><span>|   |   +-- postcss.config.js                 # Postcss config</span></span>
<span class="line"><span>|   |   +-- tailwind.config.js                # Tailwind css config</span></span>
<span class="line"><span>|   |   +-- tests                             # Unit and feature tests</span></span>
<span class="line"><span>|   |   +-- composer.json                     # Plugin&#39;s composer dependencies</span></span></code></pre></div><h3 id="configuring-composer-json" tabindex="-1">Configuring composer.json <a class="header-anchor" href="#configuring-composer-json" aria-label="Permalink to &quot;Configuring composer.json&quot;">​</a></h3><p>Create a <code>composer.json</code> file with the following structure:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;webkul/blogs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Blog posts management for Aureus ERP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;authors&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Aureus ERP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;email&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;support@aureuserp.in&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;extra&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;laravel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;providers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Webkul</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\\\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Blog</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\\\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">BlogServiceProvider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;aliases&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;autoload&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;psr-4&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;Webkul\\\\Blog\\\\&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;src/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;Webkul\\\\Blog\\\\Database\\\\Factories\\\\&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;database/factories/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;Webkul\\\\Blog\\\\Database\\\\Seeders\\\\&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;database/seeders/&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;autoload-dev&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;psr-4&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;Webkul\\\\Blog\\\\Tests\\\\&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;tests/&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,12)]))}const d=a(t,[["render",p]]);export{u as __pageData,d as default};
