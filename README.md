# Pipeline Health Dashboard

## Overview

Welcome to the **Pipeline Health Dashboard**, a real-time monitoring tool for GitHub Actions pipelines across multiple repositories in the `firstedu-engineering` organization. This dashboard provides a clean, tabular view of pipeline statuses, success rates, and historical trends, helping teams quickly identify and address failing pipelines. Built with Node.js, Express, EJS, and Chart.js, it’s lightweight, customizable, and perfect for teams who want to keep their CI/CD pipelines in check!

This project currently monitors repositories like `ai-tools`, `realus-website`, `realus-portal`, `mars-ladder-web`, `teacher-frontend`, `falcon-beak`, `marsladder-ui-component`, and `principal-portal`, displaying each repo’s latest pipeline status, conclusion, success rate, and 15-minute aggregated historical data in a horizontal lane (row) layout.

## Features

- **Real-Time Monitoring**: Polls GitHub API for pipeline statuses (manual refresh, Webhook support planned).
- **Multi-Repo Support**: Tracks multiple repositories in a single dashboard.
- **Visual Insights**: Uses Chart.js to display pipeline health trends, aggregated by 15-minute intervals.
- **Status Sorting**: Automatically sorts pipelines by conclusion (`failure/error` at the top, `pending` in the middle, `success` at the bottom) for quick identification of issues.
- **Success Rate**: Shows each repo’s success rate (percentage) based on recent runs.
- **Responsive Design**: Clean, compact table layout with color-coded rows (green for success, red for failure, yellow for in_progress, gray for pending/unknown).

## Installation

### Prerequisites

- Node.js (v16 or higher)
- GitHub Personal Access Token (PAT) with `repo` and `workflow` permissions

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pipeline-health-dashboard.git
   cd pipeline-health-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your GitHub PAT:

   ```
   GITHUB_TOKEN=your-github-token-here
   ```

4. Download Chart.js for visualizations:

   ```bash
   mkdir public
   cd public
   curl -O https://cdn.jsdelivr.net/npm/chart.js
   mv chart.js chart.min.js
   cd ..
   ```

5. Run the dashboard:

   ```bash
   node app.js
   ```

6. Open your browser and visit `http://localhost:3000`.

## Usage

- The dashboard displays a table with columns for Repository, Latest Workflow, Status, Conclusion, Success Rate (%), Last Updated, and Recent Intervals (15-min).
- Each row is color-coded: green for successful pipelines, red for failed ones, yellow for running, and gray for unknown/pending.
- The chart in the last column shows pipeline health over time, aggregated by 15-minute intervals, with green bars for successes and red bars for failures.

## Current Limitations

- **Manual Refresh**: Requires manual page refresh for updates; Webhook integration is pending.
- **Static Data**: No real-time notifications or alerts for pipeline failures.
- **Basic Styling**: While functional, the UI could benefit from a more polished, modern design.
- **Limited Data Scope**: Pulls only 50 runs per repo, which may miss older trends.

## Possible Improvements (Wild and Crazy Ideas!)

Here are some bold, imaginative, and over-the-top ideas to take this dashboard to the next level—think sci-fi, futuristic, or just plain fun!

1. **AI-Powered Pipeline Doctor**:
   - Integrate an AI system (like a virtual "Pipeline Doctor") that analyzes pipeline failures in real-time, suggests fixes, and even auto-triggers recovery scripts. Imagine a chatbot popping up with a robotic voice saying, "Critical failure detected in `falcon-beak`—initiating emergency patch protocol!"

2. **Holographic 3D Dashboard**:
   - Transform the 2D table into a full 3D holographic display, where each repo floats as a glowing orb, pulsing red for failures, green for successes, and yellow for running. Use VR/AR technology to let teams "walk" through their pipeline health in a virtual space!

3. **Pipeline Health Symphony**:
   - Replace static colors with dynamic audio cues: successful pipelines play uplifting orchestral music, failed ones trigger eerie sirens or dramatic movie sound effects, and running pipelines hum softly. Add a volume slider for team preferences (or mute for quiet hours!).

4. **Time-Travel Debugging**:
   - Implement a "time-travel" feature where users can rewind pipeline history, replay failed runs in a sandbox, and see what went wrong step-by-step. Picture a sci-fi interface with a time slider, complete with retro-futuristic sound effects!

5. **Gamified Pipeline Challenges**:
   - Turn pipeline monitoring into a game! Assign points for fixing failures, badges for maintaining 100% success rates, and leaderboards for teams. Add animated avatars for each repo that "level up" with consistent success—maybe a dragon for `ai-tools` or a rocket for `falcon-beak`!

6. **Intergalactic Alerts**:
   - Upgrade notifications to intergalactic signals: failing pipelines trigger laser-like alerts across all team devices, complete with flashing lights and a voice saying, "Houston, we have a problem in `principal-portal`!" Use satellite imagery to show failure locations on a 3D globe.

7. **Self-Healing Pipelines**:
   - Develop an autonomous system that not only detects failures but attempts to fix them (e.g., rolling back commits, restarting jobs, or notifying specific engineers via holographic projections). Imagine pipelines that "heal themselves" like sci-fi nanobots!

8. **Augmented Reality Heatmaps**:
   - Project a live AR heatmap onto the office walls, showing pipeline health across all repos in real-time. Red hotspots for failures, green for successes, pulsing yellow for running—perfect for team brainstorming sessions in a futuristic war room!

9. **Pipeline Personality Engine**:
   - Give each repo a personality and voice (e.g., `ai-tools` as a witty AI, `realus-website` as a cheerful marketer). When a pipeline fails, the repo’s avatar could dramatically lament, "Oh no, I’ve crashed again—send help!" with animated tears or flames.

10. **Quantum Pipeline Prediction**:
    - Use quantum computing to predict pipeline failures before they happen, displaying probabilistic timelines on the dashboard. Add a "Quantum Risk Meter" that glows ominously when a failure is 99.9% likely—complete with a sci-fi soundscape!

These ideas are intentionally wild to spark creativity, but they can be scaled down to practical implementations like Webhook real-time updates, advanced visualizations, or interactive notifications.

## Contributing

Feel free to fork this repository, submit issues, or open pull requests. We’d love to see your ideas—especially if they involve any of the crazy improvements above!

## License

MIT License—use, modify, and share as you wish, but don’t blame us if your pipelines start singing opera!

---

### Notes

- Ensure your GitHub PAT has `repo` and `workflow` permissions to access pipeline data.
- If you encounter issues, check the console logs, verify your `.env` file, and ensure `public/chart.min.js` is present.
- For production use, consider deploying this dashboard on a server with Webhook integration for real-time updates.

Happy pipeline monitoring, and may your CI/CD workflows always stay green (or at least not turn into a sci-fi disaster movie)! 🚀
