import { calculateDatasetScore, calculateDatasetROI } from './calculations.ts';
import { Dataset } from '../types.ts';

describe('calculation utilities', () => {
  describe('calculateDatasetScore', () => {
    it('should calculate the priority score correctly', () => {
      const dataset: Partial<Dataset> = {
        relevance: 5,       // 5 * 3 = 15
        signalDensity: 4,   // 4 * 2 = 8
        transferability: 3, // 3 * 2 = 6
      };
      // Total score should be 15 + 8 + 6 = 29
      expect(calculateDatasetScore(dataset as Dataset)).toBe(29);
    });

    it('should handle minimum values', () => {
        const dataset: Partial<Dataset> = {
            relevance: 1,       // 1 * 3 = 3
            signalDensity: 1,   // 1 * 2 = 2
            transferability: 1, // 1 * 2 = 2
        };
        // Total score should be 3 + 2 + 2 = 7
        expect(calculateDatasetScore(dataset as Dataset)).toBe(7);
    });
  });

  describe('calculateDatasetROI', () => {
    it('should return "0.0" if time invested is zero', () => {
      const dataset: Partial<Dataset> = {
        timeInvested: 0,
        protocolsValidated: 5,
      };
      expect(calculateDatasetROI(dataset as Dataset)).toBe('0.0');
    });

    it('should calculate the ROI correctly for a given dataset', () => {
      const dataset: Partial<Dataset> = {
        timeInvested: 2, // 2 hours = 120 minutes
        protocolsValidated: 4,
      };
      // ROI = (4 * 30) / (2 * 60) = 120 / 120 = 1.0
      expect(calculateDatasetROI(dataset as Dataset)).toBe('1.0');
    });
  });
});