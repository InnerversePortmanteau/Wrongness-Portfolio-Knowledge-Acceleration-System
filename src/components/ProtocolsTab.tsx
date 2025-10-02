import React from 'react';
import { Protocol } from '../types';

interface ProtocolsTabProps {
  protocols: Protocol[];
}

const ProtocolsTab: React.FC<ProtocolsTabProps> = ({ protocols }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Protocol Library</h2>
          <p className="text-sm text-gray-500 mt-1">Extracted procedures ranked by effectiveness</p>
        </div>
        <div className="divide-y divide-gray-200">
          {protocols.map(protocol => (
            <div key={protocol.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{protocol.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      protocol.confidence === 'high' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {protocol.confidence} confidence
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Source: {protocol.artifactSource} • Category: {protocol.category}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Times Applied</div>
                  <div className="text-2xl font-bold text-gray-900">{protocol.timesApplied}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                  <div className="text-2xl font-bold text-green-600">{protocol.successRate}%</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Avg Time Saved</div>
                  <div className="text-2xl font-bold text-blue-600">{protocol.avgTimeSaved}m</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Total Impact</div>
                  <div className="text-2xl font-bold text-purple-600">{protocol.timesApplied * protocol.avgTimeSaved}m</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
                  Apply Now
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
                  View Checklist
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
                  Log Usage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProtocolsTab;