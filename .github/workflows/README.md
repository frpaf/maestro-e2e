# GitHub Actions Workflows

This directory contains CI/CD workflows for running Maestro E2E tests across all projects.

## Folder Structure

Workflows are organized by project in subdirectories:
```
.github/workflows/
├── {project}/
│   ├── {platform}-{environment}.yml
│   └── ...
└── _archive/
```

Examples:
- `safetynet/android-staging.yml`
- `safetynet/ios-production.yml`
- `project2/android-staging.yml`

## Current Workflows

### SafetyNet
| Platform | Environment | File | Triggers |
|----------|-------------|------|----------|
| Android | Staging | `safetynet/android-staging.yml` | Push/PR to staging paths, Manual |
| Android | Production | `safetynet/android-production.yml` | Manual only (requires "PRODUCTION") |
| iOS | Staging | `safetynet/ios-staging.yml` | Push/PR to staging paths, Manual |
| iOS | Production | `safetynet/ios-production.yml` | Manual only (requires "PRODUCTION") |

### Future Projects
As new projects are added, they will follow the same structure:
```
project2/
├── android-staging.yml
├── android-production.yml
├── ios-staging.yml
└── ios-production.yml
```

## Workflow Types

### Staging Workflows
**Triggers:**
- Automatic on push to `main` or `develop` branches (with path filters)
- Automatic on pull requests
- Manual via workflow_dispatch

**Features:**
- Path filters trigger only when relevant files change
- Optional app version download from releases
- Test credentials hardcoded in `.maestro-config.yaml`
- 7-day artifact retention

### Production Workflows
**Triggers:**
- Manual only via workflow_dispatch

**Safety Features:**
- Requires typing "PRODUCTION" to confirm
- Uses GitHub Secrets for credentials
- 30-day artifact retention
- Failure notifications

## Path Filters

Workflows use path filters to trigger only on relevant changes:

```yaml
paths:
  - 'tests/{project}/{platform}/{environment}/**'
  - 'apps/{project}/{platform}/{environment}/**'
  - '.github/workflows/{workflow-filename}.yml'
```

This prevents unnecessary workflow runs when unrelated files change.

## Manual Workflow Execution

### Staging Workflows
1. Go to Actions tab
2. Select workflow (e.g., "SafetyNet Android Staging")
3. Click "Run workflow"
4. Optional: Enter app version (e.g., "latest" or "v2.1.0")
5. Click "Run workflow"

### Production Workflows
1. Go to Actions tab
2. Select workflow (e.g., "SafetyNet Android Production")
3. Click "Run workflow"
4. **Required**: Enter app version
5. **Required**: Type "PRODUCTION" in confirmation field
6. Click "Run workflow"

## Archived Workflows

The `_archive/` folder contains deprecated workflows:
- `_archive/maestro-android-x86.yml` - Original Android workflow (replaced by staging/production split)
- `_archive/maestro-ios.yml` - Original iOS workflow (replaced by staging/production split)

These are kept for reference but should not be used.

## Adding New Project Workflows

When adding a new project:

1. Create project folder: `mkdir -p newproject`
2. Copy templates:
   ```bash
   cp safetynet/android-staging.yml newproject/android-staging.yml
   cp safetynet/android-production.yml newproject/android-production.yml
   cp safetynet/ios-staging.yml newproject/ios-staging.yml
   cp safetynet/ios-production.yml newproject/ios-production.yml
   ```
3. Update workflow name (line 1) in each file
4. Update all paths to use new project name
5. Update artifact names
6. Update download script calls

Or use the slash command: `/add-new-project`

## Workflow Structure

Each workflow contains these key steps:

### Staging (Android Example)
```yaml
1. Checkout code (with Git LFS)
2. Set up JDK/Android SDK
3. Install Maestro
4. Download app (optional, if manual trigger with version)
5. Verify app and test files exist
6. Start emulator/simulator
7. Install app
8. Run Maestro tests
9. Upload test results and logs
```

### Production (Additional Safety)
```yaml
- Confirmation check (must type "PRODUCTION")
- Always downloads app from releases
- Uses GitHub Secrets for credentials
- Longer artifact retention (30 days)
- Failure notifications
```

## Secrets Configuration

Production workflows require GitHub Secrets:

**Format**: `{PROJECTNAME}_PROD_{CREDENTIAL}`

Examples:
- `SAFETYNET_PROD_USER`
- `SAFETYNET_PROD_PASSWORD`
- `PROJECT2_PROD_USER`
- `PROJECT2_PROD_PASSWORD`

Configure at: Repository Settings → Secrets and variables → Actions

## Artifacts

Each workflow uploads artifacts on completion:

**Test Results**: `{project}-{platform}-{environment}-test-results`
- JUnit XML reports
- Screenshots
- Video recordings

**Logs**: `{project}-{platform}-{environment}-logs`
- Maestro execution logs
- Debug information

## Best Practices

1. **Use path filters** - Prevent unnecessary runs
2. **Manual production** - Never automate production tests
3. **Meaningful names** - Follow naming convention strictly
4. **Document changes** - Update this README when adding workflows
5. **Test first** - Run staging before production
6. **Monitor failures** - Check artifacts for debugging

## Troubleshooting

### Workflow Not Triggering
- Check path filters match changed files
- Verify branch is `main` or `develop`
- Check if workflow file itself has errors

### App Not Found
- Verify Git LFS is enabled: `lfs: true` in checkout
- Check download script configuration
- Verify app exists in repository

### Tests Failing
- Check artifacts for screenshots/videos
- Review Maestro logs
- Verify app ID matches in `.maestro-config.yaml`

## Related Documentation

- [Project Guide](../../docs/project-guide.md)
- [App Versioning Guide](../../docs/app-versioning-guide.md)
- [SafetyNet Tests](../../tests/safetynet/README.md)
