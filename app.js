require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const repos = [
  'firstedu-engineering/ai-tools',
  'firstedu-engineering/realus-website',
  'firstedu-engineering/realus-portal',
  'firstedu-engineering/mars-ladder-web',
  'firstedu-engineering/teacher-frontend',
  'firstedu-engineering/falcon-beak',
  'firstedu-engineering/marsladder-ui-component',
  'firstedu-engineering/principal-portal'
];

// 将 runs 按 15 分钟聚合
function aggregateRuns(runs, interval = 15 * 60 * 1000) { // 15 分钟（毫秒）
  const aggregated = {};
  runs.forEach(run => {
    if (!run.updated_at) return; // 跳过无效数据
    const time = new Date(run.updated_at).getTime();
    const slot = Math.floor(time / interval) * interval;
    if (!aggregated[slot]) {
      aggregated[slot] = { success: 0, failure: 0, other: 0, latestTime: run.updated_at };
    }
    if (run.conclusion === 'success') aggregated[slot].success++;
    else if (run.conclusion === 'failure' || run.conclusion === 'error') aggregated[slot].failure++; // 假设 wrong 指 failure/error
    else aggregated[slot].other++;
    if (new Date(run.updated_at) > new Date(aggregated[slot].latestTime)) {
      aggregated[slot].latestTime = run.updated_at;
    }
  });
  return Object.entries(aggregated)
    .map(([slot, data]) => ({
      time: new Date(parseInt(slot)).toLocaleString(),
      success: data.success,
      failure: data.failure,
      other: data.other,
      updated_at: data.latestTime
    }))
    .sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at)); // 按时间从旧到新排序
}

function calculateSuccessRate(runs) {
  if (!runs || runs.length === 0) return 0;
  const total = runs.length;
  const successes = runs.filter(run => run.conclusion === 'success').length;
  return total > 0 ? (successes / total * 100).toFixed(1) : 0; // 保留一位小数
}

app.get('/', async (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN is not set in .env file');
    res.status(500).send('Configuration error: GITHUB_TOKEN not set');
    return;
  }
  const repoStatuses = [];
  const timestamp = new Date().toISOString();

  try {
    const promises = repos.map(async (repo) => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repo}/actions/runs?per_page=50`, // 拉取所有默认数据
          {
            headers: {
              Authorization: `token ${token}`,
              Accept: 'application/vnd.github+json',
              'User-Agent': 'node-app'
            },
            proxy: false
          }
        );
        const runs = response.data.workflow_runs || [];
        runs.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); // 保持最新数据在顶部，但聚合按时间排序
        const latestRun = runs[0] || { name: 'N/A', status: 'unknown', conclusion: 'unknown', updated_at: 'N/A' };
        return {
          repo,
          latest: {
            name: latestRun.name,
            status: latestRun.status,
            conclusion: latestRun.conclusion || 'pending', // 确保有默认值
            updated_at: latestRun.updated_at
          },
          history: aggregateRuns(runs), // 按时间从旧到新排序
          successRate: calculateSuccessRate(runs) // 计算成功率
        };
      } catch (error) {
        console.error(`Error fetching ${repo}:`, error.message);
        return {
          repo,
          latest: { name: 'N/A', status: 'error', conclusion: 'error', updated_at: 'N/A' },
          history: [],
          successRate: 0
        };
      }
    });

    const results = await Promise.all(promises);
    // 排序：wrong/failure/error > pending > success
    repoStatuses.push(...results.sort((a, b) => {
      const order = { 'failure': 0, 'error': 0, 'pending': 1, 'success': 2, 'unknown': 2 };
      return order[a.latest.conclusion] - order[b.latest.conclusion];
    }));
    console.log('Fetched repo statuses:', repoStatuses.length);
    res.render('index', { repoStatuses, timestamp });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.status : error.message);
    res.status(500).send(`Error fetching pipeline data: ${error.message}`);
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));