import React from 'react';
import { Plus } from 'lucide-react';
import { Dataset } from '../types';

interface DatasetsTabProps {
  sortedDatasets: Dataset[];
  calculateDatasetScore: (dataset: Dataset) => number;
  calculateDatasetROI: (dataset: Dataset) => string;
}

const DatasetsTab: React.FC<DatasetsTabProps> = ({ sortedDatasets, calculateDatasetScore, calculateDatasetROI }) => {
  return (
    <div className="space-y-6">
      {/* Dataset Prioritization */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Dataset Library</h2>
            <p className="text-sm text-gray-500 mt-1">Prioritized by relevance, signal density, and transferability</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            <Plus className="w-4 h-4" />
            <span>Add Dataset</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dataset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedDatasets.map(dataset => (
                <tr key={dataset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{dataset.name}</div>
                      <div className="text-sm text-gray-500">{dataset.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {dataset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-gray-900">{calculateDatasetScore(dataset)}</div>
                      <div className="text-xs text-gray-500">
                        <div>R:{dataset.relevance} S:{dataset.signalDensity} T:{dataset.transferability}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      dataset.status === 'in-progress' ? 'bg-green-100 text-green-700' :
                      dataset.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {dataset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-lg font-semibold text-purple-600">
                      {calculateDatasetROI(dataset)}x
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {dataset.protocolsExtracted} extracted / {dataset.protocolsValidated} validated
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {dataset.timeInvested}h invested
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Add Presets */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Add: Recommended Datasets</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'AWS Outage Reports', type: 'Postmortem', score: 'High Priority' },
            { name: 'HN: War Stories', type: 'Narrative', score: 'Medium Priority' },
            { name: 'Release It! Book', type: 'Synthesis', score: 'High Priority' }
          ].map((preset, idx) => (
            <button key={idx} className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition text-left">
              <div className="font-medium text-gray-900">{preset.name}</div>
              <div className="text-sm text-gray-500 mt-1">{preset.type}</div>
              <div className="text-xs text-purple-600 font-medium mt-2">{preset.score}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatasetsTab;