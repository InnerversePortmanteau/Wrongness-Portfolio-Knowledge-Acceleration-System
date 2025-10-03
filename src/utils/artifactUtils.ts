import { Artifact, ArtifactStatus } from '../types';

/**
 * Creates a new artifact with default values.
 * This function was created in a previous cycle and is included here for context.
 */
export const createArtifact = (title: string, domain: string, category: string): Artifact => {
  return {
    id: `WP-${Date.now()}`,
    title,
    domain,
    category,
    status: 'active',
    relatedProtocols: [],
    wrongModel: '',
    signal: '',
    rebuild: '',
  };
};

/**
 * Updates an artifact in an array of artifacts immutably.
 * @param artifacts The array of artifacts.
 * @param updatedArtifact The artifact to update.
 * @returns A new array with the updated artifact.
 */
export const updateArtifact = (artifacts: Artifact[], updatedArtifact: Artifact): Artifact[] => {
  return artifacts.map(artifact =>
    artifact.id === updatedArtifact.id ? updatedArtifact : artifact
  );
};