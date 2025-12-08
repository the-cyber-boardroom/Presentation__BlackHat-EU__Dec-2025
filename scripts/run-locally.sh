#!/bin/bash

# Required environment variables
REQUIRED_VARS=("FAST_API__MODULE" "FAST_API__PORT")

# Load environment variables from .local-server.env file if it exists
if [ -f .local-server.env ]; then
    echo "Loading environment variables from .local-server.env file..."
    export $(grep -v '^#' .local-server.env | grep -v '^[[:space:]]*$' | xargs)
    echo "✓ Environment variables loaded"
else
    echo "❌ Error: .local-server.env file not found"
    echo "   Create a .local-server.env file with your configuration"
    exit 1
fi

# Validate required variables
missing_vars=()

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "❌ Error: Missing required environment variables:"
    for var in "${missing_vars[@]}"; do
        echo "   - $var"
    done
    echo "Fix these in .local-server.env and try again."
    exit 1
fi

# Start server only if everything is valid
echo "✓ All required variables present. Starting server..."

poetry run uvicorn "${FAST_API__MODULE}.fast_api.lambda_handler:app" \
    --reload \
    --host 0.0.0.0 \
    --port "$FAST_API__PORT" \
    --log-level info \
    --no-access-log
