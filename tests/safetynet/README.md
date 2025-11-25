# SafetyNet E2E Tests

## Project Information
- **App Name**: SafetyNet HSEQ Master
- **App ID (Staging)**: `com.frontavenue.hseqmaster.safetynet.staging`
- **App ID (Production)**: `com.frontavenue.hseqmaster.safetynet`
- **Test Owner**: QA Team
- **Last Updated**: 2025-11-25

## Environments

### Staging
- **URL**: test.ss.dk/safetynetdev_SIT/
- **Test User**: Appiumuser
- **Password**: 1234
- **Tests Location**: `tests/safetynet/{platform}/staging/`
- **App Location**: `apps/safetynet/{platform}/staging/`

### Production
- **URL**: ss.dk/safetynet/
- **Test User**: Stored in GitHub Secrets
- **Password**: Stored in GitHub Secrets
- **Tests Location**: `tests/safetynet/{platform}/production/`
- **App Location**: `apps/safetynet/{platform}/production/`

## Test Structure

### Android
```
tests/safetynet/android/
├── staging/
│   ├── .maestro-config.yaml    # Staging configuration
│   ├── regression/
│   │   └── test_01QuestionnaireActions.yaml
│   └── subflows/
│       └── login.yaml
└── production/
    ├── .maestro-config.yaml    # Production configuration
    └── README.md               # Setup instructions
```

### iOS
```
tests/safetynet/ios/
├── staging/
│   ├── .maestro-config.yaml    # Staging configuration
│   ├── regression/
│   │   └── test_01loginAndLogout-flow.yaml
│   └── subflows/
│       └── login.yaml
└── production/
    ├── .maestro-config.yaml    # Production configuration
    └── README.md               # Setup instructions
```

## App Version Management

### Current Versions
See `apps/safetynet/versions.json` for current versions:
```json
{
  "staging_android": {"version": "current", "updated": "2025-11-25"},
  "production_android": {"version": "not-configured"}
}
```

### Downloading App Binaries

Use the download script to fetch apps from releases:

```bash
# Download specific version
./scripts/download-app.sh safetynet android staging v2.1.0
./scripts/download-app.sh safetynet ios staging latest

# Download production builds
./scripts/download-app.sh safetynet android production v2.0.5
./scripts/download-app.sh safetynet ios production latest
```

**Note**: Update `scripts/download-app.sh` with your actual app repository names.

## Running Tests Locally

### Staging Tests

**Android:**
```bash
# Start Android emulator or connect device
maestro test tests/safetynet/android/staging/
```

**iOS:**
```bash
# Start iOS simulator or connect device
maestro test tests/safetynet/ios/staging/
```

### Production Tests

**Android:**
```bash
# Requires production credentials
export MAESTRO_USERNAME="prod_user"
export MAESTRO_PASSWORD="prod_pass"
maestro test tests/safetynet/android/production/
```

**iOS:**
```bash
# Requires production credentials
export MAESTRO_USERNAME="prod_user"
export MAESTRO_PASSWORD="prod_pass"
maestro test tests/safetynet/ios/production/
```

## CI/CD Workflows

### Staging (Automatic)
- **Android**: `.github/workflows/safetynet-android-staging.yml`
  - Triggers on push/PR to staging tests/apps
  - Can manually trigger with specific app version

- **iOS**: `.github/workflows/safetynet-ios-staging.yml`
  - Triggers on push/PR to staging tests/apps
  - Can manually trigger with specific app version

### Production (Manual Only)
- **Android**: `.github/workflows/safetynet-android-production.yml`
  - Manual trigger only
  - Requires "PRODUCTION" confirmation
  - Uses GitHub Secrets for credentials

- **iOS**: `.github/workflows/safetynet-ios-production.yml`
  - Manual trigger only
  - Requires "PRODUCTION" confirmation
  - Uses GitHub Secrets for credentials

### Manual Workflow Dispatch

1. Go to GitHub Actions
2. Select workflow (e.g., "SafetyNet Android Staging")
3. Click "Run workflow"
4. Enter app version (e.g., "latest" or "v2.1.0")
5. For production: Type "PRODUCTION" to confirm

## Test Coverage

### Staging
- Login/Logout flows
- Questionnaire interactions
- Environment configuration
- Onboarding process

### Production
- ⚠️ **Setup Required**: Copy tests from staging and modify for production
- See `tests/safetynet/{platform}/production/README.md`

## Adding Production Tests

1. Copy staging tests:
   ```bash
   cp -r tests/safetynet/android/staging/regression tests/safetynet/android/production/
   cp -r tests/safetynet/android/staging/subflows tests/safetynet/android/production/
   ```

2. Modify for production:
   - Remove debug/staging-only tests
   - Ensure read-only operations (no data modification)
   - Update URLs and credentials references

3. Add production credentials to GitHub Secrets:
   - `SAFETYNET_PROD_USER`
   - `SAFETYNET_PROD_PASSWORD`

## Known Issues
- None currently documented

## Contact
For questions or issues, contact the QA team.
