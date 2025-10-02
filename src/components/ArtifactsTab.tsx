import React, { useState, useMemo } from 'react';
import { CheckCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Artifact } from '../types';

interface ArtifactsTabProps {
  artifacts: Artifact[];
}

const ArtifactsTab: React.FC<ArtifactsTabProps> = ({ artifacts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredArtifacts = useMemo(() => {
    return artifacts
      .filter(artifact => {
        if (statusFilter === 'all') return true;
        return artifact.status === statusFilter;
      })
      .filter(artifact => {
        const lowercasedTerm = searchTerm.toLowerCase();
        return (
          artifact.title.toLowerCase().includes(lowercasedTerm) ||
          artifact.domain.toLowerCase().includes(lowercasedTerm) ||
          artifact.category.toLowerCase().includes(lowercasedTerm) ||
          artifact.id.toLowerCase().includes(lowercasedTerm)
        );
      });
  }, [artifacts, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Artifact Library</h2>
            <p className="text-sm text-gray-500 mt-1">{filteredArtifacts.length} artifacts found</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search artifacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="evergreen">Evergreen</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredArtifacts.length > 0 ? (
            filteredArtifacts.map(artifact => (
            <div key={artifact.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{artifact.title}</h3>
                    {artifact.validated && <CheckCircle className="w-5 h-5 text-green-600" />}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{artifact.id}</span>
                    <span>•</span>
                    <span>{artifact.domain}</span>
                    <span>•</span>
                    <span>{artifact.dateCreated}</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {artifact.status}
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Protocols</div>
                  <div className="text-xl font-bold text-gray-900">{artifact.protocols}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Times Applied</div>
                  <div className="text-xl font-bold text-gray-900">{artifact.timesSaved}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Avg Time Saved</div>
                  <div className="text-xl font-bold text-gray-900">{artifact.avgTimeSaved}m</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Total Impact</div>
                  <div className="text-xl font-bold text-purple-600">{artifact.timesSaved * artifact.avgTimeSaved}m</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Link to={`/artifacts/${artifact.id}`} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
                  View Details
                </Link>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
                  Export
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
                  Create Derivative
                </button>
              </div>
            </div>
          ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              <h3 className="text-lg font-medium">No Artifacts Found</h3>
              <p className="mt-1 text-sm">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactsTab;