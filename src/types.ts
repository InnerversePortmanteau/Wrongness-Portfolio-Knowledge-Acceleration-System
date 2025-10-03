export interface Artifact {
  id: string;
  title: string;
  domain: string;
  category: string;
  wrongModel: string;
  signal: string;
  rebuild: string;
  status: 'evergreen' | 'active' | 'archived';
  confidence: Record<string, 'high' | 'medium' | 'low'>;
  dateCreated: string;
  protocols: number;
  timesSaved: number;
  avgTimeSaved: number;
  validated: boolean;
}

export interface Dataset {
  id:string;
  name: string;
  type: string;
  relevance: number;
  signalDensity: number;
  transferability: number;
  status: 'in-progress' | 'planned' | 'completed';
  timeInvested: number;
  protocolsExtracted: number;
  protocolsValidated: number;
  url: string;
}

export interface MiningTask {
  id: string;
  source: string;
  target: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  status: 'active' | 'pending' | 'completed';
  progress: number;
}

export interface Protocol {
  id: string;
  name: string;
  category: 'Diagnostic' | 'Problem-Solving';
  artifactSource: string;
  timesApplied: number;
  successRate: number;
  avgTimeSaved: number;
  confidence: 'high' | 'medium' | 'low';
}