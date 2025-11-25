# App Versioning and Binary Management Guide

This document explains how to manage app binaries, versioning, and environment separation in the maestro-e2e repository.

## Overview

The repository supports testing multiple environments (staging/production) for each project. App binaries are managed separately from test code to enable:
- Testing different app versions
- Environment-specific configurations
- Production safety (manual triggers only)
- Version tracking and rollback capability

## Directory Structure

```
maestro-e2e/
├── apps/
│   └── {project}/
│       ├── {platform}/
│       │   ├── staging/          # Staging app binaries
│       │   └── production/       # Production app binaries
│       └── versions.json         # Version tracking
├── tests/
│   └── {project}/
│       └── {platform}/
│           ├── staging/          # Staging tests
│           │   ├── .maestro-config.yaml
│           │   ├── regression/
│           │   └── subflows/
│           └── production/       # Production tests
│               ├── .maestro-config.yaml
│               ├── regression/
│               └── subflows/
└── scripts/
    └── download-app.sh           # App binary download utility
```

## App Binary Sources

### Option 1: Download from App Repository Releases (Recommended)

**Setup in App Repository:**
1. Configure build workflow to create releases:
   ```yaml
   # In your app repo: .github/workflows/build.yml
   - name: Create Release
     uses: softprops/action-gh-release@v1
     with:
       tag_name: v${{ github.run_number }}
       files: |
         android/app/build/outputs/apk/staging/app-staging-release.apk
         android/app/build/outputs/apk/production/app-production-release.apk
   ```

2. Use naming convention: `{AppName}-{environment}-{version}.{extension}`
   - Example: `Safetynet-staging-v2.1.0.apk`
   - Example: `SafetyNet-production-v2.0.5.app.zip`

**Download in maestro-e2e:**
```bash
# Download specific version
./scripts/download-app.sh safetynet android staging v2.1.0

# Download latest
./scripts/download-app.sh safetynet android staging latest
```

### Option 2: Manual Upload

1. Build app locally with correct environment configuration
2. Copy to appropriate folder:
   ```bash
   cp ~/Downloads/Safetynet-staging.apk apps/safetynet/android/staging/
   ```
3. Update `versions.json` manually

### Option 3: CI/CD Artifacts

Download from GitHub Actions artifacts:
```bash
gh run download <run-id> \
  --repo yourorg/safetynet-app \
  --name app-staging \
  --dir apps/safetynet/android/staging/
```

## Environment Configuration

### Staging vs Production

**Key Differences:**
| Aspect | Staging | Production |
|--------|---------|------------|
| **App ID** | com.app.staging | com.app |
| **Triggers** | Automatic (push/PR) | Manual only |
| **Credentials** | Hardcoded in config | GitHub Secrets |
| **Base URL** | test.example.com | example.com |
| **Safety** | Safe to modify data | Read-only tests |

### Maestro Configuration Files

Each environment has its own `.maestro-config.yaml`:

**Staging** (`tests/project/platform/staging/.maestro-config.yaml`):
```yaml
appId: com.frontavenue.hseqmaster.safetynet.staging
env:
  ENVIRONMENT: staging
  BASE_URL: test.ss.dk/safetynetdev_SIT/
  TEST_USER: Appiumuser
  TEST_PASSWORD: "1234"
```

**Production** (`tests/project/platform/production/.maestro-config.yaml`):
```yaml
appId: com.frontavenue.hseqmaster.safetynet
env:
  ENVIRONMENT: production
  BASE_URL: ss.dk/safetynet/
  # Credentials from GitHub Secrets
```

## Version Tracking

### versions.json Format

Location: `apps/{project}/versions.json`

```json
{
  "staging_android": {
    "version": "v2.1.0",
    "updated": "2025-11-25",
    "file": "Safetynet-staging-v2.1.0.apk",
    "appId": "com.frontavenue.hseqmaster.safetynet.staging",
    "environment": "test.ss.dk/safetynetdev_SIT/"
  },
  "production_android": {
    "version": "v2.0.5",
    "updated": "2025-11-20",
    "file": "Safetynet-production-v2.0.5.apk",
    "appId": "com.frontavenue.hseqmaster.safetynet",
    "environment": "ss.dk/safetynet/"
  },
  "staging_ios": {
    "version": "v2.1.0",
    "updated": "2025-11-25",
    "file": "SafetyNet-staging.app",
    "appId": "com.frontavenue.hseqmaster.safetynet.staging",
    "environment": "test.ss.dk/safetynetdev_SIT/"
  },
  "production_ios": {
    "version": "v2.0.5",
    "updated": "2025-11-20",
    "file": "SafetyNet-production.app",
    "appId": "com.frontavenue.hseqmaster.safetynet",
    "environment": "ss.dk/safetynet/"
  }
}
```

