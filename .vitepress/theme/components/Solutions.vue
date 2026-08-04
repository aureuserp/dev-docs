<template>
  <div class="features-container">
    <h2 id="enterprise-solutions" tabindex="-1" class="section-title">
      Enterprise-Grade Solutions
      <a
        class="header-anchor"
        href="#enterprise-solutions"
        aria-label='Permalink to "Enterprise-Grade Solutions"'
      ></a>
    </h2>

    <p class="section-description">
      Our comprehensive ERP platform delivers scalable solutions for organizations of all
      sizes. The modular architecture enables selective implementation and seamless
      integration of custom functionality through our extensible module system.
    </p>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <div class="feature-content">
          <h3 class="feature-title">Open Source Architecture</h3>
          <p class="feature-description">
            Fully transparent codebase enabling complete customization, community-driven
            improvements, and vendor independence
          </p>
          <div class="feature-link">
            <a href="https://github.com/aureuserp/aureuserp">Learn more →</a>
          </div>
        </div>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            ></polygon>
          </svg>
        </div>
        <div class="feature-content">
          <h3 class="feature-title">Laravel Foundation</h3>
          <p class="feature-description">
            Built on Laravel's enterprise-grade framework, ensuring exceptional
            reliability, performance, and security for mission-critical operations
          </p>
          <div class="feature-link">
            <a href="https://laravel.com" rel="nofollow external noopener noreferrer">Learn more →</a>
          </div>
        </div>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M16 12l-4 4-4-4"></path>
            <path d="M12 8v8"></path>
          </svg>
        </div>
        <div class="feature-content">
          <h3 class="feature-title">Plugin Based Design</h3>
          <p class="feature-description">
            Select only the plugins you need, with the ability to scale and expand
            functionality as your business requirements evolve
          </p>
          <div class="feature-link">
            <a href="/master/architecture/plugins">Learn more →</a>
          </div>
        </div>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <div class="feature-content">
          <h3 class="feature-title">Developer Experience</h3>
          <p class="feature-description">
            Comprehensive API documentation, modern development tools, and streamlined
            workflows for efficient implementation and customization
          </p>
          <div class="feature-link">
            <a href="/master/prologue/introduction">Learn more →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.features-container {
  margin: 3rem auto;
  max-width: 1200px;
  padding: 0 1.5rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.section-description {
  font-size: 1.125rem;
  color: var(--vp-c-text-2);
  margin-bottom: 3rem;
  max-width: 800px;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  height: 100%;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-1);
}

.feature-icon {
  color: var(--vp-c-brand-1);
  margin-right: 1.25rem;
  flex-shrink: 0;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.feature-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.feature-link {
  margin-top: auto;
}

.feature-link a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.feature-link a:hover {
  text-decoration: underline;
}

.cta-container {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
}

.cta-button.primary {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.cta-button.primary:hover {
  background-color: var(--vp-c-brand-2);
}

.cta-button.secondary {
  background-color: transparent;
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
}

.cta-button.secondary:hover {
  background-color: var(--vp-c-bg-soft);
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .cta-container {
    flex-direction: column;
  }

  .feature-card {
    flex-direction: column;
  }

  .feature-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>
