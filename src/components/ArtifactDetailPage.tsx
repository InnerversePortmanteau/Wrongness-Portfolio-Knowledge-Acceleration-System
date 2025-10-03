import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Plus } from 'lucide-react';
import { Artifact, Protocol } from '../types';

interface ArtifactDetailPageProps {
  artifacts: Artifact[];
  protocols: Protocol[];
  onOpenNewProtocolModal: (artifactId: string) => void;
}

const ArtifactDetailPage: React.FC<ArtifactDetailPageProps> = ({ artifacts, protocols, onOpenNewProtocolModal }) => {
  const { id } = useParams<{ id: string }>();
  const artifact = artifacts.find(a => a.id === id);
  const relatedProtocols = protocols.filter(p => p.artifactSource === id);

  if (!artifact) {
    return (
      <div className="text-center py-20 bg-white rounded-lg border">
        <h2 className="text-2xl font-bold text-gray-800">Artifact Not Found</h2>
        <p className="text-gray-500 mt-2">The artifact with ID "{id}" does not exist.</p>
        <Link to="/artifacts" className="mt-6 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Artifacts
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/artifacts" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Artifact Library
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-gray-900">{artifact.title}</h1>
              {artifact.validated && <CheckCircle className="w-7 h-7 text-green-600" />}
            </div>
            <div className="flex items-center space-x-4 text-base text-gray-500 mt-2">
              <span>{artifact.id}</span>
              <span>•</span>
              <span>{artifact.domain}</span>
              <span>•</span>
              <span>Created: {artifact.dateCreated}</span>
            </div>
          </div>
          <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            {artifact.status}
          </span>
        </div>
      </div>

      {/* This is where the full artifact content (Wrongness, Signal, Rebuild) would go. */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Analysis</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-500 uppercase tracking-wider text-sm">The Wrong Model</h3>
            <p className="text-gray-700 mt-2 text-lg">Placeholder for the detailed description of the flawed mental model or assumption.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-500 uppercase tracking-wider text-sm">The Signal</h3>
            <p className="text-gray-700 mt-2 text-lg">Placeholder for the data or event that revealed the flaw in the model.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-500 uppercase tracking-wider text-sm">The Rebuild</h3>
            <p className="text-gray-700 mt-2 text-lg">Placeholder for the corrected mental model and the new understanding that emerged.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Related Protocols ({relatedProtocols.length})</h2>
          <button onClick={() => onOpenNewProtocolModal(artifact.id)} className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-medium">
            <Plus className="w-4 h-4" />
            <span>Extract Protocol</span>
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {relatedProtocols.length > 0 ? (
            relatedProtocols.map(protocol => (
              <div key={protocol.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{protocol.name}</h3>
                    <p className="text-sm text-gray-500">{protocol.category}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    protocol.confidence === 'high' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {protocol.confidence} confidence
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 py-4">No protocols have been extracted from this artifact yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetailPage;