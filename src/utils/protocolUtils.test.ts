import { updateProtocolMetrics, createProtocol } from './protocolUtils.ts';
import { Protocol } from '../types.ts';
import { NewProtocolData } from '../components/NewProtocolModal.tsx';

describe('updateProtocolMetrics', () => {
  const baseProtocol: Protocol = {
    id: 'P-001',
    name: 'Test Protocol',
    category: 'Diagnostic',
    artifactSource: 'WP-001',
    timesApplied: 10,
    successRate: 80, // 8 successful applications
    avgTimeSaved: 20, // 200 total minutes saved
    confidence: 'high',
  };

  it('should correctly update metrics after a successful application', () => {
    const logData = { wasSuccess: true, timeSaved: 31 };
    const updatedProtocol = updateProtocolMetrics(baseProtocol, logData);

    expect(updatedProtocol.timesApplied).toBe(11);

    // New success rate: (8 + 1) / 11 = 81.81...% -> rounded to 82%
    expect(updatedProtocol.successRate).toBe(82);

    // New avg time saved: (200 + 31) / 11 = 21 -> rounded to 21
    expect(updatedProtocol.avgTimeSaved).toBe(21);
  });

  it('should correctly update metrics after a failed application', () => {
    const logData = { wasSuccess: false, timeSaved: 15 };
    const updatedProtocol = updateProtocolMetrics(baseProtocol, logData);

    expect(updatedProtocol.timesApplied).toBe(11);

    // New success rate: (8 + 0) / 11 = 72.72...% -> rounded to 73%
    expect(updatedProtocol.successRate).toBe(73);

    // New avg time saved: (200 + 15) / 11 = 19.54... -> rounded to 20
    expect(updatedProtocol.avgTimeSaved).toBe(20);
  });

  it('should handle the first application of a protocol', () => {
    const firstTimeProtocol: Protocol = {
      ...baseProtocol,
      timesApplied: 0,
      successRate: 0,
      avgTimeSaved: 0,
    };
    const logData = { wasSuccess: true, timeSaved: 50 };
    const updatedProtocol = updateProtocolMetrics(firstTimeProtocol, logData);

    expect(updatedProtocol.timesApplied).toBe(1);
    expect(updatedProtocol.successRate).toBe(100);
    expect(updatedProtocol.avgTimeSaved).toBe(50);
  });
});

describe('createProtocol', () => {
  const existingProtocols: Protocol[] = [
    { id: 'P-001', name: 'Proto 1' } as Protocol,
    { id: 'P-003', name: 'Proto 3' } as Protocol,
  ];

  it('should create a new protocol with the next available ID', () => {
    const newProtocolData: NewProtocolData = { name: 'New Test', category: 'Diagnostic', confidence: 'low' };
    const artifactSourceId = 'WP-002';

    const newProtocol = createProtocol(newProtocolData, existingProtocols, artifactSourceId);

    expect(newProtocol.id).toBe('P-004'); // Max ID is 3, so next is 4
    expect(newProtocol.name).toBe('New Test');
    expect(newProtocol.artifactSource).toBe('WP-002');
    expect(newProtocol.timesApplied).toBe(0);
    expect(newProtocol.successRate).toBe(0);
    expect(newProtocol.avgTimeSaved).toBe(0);
    expect(newProtocol.confidence).toBe('low');
  });

  it('should create the first protocol with ID P-001', () => {
    const newProtocolData: NewProtocolData = { name: 'First Ever', category: 'Problem-Solving', confidence: 'high' };
    const artifactSourceId = 'WP-001';

    const newProtocol = createProtocol(newProtocolData, [], artifactSourceId);

    expect(newProtocol.id).toBe('P-001');
    expect(newProtocol.name).toBe('First Ever');
    expect(newProtocol.artifactSource).toBe('WP-001');
  });
});