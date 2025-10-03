import React, { useState, useMemo } from 'react';
import { Search, FileText, Clock, Repeat, ArrowRight } from 'lucide-react';
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
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Artifact Library</h2>
            <p className="text-sm text-gray-500 mt-1">Your collection of insights and learnings.</p>
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
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredArtifacts.length > 0 ? (
            filteredArtifacts.map(artifact => (
            <div key={artifact.id} className="bg-purple-50/50 border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800 leading-tight">{artifact.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    artifact.status === 'evergreen' ? 'bg-green-100 text-green-800' :
                    artifact.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {artifact.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">From the domain of {artifact.domain}</p>
                
                <div className="grid grid-cols-3 gap-4 text-center mb-5">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-xl font-bold text-gray-900">{artifact.protocols || 0}</div>
                    <div className="text-xs text-gray-500">Lessons</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <Repeat className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-xl font-bold text-gray-900">{artifact.timesSaved || 0}</div>
                    <div className="text-xs text-gray-500">Times Used</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-xl font-bold text-gray-900">{artifact.avgTimeSaved || 0}m</div>
                    <div className="text-xs text-gray-500">Avg. Saved</div>
                  </div>
                </div>

                <div className="bg-white border border-purple-200/50 text-purple-900 p-4 rounded-xl text-center">
                  <div className="text-xs font-medium uppercase tracking-wider">Total Time Saved</div>
                  <div className="text-3xl font-bold mt-1">{(artifact.timesSaved || 0) * (artifact.avgTimeSaved || 0)} min</div>
                </div>
              </div>

              <div className="p-4 bg-white/50 border-t border-gray-200/80 rounded-b-2xl mt-auto">
                <Link to={`/artifacts/${artifact.id}`} className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 hover:text-purple-800 transition-colors duration-200 text-sm font-semibold">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
          ) : (
            <div className="text-center py-16 px-6">
              <h3 className="text-lg font-semibold text-gray-800">{searchTerm || statusFilter !== 'all' ? 'No artifacts match your criteria.' : 'No artifacts found.'}</h3>
              <p className="text-sm text-gray-500 mt-1">{searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filter.' : 'Get started by creating a new artifact.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactsTab;