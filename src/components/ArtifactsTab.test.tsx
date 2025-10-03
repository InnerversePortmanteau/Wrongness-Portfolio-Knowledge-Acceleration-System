import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArtifactsTab from './ArtifactsTab.tsx';
import { Artifact } from '../types.ts';

// Mock data for testing
const mockArtifacts: Artifact[] = [
  {
    id: 'WP-001',
    title: 'I Was Wrong About Debugging',
    domain: 'Software Engineering',
    category: 'Process',
    wrongModel: 'Model A',
    signal: 'Signal A',
    rebuild: 'Rebuild A',
    status: 'evergreen',
    confidence: {},
    dateCreated: '2023-10-01',
    protocols: 4,
    timesSaved: 8,
    avgTimeSaved: 45,
    validated: true,
  },
  {
    id: 'WP-002',
    title: 'A Mistake with Databases',
    domain: 'Data Science',
    category: 'Technical',
    wrongModel: 'Model B',
    signal: 'Signal B',
    rebuild: 'Rebuild B',
    status: 'active',
    confidence: {},
    dateCreated: '2023-11-01',
    protocols: 1,
    timesSaved: 2,
    avgTimeSaved: 20,
    validated: false,
  },
];

describe('ArtifactsTab', () => {
  const renderComponent = (artifacts: Artifact[]) => render(
    <Router>
      <ArtifactsTab artifacts={artifacts} />
    </Router>
  );

  it('renders all artifacts initially', () => {
    renderComponent(mockArtifacts);
    expect(screen.getByText('I Was Wrong About Debugging')).toBeInTheDocument();
    expect(screen.getByText('A Mistake with Databases')).toBeInTheDocument();
  });

  it('shows a message when no artifacts are provided', () => {
    renderComponent([]);
    expect(screen.getByText('No artifacts found.')).toBeInTheDocument();
    expect(screen.getByText('Get started by creating a new artifact.')).toBeInTheDocument();
  });

  it('filters artifacts based on the search term', async () => {
    const user = userEvent.setup();
    renderComponent(mockArtifacts);

    // Initially, both artifacts should be visible
    expect(screen.getByText('I Was Wrong About Debugging')).toBeInTheDocument();
    expect(screen.getByText('A Mistake with Databases')).toBeInTheDocument();

    // Find the search input and type a search term
    const searchInput = screen.getByPlaceholderText('Search artifacts...');
    await user.type(searchInput, 'debug');

    // After searching, only the matching artifact should be visible
    expect(screen.getByText('I Was Wrong About Debugging')).toBeInTheDocument();
    expect(screen.queryByText('A Mistake with Databases')).not.toBeInTheDocument();

    // Clear the search
    await user.clear(searchInput);

    // Both artifacts should be visible again
    expect(screen.getByText('I Was Wrong About Debugging')).toBeInTheDocument();
    expect(screen.getByText('A Mistake with Databases')).toBeInTheDocument();
  });

  it('filters artifacts based on the status filter', async () => {
    const user = userEvent.setup();
    renderComponent(mockArtifacts);

    // Find the dropdown by its role
    const statusFilter = screen.getByRole('combobox');

    // Filter by 'evergreen'
    await user.selectOptions(statusFilter, 'evergreen');

    // Only the evergreen artifact should be visible
    expect(screen.getByText('I Was Wrong About Debugging')).toBeInTheDocument();
    expect(screen.queryByText('A Mistake with Databases')).not.toBeInTheDocument();

    // Filter by 'active'
    await user.selectOptions(statusFilter, 'active');

    // Only the active artifact should be visible
    expect(screen.queryByText('I Was Wrong About Debugging')).not.toBeInTheDocument();
    expect(screen.getByText('A Mistake with Databases')).toBeInTheDocument();
  });

  it('shows a message when no artifacts match the filters', async () => {
    const user = userEvent.setup();
    renderComponent(mockArtifacts);

    const searchInput = screen.getByPlaceholderText('Search artifacts...');
    await user.type(searchInput, 'nonexistent search term');

    expect(screen.getByText('No artifacts match your criteria.')).toBeInTheDocument();
    expect(screen.queryByText('I Was Wrong About Debugging')).not.toBeInTheDocument();
  });

  it('updates displayed artifacts when props change', () => {
    const { rerender } = render(
      <Router>
        <ArtifactsTab artifacts={mockArtifacts} />
      </Router>
    );
    expect(screen.getByText('I Was Wrong About Debugging')).toBeInTheDocument();

    rerender(
      <Router>
        <ArtifactsTab artifacts={[]} />
      </Router>
    );
    expect(screen.queryByText('I Was Wrong About Debugging')).not.toBeInTheDocument();
    expect(screen.getByText('No artifacts found.')).toBeInTheDocument();
  });
});