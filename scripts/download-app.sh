#!/bin/bash

# Script to download app binaries from GitHub releases
# Usage: ./scripts/download-app.sh <project> <platform> <environment> [version]
# Example: ./scripts/download-app.sh safetynet android staging latest

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Arguments
PROJECT=$1
PLATFORM=$2
ENVIRONMENT=$3
VERSION=${4:-latest}

# Validate arguments
if [ -z "$PROJECT" ] || [ -z "$PLATFORM" ] || [ -z "$ENVIRONMENT" ]; then
    echo -e "${RED}Error: Missing required arguments${NC}"
    echo "Usage: $0 <project> <platform> <environment> [version]"
    echo ""
    echo "Arguments:"
    echo "  project      - Project name (e.g., safetynet, project2)"
    echo "  platform     - android or ios"
    echo "  environment  - staging or production"
    echo "  version      - Release version (default: latest)"
    echo ""
    echo "Example:"
    echo "  $0 safetynet android staging latest"
    echo "  $0 safetynet ios production v2.1.0"
    exit 1
fi

# Validate platform
if [ "$PLATFORM" != "android" ] && [ "$PLATFORM" != "ios" ]; then
    echo -e "${RED}Error: Platform must be 'android' or 'ios'${NC}"
    exit 1
fi

# Validate environment
if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
    echo -e "${RED}Error: Environment must be 'staging' or 'production'${NC}"
    exit 1
fi

# Configuration - UPDATE THESE WITH YOUR ACTUAL REPO NAMES
# Format: yourorg/project-app-repo
APP_REPO_MAP=(
    "safetynet:yourorg/safetynet-app"
    "project2:yourorg/project2-app"
    # Add more projects here as needed
)

# Find app repo for project
APP_REPO=""
for mapping in "${APP_REPO_MAP[@]}"; do
    key="${mapping%%:*}"
    value="${mapping##*:}"
    if [ "$key" == "$PROJECT" ]; then
        APP_REPO="$value"
        break
    fi
done

if [ -z "$APP_REPO" ]; then
    echo -e "${RED}Error: No repository mapping found for project '$PROJECT'${NC}"
    echo "Please update the APP_REPO_MAP in this script with your repository information."
    exit 1
fi

# Set file pattern based on platform and environment
if [ "$PLATFORM" == "android" ]; then
    PATTERN="*${ENVIRONMENT}*.apk"
    EXTENSION="apk"
else
    # iOS apps might be zipped in releases
    PATTERN="*${ENVIRONMENT}*.app.zip"
    EXTENSION="app.zip"
fi

# Create target directory
TARGET_DIR="apps/$PROJECT/$PLATFORM/$ENVIRONMENT"
mkdir -p "$TARGET_DIR"

echo -e "${YELLOW}Downloading $PROJECT $PLATFORM $ENVIRONMENT build...${NC}"
echo "Repository: $APP_REPO"
echo "Version: $VERSION"
echo "Pattern: $PATTERN"
echo "Target: $TARGET_DIR"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
    echo "Install it with: brew install gh"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}Error: Not authenticated with GitHub${NC}"
    echo "Run: gh auth login"
    exit 1
fi

# Download from GitHub releases
echo -e "${YELLOW}Fetching release...${NC}"
if gh release download "$VERSION" \
    --repo "$APP_REPO" \
    --pattern "$PATTERN" \
    --dir "$TARGET_DIR" \
    --clobber; then

    echo -e "${GREEN}✓ Download successful!${NC}"

    # If iOS and zipped, extract it
    if [ "$PLATFORM" == "ios" ]; then
        echo -e "${YELLOW}Extracting iOS app bundle...${NC}"
        cd "$TARGET_DIR"
        for zipfile in *.zip; do
            if [ -f "$zipfile" ]; then
                unzip -o "$zipfile"
                rm "$zipfile"
                echo -e "${GREEN}✓ Extracted and cleaned up zip file${NC}"
            fi
        done
        cd - > /dev/null
    fi

    echo ""
    echo -e "${GREEN}Downloaded files:${NC}"
    ls -lh "$TARGET_DIR"

    # Update versions.json
    VERSIONS_FILE="apps/$PROJECT/versions.json"
    if [ ! -f "$VERSIONS_FILE" ]; then
        echo '{}' > "$VERSIONS_FILE"
    fi

    # Extract version from filename or use provided version
    DOWNLOADED_FILE=$(ls -t "$TARGET_DIR" | head -1)
    CURRENT_DATE=$(date +%Y-%m-%d)

    # Update versions.json using jq if available
    if command -v jq &> /dev/null; then
        jq --arg env "$ENVIRONMENT" \
           --arg ver "$VERSION" \
           --arg date "$CURRENT_DATE" \
           --arg file "$DOWNLOADED_FILE" \
           --arg platform "$PLATFORM" \
           '.[$env + "_" + $platform] = {
               "version": $ver,
               "updated": $date,
               "file": $file
           }' "$VERSIONS_FILE" > "${VERSIONS_FILE}.tmp" && mv "${VERSIONS_FILE}.tmp" "$VERSIONS_FILE"

        echo -e "${GREEN}✓ Updated versions.json${NC}"
    else
        echo -e "${YELLOW}Note: Install jq for automatic version tracking: brew install jq${NC}"
    fi

    echo ""
    echo -e "${GREEN}✓ All done! App ready for testing.${NC}"

else
    echo -e "${RED}✗ Download failed!${NC}"
    echo ""
    echo "Possible issues:"
    echo "1. Release '$VERSION' does not exist in $APP_REPO"
    echo "2. No files match pattern '$PATTERN' in the release"
    echo "3. You don't have access to the repository"
    echo ""
    echo "Available releases:"
    gh release list --repo "$APP_REPO" --limit 5
    exit 1
fi
