---
description: Add a new project to the maestro-e2e repository with complete folder structure, workflows, and documentation
---

# Add New Project to maestro-e2e

Please add a new project to this repository by following these steps:

## 1. Gather Project Information

Ask the user for:
- **Project name** (lowercase, hyphenated, e.g., "project-name")
- **App display name** (e.g., "Project Name App")
- **App ID for staging** (e.g., "com.company.projectname.staging")
- **App ID for production** (e.g., "com.company.projectname")
- **Staging environment URL** (e.g., "test.example.com/projectname/")
- **Production environment URL** (e.g., "example.com/projectname/")
- **Test credentials** (staging username/password)
- **App repository name** (for download script, e.g., "yourorg/projectname-app")

## 2. Create Folder Structure

Create the complete directory structure:
```bash
PROJECT_NAME="<from-user>"

# Create app directories
mkdir -p apps/$PROJECT_NAME/android/{staging,production}
mkdir -p apps/$PROJECT_NAME/ios/{staging,production}

# Create test directories
mkdir -p tests/$PROJECT_NAME/android/staging/{smoke,regression,subflows}
mkdir -p tests/$PROJECT_NAME/android/production/{smoke,regression,subflows}
mkdir -p tests/$PROJECT_NAME/ios/staging/{smoke,regression,subflows}
mkdir -p tests/$PROJECT_NAME/ios/staging/{smoke,regression,subflows}
```

## 3. Create Configuration Files

Create `.maestro-config.yaml` files for each environment:

**Android Staging**: `tests/$PROJECT_NAME/android/staging/.maestro-config.yaml`
```yaml
appId: <app-id-staging>
env:
  ENVIRONMENT: staging
  BASE_URL: <staging-url>
  TEST_USER: <username>
  TEST_PASSWORD: "<password>"
```

**Android Production**: `tests/$PROJECT_NAME/android/production/.maestro-config.yaml`
```yaml
appId: <app-id-production>
env:
  ENVIRONMENT: production
  BASE_URL: <production-url>
  # Production credentials should be stored in CI/CD secrets
  # TEST_USER: <use GitHub secrets>
  # TEST_PASSWORD: <use GitHub secrets>
```

**iOS Staging**: `tests/$PROJECT_NAME/ios/staging/.maestro-config.yaml` (same as Android staging)

**iOS Production**: `tests/$PROJECT_NAME/ios/production/.maestro-config.yaml` (same as Android production)

## 4. Create versions.json

Create `apps/$PROJECT_NAME/versions.json`:
```json
{
  "staging_android": {
    "version": "not-configured",
    "updated": null,
    "file": null,
    "appId": "<app-id-staging>",
    "environment": "<staging-url>"
  },
  "staging_ios": {
    "version": "not-configured",
    "updated": null,
    "file": null,
    "appId": "<app-id-staging>",
    "environment": "<staging-url>"
  },
  "production_android": {
    "version": "not-configured",
    "updated": null,
    "file": null,
    "appId": "<app-id-production>",
    "environment": "<production-url>"
  },
  "production_ios": {
    "version": "not-configured",
    "updated": null,
    "file": null,
    "appId": "<app-id-production>",
    "environment": "<production-url>"
  }
}
```

## 5. Create Workflows

Copy and customize workflow files:

### Android Staging
Copy `.github/workflows/safetynet-android-staging.yml` to `.github/workflows/$PROJECT_NAME-android-staging.yml`

Update:
- Line 1: `name: <ProjectName> Android Staging`
- Lines 7-9: Update paths to `tests/$PROJECT_NAME/android/staging/**`
- Line 8: Update path to `apps/$PROJECT_NAME/android/staging/**`
- Line 10: Update workflow path
- Lines 13-15: Update paths (PR section)
- Line 76: Update download script call: `./scripts/download-app.sh $PROJECT_NAME android staging`
- Line 119: Update test path: `maestro test tests/$PROJECT_NAME/android/staging/`
- Line 127: Update artifact name: `$PROJECT_NAME-android-staging-test-results`
- Line 138: Update artifact name: `$PROJECT_NAME-android-staging-logs`

### Android Production
Copy `.github/workflows/safetynet-android-production.yml` to `.github/workflows/$PROJECT_NAME-android-production.yml`

Update:
- Line 1: `name: <ProjectName> Android Production`
- Line 73: Update download script call
- Line 114: Update test path
- Line 123: Update artifact names (2 places)
- Secret names: `<PROJECTNAME>_PROD_USER` and `<PROJECTNAME>_PROD_PASSWORD`

