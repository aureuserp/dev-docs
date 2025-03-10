---
layout: home
hero:
  name: Open Source ERP Platform
  text: Built on Laravel to optimize your business
  tagline: Streamline operations, boost productivity, and grow your business
  image:
    src: /assets/images/logo.png
    alt: ERP Platform
  actions:
    - theme: brand
      text: Get Started
      link: /master/prologue/introduction/
    - theme: alt
      text: View on GitHub
      link: https://github.com/aureuserp/aureuserp

features:
  - icon: 📊
    title: Project Management System
    details: Streamline projects and collaborate with ease using our comprehensive PMS
    link: /modules/pms
  - icon: 👥
    title: Contacts Management
    details: Effortlessly manage and organize your contacts with our intuitive system
    link: /modules/contacts
  - icon: 🛒
    title: Purchase Order System
    details: Simplify and track your purchases with our robust Purchase Order system
    link: /modules/purchase-order
  - icon: 👨‍💼
    title: Employee Management
    details: Manage and track employee details and performance.
    link: /modules/employee
  - icon: 💼
    title: Job Position Management
    details: Easily define, manage, and track job positions and roles.
    link: /modules/job-position
  - icon: 📦
    title: Inventory Management
    details: Stay on top of your stock levels with efficient inventory management.
    link: /modules/inventory
  - icon: 🏢
    title: Warehouse Management
    details: Simplify warehouse operations with real-time stock tracking.
    link: /modules/warehouse
  - icon: 🎓
    title: Recruitment System
    details: Simplify recruitment and find the best talent with ease.
    link: /modules/recruitment
---

## Fully featured & extensible

Our ERP platform provides a complete solution for businesses of all sizes. With modular architecture, you can use only what you need and easily extend functionality with custom modules.

<div class="grid grid-cols-2 gap-4 mt-8">
  <div class="feature-card">
    <h3>Open Source</h3>
    <p>100% open source code allows complete customization and community contributions</p>
  </div>
  <div class="feature-card">
    <h3>Laravel Based</h3>
    <p>Built on the robust Laravel framework for stability and performance</p>
  </div>
</div>

<style>
.feature-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-4 {
  gap: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}

@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
