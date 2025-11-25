# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a centralized Maestro E2E test repository managed by a dedicated QA team for 8 mobile applications (currently only SafetyNet is configured). Tests are written in YAML using Maestro's declarative syntax.

## Architecture

### Multi-Project Structure
- `apps/{project}/{platform}/` - Application binaries (APK/IPA) tracked with Git LFS
- `tests/{project}/{platform}/` - Test definitions organized by priority:
  - `smoke/` - Critical path tests (P0)
  - `regression/` - Full test suite (P1-P3)
  - `subflows/` - Reusable test components (imported via `runFlow`)
- `shared/flows/` - Cross-project reusable flows (authentication, navigation, onboarding)
- `.github/workflows/` - Per-project CI/CD pipelines with path filters

### Test Isolation
Each project has isolated workflows that only trigger on changes to their specific paths:
```yaml
paths:
  - 'tests/safetynet/android/**'
  - 'apps/safetynet/android/**'
```

## Running Tests

### Local Execution
```bash
# All tests for a platform
maestro test tests/safetynet/android/

# Specific test file
maestro test tests/safetynet/android/regression/test_01QuestionnaireActions.yaml

# With app specified
maestro test tests/safetynet/android/ --app apps/safetynet/android/Safetynet.apk
```

### Prerequisites
- Maestro CLI: `curl -Ls "https://get.maestro.mobile.dev" | bash`
- Git LFS: `brew install git-lfs && git lfs install`
- Android: Android Studio with API 33 emulator
- iOS: Xcode 15.4 with iOS 17.5 simulator

## Adding New Projects

Follow this exact sequence:

```bash
PROJECT_NAME="project-name"

# 1. Create folder structure
mkdir -p tests/$PROJECT_NAME/{android,ios}/{smoke,regression,subflows}
mkdir -p apps/$PROJECT_NAME/{android,ios}

# 2. Add binaries to apps/$PROJECT_NAME/{android,ios}/

# 3. Copy and customize workflows
cp .github/workflows/maestro-android-x86.yml .github/workflows/$PROJECT_NAME-android.yml
cp .github/workflows/maestro-ios.yml .github/workflows/$PROJECT_NAME-ios.yml

# Update workflows:
# - Replace all "safetynet" → "$PROJECT_NAME"
# - Update paths in path filters
# - Update app IDs and artifact names

# 4. Create project README
cp tests/safetynet/README.md tests/$PROJECT_NAME/README.md
# Update with project-specific app ID, test environment, credentials

# 5. Update docs/project-guide.md project list table
```

## Test Conventions

### Naming
- Format: `test_[priority]_[feature].yaml`
- Priority: `01` (critical), `02` (high), `03` (medium), `04` (low)
- Examples: `test_01_login.yaml`, `test_02_checkout.yaml`

### Shared Flows
Import shared flows using relative paths:
```yaml
# From tests/project/platform/regression/test.yaml
- runFlow: ../subflows/login.yaml                              # Project-specific
- runFlow: ../../../shared/flows/authentication/oauth.yaml     # Cross-project
```

## CI/CD

### Workflow Architecture
- **Android**: Ubuntu runners with API 33 x86_64 emulator (AVD cached)
- **iOS**: macOS-14 runners with iPhone 15 Pro simulator (iOS 17.5, Xcode 15.4)
- **Triggers**: Push/PR to main/develop (path-filtered), manual dispatch
- **Artifacts**: JUnit XML, videos, screenshots, logs (7-day retention)

### Path Filters
Workflows use path filters to prevent unnecessary runs. When modifying workflows, always update the paths section to match the project structure.

## Git LFS
Binary files are tracked with Git LFS (configured in `.gitattributes`):
- `*.apk`, `*.ipa`, `*.aab` - App binaries
- `*.app/**` - iOS app bundles
- `*.mp4`, `*.mov` - Test recordings

After cloning, run `git lfs pull` to fetch binaries.

## Project-Specific Details

### SafetyNet
- **App ID**: `com.frontavenue.hseqmaster.safetynet`
- **Test Environment**: test.ss.dk/safetynetdev_SIT/
- **Test Credentials**: Appiumuser / 1234
- **Language**: Danish UI (Skift, Kunde, Brugernavn, etc.)
- **Login Flow**: 3-step onboarding → environment config → authentication → post-login setup

## Key Files
- `docs/project-guide.md` - Detailed adding projects guide
- `tests/{project}/README.md` - Project-specific test documentation
- `MIGRATION_SUMMARY.md` - History of repository restructuring
