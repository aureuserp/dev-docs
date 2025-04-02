import{_ as a,c as t,o as i,ah as s}from"./chunks/framework.C2OYgiIb.js";const u=JSON.parse('{"title":"Overview","description":"","frontmatter":{},"headers":[],"relativePath":"master/advanced/chatter/actions/message.md","filePath":"master/advanced/chatter/actions/message.md","lastUpdated":1743568045000}'),o={name:"master/advanced/chatter/actions/message.md"};function n(r,e,l,h,c,d){return i(),t("div",null,e[0]||(e[0]=[s('<h1 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h1><p>The <code>MessageAction</code> class is a custom FilamentPHP action designed for sending messages within the Aureus ERP system. It allows users to compose messages, attach files, and notify followers via email.</p><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h2><ul><li>Rich text message composition</li><li>Optional subject field</li><li>File attachments</li><li>Automatic notification to followers</li><li>Email integration for message delivery</li></ul><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><h3 id="_1-defining-the-action" tabindex="-1">1. Defining the Action <a class="header-anchor" href="#_1-defining-the-action" aria-label="Permalink to &quot;1. Defining the Action&quot;">​</a></h3><p>The <code>MessageAction</code> is an extension of FilamentPHP&#39;s <code>Action</code> class. It provides a structured form for users to create messages with optional attachments.</p><h3 id="_2-available-methods" tabindex="-1">2. Available Methods <a class="header-anchor" href="#_2-available-methods" aria-label="Permalink to &quot;2. Available Methods&quot;">​</a></h3><h4 id="getdefaultname-string" tabindex="-1"><code>getDefaultName(): ?string</code> <a class="header-anchor" href="#getdefaultname-string" aria-label="Permalink to &quot;`getDefaultName(): ?string`&quot;">​</a></h4><p>Returns the default name of the action (<code>message.action</code>).</p><h4 id="setresource-string-resource-self" tabindex="-1"><code>setResource(string $resource): self</code> <a class="header-anchor" href="#setresource-string-resource-self" aria-label="Permalink to &quot;`setResource(string $resource): self`&quot;">​</a></h4><p>Sets the resource associated with this action.</p><h4 id="setmessagemailview-string-mailview-self" tabindex="-1"><code>setMessageMailView(?string $mailView): self</code> <a class="header-anchor" href="#setmessagemailview-string-mailview-self" aria-label="Permalink to &quot;`setMessageMailView(?string $mailView): self`&quot;">​</a></h4><p>Defines a custom email view for message notifications.</p><h4 id="getmessagemailview-string" tabindex="-1"><code>getMessageMailView(): string</code> <a class="header-anchor" href="#getmessagemailview-string" aria-label="Permalink to &quot;`getMessageMailView(): string`&quot;">​</a></h4><p>Retrieves the currently set email view.</p><h4 id="getresource-string" tabindex="-1"><code>getResource(): string</code> <a class="header-anchor" href="#getresource-string" aria-label="Permalink to &quot;`getResource(): string`&quot;">​</a></h4><p>Returns the associated resource name.</p><h3 id="_3-form-fields" tabindex="-1">3. Form Fields <a class="header-anchor" href="#_3-form-fields" aria-label="Permalink to &quot;3. Form Fields&quot;">​</a></h3><p>The message form consists of the following fields:</p><table tabindex="0"><thead><tr><th>Field Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>subject</td><td>TextInput</td><td>Optional subject for the message</td></tr><tr><td>body</td><td>RichEditor</td><td>The main content of the message</td></tr><tr><td>attachments</td><td>FileUpload</td><td>Multiple file attachments</td></tr><tr><td>type</td><td>Hidden</td><td>Default value is <code>comment</code></td></tr></tbody></table><h3 id="_4-actions" tabindex="-1">4. Actions <a class="header-anchor" href="#_4-actions" aria-label="Permalink to &quot;4. Actions&quot;">​</a></h3><ul><li><strong>Add Subject</strong>: Allows users to toggle the visibility of the subject field.</li><li><strong>Submit Message</strong>: Saves the message, attaches files, and sends notifications.</li></ul><h3 id="_5-notifications" tabindex="-1">5. Notifications <a class="header-anchor" href="#_5-notifications" aria-label="Permalink to &quot;5. Notifications&quot;">​</a></h3><p>Success and error messages are displayed using Filament’s notification system:</p><ul><li><strong>Success:</strong> Message successfully sent</li><li><strong>Error:</strong> Error occurred while sending message</li></ul><h3 id="_6-email-notifications" tabindex="-1">6. Email Notifications <a class="header-anchor" href="#_6-email-notifications" aria-label="Permalink to &quot;6. Email Notifications&quot;">​</a></h3><p>Messages trigger an email notification to all followers of the record. The email includes:</p><ul><li>Message content</li><li>Attachments</li><li>A link to the record</li></ul><h3 id="_7-customization" tabindex="-1">7. Customization <a class="header-anchor" href="#_7-customization" aria-label="Permalink to &quot;7. Customization&quot;">​</a></h3><h4 id="change-email-view" tabindex="-1">Change Email View <a class="header-anchor" href="#change-email-view" aria-label="Permalink to &quot;Change Email View&quot;">​</a></h4><p>To modify the email view, use:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$messageAction</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setMessageMailView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;your.custom.view&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h4 id="customize-attachments" tabindex="-1">Customize Attachments <a class="header-anchor" href="#customize-attachments" aria-label="Permalink to &quot;Customize Attachments&quot;">​</a></h4><p>Attachments are stored in <code>messages-attachments</code> and can be retrieved using:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$message</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">attachments;</span></span></code></pre></div>',36)]))}const g=a(o,[["render",n]]);export{u as __pageData,g as default};
