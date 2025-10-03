import { useState, useMemo } from 'react';
import { Plus, BookOpen, Zap } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import usePersistentState from './hooks/usePersistentState.ts';
import { Artifact, Dataset, MiningTask, Protocol } from './types.ts';
import { calculateDatasetROI, calculateDatasetScore } from './utils/calculations.ts';
import { createProtocol, updateProtocolMetrics } from './utils/protocolUtils.ts';
import { createArtifact, updateArtifact } from './utils/artifactUtils.ts';

import HomePage from './components/HomePage.tsx';
import DashboardTab from './components/DashboardTab.tsx';
import ArtifactsTab from './components/ArtifactsTab.tsx';
import DatasetsTab from './components/DatasetsTab.tsx';
import ProtocolsTab from './components/ProtocolsTab.tsx';
import MiningTab from './components/MiningTab.tsx';
import NewArtifactModal, { NewArtifactData } from './components/NewArtifactModal.tsx';
import NewDatasetModal, { NewDatasetData } from './components/NewDatasetModal.tsx';
import ArtifactDetailPage from './components/ArtifactDetailPage.tsx';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith('/artifacts')) return 'artifacts';
    if (path.startsWith('/datasets')) return 'datasets';
    if (path.startsWith('/protocols')) return 'protocols';
    if (path.startsWith('/mining')) return 'mining';
    if (path.startsWith('/dashboard')) return 'dashboard';
    return 'dashboard';
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home', id: 'home' },
    { path: '/dashboard', label: 'Dashboard', id: 'dashboard' },
    { path: '/artifacts', label: 'Artifacts', id: 'artifacts' },
    { path: '/datasets', label: 'Datasets', id: 'datasets' },
    { path: '/protocols', label: 'Protocols', id: 'protocols' },
    { path: '/mining', label: 'Mining', id: 'mining' },
  ];

  const handleStartMining = () => {
    navigate('/mining');
    // Assuming setIsFabMenuOpen is managed in the parent component
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.id}
                to={link.path}
                className={`px-1 py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === link.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

const WrongnessPortfolioApp = () => {
  const [isNewArtifactModalOpen, setIsNewArtifactModalOpen] = useState(false);
  const [isEditArtifactModalOpen, setIsEditArtifactModalOpen] = useState(false);
  const [isNewDatasetModalOpen, setIsNewDatasetModalOpen] = useState(false);
  const [isNewProtocolModalOpen, setIsNewProtocolModalOpen] = useState(false);
  const [currentArtifactSource, setCurrentArtifactSource] = useState<string>('');
  const [editingArtifact, setEditingArtifact] = useState<Artifact | null>(null);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const [artifacts, setArtifacts] = usePersistentState<Artifact[]>('artifacts', [ // Mock data
    {
      id: 'WP-001',
      title: 'I Was Wrong About Debugging',
      domain: 'Software Engineering',
      category: 'Process',
      wrongModel: 'The error message points to the problem\'s source. I assumed a Python ImportError meant the package was missing.',
      signal: 'The package was confirmed to be installed in the virtual environment, yet the error persisted. This indicated the issue was with the environment or path, not the package itself.',
      rebuild: 'Adopt a "System-First" protocol. Before debugging application code, always verify the integrity and configuration of the execution environment (e.g., virtual environment activation, system path, dependencies).',
      status: 'evergreen'
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

  const handleLogProtocolUse = (logData: { protocolId: string; wasSuccess: boolean; timeSaved: number; }) => {
    const protocolToUpdate = protocols.find(p => p.id === logData.protocolId);
    if (protocolToUpdate) {
      const updatedProtocol = updateProtocolMetrics(protocolToUpdate, logData);
      setProtocols(protocols.map(p => p.id === updatedProtocol.id ? updatedProtocol : p));
    }
  };

  const handleAddArtifact = (data: NewArtifactData) => {
    const newArtifact = createArtifact(data.title, data.domain, data.category);
    setArtifacts(prevArtifacts => [...prevArtifacts, newArtifact]);
  };

  const handleUpdateArtifact = (updated: Artifact) => {
    setArtifacts(prev => updateArtifact(prev, updated));
    setEditingArtifact(null);
  }

  const handleAddDataset = (newDatasetData: NewDatasetData) => {
    const newIdNumber = datasets.length > 0 ? Math.max(...datasets.map((d: Dataset) => parseInt(d.id.split('-')[1]))) + 1 : 1;
    const newDataset: Dataset = {
      ...newDatasetData,
      id: `DS-${String(newIdNumber).padStart(3, '0')}`,
      status: 'planned',
      timeInvested: 0,
      protocolsExtracted: 0,
      protocolsValidated: 0,
    };

    setDatasets((prevDatasets: Artifact[]) => [...prevDatasets, newDataset]);
  };

  const handleAddProtocol = (protocolData: NewProtocolData) => {
    const newProtocol = createProtocol(protocolData, protocols, currentArtifactSource);
    setProtocols(prev => [...prev, newProtocol]);
    setCurrentArtifactSource('');
  };

  const openNewProtocolModal = (artifactId: string) => {
    setCurrentArtifactSource(artifactId);
    setIsNewProtocolModalOpen(true);
  };

  const openNewArtifactModal = () => {
    setIsNewArtifactModalOpen(true); setIsFabMenuOpen(false);
  };

  const handleOpenEditModal = (artifact: Artifact) => {
    setEditingArtifact(artifact);
    setIsEditModalOpen(true);
  };

  const sortedDatasets = useMemo(() => {
    return [...datasets].sort((a: Dataset, b: Dataset) => calculateDatasetScore(b) - calculateDatasetScore(a)) as Dataset[];
  }, [datasets]);

  const stats = {
    totalArtifacts: artifacts.length,
    totalProtocols: protocols.length,
    totalTimeSaved: protocols.reduce((acc: number, p: Protocol) => acc + (p.timesApplied * p.avgTimeSaved), 0),
    avgSuccessRate: protocols.length > 0 ? protocols.reduce((acc: number, p: Protocol) => acc + p.successRate, 0) / protocols.length : 0,
    datasetsActive: datasets.filter((d: Dataset) => d.status === 'in-progress').length,
    datasetsCompleted: datasets.filter((d: Dataset) => d.status === 'completed').length
  };

  const AppUI = () => {
    const navigate = useNavigate();

    const handleStartMining = () => {
      navigate('/mining');
      setIsFabMenuOpen(false);
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
      <AppContent />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<HomePage stats={stats} miningQueue={miningQueue} protocols={protocols} onOpenNewArtifactModal={() => setIsNewArtifactModalOpen(true)} />} />
          <Route path="/dashboard" element={<DashboardTab stats={stats} miningQueue={miningQueue} protocols={protocols} />} />
          <Route path="/artifacts" element={<ArtifactsTab artifacts={artifacts} />} />
          <Route path="/artifacts/:id" element={<ArtifactDetailPage artifacts={artifacts} protocols={protocols} onOpenNewProtocolModal={openNewProtocolModal} onEdit={handleOpenEditModal} />} />
          <Route path="/datasets" element={<DatasetsTab sortedDatasets={sortedDatasets} calculateDatasetScore={calculateDatasetScore} calculateDatasetROI={calculateDatasetROI} />} />
          <Route path="/protocols" element={<ProtocolsTab protocols={protocols} />} />
          <Route path="/mining" element={<MiningTab />} />
        </Routes>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        {isFabMenuOpen && (
          <div className="absolute bottom-full right-0 mb-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm animate-fade-in-up">
            <div className="font-medium text-gray-900 mb-2 px-2">Quick Actions</div>            
            <button onClick={handleStartMining} className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded text-gray-700 flex items-center space-x-2">
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

      <NewProtocolModal
        isOpen={isNewProtocolModalOpen}
        onClose={() => setIsNewProtocolModalOpen(false)}
        onSave={handleAddProtocol}
        artifactSourceId={currentArtifactSource}
      />
    </div>
  );
  };

  return (
    <Router>
      <AppUI />
    </Router>
  );

};

export default WrongnessPortfolioApp;