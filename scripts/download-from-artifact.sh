#!/bin/bash

# Download app from GitHub Actions artifacts instead of releases
# Usage: ./scripts/download-from-artifact.sh <project> <platform> <environment> [run-id]

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT=$1
PLATFORM=$2
ENVIRONMENT=$3
RUN_ID=${4:-latest}

if [ -z "$PROJECT" ] || [ -z "$PLATFORM" ] || [ -z "$ENVIRONMENT" ]; then
    echo -e "${RED}Error: Missing arguments${NC}"
    echo "Usage: $0 <project> <platform> <environment> [run-id]"
    echo ""
    echo "Example:"
    echo "  $0 safetynet android staging latest"
    echo "  $0 safetynet android staging 12345678"
    exit 1
fi

# Load config
CONFIG_FILE="config/projects.json"
if ! command -v jq &> /dev/null; then
    echo -e "${RED}Error: jq required. Install with: brew install jq${NC}"
    exit 1
fi

APP_REPO=$(jq -r ".projects.\"$PROJECT\".appRepo // empty" "$CONFIG_FILE")
if [ -z "$APP_REPO" ]; then
    echo -e "${RED}Error: Project '$PROJECT' not found in config${NC}"
    exit 1
fi

TARGET_DIR="apps/$PROJECT/$PLATFORM/$ENVIRONMENT"
mkdir -p "$TARGET_DIR"

echo -e "${YELLOW}Downloading from GitHub Actions artifacts...${NC}"
echo "Repository: $APP_REPO"
echo "Platform: $PLATFORM"
echo "Environment: $ENVIRONMENT"

# Artifact name pattern (adjust based on your app's artifact naming)
ARTIFACT_NAME="app-${ENVIRONMENT}-${PLATFORM}"

if [ "$RUN_ID" == "latest" ]; then
    echo -e "${YELLOW}Finding latest successful workflow run...${NC}"

    # Get latest successful run
    RUN_ID=$(gh run list \
        --repo "$APP_REPO" \
        --workflow build \
        --status success \
        --limit 1 \
        --json databaseId \
        --jq '.[0].databaseId')

    if [ -z "$RUN_ID" ]; then
        echo -e "${RED}Error: No successful workflow runs found${NC}"
        exit 1
    fi

    echo -e "${GREEN}Found run ID: $RUN_ID${NC}"
fi

# Download artifact
echo -e "${YELLOW}Downloading artifact: $ARTIFACT_NAME${NC}"

if gh run download "$RUN_ID" \
    --repo "$APP_REPO" \
    --name "$ARTIFACT_NAME" \
    --dir "$TARGET_DIR"; then

    echo -e "${GREEN}✓ Download successful!${NC}"
    echo ""
    echo "Downloaded files:"
    ls -lh "$TARGET_DIR"
else
    echo -e "${RED}✗ Download failed!${NC}"
    echo ""
    echo "Available artifacts for run $RUN_ID:"
    gh run view "$RUN_ID" --repo "$APP_REPO" --json artifacts --jq '.artifacts[].name'
    exit 1
fi
