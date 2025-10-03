import { Dataset } from '../types';

/**
 * Calculates the priority score for a given dataset.
 * Formula: (Relevance * 3) + (Signal Density * 2) + (Transferability * 2)
 */
export const calculateDatasetScore = (dataset: Dataset): number => {
  return (dataset.relevance * 3) + (dataset.signalDensity * 2) + (dataset.transferability * 2);
};

/**
 * Calculates the estimated Return on Investment (ROI) for a dataset.
 * Assumes an average time saved of 30 minutes per validated protocol.
 */
export const calculateDatasetROI = (dataset: Dataset): string => {
  if (dataset.timeInvested === 0) return '0.0';
  const roi = (dataset.protocolsValidated * 30) / (dataset.timeInvested * 60);
  return roi.toFixed(1);
};