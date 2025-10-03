import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardTab from './DashboardTab';
import { MiningTask, Protocol } from '../types';

const mockStats = {
  totalArtifacts: 10,
  totalProtocols: 5,
  totalTimeSaved: 1200,
  avgSuccessRate: 85,
  datasetsActive: 1,
  datasetsCompleted: 2,
};

const mockMiningQueue: MiningTask[] = [
  { id: 'MQ-001', source: 'Google SRE', target: 'Extract error patterns', priority: 'high', deadline: '2023-12-01', status: 'active', progress: 50 },
];

const mockProtocols: Protocol[] = [
  { id: 'P-001', name: 'System-First Triage', category: 'Diagnostic', artifactSource: 'WP-001', timesApplied: 10, successRate: 90, avgTimeSaved: 30, confidence: 'high' },
  { id: 'P-002', name: 'Isolate via Bisection', category: 'Problem-Solving', artifactSource: 'WP-002', timesApplied: 5, successRate: 80, avgTimeSaved: 60, confidence: 'medium' },
];

describe('DashboardTab', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <DashboardTab stats={mockStats} miningQueue={mockMiningQueue} protocols={mockProtocols} />
      </MemoryRouter>
    );

  it('renders all stat cards correctly', () => {
    renderComponent();
    expect(screen.getByText('Total Artifacts')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    expect(screen.getByText('Active Protocols')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    expect(screen.getByText('Time Saved')).toBeInTheDocument();
    expect(screen.getByText('20h')).toBeInTheDocument(); // 1200 minutes

    expect(screen.getByText('Avg. Protocol Success')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('renders the active mining queue', () => {
    renderComponent();
    expect(screen.getByText('Active Mining Queue')).toBeInTheDocument();
    expect(screen.getByText('Extract error patterns')).toBeInTheDocument();
  });

  it('renders the top performing protocols', () => {
    renderComponent();
    expect(screen.getByText('Top Performing Protocols')).toBeInTheDocument();
    expect(screen.getByText('System-First Triage')).toBeInTheDocument(); // Highest success rate
  });
});