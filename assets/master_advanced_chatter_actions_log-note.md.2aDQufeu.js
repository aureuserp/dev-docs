import{_ as i,c as a,o as t,ah as n}from"./chunks/framework.C2OYgiIb.js";const o=JSON.parse('{"title":"Overview","description":"","frontmatter":{},"headers":[],"relativePath":"master/advanced/chatter/actions/log-note.md","filePath":"master/advanced/chatter/actions/log-note.md","lastUpdated":1743655005000}'),e={name:"master/advanced/chatter/actions/log-note.md"};function l(h,s,k,p,r,d){return t(),a("div",null,s[0]||(s[0]=[n(`<h1 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h1><p>The <code>LogAction</code> is a FilamentPHP action designed for logging internal messages or notes related to a specific record within Aureus ERP. It allows users to add detailed logs with subjects, rich-text descriptions, and file attachments while ensuring that internal messages remain properly categorized and attributed to the correct user.</p><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h2><ul><li>Supports adding a subject line optionally.</li><li>Utilizes a rich text editor for detailed message descriptions.</li><li>Allows file attachments with multiple file formats.</li><li>Associates logs with the authenticated user.</li><li>Provides real-time visibility toggling for the subject field.</li><li>Displays success and error notifications.</li><li>Uses a modal for user input.</li></ul><h2 id="action-registration" tabindex="-1">Action Registration <a class="header-anchor" href="#action-registration" aria-label="Permalink to &quot;Action Registration&quot;">​</a></h2><p>The <code>LogAction</code> is a FilamentPHP action that should be registered within your Filament resource or component:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Webkul\\Chatter\\Filament\\Actions\\Chatter\\LogAction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">LogAction</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Log Message&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modalHeading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Add Log Entry&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;heroicon-o-chat-bubble-oval-left&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h2 id="form-schema" tabindex="-1">Form Schema <a class="header-anchor" href="#form-schema" aria-label="Permalink to &quot;Form Schema&quot;">​</a></h2><p>The form consists of:</p><ol><li><strong>Subject (optional)</strong>: Can be toggled using the <code>add_subject</code> action.</li><li><strong>Rich Text Editor</strong>: Captures the detailed log message.</li><li><strong>File Attachments</strong>: Allows uploading images, PDFs, Word documents, Excel sheets, and plain text files.</li><li><strong>Hidden Field</strong>: Ensures the type is set to <code>note</code>.</li></ol><h3 id="toggle-subject-field" tabindex="-1">Toggle Subject Field <a class="header-anchor" href="#toggle-subject-field" aria-label="Permalink to &quot;Toggle Subject Field&quot;">​</a></h3><p>A button labeled <code>Add Subject</code> or <code>Hide Subject</code> controls the visibility of the subject input field dynamically.</p><h3 id="rich-text-editor" tabindex="-1">Rich Text Editor <a class="header-anchor" href="#rich-text-editor" aria-label="Permalink to &quot;Rich Text Editor&quot;">​</a></h3><ul><li>Enables detailed descriptions with text formatting.</li><li>Supports file attachments within the editor.</li><li>Disables Grammarly to prevent conflicts.</li></ul><h3 id="file-upload" tabindex="-1">File Upload <a class="header-anchor" href="#file-upload" aria-label="Permalink to &quot;File Upload&quot;">​</a></h3><ul><li>Supports multiple file types: images, PDFs, Word, Excel, and text files.</li><li>Uploads files to the <code>log-attachments</code> directory.</li><li>Displays preview for uploaded files.</li></ul><h2 id="action-execution" tabindex="-1">Action Execution <a class="header-anchor" href="#action-execution" aria-label="Permalink to &quot;Action Execution&quot;">​</a></h2><p>When executed, <code>LogAction</code>:</p><ol><li>Retrieves the authenticated user and attaches the log entry to the respective record.</li><li>Saves the message as an internal note (<code>is_internal = true</code>).</li><li>Attaches uploaded files to the log message.</li><li>Displays success or error notifications based on the operation result.</li></ol><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">action</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $data, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $record </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        $user </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> filament</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">auth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        $data[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;name&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $record</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        $data[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;causer_type&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMorphClass</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        $data[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;causer_id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">id;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        $data[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;is_internal&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        $message </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $record</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addMessage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($data, $user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">id);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> empty</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($data[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;attachments&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            $record</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addAttachments</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($data[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;attachments&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;message_id&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $message</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">id]);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        Notification</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">success</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Log entry added successfully&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">send</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $e) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        report</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($e);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        Notification</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">danger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Failed to add log entry&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">send</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div>`,20)]))}const g=i(e,[["render",l]]);export{o as __pageData,g as default};
