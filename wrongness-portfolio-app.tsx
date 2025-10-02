import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, TrendingUp, BookOpen, Database, CheckCircle, Circle, AlertCircle, BarChart3, FileText, Target, Clock, Zap } from 'lucide-react';

const WrongnessPortfolioApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [artifacts, setArtifacts] = useState([
    {
      id: 'WP-001',
      title: 'I Was Wrong About Debugging',
      domain: 'Software Engineering',
      category: 'Process',
      status: 'evergreen',
      confidence: { protocol1: 'high', protocol2: 'high', protocol3: 'medium', protocol4: 'medium' },
      dateCreated: '2025-10-01',
      protocols: 4,
      timesSaved: 8,
      avgTimeSaved: 45,
      validated: true
    }
  ]);
  
  const [datasets, setDatasets] = useState([
    {
      id: 'DS-001',
      name: 'Google SRE Postmortems',
      type: 'Postmortem',
      relevance: 5,
      signalDensity: 5,
      transferability: 4,
      status: 'in-progress',
      timeInvested: 3,
      protocolsExtracted: 5,
      protocolsValidated: 2,
      url: 'https://sre.google/books/'
    },
    {
      id: 'DS-002',
      name: 'Stack Overflow - Python ImportErrors',
      type: 'Q&A',
      relevance: 5,
      signalDensity: 3,
      transferability: 4,
      status: 'planned',
      timeInvested: 0,
      protocolsExtracted: 0,
      protocolsValidated: 0,
      url: 'https://stackoverflow.com'
    },
    {
      id: 'DS-003',
      name: 'GitLab Incident Reports',
      type: 'Postmortem',
      relevance: 4,
      signalDensity: 4,
      transferability: 5,
      status: 'planned',
      timeInvested: 0,
      protocolsExtracted: 0,
      protocolsValidated: 0,
      url: 'https://gitlab.com'
    }
  ]);

  const [miningQueue, setMiningQueue] = useState([
    {
      id: 'MQ-001',
      source: 'Google SRE Postmortems',
      target: 'Extract 5 environment-related errors',
      priority: 'high',
      deadline: '2025-10-08',
      status: 'active',
      progress: 60
    },
    {
      id: 'MQ-002',
      source: 'Stack Overflow',
      target: 'Validate WP-001 Protocol 2',
      priority: 'medium',
      deadline: '2025-10-10',
      status: 'pending',
      progress: 0
    }
  ]);

  const [protocols, setProtocols] = useState([
    {
      id: 'P-001',
      name: 'Triage the System First',
      category: 'Diagnostic',
      artifactSource: 'WP-001',
      timesApplied: 12,
      successRate: 83,
      avgTimeSaved: 35,
      confidence: 'high'
    },
    {
      id: 'P-002',
      name: 'Mandate High-Fidelity Data',
      category: 'Diagnostic',
      artifactSource: 'WP-001',
      timesApplied: 15,
      successRate: 93,
      avgTimeSaved: 25,
      confidence: 'high'
    },
    {
      id: 'P-003',
      name: 'Isolate via Strategic Retreat',
      category: 'Problem-Solving',
      artifactSource: 'WP-001',
      timesApplied: 8,
      successRate: 75,
      avgTimeSaved: 60,
      confidence: 'medium'
    }
  ]);

  const calculateDatasetROI = (dataset) => {
    if (dataset.timeInvested === 0) return 0;
    const roi = (dataset.protocolsValidated * 30) / (dataset.timeInvested * 60);
    return roi.toFixed(1);
  };

  const calculateDatasetScore = (dataset) => {
    return (dataset.relevance * 3) + (dataset.signalDensity * 2) + (dataset.transferability * 2);
  };

  const sortedDatasets = useMemo(() => {
    return [...datasets].sort((a, b) => calculateDatasetScore(b) - calculateDatasetScore(a));
  }, [datasets]);

  const stats = {
    totalArtifacts: artifacts.length,
    totalProtocols: protocols.length,
    totalTimeSaved: protocols.reduce((acc, p) => acc + (p.timesApplied * p.avgTimeSaved), 0),
    avgSuccessRate: protocols.reduce((acc, p) => acc + p.successRate, 0) / protocols.length,
    datasetsActive: datasets.filter(d => d.status === 'in-progress').length,
    datasetsCompleted: datasets.filter(d => d.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Wrongness Portfolio</h1>
                <p className="text-sm text-gray-500">Knowledge Acceleration System</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              <Plus className="w-4 h-4" />
              <span>New Artifact</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {['dashboard', 'artifacts', 'datasets', 'protocols', 'mining'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-1 py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === tab
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
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
        )}

        {activeTab === 'datasets' && (
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
        )}

        {activeTab === 'artifacts' && (
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
        )}

        {activeTab === 'protocols' && (
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
        )}

        {activeTab === 'mining' && (
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
                    rows="3"
                    placeholder="What assumption or approach was incorrect?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Signal That Revealed Wrongness</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    rows="3"
                    placeholder="What data indicated the model was broken?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Corrected Model/Protocol</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    rows="3"
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
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <button className="w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition flex items-center justify-center">
          <Zap className="w-6 h-6" />
        </button>
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
          <div className="font-medium text-gray-900 mb-1">Quick Actions</div>
          <button className="w-full text-left px-2 py-1 hover:bg-gray-50 rounded text-gray-700">Log Protocol Use</button>
          <button className="w-full text-left px-2 py-1 hover:bg-gray-50 rounded text-gray-700">Start Mining</button>
          <button className="w-full text-left px-2 py-1 hover:bg-gray-50 rounded text-gray-700">New Artifact</button>
        </div>
      </div>
    </div>
  );
};

export default WrongnessPortfolioApp;