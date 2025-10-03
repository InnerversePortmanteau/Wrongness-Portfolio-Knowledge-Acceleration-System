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
  const newSuccessRate = Math.min(100, Math.round((newSuccessfulApplications / totalApplications) * 100));
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
  // In a larger-scale application, this ID generation would be handled by a database sequence
  // or a dedicated state counter to avoid iterating over the entire array.
  const maxId = existingProtocols.reduce((max, p) => {
    const idParts = p.id.split('-');
    if (idParts.length === 2) {
      const num = parseInt(idParts[1]);
      if (!isNaN(num)) {
        return Math.max(max, num);
      }
    }
    return max;
  }, 0);
  const newIdNumber = maxId + 1;

  return {
    ...protocolData,
    id: `P-${String(newIdNumber).padStart(3, '0')}`,
    artifactSource: artifactSourceId,
    timesApplied: 0,
    successRate: 0,
    avgTimeSaved: 0,
  };
};