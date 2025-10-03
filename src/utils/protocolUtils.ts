import { Protocol } from '../types.ts';
import { NewProtocolData } from '../components/NewProtocolModal.tsx';

/**
 * Data from logging a protocol's use.
 */
export interface ProtocolLogData {
  wasSuccess: boolean;
  timeSaved: number;
}

/**
 * Calculates the new metrics for a protocol after a new use is logged.
 * @param protocol The original protocol object.
 * @param logData The data from the new usage log.
 * @returns A new protocol object with updated metrics.
 */
export const updateProtocolMetrics = (protocol: Protocol, logData: ProtocolLogData): Protocol => {
  const totalApplications = protocol.timesApplied + 1;
  const currentSuccessfulApplications = protocol.timesApplied * (protocol.successRate / 100);
  const newSuccessfulApplications = currentSuccessfulApplications + (logData.wasSuccess ? 1 : 0);
  const newSuccessRate = Math.round((newSuccessfulApplications / totalApplications) * 100);
  const totalTimeSavedSoFar = protocol.avgTimeSaved * protocol.timesApplied;
  const newTotalTimeSaved = totalTimeSavedSoFar + logData.timeSaved;
  const newAvgTimeSaved = Math.round(newTotalTimeSaved / totalApplications);

  return {
    ...protocol,
    timesApplied: totalApplications,
    successRate: newSuccessRate,
    avgTimeSaved: newAvgTimeSaved,
  };
};

/**
 * Creates a new protocol object from provided data and context.
 * @param protocolData The data for the new protocol from the creation form.
 * @param existingProtocols The array of all current protocols to determine the next ID.
 * @param artifactSourceId The ID of the artifact this protocol is being extracted from.
 * @returns A new, fully-formed protocol object.
 */
export const createProtocol = (
  protocolData: NewProtocolData,
  existingProtocols: Protocol[],
  artifactSourceId: string
): Protocol => {
  const newIdNumber = existingProtocols.length > 0 ? Math.max(...existingProtocols.map(p => parseInt(p.id.split('-')[1]))) + 1 : 1;
  return {
    ...protocolData,
    id: `P-${String(newIdNumber).padStart(3, '0')}`,
    artifactSource: artifactSourceId,
    timesApplied: 0,
    successRate: 0,
    avgTimeSaved: 0,
  };
};