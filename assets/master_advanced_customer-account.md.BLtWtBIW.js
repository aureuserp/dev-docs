import{_ as a,c as i,o as n,ah as e}from"./chunks/framework.C2OYgiIb.js";const c=JSON.parse('{"title":"Overview","description":"","frontmatter":{},"headers":[],"relativePath":"master/advanced/customer-account.md","filePath":"master/advanced/customer-account.md","lastUpdated":1743568045000}'),t={name:"master/advanced/customer-account.md"};function l(h,s,r,o,p,d){return n(),i("div",null,s[0]||(s[0]=[e(`<h1 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h1><p>The <strong>Customer Account</strong> in Aureus ERP is a <strong>website plugin</strong> that enables frontend functionalities, including customer authentication, profile management, and content display. This plugin integrates with the <code>Partner</code> model for handling frontend authentication and user management.</p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><p>To install the <strong>Website Plugin</strong>, run the following command:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> artisan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> website:install</span></span></code></pre></div><p>This command will install the necessary components to enable the frontend for customer access and authentication.</p><h2 id="laravel-authentication-providers" tabindex="-1">Laravel Authentication Providers <a class="header-anchor" href="#laravel-authentication-providers" aria-label="Permalink to &quot;Laravel Authentication Providers&quot;">​</a></h2><p>Aureus ERP utilizes Laravel&#39;s authentication system with a custom provider configuration for customers. The authentication configuration in <code>config/auth.php</code> includes:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;providers&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;users&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;driver&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;eloquent&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;model&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  =&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> env</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;AUTH_MODEL&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Webkul\\Security\\Models\\User</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;customers&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;driver&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;eloquent&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;model&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  =&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> env</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;AUTH_MODEL&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Webkul\\Website\\Models\\Partner</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span></code></pre></div><h3 id="explanation" tabindex="-1">Explanation <a class="header-anchor" href="#explanation" aria-label="Permalink to &quot;Explanation&quot;">​</a></h3><ul><li><strong>Users Provider:</strong> Uses the <code>User</code> model from <code>Webkul\\Security\\Models\\User</code> for backend authentication.</li><li><strong>Customers Provider:</strong> Uses the <code>Partner</code> model from <code>Webkul\\Website\\Models\\Partner</code> for handling customer authentication on the frontend.</li></ul><h2 id="blog-module-installation" tabindex="-1">Blog Module Installation <a class="header-anchor" href="#blog-module-installation" aria-label="Permalink to &quot;Blog Module Installation&quot;">​</a></h2><p>To enable blog functionality, install the <strong>Blog Plugin</strong> using:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> artisan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> blogs:install</span></span></code></pre></div><h3 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h3><ul><li>Displays blogs on the frontend.</li><li>Allows users to manage and update their profiles.</li><li>Dynamically updates menus based on installed plugins.</li></ul><h2 id="dynamic-plugin-management" tabindex="-1">Dynamic Plugin Management <a class="header-anchor" href="#dynamic-plugin-management" aria-label="Permalink to &quot;Dynamic Plugin Management&quot;">​</a></h2><p>Aureus ERP dynamically adjusts frontend menus based on installed plugins, ensuring:</p><ul><li>Only relevant sections are displayed to users.</li><li>Seamless integration of new features without additional configuration.</li></ul>`,19)]))}const u=a(t,[["render",l]]);export{c as __pageData,u as default};
