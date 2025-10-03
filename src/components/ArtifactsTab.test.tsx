import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
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
  // The component uses <Link> from react-router-dom, so we need to wrap it in a Router for tests
  const renderComponent = () => render(
    <Router>
      <ArtifactsTab artifacts={mockArtifacts} />
    </Router>
  );

  it('filters artifacts based on the search term', () => {
    renderComponent();

    // Initially, both artifacts should be visible
    expect(screen.getByText('I Was Wrong About Debugging')).toBeInTheDocument();
    expect(screen.getByText('A Mistake with Databases')).toBeInTheDocument();

    // Find the search input and type a search term
    const searchInput = screen.getByPlaceholderText('Search artifacts...');
    fireEvent.change(searchInput, { target: { value: 'debug' } });

    // After searching, only the matching artifact should be visible
    expect(screen.getByText('I Was Wrong About Debugging')).toBeInTheDocument();
    expect(screen.queryByText('A Mistake with Databases')).not.toBeInTheDocument();

    // Clear the search
    fireEvent.change(searchInput, { target: { value: '' } });

    // Both artifacts should be visible again
    expect(screen.getByText('I Was Wrong About Debugging')).toBeInTheDocument();
    expect(screen.getByText('A Mistake with Databases')).toBeInTheDocument();
  });

  it('filters artifacts based on the status filter', () => {
    renderComponent();

    // Initially, both artifacts are visible
    expect(screen.getByText('I Was Wrong About Debugging')).toBeInTheDocument();
    expect(screen.getByText('A Mistake with Databases')).toBeInTheDocument();

    // Find the dropdown by its role
    const statusFilter = screen.getByRole('combobox');

    // Filter by 'evergreen'
    fireEvent.change(statusFilter, { target: { value: 'evergreen' } });

    // Only the evergreen artifact should be visible
    expect(screen.getByText('I Was Wrong About Debugging')).toBeInTheDocument();
    expect(screen.queryByText('A Mistake with Databases')).not.toBeInTheDocument();

    // Filter by 'active'
    fireEvent.change(statusFilter, { target: { value: 'active' } });

    // Only the active artifact should be visible
    expect(screen.queryByText('I Was Wrong About Debugging')).not.toBeInTheDocument();
    expect(screen.getByText('A Mistake with Databases')).toBeInTheDocument();
  });
});