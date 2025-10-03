import { render, screen } from '@testing-library/react';
import DashboardTab from './DashboardTab.tsx';
import { MiningTask, Protocol } from '../types.ts';

describe('DashboardTab', () => {
  it('renders the total artifacts stat card correctly', () => {
    const mockStats = {
      totalArtifacts: 5,
      totalProtocols: 10,
      totalTimeSaved: 1200,
      avgSuccessRate: 85,
      datasetsActive: 2,
      datasetsCompleted: 3,
    };
    const mockMiningQueue: MiningTask[] = [];
    const mockProtocols: Protocol[] = [];

    render(
      <DashboardTab stats={mockStats} miningQueue={mockMiningQueue} protocols={mockProtocols} />
    );

    // Check that the card title and value are rendered
    expect(screen.getByText('Total Artifacts')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});