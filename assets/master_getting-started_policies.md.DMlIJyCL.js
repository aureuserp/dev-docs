import{_ as i,c as e,o as a,ah as t}from"./chunks/framework.C2OYgiIb.js";const c=JSON.parse('{"title":"Overview","description":"","frontmatter":{},"headers":[],"relativePath":"master/getting-started/policies.md","filePath":"master/getting-started/policies.md","lastUpdated":1743568045000}'),n={name:"master/getting-started/policies.md"};function l(h,s,p,r,o,d){return a(),e("div",null,s[0]||(s[0]=[t(`<h1 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h1><p>Policies in <strong>Aureus ERP</strong> provide a structured way to manage authorization for different resources in the system. These policies define the actions a user can perform based on their assigned roles and permissions. The authorization logic is primarily handled using <strong>Laravel Policies</strong> combined with the <strong>Spatie Role &amp; Permission</strong> package.</p><h2 id="implementing-policies" tabindex="-1">Implementing Policies <a class="header-anchor" href="#implementing-policies" aria-label="Permalink to &quot;Implementing Policies&quot;">​</a></h2><h3 id="_1-defining-a-policy" tabindex="-1">1. <strong>Defining a Policy</strong> <a class="header-anchor" href="#_1-defining-a-policy" aria-label="Permalink to &quot;1. **Defining a Policy**&quot;">​</a></h3><p>Policies are stored within the <code>Webkul\\Blogs\\Policies</code> or <code>Webkul\\{PluginName}\\Policies</code> directory. Each policy class corresponds to a specific model and defines authorization rules for actions such as viewing, creating, updating, deleting, and restoring records.</p><p>Example structure:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">namespace</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Webkul\\Blogs\\Policies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Illuminate\\Auth\\Access\\HandlesAuthorization</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Modules\\Blogs\\Models\\Post</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Modules\\Security\\Models\\User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Modules\\Security\\Traits\\HasScopedPermissions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> PostPolicy</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    use</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> HandlesAuthorization</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">HasScopedPermissions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> viewAny</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $user)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">can</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;view_any_post&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> view</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $user, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Post</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $post)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">can</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;view_post&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="registering-policies" tabindex="-1"><strong>Registering Policies</strong> <a class="header-anchor" href="#registering-policies" aria-label="Permalink to &quot;**Registering Policies**&quot;">​</a></h2><p>FilamentPHP automatically registers policies based on naming conventions. However, if you need to manually define policies, you can do so in the <code>AuthServiceProvider</code>:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Modules\\Blogs\\Models\\Post</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Modules\\Blogs\\Policies\\PostPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">protected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $policies </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Post</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PostPolicy</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span></code></pre></div><p>By default, Filament will resolve policies automatically if they follow the standard Laravel convention (<code>ModelPolicy</code> in the same namespace). However, if your policies are located in a different namespace or you need explicit mapping, you can register them manually as shown above.</p><h2 id="policy-methods" tabindex="-1">Policy Methods <a class="header-anchor" href="#policy-methods" aria-label="Permalink to &quot;Policy Methods&quot;">​</a></h2><p>Each policy method determines whether a user has permission to perform a specific action. Common methods include:</p><table tabindex="0"><thead><tr><th>Method Name</th><th>Purpose</th></tr></thead><tbody><tr><td><code>viewAny(User $user)</code></td><td>Check if the user can list all records.</td></tr><tr><td><code>view(User $user, $model)</code></td><td>Check if the user can view a specific record.</td></tr><tr><td><code>create(User $user)</code></td><td>Check if the user can create a new record.</td></tr><tr><td><code>update(User $user, $model)</code></td><td>Check if the user can update a record.</td></tr><tr><td><code>delete(User $user, $model)</code></td><td>Check if the user can delete a record.</td></tr><tr><td><code>restore(User $user, $model)</code></td><td>Check if the user can restore a soft-deleted record.</td></tr><tr><td><code>forceDelete(User $user, $model)</code></td><td>Check if the user can permanently delete a record.</td></tr></tbody></table><h2 id="scoped-permissions-using-hasscopedpermissions" tabindex="-1">Scoped Permissions Using <code>HasScopedPermissions</code> <a class="header-anchor" href="#scoped-permissions-using-hasscopedpermissions" aria-label="Permalink to &quot;Scoped Permissions Using \`HasScopedPermissions\`&quot;">​</a></h2><p>Aureus ERP policies use the <code>HasScopedPermissions</code> trait to provide additional control over access levels based on global, group, or individual permissions.</p><h3 id="permission-levels" tabindex="-1"><strong>Permission Levels</strong> <a class="header-anchor" href="#permission-levels" aria-label="Permalink to &quot;**Permission Levels**&quot;">​</a></h3><ol><li><strong>Global Access:</strong> Users with this level can access all resources.</li><li><strong>Group Access:</strong> Users can access only resources belonging to their assigned groups.</li><li><strong>Individual Access:</strong> Users can access only the records they own.</li></ol><h3 id="trait-methods" tabindex="-1"><strong>Trait Methods</strong> <a class="header-anchor" href="#trait-methods" aria-label="Permalink to &quot;**Trait Methods**&quot;">​</a></h3><p>The <code>HasScopedPermissions</code> trait includes methods to check these permissions:</p><h3 id="access-control-methods" tabindex="-1"><strong>Access Control Methods</strong> <a class="header-anchor" href="#access-control-methods" aria-label="Permalink to &quot;**Access Control Methods**&quot;">​</a></h3><p>These methods are used to determine a user&#39;s access level based on global, group-based, and individual permissions.</p><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>hasGlobalAccess(User $user): bool</code></td><td>Checks if the user has global permissions and returns <code>true</code> if granted.</td></tr><tr><td><code>hasGroupAccess(User $user, Model $model, string $ownerAttribute = &#39;user&#39;): bool</code></td><td>Determines if the user has access based on group-level permissions. The <code>ownerAttribute</code> specifies the model&#39;s ownership attribute (default: <code>&#39;user&#39;</code>).</td></tr><tr><td><code>hasIndividualAccess(User $user, Model $model, string $ownerAttribute = &#39;user&#39;): bool</code></td><td>Verifies if the user has access only to records they own. The <code>ownerAttribute</code> represents the ownership field in the model (default: <code>&#39;user&#39;</code>).</td></tr><tr><td><code>hasAccess(User $user, Model $model, string $ownerAttribute = &#39;user&#39;): bool</code></td><td>Evaluates all access levels (<code>global</code>, <code>group</code>, and <code>individual</code>) to determine if the user has the necessary permissions. The <code>ownerAttribute</code> defines the model&#39;s ownership field, defaulting to <code>&#39;user&#39;</code>.</td></tr></tbody></table><h3 id="example-usage-in-policies" tabindex="-1"><strong>Example Usage in Policies</strong> <a class="header-anchor" href="#example-usage-in-policies" aria-label="Permalink to &quot;**Example Usage in Policies**&quot;">​</a></h3><p>The following example demonstrates how to implement these access control methods within a policy:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> update</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $user, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Post</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $post)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Check if the user has permission to update posts</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">can</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;update_post&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Verify if the user has the necessary access rights for the specific post</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> $this</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hasAccess</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($user, $post);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li>The <code>hasAccess</code> method accepts three arguments: <ol><li><strong><code>$user</code></strong> – The authenticated user model.</li><li><strong><code>$model</code></strong> – The model instance being accessed (e.g., <code>Post</code>).</li><li><strong><code>$ownerAttribute</code></strong> <em>(optional, default: <code>&#39;user&#39;</code>)</em> – The attribute that defines model ownership.</li></ol></li></ul><p>for example:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> update</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $user, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Post</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $post)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">can</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;update_post&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> $this</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hasAccess</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($user, $post, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;created_by&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>This structure ensures that users are granted access based on their global, group, or individual permissions, this means only the creator of the Post can update the record.</p>`,30)]))}const g=i(n,[["render",l]]);export{c as __pageData,g as default};