### iOS Staging
Copy `.github/workflows/safetynet-ios-staging.yml` to `.github/workflows/$PROJECT_NAME-ios-staging.yml`

Update:
- Line 1: `name: <ProjectName> iOS Staging`
- Lines 7-9: Update paths
- Line 47: Update download script call
- Line 120: Update test path
- Line 133: Update artifact names

### iOS Production
Copy `.github/workflows/safetynet-ios-production.yml` to `.github/workflows/$PROJECT_NAME-ios-production.yml`

Update:
- Line 1: `name: <ProjectName> iOS Production`
- Line 48: Update download script call
- Line 112: Update test path
- Line 130: Update artifact names
- Secret names for credentials

## 6. Create Project README

Create `tests/$PROJECT_NAME/README.md` based on `tests/safetynet/README.md` template.

Update all project-specific information:
- App name
- App IDs (staging/production)
- URLs
- Credentials
- Workflow paths

## 7. Create Production Setup READMEs

Create `tests/$PROJECT_NAME/android/production/README.md`:
```markdown
# <ProjectName> Android Production Tests

⚠️ **Production Environment** - Tests run against live production app

## Setup Required

1. Add production test credentials to GitHub Secrets:
   - `<PROJECTNAME>_PROD_USER`
   - `<PROJECTNAME>_PROD_PASSWORD`

2. Download production APK:
   \`\`\`bash
   ./scripts/download-app.sh <project-name> android production latest
   \`\`\`

3. Copy tests from staging and adjust as needed:
   \`\`\`bash
   cp -r staging/regression production/regression
   cp -r staging/subflows production/subflows
   # Update tests for production environment
   \`\`\`

## Running Locally
\`\`\`bash
maestro test tests/<project-name>/android/production/
\`\`\`

## Notes
- Tests should be read-only (no data modification)
- Use production-safe test data
- Monitor test runs carefully
```

Create `tests/$PROJECT_NAME/ios/production/README.md` (similar to Android)

## 8. Update Download Script

Add project mapping to `scripts/download-app.sh` at line 24-28:
```bash
APP_REPO_MAP=(
    "safetynet:yourorg/safetynet-app"
    "<project-name>:<app-repo-name>"  # Add this line
)
```

## 9. Update Documentation

### Update docs/project-guide.md
Add new row to the project table (line 9):
```markdown
| <ProjectName> | <app-id> | Android, iOS | QA Team | TBD | 🚧 Pending |
```

### Update README.md
Add new row to the projects table (line 81):
```markdown
| <ProjectName> | 🚧 Pending | [README](tests/<project-name>/README.md) |
```

## 10. Create Example Test Files

Create at least one example test in staging:

**`tests/$PROJECT_NAME/android/staging/regression/test_01_example.yaml`**:
```yaml
appId: <app-id-staging>
tags:
  - android
  - staging
  - smoke
---
- clearState
- launchApp

- tapOn: "Example Button"
- assertVisible: "Example Text"
```

**`tests/$PROJECT_NAME/ios/staging/regression/test_01_example.yaml`** (similar)

## 11. Summary Output

After creating all files, provide a summary:
```
✅ Created folder structure for <ProjectName>
✅ Created configuration files (.maestro-config.yaml)
✅ Created versions.json
✅ Created 4 workflows (Android/iOS × Staging/Production)
✅ Created project README and production setup guides
✅ Updated download script
✅ Updated project documentation
✅ Created example test files

📋 Next Steps:
1. Update scripts/download-app.sh with actual app repository name
2. Add GitHub Secrets for production:
   - <PROJECTNAME>_PROD_USER
   - <PROJECTNAME>_PROD_PASSWORD
3. Add app binaries to apps/<project-name>/{platform}/staging/
4. Write actual test cases in tests/<project-name>/{platform}/staging/
5. Test workflows by pushing changes or manual trigger
6. Commit changes:
   git add .
   git commit -m "Add <ProjectName> project to maestro-e2e"
   git push origin main
```

## Important Notes

- Always use lowercase hyphenated names for project directories
- Ensure app IDs are correct (staging should have .staging suffix)
- Production workflows require manual confirmation ("PRODUCTION")
- Test files should follow naming convention: test_[priority]_[feature].yaml
- All paths must use the exact project name consistently
