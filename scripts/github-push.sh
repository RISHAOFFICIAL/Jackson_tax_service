#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════
# Jackson Tax Service — GitHub Push Script
# ═══════════════════════════════════════════════════════════════════════
# This script creates a GitHub repository and pushes the code.
# 
# Prerequisites:
#   1. Create a repository on GitHub: https://github.com/new
#      - Repository name: jackson-tax-service
#      - Keep it private (or public — your choice)
#      - Do NOT initialize with README (we have one)
#
#   2. Generate a GitHub personal access token:
#      https://github.com/settings/tokens → Generate new token (classic)
#      - Scopes: repo (full control)
#      - Copy the token immediately
#
# Usage:
#   chmod +x scripts/github-push.sh
#   ./scripts/github-push.sh <your-github-username> <your-github-token>
# ═══════════════════════════════════════════════════════════════════════

USERNAME="${1:-}"
TOKEN="${2:-}"

if [ -z "$USERNAME" ] || [ -z "$TOKEN" ]; then
  echo "Usage: $0 <github-username> <github-token>"
  echo ""
  echo "Example:"
  echo "  $0 austinjax ghp_xxxxxxxxxxxxxxxxxxxx"
  exit 1
fi

REPO_NAME="jackson-tax-service"
REPO_URL="https://${USERNAME}:${TOKEN}@github.com/${USERNAME}/${REPO_NAME}.git"

echo "🚀 Pushing Jackson Tax Service to GitHub..."
echo "   Repository: ${USERNAME}/${REPO_NAME}"
echo ""

# Make sure we're in the right directory
cd "$(dirname "$0")/.."

# Add remote (remove if already exists)
git remote remove origin 2>/dev/null
git remote add origin "$REPO_URL"

# Push to GitHub
git push -u origin master

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Successfully pushed to GitHub!"
  echo "   URL: https://github.com/${USERNAME}/${REPO_NAME}"
  echo ""
  echo "Next step: Clone onto Hostinger:"
  echo "   git clone https://github.com/${USERNAME}/${REPO_NAME}.git"
  echo "   cd ${REPO_NAME}"
  echo "   npm install"
  echo "   cp .env.hostinger .env  # Edit with real values"
  echo "   npm run db:push"
  echo "   npm run seed"
  echo "   npm run build"
  echo "   npm start"
else
  echo ""
  echo "❌ Push failed. Check your username and token."
  echo ""
  echo "Troubleshooting:"
  echo "  - Make sure the repository exists on GitHub"
  echo "  - Make sure the token has 'repo' scope"
  echo "  - Token should not contain newlines or extra spaces"
fi