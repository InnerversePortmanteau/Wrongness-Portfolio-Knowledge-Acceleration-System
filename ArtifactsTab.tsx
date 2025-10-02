import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Artifact } from '../types';

interface ArtifactsTabProps {
  artifacts: Artifact[];
}

const ArtifactsTab: React.FC<ArtifactsTabProps> = ({ artifacts }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Artifact Library</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {artifacts.map(artifact => (
            <div key={artifact.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{artifact.title}</h3>
                    {artifact.validated && <CheckCircle className="w-5 h-5 text-green-600" />}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{artifact.id}</span>
                    <span>•</span>
                    <span>{artifact.domain}</span>
                    <span>•</span>
                    <span>{artifact.dateCreated}</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {artifact.status}
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Protocols</div>
                  <div className="text-xl font-bold text-gray-900">{artifact.protocols}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Times Applied</div>
                  <div className="text-xl font-bold text-gray-900">{artifact.timesSaved}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Avg Time Saved</div>
                  <div className="text-xl font-bold text-gray-900">{artifact.avgTimeSaved}m</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Total Impact</div>
                  <div className="text-xl font-bold text-purple-600">{artifact.timesSaved * artifact.avgTimeSaved}m</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
                  Export
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
                  Create Derivative
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtifactsTab;