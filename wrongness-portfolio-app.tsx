import React, { useState, useMemo } from 'react';
import { Plus, BookOpen, Zap } from 'lucide-react';
import usePersistentState from './src/hooks/usePersistentState';
import { Artifact, Dataset, MiningTask, Protocol } from './src/types';

import DashboardTab from './src/components/DashboardTab';
import ArtifactsTab from './src/components/ArtifactsTab';
import DatasetsTab from './src/components/DatasetsTab';
import ProtocolsTab from './src/components/ProtocolsTab';
import MiningTab from './src/components/MiningTab';
import NewArtifactModal from './src/components/NewArtifactModal';
import NewDatasetModal, { NewDatasetData } from './src/components/NewDatasetModal';
import LogProtocolUseModal, { LogData } from './src/components/LogProtocolUseModal';

const WrongnessPortfolioApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isNewArtifactModalOpen, setIsNewArtifactModalOpen] = useState(false);
  const [isNewDatasetModalOpen, setIsNewDatasetModalOpen] = useState(false);
  const [isLogProtocolModalOpen, setIsLogProtocolModalOpen] = useState(false);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const [artifacts, setArtifacts] = usePersistentState<Artifact[]>('artifacts', [
    {
      id: 'WP-001',
      title: 'I Was Wrong About Debugging',
      domain: 'Software Engineering',
      category: 'Process',
      status: 'evergreen',
      confidence: { protocol1: 'high', protocol2: 'high', protocol3: 'medium', protocol4: 'medium' },
      dateCreated: '2023-10-01',
      protocols: 4,
      timesSaved: 8,
      avgTimeSaved: 45,
      validated: true
    }
  ]);
  
  const [datasets, setDatasets] = usePersistentState<Dataset[]>('datasets', [
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

  const [miningQueue, setMiningQueue] = usePersistentState<MiningTask[]>('miningQueue', [
    {
      id: 'MQ-001',
      source: 'Google SRE Postmortems',
      target: 'Extract 5 environment-related errors',
      priority: 'high',
      deadline: '2023-10-08',
      status: 'active',
      progress: 60
    },
    {
      id: 'MQ-002',
      source: 'Stack Overflow',
      target: 'Validate WP-001 Protocol 2',
      priority: 'medium',
      deadline: '2023-10-10',
      status: 'pending',
      progress: 0
    }
  ]);

  const [protocols, setProtocols] = usePersistentState<Protocol[]>('protocols', [
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

  const handleAddArtifact = (newArtifactData: Omit<Artifact, 'id' | 'dateCreated' | 'protocols' | 'timesSaved' | 'avgTimeSaved' | 'validated' | 'confidence' | 'status'>) => {
    const newIdNumber = artifacts.length > 0 ? Math.max(...artifacts.map(a => parseInt(a.id.split('-')[1]))) + 1 : 1;
    const newArtifact: Artifact = {
      ...newArtifactData,
      id: `WP-${String(newIdNumber).padStart(3, '0')}`,
      status: 'active',
      confidence: {},
      dateCreated: new Date().toISOString().split('T')[0],
      protocols: 0,
      timesSaved: 0,
      avgTimeSaved: 0,
      validated: false,
    };

    setArtifacts(prevArtifacts => [...prevArtifacts, newArtifact]);
  };

  const handleAddDataset = (newDatasetData: NewDatasetData) => {
    const newIdNumber = datasets.length > 0 ? Math.max(...datasets.map(d => parseInt(d.id.split('-')[1]))) + 1 : 1;
    const newDataset: Dataset = {
      ...newDatasetData,
      id: `DS-${String(newIdNumber).padStart(3, '0')}`,
      status: 'planned',
      timeInvested: 0,
      protocolsExtracted: 0,
      protocolsValidated: 0,
    };

    setDatasets(prevDatasets => [...prevDatasets, newDataset]);
  };

  const handleLogProtocolUse = (logData: LogData) => {
    setProtocols(prevProtocols =>
      prevProtocols.map(p => {
        if (p.id === logData.protocolId) {
          const totalApplications = p.timesApplied + 1;
          
          // Calculate new success rate
          const currentSuccessfulApplications = p.timesApplied * (p.successRate / 100);
          const newSuccessfulApplications = currentSuccessfulApplications + (logData.wasSuccess ? 1 : 0);
          const newSuccessRate = Math.round((newSuccessfulApplications / totalApplications) * 100);

          // Calculate new average time saved
          const totalTimeSavedSoFar = p.avgTimeSaved * p.timesApplied;
          const newTotalTimeSaved = totalTimeSavedSoFar + logData.timeSaved;
          const newAvgTimeSaved = Math.round(newTotalTimeSaved / totalApplications);

          return {
            ...p,
            timesApplied: totalApplications,
            successRate: newSuccessRate,
            avgTimeSaved: newAvgTimeSaved,
          };
        }
        return p;
      })
    );
  };

  const openNewArtifactModal = () => {
    setIsNewArtifactModalOpen(true); setIsFabMenuOpen(false);
  };

  const calculateDatasetROI = (dataset: Dataset) => {
    if (dataset.timeInvested === 0) return 0;
    const roi = (dataset.protocolsValidated * 30) / (dataset.timeInvested * 60);
    return roi.toFixed(1);
  };

  const calculateDatasetScore = (dataset) => {
    return (dataset.relevance * 3) + (dataset.signalDensity * 2) + (dataset.transferability * 2);
  };

  const sortedDatasets = useMemo(() => {
    return [...datasets].sort((a, b) => calculateDatasetScore(b) - calculateDatasetScore(a)) as Dataset[];
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
            <button onClick={openNewArtifactModal} className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
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
        {activeTab === 'dashboard' && <DashboardTab stats={stats} miningQueue={miningQueue} protocols={protocols} />}
        {activeTab === 'artifacts' && <ArtifactsTab artifacts={artifacts} />}
        {activeTab === 'datasets' && <DatasetsTab sortedDatasets={sortedDatasets} calculateDatasetScore={calculateDatasetScore} calculateDatasetROI={calculateDatasetROI} onOpenAddDatasetModal={() => setIsNewDatasetModalOpen(true)} />}
        {activeTab === 'protocols' && <ProtocolsTab protocols={protocols} />}
        {activeTab === 'mining' && <MiningTab />}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        {isFabMenuOpen && (
          <div className="absolute bottom-full right-0 mb-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm animate-fade-in-up">
            <div className="font-medium text-gray-900 mb-2 px-2">Quick Actions</div>
            <button onClick={() => { setIsLogProtocolModalOpen(true); setIsFabMenuOpen(false); }} className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded text-gray-700 flex items-center space-x-2">
              <span>Log Protocol Use</span>
            </button>
            <button className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded text-gray-700 flex items-center space-x-2">
              <span>Start Mining</span>
            </button>
            <button onClick={() => { openNewArtifactModal(); setIsFabMenuOpen(false); }} className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded text-gray-700 flex items-center space-x-2">
              <span>New Artifact</span>
            </button>
          </div>
        )}
        <button onClick={() => setIsFabMenuOpen(prev => !prev)} className="w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-transform transform hover:scale-105 flex items-center justify-center">
          <Zap className={`w-6 h-6 transition-transform duration-300 ${isFabMenuOpen ? 'rotate-45' : ''}`} />
        </button>
      </div>

      <NewArtifactModal
        isOpen={isNewArtifactModalOpen}
        onClose={() => setIsNewArtifactModalOpen(false)}
        onSave={handleAddArtifact}
      />

      <NewDatasetModal
        isOpen={isNewDatasetModalOpen}
        onClose={() => setIsNewDatasetModalOpen(false)}
        onSave={handleAddDataset}
      />

      <LogProtocolUseModal
        isOpen={isLogProtocolModalOpen}
        onClose={() => setIsLogProtocolModalOpen(false)}
        onSave={handleLogProtocolUse}
        protocols={protocols}
      />
    </div>
  );
};

export default WrongnessPortfolioApp;