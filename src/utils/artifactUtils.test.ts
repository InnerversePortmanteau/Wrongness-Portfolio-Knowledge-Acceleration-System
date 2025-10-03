import { createArtifact, updateArtifact } from './artifactUtils';
import { Artifact, ArtifactStatus } from '../types';

describe('artifactUtils', () => {
  describe('createArtifact', () => {
    it('should create an artifact with the correct properties and defaults', () => {
      const artifact = createArtifact('Test Title', 'Test Domain', 'Test Category');
      expect(artifact.id).toMatch(/^WP-\d+$/);
      expect(artifact.title).toBe('Test Title');
      expect(artifact.domain).toBe('Test Domain');
      expect(artifact.category).toBe('Test Category');
      expect(artifact.status).toBe('active');
      expect(artifact.relatedProtocols).toEqual([]);
    });
  });

  describe('updateArtifact', () => {
    const initialArtifacts: Artifact[] = [
      { id: 'WP-001', title: 'Old Title 1', domain: 'Domain 1', category: 'Cat 1', status: 'active' as ArtifactStatus, relatedProtocols: [], wrongModel: '', signal: '', rebuild: '' },
      { id: 'WP-002', title: 'Old Title 2', domain: 'Domain 2', category: 'Cat 2', status: 'active' as ArtifactStatus, relatedProtocols: [], wrongModel: '', signal: '', rebuild: '' },
    ];

    it('should correctly update an existing artifact', () => {
      const updatedArtifact: Artifact = { ...initialArtifacts[0], title: 'New Title' };
      const newArtifacts = updateArtifact(initialArtifacts, updatedArtifact);

      expect(newArtifacts.length).toBe(2);
      expect(newArtifacts[0].title).toBe('New Title');
      expect(newArtifacts[1].title).toBe('Old Title 2');
    });

    it('should not modify the array if the artifact ID does not exist', () => {
      const nonExistentArtifact: Artifact = { id: 'WP-999', title: 'Non-existent', domain: 'N/A', category: 'N/A', status: 'active' as ArtifactStatus, relatedProtocols: [], wrongModel: '', signal: '', rebuild: '' };
      const newArtifacts = updateArtifact(initialArtifacts, nonExistentArtifact);

      expect(newArtifacts).toEqual(initialArtifacts);
    });

    it('should return a new array instance (immutability)', () => {
      const updatedArtifact: Artifact = { ...initialArtifacts[0], title: 'New Title' };
      const newArtifacts = updateArtifact(initialArtifacts, updatedArtifact);

      expect(newArtifacts).not.toBe(initialArtifacts);
    });
  });
});