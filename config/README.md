# Configuration Guide

This directory contains configuration files for managing projects in the maestro-e2e repository.

## projects.json

Central configuration file for all projects.

### Structure

```json
{
  "projects": {
    "project-name": {
      "displayName": "Human-readable Project Name",
      "appRepo": "github-org/app-repository-name",
      "appId": {
        "staging": "com.company.app.staging",
        "production": "com.company.app"
      },
      "environments": {
        "staging": {
          "url": "test.example.com/app/",
          "username": "testuser",
          "password": "testpass"
        },
        "production": {
          "url": "example.com/app/",
          "secretPrefix": "PROJECTNAME"
        }
      }
    }
  }
}
```

### Fields

| Field | Description | Required | Example |
|-------|-------------|----------|---------|
| `displayName` | Human-readable project name | Yes | "SafetyNet HSEQ Master" |
| `appRepo` | GitHub repository for app builds | Yes | "EG-A-S/safetynet-app" |
| `appId.staging` | App bundle ID for staging | Yes | "com.company.app.staging" |
| `appId.production` | App bundle ID for production | Yes | "com.company.app" |
| `environments.staging.url` | Staging server URL | Yes | "test.example.com" |
| `environments.staging.username` | Test username | No | "testuser" |
| `environments.staging.password` | Test password | No | "pass123" |
| `environments.production.url` | Production server URL | Yes | "example.com" |
| `environments.production.secretPrefix` | GitHub Secret prefix | Yes | "PROJECTNAME" |

### Usage

The download script reads this file to:
1. Find the GitHub repository for app binaries
2. Download APKs/IPAs from releases
3. Validate project exists before downloading

### Adding a New Project

Simply add a new entry to the `projects` object:

```json
{
  "projects": {
    "safetynet": { /* existing */ },
    "inventory-app": {
      "displayName": "Inventory Management",
      "appRepo": "yourorg/inventory-app",
      "appId": {
        "staging": "com.company.inventory.staging",
        "production": "com.company.inventory"
      },
      "environments": {
        "staging": {
          "url": "test.example.com/inventory/",
          "username": "testuser",
          "password": "test123"
        },
        "production": {
          "url": "example.com/inventory/",
          "secretPrefix": "INVENTORY"
        }
      }
    }
  }
}
```

### Validation

Check if your config is valid JSON:
```bash
jq empty config/projects.json && echo "✓ Valid JSON" || echo "✗ Invalid JSON"
```

List all configured projects:
```bash
jq -r '.projects | keys[]' config/projects.json
```

Get app repo for a project:
```bash
jq -r '.projects.safetynet.appRepo' config/projects.json
```

## Alternative Configuration Methods

### Option 1: Environment Variables (CI/CD)

Set in GitHub repository settings:
```
SAFETYNET_APP_REPO=yourorg/safetynet-app
PROJECT2_APP_REPO=yourorg/project2-app
```

**Pros**: Secure, easy to change
**Cons**: Not visible in codebase, harder to track

### Option 2: YAML Config

Instead of JSON, use YAML:
```yaml
# config/projects.yaml
projects:
  safetynet:
    displayName: SafetyNet HSEQ Master
    appRepo: yourorg/safetynet-app
```

**Pros**: More readable
**Cons**: Requires `yq` instead of `jq`

### Option 3: Hardcoded in Script

Keep the bash array in the script:
```bash
APP_REPO_MAP=(
    "safetynet:yourorg/safetynet-app"
    "project2:yourorg/project2-app"
)
```

**Pros**: Simple, no dependencies
**Cons**: Less maintainable, limited metadata

## Recommendation

Use **projects.json** (Option 1) because:
- ✅ Central configuration for all projects
- ✅ Rich metadata (URLs, app IDs, credentials)
- ✅ Easy to validate and query
- ✅ Can be used by other tools
- ✅ Clear structure for QA team

## Security Note

**DO NOT** commit production credentials to this file. Use GitHub Secrets for production passwords.

The `secretPrefix` field tells workflows which GitHub Secrets to use:
- `SAFETYNET_PROD_USER`
- `SAFETYNET_PROD_PASSWORD`
