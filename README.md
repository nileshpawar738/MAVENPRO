# Enterprise Playwright + TypeScript Framework

A production-oriented starter framework using Playwright Test, TypeScript, Page Object Model, custom fixtures, UI and API tests, HTML/JUnit reporting, and CI pipelines for Jenkins and GitHub Actions.

## Prerequisites

- Node.js 22 LTS
- npm
- Git
- VS Code (recommended)

## First-time setup (Windows PowerShell)

```powershell
npm install
npx playwright install chromium
Copy-Item .env.example .env
npm run typecheck
npm run lint
npm test
```

On macOS/Linux, use `cp .env.example .env` instead of `Copy-Item`.

## Useful commands

```bash
npm test
npm run test:ui
npm run test:api
npm run test:smoke
npm run test:headed
npm run test:debug
npm run typecheck
npm run lint
npm run ci
npm run report
```

## Design decisions

- Native Playwright Test runner; no separate Cucumber runner.
- Page locators are initialized in page-object constructors.
- Tests consume page objects through custom fixtures.
- Environment configuration is centralized in `config/environment.ts`.
- Secrets and local overrides belong in `.env`; do not commit it.
- Trace, screenshots, and video are retained on failure.
- JUnit and HTML reports are generated for CI.
- UI and API tests are separate. SauceDemo is the UI target; JSONPlaceholder is used for a basic independent API smoke test.

## Jenkins setup

Configure a Jenkins NodeJS installation named `NodeJS-22` (or update the `Jenkinsfile` to match your installation), install the Pipeline and JUnit plugins, and run the pipeline on a Linux agent. If your Jenkins agent is Windows, replace shell `sh` steps with `bat` steps and adapt browser installation.

## Enterprise hardening before production adoption

- Run `npm install` once locally to generate `package-lock.json`, then commit that lockfile. After the lockfile is committed, change CI install steps from `npm install` to `npm ci` for reproducible builds.
- Store credentials in the CI secret store, not `.env` in source control.
- Add a team-approved lint/format policy, code ownership, branch protection, and pull-request checks.
- Add schema validation and API authentication when integrating with real service APIs.
- Add browser projects only when the supported browser matrix is agreed.
- Review retry rates and flaky tests; retries must not hide product defects.
- Keep test data isolated and avoid parallel tests sharing mutable accounts.
