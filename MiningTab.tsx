import React from 'react';
import { Clock } from 'lucide-react';

const MiningTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Mining Workflow */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mining Workflow</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">Select Dataset</h3>
              <p className="text-sm text-gray-500">Choose from prioritized list or add new source</p>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
              Browse Datasets
            </button>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">Extract Patterns</h3>
              <p className="text-sm text-gray-500">Identify: Wrong Model → Signal → Correct Model</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
              Open Extraction Template
            </button>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">Synthesize Protocol</h3>
              <p className="text-sm text-gray-500">Generalize pattern into actionable protocol</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
              Protocol Builder
            </button>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-sm">4</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">Validate in Practice</h3>
              <p className="text-sm text-gray-500">Apply to real problem and measure effectiveness</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
              Log Validation
            </button>
          </div>
        </div>
      </div>

      {/* Quick Extraction Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Pattern Extraction</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Source Dataset</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
              <option>Google SRE Postmortems</option>
              <option>Stack Overflow - Python</option>
              <option>GitLab Incidents</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Wrong Mental Model</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              rows={3}
              placeholder="What assumption or approach was incorrect?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Signal That Revealed Wrongness</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              rows={3}
              placeholder="What data indicated the model was broken?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Corrected Model/Protocol</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              rows={3}
              placeholder="What's the better approach?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
              <input 
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., Software Engineering"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transferability</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                <option>High - Cross-domain</option>
                <option>Medium - Within field</option>
                <option>Low - Specific case</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Save Pattern
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Save as Draft
            </button>
          </div>
        </div>
      </div>

      {/* Mining Timer */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Session Timer</h2>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-2xl font-mono font-bold text-gray-900">00:45:32</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Current Dataset:</span>
            <span className="font-medium text-gray-900">Google SRE Postmortems</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Patterns Extracted:</span>
            <span className="font-medium text-gray-900">3</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Extraction Rate:</span>
            <span className="font-medium text-green-600">15 min/pattern</span>
          </div>
          <div className="pt-3 border-t border-gray-200 flex space-x-2">
            <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm">
              End Session
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
              Pause
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">This Week's Mining Goals</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Extract 5 postmortem patterns</span>
              <span className="text-sm text-gray-500">3/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Validate 2 protocols</span>
              <span className="text-sm text-gray-500">1/2</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '50%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Create 1 new artifact</span>
              <span className="text-sm text-gray-500">0/1</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiningTab;