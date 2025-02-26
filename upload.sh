#!/bin/bash
# Reminder: If you get "permission denied", run "chmod +x upload.sh"
# Initialize git repository if it isn't already initialized
if [ ! -d ".git" ]; then
    git init
fi

git branch -M main
# Set upstream if not set (optional)
# git branch --set-upstream-to=origin/main main

# Stage all files, commit with a message, set main as the default branch,
# add the remote (if not already set) and push to GitHub
git add .
git commit -m "Initial commit"
# Pull remote changes with rebase to integrate updates
git pull --rebase origin main || { echo "Rebase failed. Resolve conflicts, then run the script again."; exit 1; }
git remote add origin https://github.com/whyy9527/pipeline-health-dashboard.git || true
git push -u origin main
