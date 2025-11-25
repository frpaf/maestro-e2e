# Workflow Setup Summary

## Current Workflows

All workflows now use app binaries from the `apps/` folder (no download needed):

| Workflow | File | Uses APK/App From |
|----------|------|-------------------|
| Maestro Android Tests (original) | `maestro-x86.yml` | `apps/safetynet/android/staging/Safetynet.apk` |
| SafetyNet Android Staging | `safetynet.android.staging.yml` | `apps/safetynet/android/staging/*.apk` |
| SafetyNet Android Production | `safetynet.android.production.yml` | `apps/safetynet/android/production/*.apk` |
| SafetyNet iOS Staging | `safetynet.ios.staging.yml` | `apps/safetynet/ios/staging/*.app` |
| SafetyNet iOS Production | `safetynet.ios.production.yml` | `apps/safetynet/ios/production/*.app` |

## How Workflows Work

### Staging Workflows
1. **Triggers**: Push/PR to staging paths, or manual
2. **Uses app from**: `apps/safetynet/{platform}/staging/`
3. **Runs tests from**: `tests/safetynet/{platform}/staging/`
4. **No downloads** - uses committed binaries

### Production Workflows
1. **Triggers**: Manual only (requires "PRODUCTION" confirmation)
2. **Uses app from**: `apps/safetynet/{platform}/production/`
3. **Runs tests from**: `tests/safetynet/{platform}/production/`
4. **No downloads** - uses committed binaries

## Updating App Binaries

To update the app being tested:

### Staging
```bash
# Replace the APK
cp ~/new-build/Safetynet-staging.apk apps/safetynet/android/staging/Safetynet.apk

# Or for iOS
cp -R ~/new-build/SafetyNet.app "apps/safetynet/ios/staging/SafetyNet-HSEQ Master.app"

# Commit
git add apps/safetynet/
git commit -m "Update SafetyNet staging to v2.1.0"
git push
```

### Production
```bash
# Add production build
cp ~/production-build/Safetynet-prod.apk apps/safetynet/android/production/

# Copy and modify tests from staging first (if not done)
cp -r tests/safetynet/android/staging/regression tests/safetynet/android/production/

# Commit
git add apps/safetynet/ tests/safetynet/
git commit -m "Add SafetyNet production v2.0.5"
git push
```

## Git LFS

Binary files are tracked with Git LFS:
- After cloning, run: `git lfs pull`
- APK and .app files are stored efficiently
- Configured in `.gitattributes`

## Testing Locally

You can test the exact same setup locally:

```bash
# Android
maestro test tests/safetynet/android/staging/ \
  --app apps/safetynet/android/staging/Safetynet.apk

# iOS
maestro test tests/safetynet/ios/staging/ \
  --app "apps/safetynet/ios/staging/SafetyNet-HSEQ Master.app"
```

## Download Scripts (Optional)

Download scripts in `scripts/` folder are available if you want to fetch builds from app repositories in the future:
- `scripts/download-app.sh` - Download from GitHub releases
- `scripts/download-from-artifact.sh` - Download from workflow artifacts
- `scripts/manage-projects.sh` - Manage project configuration

These are **not currently used** by workflows but available for manual use or future automation.

## Next Steps

1. ✅ Workflows point to correct paths
2. ✅ APK/app files are in place
3. ✅ Tests are organized by environment
4. ⏭️ Push changes to GitHub
5. ⏭️ Verify workflows appear in Actions tab
6. ⏭️ Manually trigger staging workflow to test

## Troubleshooting

### "APK not found"
- Verify file exists: `ls -la apps/safetynet/android/staging/`
- Check Git LFS: `git lfs ls-files`
- Pull LFS files: `git lfs pull`

### "Tests not found"
- Verify tests exist: `ls -la tests/safetynet/android/staging/`
- Check for .yaml files: `find tests/safetynet/android/staging/ -name "*.yaml"`

### "Workflow not appearing in GitHub Actions"
- Ensure file is in `.github/workflows/` root (not subdirectory)
- Check YAML syntax is valid
- Push to GitHub and refresh Actions tab
