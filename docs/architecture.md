# Architecture map

```text
Playwright Test
  ├── tests/ui ──> custom fixtures ──> Page Objects ──> browser
  └── tests/api ──> ApiClient ──> APIRequestContext ──> service

config/environment.ts  -> environment variables
constants/              -> stable application labels and test IDs
data/                   -> non-secret test data
test-results/            -> JUnit, traces, screenshots, videos
playwright-report/      -> HTML report
```

## Rules

1. Tests express scenarios; page objects express UI actions.
2. Assertions stay in tests unless a reusable component-level assertion is deliberately designed.
3. Do not use fixed sleeps to synchronize tests.
4. Prefer role/test-id locators and observable state over brittle CSS selectors.
5. Never commit secrets, auth state, or generated test artifacts.
6. Keep tests independent so parallel execution is safe.
