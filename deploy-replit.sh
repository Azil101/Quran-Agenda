#!/bin/bash

# Replit Deployment Script
# This script rebuilds the app for Replit deployment

echo "🔧 Rebuilding Quran Agenda for Replit..."

cd web-app

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Building production bundle..."
npm run build

echo "✅ Build complete! Files are in web-app/dist/"
echo ""
echo "Next steps:"
echo "1. Go to Replit: https://replit.com/@azilhassan1/Quran-Agenda"
echo "2. Click 'Stop' then 'Run' to restart with new build"
echo "3. Or trigger a new deployment in the Deployments tab"
echo ""
echo "Your app should now work at the Replit URL!"
