# SafetyNet iOS Production Tests

⚠️ **Production Environment** - Tests run against live production app

## Setup Required

1. Add production test credentials to GitHub Secrets:
   - `SAFETYNET_PROD_USER`
   - `SAFETYNET_PROD_PASSWORD`

2. Download production app:
   ```bash
   ./scripts/download-app.sh safetynet ios production latest
   ```

3. Copy tests from staging and adjust as needed:
   ```bash
   # Copy staging tests as starting point
   cp -r staging/regression production/regression
   cp -r staging/subflows production/subflows

   # Update tests for production environment
   # - Remove debug-only tests
   # - Add production-specific validation
   ```

## Running Locally

```bash
maestro test tests/safetynet/ios/production/
```

## Notes
- Tests should be read-only (no data modification)
- Use production-safe test data
- Monitor test runs carefully
