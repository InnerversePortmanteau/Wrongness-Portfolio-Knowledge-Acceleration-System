import React from 'react';
import { FileText, Target, Clock, Database } from 'lucide-react';
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

const DashboardTab: React.FC<DashboardTabProps> = ({ stats, miningQueue, protocols }) => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Total Artifacts</span>
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.totalArtifacts}</div>
          <div className="text-xs text-green-600 mt-1">+1 this week</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Active Protocols</span>
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.totalProtocols}</div>
          <div className="text-xs text-gray-500 mt-1">{stats.avgSuccessRate.toFixed(0)}% avg success</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Time Saved</span>
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{Math.floor(stats.totalTimeSaved / 60)}h</div>
          <div className="text-xs text-gray-500 mt-1">{stats.totalTimeSaved % 60}m total</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Active Mining</span>
            <Database className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.datasetsActive}</div>
          <div className="text-xs text-gray-500 mt-1">{stats.datasetsCompleted} completed</div>
        </div>
      </div>

      {/* Mining Queue */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Mining Queue</h2>
        </div>
        <div className="p-6 space-y-4">
          {miningQueue.map(task => (
            <div key={task.id} className="flex items-center space-x-4">
              <div className={`w-2 h-2 rounded-full ${task.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{task.target}</span>
                  <span className="text-sm text-gray-500">{task.deadline}</span>
                </div>
                <div className="text-sm text-gray-500 mb-2">Source: {task.source}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${task.progress}%` }} />
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Protocols */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Protocols</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {protocols.slice(0, 3).map(protocol => (
            <div key={protocol.id} className="p-6 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-gray-900">{protocol.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    protocol.confidence === 'high' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {protocol.confidence} confidence
                  </span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>Applied {protocol.timesApplied}x</span>
                  <span>{protocol.successRate}% success</span>
                  <span>~{protocol.avgTimeSaved}m saved per use</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{protocol.timesApplied * protocol.avgTimeSaved}m</div>
                <div className="text-xs text-gray-500">total time saved</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;