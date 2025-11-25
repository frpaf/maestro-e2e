# GitHub Actions Workflows

This directory contains CI/CD workflows for running Maestro E2E tests across all projects.

## Important: GitHub Actions Limitation

⚠️ **GitHub Actions does not support subdirectories in `.github/workflows/`**. All workflow files must be in the root of this folder.

## Naming Convention

To keep workflows organized, we use this naming pattern:
```
{project}.{platform}.{environment}.yml
```

Examples:
- `safetynet.android.staging.yml`
- `safetynet.ios.production.yml`
- `project2.android.staging.yml`

This naming groups all workflows for the same project together alphabetically.

## Current Workflows

### SafetyNet
| Platform | Environment | File | Triggers |
|----------|-------------|------|----------|
| Android | Staging | `safetynet.android.staging.yml` | Push/PR to staging paths, Manual |
| Android | Production | `safetynet.android.production.yml` | Manual only (requires "PRODUCTION") |
| iOS | Staging | `safetynet.ios.staging.yml` | Push/PR to staging paths, Manual |
| iOS | Production | `safetynet.ios.production.yml` | Manual only (requires "PRODUCTION") |

### Future Projects
When sorted alphabetically, workflows will naturally group by project:
```
project2.android.production.yml
project2.android.staging.yml
project2.ios.production.yml
project2.ios.staging.yml
safetynet.android.production.yml
safetynet.android.staging.yml
safetynet.ios.production.yml
safetynet.ios.staging.yml
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
  - '.github/workflows/{project}.{platform}.{environment}.yml'
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

## Adding New Project Workflows

When adding a new project, create 4 workflow files:

```bash
# Copy templates
cp safetynet.android.staging.yml project2.android.staging.yml
cp safetynet.android.production.yml project2.android.production.yml
cp safetynet.ios.staging.yml project2.ios.staging.yml
cp safetynet.ios.production.yml project2.ios.production.yml
```

Then update in each file:
1. Workflow name (line 1)
2. All paths to use new project name
3. Artifact names
4. Download script calls
5. GitHub Secrets names (production only)

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

1. **Follow naming convention** - Use `{project}.{platform}.{environment}.yml`
2. **Use path filters** - Prevent unnecessary runs
3. **Manual production only** - Never automate production tests
4. **Meaningful workflow names** - Make them easy to find in Actions UI
5. **Document changes** - Update this README when adding workflows
6. **Test staging first** - Always test staging before production
7. **Monitor failures** - Check artifacts for debugging

## Troubleshooting

### Workflow Not Appearing in GitHub Actions
- **Cause**: GitHub Actions doesn't support subdirectories
- **Solution**: Ensure all `.yml` files are directly in `.github/workflows/`

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
