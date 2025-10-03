import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Clock, TrendingUp, Database, Target } from 'lucide-react';
import { MiningTask, Protocol } from '../types';

interface DashboardTabProps {
  stats: {
    totalArtifacts: number;
    totalProtocols: number;
    totalTimeSaved: number;
    avgSuccessRate: number;
    datasetsActive: number;
    datasetsCompleted: number;
  };
  miningQueue: MiningTask[];
  protocols: Protocol[];
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center">
    <div className="bg-gray-100 p-3 rounded-full mr-4">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  </div>
);

const DashboardTab: React.FC<DashboardTabProps> = ({ stats, miningQueue, protocols }) => {
  const topProtocols = [...protocols].sort((a, b) => b.successRate - a.successRate).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard icon={<Zap className="text-purple-600" />} label="Total Artifacts" value={stats.totalArtifacts} />
        <StatCard icon={<ShieldCheck className="text-green-600" />} label="Active Protocols" value={stats.totalProtocols} />
        <StatCard icon={<Clock className="text-blue-600" />} label="Time Saved" value={`${Math.round(stats.totalTimeSaved / 60)}h`} />
        <StatCard icon={<TrendingUp className="text-red-600" />} label="Avg. Protocol Success" value={`${Math.round(stats.avgSuccessRate)}%`} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Mining Queue */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Database className="mr-2 text-gray-500" />
            Active Mining Queue
          </h3>
          <ul className="space-y-4">
            {miningQueue.map(task => (
              <li key={task.id} className="p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">{task.target}</span>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Source: {task.source}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${task.progress}%` }}></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Performing Protocols */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="mr-2 text-gray-500" />
            Top Performing Protocols
          </h3>
          <ul className="space-y-3">
            {topProtocols.map(protocol => (
              <li key={protocol.id} className="flex justify-between items-center text-sm">
                <Link to={`/protocols`} className="text-purple-600 hover:underline">{protocol.name}</Link>
                <span className="font-semibold text-green-700">{protocol.successRate}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;