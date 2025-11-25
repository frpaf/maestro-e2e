#!/bin/bash

# Helper script to manage project configurations
# Usage: ./scripts/manage-projects.sh <command> [args]

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

CONFIG_FILE="config/projects.json"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${RED}Error: jq is not installed${NC}"
    echo "Install it with: brew install jq"
    exit 1
fi

# Create config file if it doesn't exist
if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${YELLOW}Config file not found. Creating default...${NC}"
    mkdir -p config
    echo '{"projects":{}}' > "$CONFIG_FILE"
fi

# Commands
COMMAND=$1

case "$COMMAND" in
    list)
        echo -e "${GREEN}Configured Projects:${NC}"
        echo ""
        jq -r '.projects | to_entries[] | "📱 \(.key)\n   Name: \(.value.displayName)\n   Repo: \(.value.appRepo)\n   Staging: \(.value.appId.staging)\n   Production: \(.value.appId.production)\n"' "$CONFIG_FILE"
        ;;

    add)
        PROJECT_NAME=$2
        if [ -z "$PROJECT_NAME" ]; then
            echo -e "${RED}Error: Project name required${NC}"
            echo "Usage: $0 add <project-name>"
            exit 1
        fi

        # Check if project already exists
        EXISTS=$(jq -r ".projects.\"$PROJECT_NAME\" // empty" "$CONFIG_FILE")
        if [ ! -z "$EXISTS" ]; then
            echo -e "${RED}Error: Project '$PROJECT_NAME' already exists${NC}"
            exit 1
        fi

        # Interactive prompts
        echo -e "${GREEN}Adding new project: $PROJECT_NAME${NC}"
        echo ""

        read -p "Display Name: " DISPLAY_NAME
        read -p "App Repository (org/repo): " APP_REPO
        read -p "Staging App ID: " STAGING_APP_ID
        read -p "Production App ID: " PRODUCTION_APP_ID
        read -p "Staging URL: " STAGING_URL
        read -p "Production URL: " PRODUCTION_URL
        read -p "Staging Username: " STAGING_USER
        read -p "Staging Password: " STAGING_PASS
        read -p "GitHub Secret Prefix (uppercase): " SECRET_PREFIX

        # Add to config
        jq --arg name "$PROJECT_NAME" \
           --arg display "$DISPLAY_NAME" \
           --arg repo "$APP_REPO" \
           --arg stagingId "$STAGING_APP_ID" \
           --arg prodId "$PRODUCTION_APP_ID" \
           --arg stagingUrl "$STAGING_URL" \
           --arg prodUrl "$PRODUCTION_URL" \
           --arg stagingUser "$STAGING_USER" \
           --arg stagingPass "$STAGING_PASS" \
           --arg secretPrefix "$SECRET_PREFIX" \
           '.projects[$name] = {
               "displayName": $display,
               "appRepo": $repo,
               "appId": {
                   "staging": $stagingId,
                   "production": $prodId
               },
               "environments": {
                   "staging": {
                       "url": $stagingUrl,
                       "username": $stagingUser,
                       "password": $stagingPass
                   },
                   "production": {
                       "url": $prodUrl,
                       "secretPrefix": $secretPrefix
                   }
               }
           }' "$CONFIG_FILE" > "${CONFIG_FILE}.tmp" && mv "${CONFIG_FILE}.tmp" "$CONFIG_FILE"

        echo -e "${GREEN}✓ Project '$PROJECT_NAME' added to configuration${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Create folder structure: mkdir -p apps/$PROJECT_NAME/{android,ios}/{staging,production}"
        echo "2. Create test structure: mkdir -p tests/$PROJECT_NAME/{android,ios}/{staging,production}"
        echo "3. Use: /add-new-project to complete setup"
        ;;

    get)
        PROJECT_NAME=$2
        if [ -z "$PROJECT_NAME" ]; then
            echo -e "${RED}Error: Project name required${NC}"
            echo "Usage: $0 get <project-name>"
            exit 1
        fi

        PROJECT_DATA=$(jq ".projects.\"$PROJECT_NAME\"" "$CONFIG_FILE")
        if [ "$PROJECT_DATA" == "null" ]; then
            echo -e "${RED}Error: Project '$PROJECT_NAME' not found${NC}"
            exit 1
        fi

        echo -e "${GREEN}Configuration for $PROJECT_NAME:${NC}"
        echo "$PROJECT_DATA" | jq .
        ;;

    update)
        PROJECT_NAME=$2
        FIELD=$3
        VALUE=$4

        if [ -z "$PROJECT_NAME" ] || [ -z "$FIELD" ] || [ -z "$VALUE" ]; then
            echo -e "${RED}Error: Missing arguments${NC}"
            echo "Usage: $0 update <project-name> <field> <value>"
            echo "Example: $0 update safetynet appRepo yourorg/new-repo"
            exit 1
        fi

        jq --arg name "$PROJECT_NAME" \
           --arg field "$FIELD" \
           --arg value "$VALUE" \
           '.projects[$name][$field] = $value' "$CONFIG_FILE" > "${CONFIG_FILE}.tmp" && mv "${CONFIG_FILE}.tmp" "$CONFIG_FILE"

        echo -e "${GREEN}✓ Updated $PROJECT_NAME.$FIELD = $VALUE${NC}"
        ;;

    remove)
        PROJECT_NAME=$2
        if [ -z "$PROJECT_NAME" ]; then
            echo -e "${RED}Error: Project name required${NC}"
            echo "Usage: $0 remove <project-name>"
            exit 1
        fi

        read -p "Are you sure you want to remove '$PROJECT_NAME'? (yes/no): " CONFIRM
        if [ "$CONFIRM" != "yes" ]; then
            echo "Cancelled"
            exit 0
        fi

        jq --arg name "$PROJECT_NAME" 'del(.projects[$name])' "$CONFIG_FILE" > "${CONFIG_FILE}.tmp" && mv "${CONFIG_FILE}.tmp" "$CONFIG_FILE"
        echo -e "${GREEN}✓ Project '$PROJECT_NAME' removed from configuration${NC}"
        ;;

    validate)
        echo -e "${GREEN}Validating configuration...${NC}"

        if jq empty "$CONFIG_FILE" 2>/dev/null; then
            echo -e "${GREEN}✓ Valid JSON syntax${NC}"

            # Check each project has required fields
            PROJECTS=$(jq -r '.projects | keys[]' "$CONFIG_FILE")
            for project in $PROJECTS; do
                echo -e "${YELLOW}Checking $project...${NC}"

                REPO=$(jq -r ".projects.\"$project\".appRepo // empty" "$CONFIG_FILE")
                if [ -z "$REPO" ]; then
                    echo -e "${RED}  ✗ Missing appRepo${NC}"
                else
                    echo -e "${GREEN}  ✓ appRepo: $REPO${NC}"
                fi

                STAGING_ID=$(jq -r ".projects.\"$project\".appId.staging // empty" "$CONFIG_FILE")
                if [ -z "$STAGING_ID" ]; then
                    echo -e "${RED}  ✗ Missing appId.staging${NC}"
                else
                    echo -e "${GREEN}  ✓ staging appId: $STAGING_ID${NC}"
                fi

                PROD_ID=$(jq -r ".projects.\"$project\".appId.production // empty" "$CONFIG_FILE")
                if [ -z "$PROD_ID" ]; then
                    echo -e "${RED}  ✗ Missing appId.production${NC}"
                else
                    echo -e "${GREEN}  ✓ production appId: $PROD_ID${NC}"
                fi
            done
        else
            echo -e "${RED}✗ Invalid JSON syntax${NC}"
            exit 1
        fi
        ;;

    *)
        echo "Project Configuration Manager"
        echo ""
        echo "Usage: $0 <command> [args]"
        echo ""
        echo "Commands:"
        echo "  list                           - List all configured projects"
        echo "  add <project-name>             - Add a new project (interactive)"
        echo "  get <project-name>             - Show project configuration"
        echo "  update <project> <field> <val> - Update a field"
        echo "  remove <project-name>          - Remove a project"
        echo "  validate                       - Validate configuration file"
        echo ""
        echo "Examples:"
        echo "  $0 list"
        echo "  $0 add inventory-app"
        echo "  $0 get safetynet"
        echo "  $0 update safetynet appRepo yourorg/new-repo"
        echo "  $0 remove old-project"
        echo "  $0 validate"
        ;;
esac