### Updating versions.json

**Automatic** (when using download script with `jq` installed):
```bash
./scripts/download-app.sh safetynet android staging v2.1.0
# Automatically updates versions.json
```

**Manual**:
```bash
# Edit apps/safetynet/versions.json
jq '.staging_android.version = "v2.1.0"' apps/safetynet/versions.json > tmp.json && mv tmp.json apps/safetynet/versions.json
```

## Workflow Integration

### Staging Workflows

**Automatic Triggers:**
- Push to `main` or `develop` with changes in staging paths
- Pull requests to `main` or `develop`

**Manual Trigger:**
```yaml
# In workflow file
workflow_dispatch:
  inputs:
    app_version:
      description: 'App version (e.g., latest, v2.1.0)'
      default: 'use-existing'
```

**Usage:**
1. Go to Actions → Select staging workflow
2. Click "Run workflow"
3. Enter version or use "use-existing" for committed binary

### Production Workflows

**Manual Only:**
```yaml
workflow_dispatch:
  inputs:
    app_version:
      description: 'App version'
      required: true
    confirmation:
      description: 'Type "PRODUCTION"'
      required: true
```

**Safety Features:**
- Requires "PRODUCTION" confirmation
- Manual trigger only (no automatic runs)
- Uses GitHub Secrets for credentials
- Longer artifact retention (30 days vs 7)
- Failure notifications

## Best Practices

### 1. Version Naming

Use semantic versioning: `v{major}.{minor}.{patch}`
- `v2.1.0` - New features
- `v2.1.1` - Bug fixes
- `v3.0.0` - Breaking changes

### 2. Environment Separation

**DO:**
- Separate app IDs (com.app.staging vs com.app)
- Different server URLs
- Use GitHub Secrets for production credentials
- Tag staging vs production test files clearly

**DON'T:**
- Use production credentials in staging tests
- Automate production test runs
- Mix staging and production binaries

### 3. Git LFS Usage

Binary files are tracked with Git LFS:
```bash
# After cloning
git lfs pull

# Check LFS files
git lfs ls-files
```

### 4. App Updates

**For staging:**
```bash
# Download new version
./scripts/download-app.sh safetynet android staging v2.2.0

# Commit and push
git add apps/safetynet/
git commit -m "Update SafetyNet Android staging to v2.2.0"
git push
```

**For production:**
```bash
# Download production build
./scripts/download-app.sh safetynet android production v2.1.0

# Create tests if needed
cp -r tests/safetynet/android/staging/* tests/safetynet/android/production/

# Commit (production binary not recommended in repo, use download in CI)
git add tests/safetynet/android/production/
git commit -m "Add SafetyNet Android production tests for v2.1.0"
```

## Troubleshooting

### "No APK/app bundle found"

**Solution:**
1. Check file exists: `ls -la apps/project/platform/environment/`
2. Verify Git LFS: `git lfs pull`
3. Re-download: `./scripts/download-app.sh project platform environment latest`

### "Download failed"

**Solutions:**
1. Check repository mapping in `scripts/download-app.sh`
2. Verify gh CLI authentication: `gh auth status`
3. Check release exists: `gh release list --repo yourorg/app-repo`
4. Verify file pattern matches: Check release assets

### "Wrong app installed"

**Solution:**
Verify app ID in test config matches binary:
```bash
# Android
aapt dump badging apps/project/android/staging/*.apk | grep package
# Should match appId in .maestro-config.yaml

# iOS
/usr/libexec/PlistBuddy -c "Print CFBundleIdentifier" apps/project/ios/staging/*.app/Info.plist
```

## Migration from Old Structure

If you have apps in old location (`apps/safetynet/android/Safetynet.apk`):

```bash
# Move to staging
mv apps/safetynet/android/*.apk apps/safetynet/android/staging/
mv apps/safetynet/ios/*.app apps/safetynet/ios/staging/

# Create versions.json
cat > apps/safetynet/versions.json << EOF
{
  "staging_android": {
    "version": "current",
    "updated": "$(date +%Y-%m-%d)"
  }
}
EOF
```

## Related Documentation

- [Project Guide](project-guide.md) - Overall project structure
- [SafetyNet Tests](../tests/safetynet/README.md) - SafetyNet-specific details
- [Download Script](../scripts/download-app.sh) - Binary download utility
