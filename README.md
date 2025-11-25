# Maestro E2E Test Repository

Central repository for End-to-End (E2E) tests across all mobile applications using [Maestro](https://maestro.mobile.dev/).

## 📁 Repository Structure

```
maestro-e2e/
├── apps/                      # Application binaries (Git LFS)
│   └── safetynet/
│       ├── android/          # Android APK files
│       └── ios/              # iOS app bundles
│
├── tests/                     # Test definitions
│   └── safetynet/
│       ├── android/
│       │   ├── smoke/        # Quick critical path tests
│       │   ├── regression/   # Full test suite
│       │   └── subflows/     # Reusable components
│       └── ios/
│           ├── smoke/
│           ├── regression/
│           └── subflows/
│
├── shared/                    # Cross-project resources
│   ├── flows/                # Common test flows
│   └── utilities/            # Helper scripts
│
├── scripts/                   # Automation scripts
│
├── docs/                      # Documentation
│   └── project-guide.md      # Project overview and guidelines
│
└── .github/workflows/         # CI/CD pipelines
    ├── maestro-android-x86.yml
    └── maestro-ios.yml
```

## 🚀 Quick Start

### Prerequisites

1. **Install Maestro CLI**:
   ```bash
   curl -Ls "https://get.maestro.mobile.dev" | bash
   export PATH="$HOME/.maestro/bin:$PATH"
   ```

2. **Install Git LFS** (for app binaries):
   ```bash
   # macOS
   brew install git-lfs

   # Initialize in this repo
   git lfs install
   ```

### Running Tests Locally

**Android:**
```bash
# Start emulator or connect device
maestro test tests/safetynet/android/
```

**iOS:**
```bash
# Start simulator or connect device
maestro test tests/safetynet/ios/
```

**Specific test file:**
```bash
maestro test tests/safetynet/android/regression/test_01QuestionnaireActions.yaml
```

## 📊 Projects

| Project | Status | Documentation |
|---------|--------|---------------|
| SafetyNet | ✅ Active | [README](tests/safetynet/README.md) |
| Project 2 | 🚧 Pending | TBD |
| Project 3 | 🚧 Pending | TBD |
| Project 4 | 🚧 Pending | TBD |
| Project 5 | 🚧 Pending | TBD |
| Project 6 | 🚧 Pending | TBD |
| Project 7 | 🚧 Pending | TBD |
| Project 8 | 🚧 Pending | TBD |

See [Project Guide](docs/project-guide.md) for detailed information.

## 🔄 CI/CD

Tests run automatically via GitHub Actions:

### Triggers
- Push to `main` or `develop` branches (with path filters)
- Pull requests to `main` or `develop`
- Manual dispatch via GitHub Actions UI

### Workflows
- **SafetyNet Android**: `.github/workflows/maestro-android-x86.yml`
- **SafetyNet iOS**: `.github/workflows/maestro-ios.yml`

### Artifacts
Test results are uploaded and retained for 7 days:
- JUnit XML reports
- Screenshots
- Video recordings
- Maestro logs

## 📝 Contributing

### Adding Tests

1. Navigate to the appropriate project and platform folder
2. Create test file following naming convention: `test_[priority]_[feature].yaml`
3. Use subflows for reusable components
4. Document test purpose and prerequisites

### Adding New Project

See detailed instructions in [Project Guide](docs/project-guide.md#adding-a-new-project).

Quick steps:
```bash
PROJECT_NAME="new-project"
mkdir -p tests/$PROJECT_NAME/{android,ios}/{smoke,regression,subflows}
mkdir -p apps/$PROJECT_NAME/{android,ios}
```

## 🛠️ Tools & Technologies

- **Test Framework**: [Maestro](https://maestro.mobile.dev/)
- **CI/CD**: GitHub Actions
- **Version Control**: Git + Git LFS
- **Platforms**: Android (API 33), iOS (iOS 17.5)

## 📚 Documentation

- [Project Guide](docs/project-guide.md) - Overview of all projects and guidelines
- [SafetyNet Tests](tests/safetynet/README.md) - SafetyNet-specific documentation
- [Maestro Docs](https://maestro.mobile.dev/) - Official Maestro documentation

## 🔗 Related Resources

- [Android Emulator Setup](https://developer.android.com/studio/run/emulator)
- [iOS Simulator Setup](https://developer.apple.com/documentation/xcode/running-your-app-in-simulator-or-on-a-device)
- [Git LFS Documentation](https://git-lfs.github.com/)

## 📞 Support

For questions or issues:
- Check project-specific README files
- Review the [Project Guide](docs/project-guide.md)
- Contact QA team lead

## 📄 License

Internal use only.
