import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Database, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { MiningTask, Protocol, Artifact } from '../types';

interface HomePageProps {
  stats: {
    totalArtifacts: number;
    totalProtocols: number;
    totalTimeSaved: number;
    avgSuccessRate: number;
  };
  miningQueue: MiningTask[];
  protocols: Protocol[];
  onOpenNewArtifactModal: () => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="bg-gray-800 p-4 rounded-lg flex items-center">
    <div className="bg-gray-700 p-3 rounded-md mr-4">{icon}</div>
    <div>
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ stats, miningQueue, protocols, onOpenNewArtifactModal }) => {
  const topProtocol = protocols.length > 0 ? [...protocols].sort((a, b) => b.successRate - a.successRate)[0] : null;
  const topMiningTask = miningQueue.length > 0 ? miningQueue[0] : null;

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Your Wrongness Portfolio</h1>
        <p className="text-lg text-gray-400">Transform errors into permanent upgrades. What would you like to do?</p>
      </div>

      {/* Core Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Capture Wrongness */}
        <div
          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer border-2 border-purple-500"
          onClick={onOpenNewArtifactModal}
        >
          <div className="flex items-center mb-4">
            <PlusCircle className="w-10 h-10 text-purple-400 mr-4" />
            <h2 className="text-2xl font-bold">Capture a New Wrongness</h2>
          </div>
          <p className="text-gray-400">
            Just finished a frustrating debugging session? Document the learning cycle as a new Artifact. This is the core practice.
          </p>
        </div>

        {/* Mine for Insights */}
        <Link
          to="/mining"
          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors block"
        >
          <div className="flex items-center mb-4">
            <Database className="w-10 h-10 text-blue-400 mr-4" />
            <h2 className="text-2xl font-bold">Mine for Insights</h2>
          </div>
          <p className="text-gray-400">
            Proactively learn from external knowledge sources. Your next priority task is:
          </p>
          <p className="mt-2 text-blue-300 font-semibold">
            {topMiningTask ? `${topMiningTask.target} from ${topMiningTask.source}` : 'No mining tasks in queue.'}
          </p>
        </Link>
      </div>

      {/* Key Metrics & Protocols */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-2 bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center"><TrendingUp className="mr-2" />Key Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<Zap size={24} />} label="Artifacts" value={stats.totalArtifacts} />
            <StatCard icon={<ShieldCheck size={24} />} label="Protocols" value={stats.totalProtocols} />
            <StatCard icon={<TrendingUp size={24} />} label="Avg. Success" value={`${Math.round(stats.avgSuccessRate)}%`} />
            <StatCard icon={<Zap size={24} />} label="Time Saved" value={`${Math.round(stats.totalTimeSaved / 60)}h`} />
          </div>
        </div>

        {/* Top Protocol */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Most Effective Protocol</h3>
          {topProtocol ? (
            <div>
              <p className="text-lg font-semibold text-green-400">{topProtocol.name}</p>
              <p className="text-sm text-gray-400">
                Success Rate: <span className="font-bold">{topProtocol.successRate}%</span> over {topProtocol.timesApplied} applications.
              </p>
              <Link to="/protocols" className="text-purple-400 hover:underline mt-2 inline-block">
                View Protocol Library &rarr;
              </Link>
            </div>
          ) : (
            <p className="text-gray-400">No protocols extracted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;