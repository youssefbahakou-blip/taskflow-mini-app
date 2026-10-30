
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function TaskChart({ filteredTasks }) {
  const pending = filteredTasks.filter(
    task => task.status === 'Pending'
  ).length;

  const inProgress = filteredTasks.filter(
    task => task.status === 'In Progress'
  ).length;

  const completed = filteredTasks.filter(
    task => task.status === 'Completed'
  ).length;

  const data = [
    { name: 'Pending', value: pending, fill: '#F59E0B' },
    { name: 'In Progress', value: inProgress, fill: '#3B82F6' },
    { name: 'Completed', value: completed, fill: '#22C55E' }
  ];
  return (
    <div style={{ width: '100%', height: 350 }}>
      <h2>Tasks Statistics</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={100}
            label={({ name, percent }) =>
              percent > 0
                ? `${name}: ${(percent * 100).toFixed(0)}%`
                : ''
            }
          />
        
          <Tooltip />
          
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            wrapperStyle={{
              paddingTop: '10px',
              width: '100%'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TaskChart;
