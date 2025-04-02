import{_ as i,c as a,o as e,ah as t}from"./chunks/framework.C2OYgiIb.js";const n="/assets/table-filters-view.BkeEgGzY.png",l="/assets/filter-view.CdycDmnS.png",E=JSON.parse('{"title":"Overview","description":"","frontmatter":{},"headers":[],"relativePath":"master/advanced/table-views.md","filePath":"master/advanced/table-views.md","lastUpdated":1743568045000}'),h={name:"master/advanced/table-views.md"};function p(k,s,r,d,o,g){return e(),a("div",null,s[0]||(s[0]=[t(`<h1 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h1><p>The <strong>Table Views</strong> is a powerful feature in Aureus ERP that enhances data filtering and organization capabilities. It provides advanced customization options for table filters throughout the application, allowing users to create, save, and manage personalized views of tabular data.</p><h2 id="core-components" tabindex="-1">Core Components <a class="header-anchor" href="#core-components" aria-label="Permalink to &quot;Core Components&quot;">​</a></h2><h3 id="presetview-class" tabindex="-1">PresetView Class <a class="header-anchor" href="#presetview-class" aria-label="Permalink to &quot;PresetView Class&quot;">​</a></h3><p>The <code>PresetView</code> class extends Filament&#39;s <code>Tab</code> component and serves as the foundation for creating predefined table views. It provides functionality for creating customizable, savable views with various properties.</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">namespace</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Webkul\\TableViews\\Filament\\Components</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h4 id="key-properties" tabindex="-1">Key Properties <a class="header-anchor" href="#key-properties" aria-label="Permalink to &quot;Key Properties&quot;">​</a></h4><ul><li><strong>ID</strong>: Unique identifier for the preset view</li><li><strong>Color</strong>: Visual indicator for the view tab</li><li><strong>Default Status</strong>: Whether the view is set as default</li><li><strong>Favorite Status</strong>: Whether the view is marked as a favorite</li><li><strong>Editability</strong>: Whether the view can be edited</li><li><strong>Replaceability</strong>: Whether the view can be replaced</li><li><strong>Deletability</strong>: Whether the view can be deleted</li></ul><h4 id="main-methods" tabindex="-1">Main Methods <a class="header-anchor" href="#main-methods" aria-label="Permalink to &quot;Main Methods&quot;">​</a></h4><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Set the color of the view</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Closure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $color)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Set as a favorite view</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> favorite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Closure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $condition </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Set as the default view</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Closure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $condition </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Check if view is set as default</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Check if view is a favorite</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isFavorite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Additional helper methods for status checks</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isEditable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isReplaceable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isDeletable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span></code></pre></div><h2 id="saved-view-system" tabindex="-1">Saved View System <a class="header-anchor" href="#saved-view-system" aria-label="Permalink to &quot;Saved View System&quot;">​</a></h2><h3 id="savedview-class" tabindex="-1">SavedView Class <a class="header-anchor" href="#savedview-class" aria-label="Permalink to &quot;SavedView Class&quot;">​</a></h3><p>The <code>SavedView</code> class extends <code>PresetView</code> to handle user-created custom views:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">namespace</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Webkul\\TableViews\\Filament\\Components</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h4 id="key-features" tabindex="-1">Key Features <a class="header-anchor" href="#key-features" aria-label="Permalink to &quot;Key Features&quot;">​</a></h4><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Associate with a TableView model</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TableView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $model)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Get the associated model</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> TableView</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Check favorite status</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isFavorite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Check public visibility</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isPublic</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Permission checks</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isEditable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isReplaceable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isDeletable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span></code></pre></div><h3 id="hastableviews-trait" tabindex="-1">HasTableViews Trait <a class="header-anchor" href="#hastableviews-trait" aria-label="Permalink to &quot;HasTableViews Trait&quot;">​</a></h3><p>The <code>HasTableViews</code> trait is used in Filament resource pages to implement table view functionality. It provides the infrastructure to define and manage preset views for tables.</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">namespace</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Webkul\\TableViews\\Filament\\Concerns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>When applied to a resource page, this trait:</p><ul><li>Enables the definition of preset views through the <code>getPresetTableViews()</code> method</li><li>Handles saving, loading, and managing user-specific views</li><li>Integrates with Filament&#39;s table component to apply filters and sorting</li></ul><h2 id="implementation-example" tabindex="-1">Implementation Example <a class="header-anchor" href="#implementation-example" aria-label="Permalink to &quot;Implementation Example&quot;">​</a></h2><p>The <code>ListBlogs</code> class demonstrates how to implement table views in a resource page:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">namespace</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Webkul\\Blog\\Filament\\Admin\\Clusters\\Blog\\Resources\\BlogResource\\Pages</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>This class uses the <code>HasTableViews</code> trait and defines multiple preset views for the Blogs table:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getPresetTableViews</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> array</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;my_posts&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PresetView</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;My Posts&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;heroicon-o-user&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">favorite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modifyQueryUsing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Builder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $query) =&gt; $query</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;user_id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Auth</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())),</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // Additional views defined...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="customizing-queries" tabindex="-1">Customizing Queries <a class="header-anchor" href="#customizing-queries" aria-label="Permalink to &quot;Customizing Queries&quot;">​</a></h2><p>Each preset view can modify the underlying query using the <code>modifyQueryUsing</code> method. This allows for powerful filtering capabilities:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modifyQueryUsing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Builder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $query) =&gt; $query</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;author_id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Auth</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()))</span></span></code></pre></div><h2 id="user-favorites-system" tabindex="-1">User Favorites System <a class="header-anchor" href="#user-favorites-system" aria-label="Permalink to &quot;User Favorites System&quot;">​</a></h2><p>The system includes a favorites mechanism through the <code>TableViewFavorite</code> model, which stores user preferences for views:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isFavorite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    $tableViewFavorite </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> TableViewFavorite</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">query</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;user_id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">auth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;view_type&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;preset&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;view_key&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, $id)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">first</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) ($tableViewFavorite</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">is_favorite </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">??</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> $this</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">evaluate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">$this</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">isFavorite));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="icons-and-visual-indicators" tabindex="-1">Icons and Visual Indicators <a class="header-anchor" href="#icons-and-visual-indicators" aria-label="Permalink to &quot;Icons and Visual Indicators&quot;">​</a></h2><p>Preset views can include icons for better visual recognition:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;heroicon-o-clock&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="localization-support" tabindex="-1">Localization Support <a class="header-anchor" href="#localization-support" aria-label="Permalink to &quot;Localization Support&quot;">​</a></h2><p>The example shows proper use of translation strings for view labels:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PresetView</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;blogs::filament/admin/clusters/blogs/resources/posts/pages/list-posts.tabs.my-posts&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre></div><h2 id="example-output-of-table-view-filters" tabindex="-1"><strong>Example Output of Table View Filters</strong> <a class="header-anchor" href="#example-output-of-table-view-filters" aria-label="Permalink to &quot;**Example Output of Table View Filters**&quot;">​</a></h2><p><img src="`+n+'" alt="Table View Filters"></p><h2 id="example-output-of-filters-view" tabindex="-1"><strong>Example Output of Filters View</strong> <a class="header-anchor" href="#example-output-of-filters-view" aria-label="Permalink to &quot;**Example Output of Filters View**&quot;">​</a></h2><p><img src="'+l+'" alt="Table View Filters"></p><h2 id="database-structure" tabindex="-1">Database Structure <a class="header-anchor" href="#database-structure" aria-label="Permalink to &quot;Database Structure&quot;">​</a></h2><p>The table views system relies on database tables to store:</p><ul><li>User-defined views</li><li>Favorite status for views</li><li>Default view preferences</li></ul><h2 id="integration-with-filament" tabindex="-1">Integration with Filament <a class="header-anchor" href="#integration-with-filament" aria-label="Permalink to &quot;Integration with Filament&quot;">​</a></h2><p>Table Views integrates with Filament&#39;s resources and table components, extending their capabilities while maintaining compatibility with the Filament ecosystem.</p><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Naming Convention</strong>: Use clear, descriptive keys for your preset views</li><li><strong>Query Optimization</strong>: Be mindful of query performance when using <code>modifyQueryUsing</code></li><li><strong>User Experience</strong>: Set sensible default views for different user roles</li><li><strong>Translations</strong>: Use localization keys for all user-facing text</li><li><strong>Icons</strong>: Choose meaningful icons that help users identify view purposes</li></ol><h2 id="extending-table-views" tabindex="-1">Extending Table Views <a class="header-anchor" href="#extending-table-views" aria-label="Permalink to &quot;Extending Table Views&quot;">​</a></h2><p>The Table Views system can be extended with:</p><ul><li>Custom view types beyond presets</li><li>Additional filtering mechanisms</li><li>User permission controls for view management</li><li>Export functionality for specific views</li><li>Scheduled or automated view generation</li></ul><p>By leveraging Table Views in Aureus ERP, you can create a more personalized and efficient data browsing experience for your users, allowing them to quickly access the specific data subsets they need.</p>',53)]))}const y=i(h,[["render",p]]);export{E as __pageData,y as default};
