# Contribution Guide

## Bug Reports

At Aureus ERP, we highly value community collaboration to enhance our platform's performance and reliability. We encourage users to report bugs and submit pull requests to help improve the system.

Instead of just reporting issues, we appreciate contributions that include fixes or negative test cases highlighting the problem. This approach not only identifies issues but also provides solutions, making the resolution process more efficient.

When submitting a bug report, please include:

- A clear and descriptive title
- A detailed description of the encountered issue
- Relevant information such as error messages, logs, or steps to reproduce the issue
- A code sample (if applicable) that demonstrates the bug

Providing comprehensive reports helps us quickly troubleshoot and resolve issues, benefiting the entire community.

## Projects to Contribute

You can contribute to the following Aureus ERP projects:

- [Aureus ERP Core](https://github.com/aureuserp/aureuserp)
- [Aureus ERP Documentation](https://github.com/aureuserp/dev-docs)

## Feature Requests

We welcome proposals for new features and enhancements. If you have a feature in mind, be prepared to contribute code or provide detailed specifications on how it should work. Features that introduce breaking changes should be submitted for the next major release.

## Branch Selection

Before submitting a pull request, follow these branch selection guidelines:

- **Bug Fixes**: Submit fixes to the `master` branch.
- **Critical Bug Fixes**: Apply fixes to the latest stable version before merging them into `master`.
- **New Features**: Submit to the `develop` branch for inclusion in the next major release.

## Coding Standards

Aureus ERP follows PHP coding best practices based on **PSR-12** standards for consistency and maintainability. Adhering to these guidelines helps keep the codebase clean and readable.

### PHPDoc

Below is an example of a valid Aureus ERP doc block:

```php
/**
 * Registers a service with the Aureus ERP Service Provider.
 *
 * @param  string|array  $service
 * @param  \Closure|string|null  $definition
 * @param  bool  $shared
 */
protected function registerService($service, $definition = null, $shared = false): void
{
    // Implementation here
}
```

## Running Pint Tests

We use <a href="https://github.com/laravel/pint" rel="nofollow external noopener noreferrer" target="_blank">Laravel Pint</a> for automated code formatting. Ensure all Pint tests pass before submitting a pull request.

To run Pint locally, execute:

```sh
vendor/bin/pint
```

## Security Vulnerabilities

If you discover a security vulnerability in Aureus ERP, please notify us immediately by sending an email to [security@aureuserp.com](mailto:security@aureuserp.com). Security issues are taken seriously and addressed promptly.

---

By contributing to Aureus ERP, you help make the platform more robust, secure, and feature-rich. Thank you for being a part of our growing open-source community!
