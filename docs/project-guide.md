# Project Guide

This document provides an overview of all projects in the Maestro E2E test repository.

## Project List

| Project | App ID | Platforms | Test Owner | Test Coverage | Status |
|---------|--------|-----------|------------|---------------|--------|
| SafetyNet | com.frontavenue.hseqmaster.safetynet | Android, iOS | QA Team | Regression, Login | ✅ Active |
| Project 2 | TBD | Android, iOS | QA Team | TBD | 🚧 Pending |
| Project 3 | TBD | Android, iOS | QA Team | TBD | 🚧 Pending |
| Project 4 | TBD | Android, iOS | QA Team | TBD | 🚧 Pending |
| Project 5 | TBD | Android, iOS | QA Team | TBD | 🚧 Pending |
| Project 6 | TBD | Android, iOS | QA Team | TBD | 🚧 Pending |
| Project 7 | TBD | Android, iOS | QA Team | TBD | 🚧 Pending |
| Project 8 | TBD | Android, iOS | QA Team | TBD | 🚧 Pending |

## Adding a New Project

To add a new project to this repository:

1. **Create folder structure**:
   ```bash
   PROJECT_NAME="project-name"
   mkdir -p tests/$PROJECT_NAME/{android,ios}/{smoke,regression,subflows}
   mkdir -p apps/$PROJECT_NAME/{android,ios}
   ```

2. **Add app binaries**:
   - Place APK in `apps/$PROJECT_NAME/android/`
   - Place .app bundle in `apps/$PROJECT_NAME/ios/`

3. **Copy workflow templates**:
   ```bash
   cp .github/workflows/maestro-android-x86.yml .github/workflows/$PROJECT_NAME-android.yml
   cp .github/workflows/maestro-ios.yml .github/workflows/$PROJECT_NAME-ios.yml
   ```

4. **Update workflows**:
   - Replace `safetynet` with your project name
   - Update paths to match your project structure
   - Update app IDs and names

5. **Write tests**:
   - Create test YAML files in `tests/$PROJECT_NAME/android/` and `tests/$PROJECT_NAME/ios/`
   - Reuse shared flows from `shared/flows/` when applicable

6. **Create project README**:
   - Copy `tests/safetynet/README.md` as template
   - Update with project-specific information

7. **Update this guide**:
   - Add project entry to the table above
   - Document any project-specific details

## Test Organization

### Directory Structure
```
tests/
├── project-name/
│   ├── android/
│   │   ├── smoke/           # Quick critical path tests
│   │   ├── regression/      # Full test suite
│   │   └── subflows/        # Reusable components
│   ├── ios/
│   │   ├── smoke/
│   │   ├── regression/
│   │   └── subflows/
│   └── README.md            # Project documentation
```

### Test Naming Convention
- Format: `test_[priority]_[feature].yaml`
- Priority levels:
  - `01` - Critical (P0)
  - `02` - High (P1)
  - `03` - Medium (P2)
  - `04` - Low (P3)

Example: `test_01_login.yaml`, `test_02_checkout.yaml`

## Shared Resources

### Common Flows
Location: `shared/flows/`

Reusable test flows that can be used across projects:
- Authentication patterns
- Onboarding sequences
- Navigation helpers

### Using Shared Flows
```yaml
# In your test file
- runFlow: ../../../shared/flows/authentication/oauth-login.yaml
```

## CI/CD Guidelines

### Workflow Triggers
- **Push**: Triggers when changes are made to test or app files
- **Pull Request**: Runs on PRs to main/develop branches
- **Manual**: Can be triggered via GitHub Actions UI

### Artifact Storage
Test results and logs are stored for 7 days:
- Test reports (JUnit XML)
- Screenshots
- Video recordings
- Maestro logs

## Best Practices

1. **Keep tests independent**: Each test should be able to run standalone
2. **Use subflows**: Extract reusable sequences to subflows
3. **Clear test names**: Use descriptive names that explain what the test does
4. **Document dependencies**: Note any specific app versions or configurations
5. **Update coverage**: Keep test coverage metrics up to date
6. **Clean up test data**: Tests should not leave data artifacts

## Support

For questions or issues:
- Check project-specific README in `tests/[project-name]/README.md`
- Review Maestro documentation: https://maestro.mobile.dev/
- Contact QA team lead

## Resources

- [Maestro Documentation](https://maestro.mobile.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Git LFS Documentation](https://git-lfs.github.com/)
