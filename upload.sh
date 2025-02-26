#!/bin/bash
# Reminder: If you get "permission denied", run "chmod +x upload.sh"
# Initialize git repository if it isn't already initialized
if [ ! -d ".git" ]; then
    git init
fi

# Stage all files, commit with a message, set main as the default branch,
# add the remote (if not already set) and push to GitHub
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/whyy9527/pipeline-health-dashboard.git || true
git push -u origin main
