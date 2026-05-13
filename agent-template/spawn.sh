#!/bin/bash
# spawn.sh — Onboard a new Launchstr client property
# Usage: ./spawn.sh CLIENT_SLUG
# Example: ./spawn.sh cabin-on-the-rim

set -e

SLUG=$1
WORKSPACE="/Users/alfred/.openclaw/workspace/projects/launchstr/clients"
TEMPLATE="/Users/alfred/.openclaw/workspace/projects/launchstr/agent-template"

if [ -z "$SLUG" ]; then
  echo "Usage: ./spawn.sh CLIENT_SLUG"
  exit 1
fi

echo "🏠 Spawning new client: $SLUG"

# 1. Create client folder from template
mkdir -p "$WORKSPACE/$SLUG"
cp -r "$TEMPLATE/." "$WORKSPACE/$SLUG/"
rm "$WORKSPACE/$SLUG/spawn.sh"  # don't copy the spawn script

# 2. Replace placeholder slugs
find "$WORKSPACE/$SLUG" -name "*.md" -exec sed -i '' "s/CLIENT_SLUG/$SLUG/g" {} \;

# 3. Set onboarding date
TODAY=$(date +%Y-%m-%d)
find "$WORKSPACE/$SLUG" -name "*.md" -exec sed -i '' "s/YYYY-MM-DD/$TODAY/g" {} \;

echo "✅ Client folder created: $WORKSPACE/$SLUG"
echo ""
echo "📋 Next steps:"
echo "  1. Fill in $WORKSPACE/$SLUG/PROPERTY.md from the intake form"
echo "  2. Set up Buffer channel for @[instagram_handle]"
echo "  3. Add cron jobs (see below)"
echo "  4. Build the property website (copy gathering-pines site as base)"
echo "  5. Set up Instagram account (or audit existing one)"
echo ""
echo "🕐 Cron jobs to add (edit crontab with: crontab -e):"
echo ""
echo "  # $SLUG — Event research (Monday 8am MST)"
echo "  0 15 * * 1 cd $WORKSPACE/$SLUG && openclaw task run event-research 2>&1 >> event-research/cron.log"
echo ""
echo "  # $SLUG — Content drafts (Tuesday 8am MST)"
echo "  0 15 * * 2 cd $WORKSPACE/$SLUG && openclaw task run content-drafts 2>&1 >> content-drafts/cron.log"
echo ""
echo "Done. Go build something great. 🚀"
