import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Artifact } from '../types';

type NewArtifactData = Omit<Artifact, 'id' | 'dateCreated' | 'protocols' | 'timesSaved' | 'avgTimeSaved' | 'validated' | 'confidence' | 'status'>;

interface NewArtifactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (artifactData: NewArtifactData) => void;
}

const NewArtifactModal: React.FC<NewArtifactModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('');
  const [category, setCategory] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !domain || !category) {
      alert('Please fill out all fields.');
      return;
    }
    onSave({ title, domain, category });
    // Reset form and close
    setTitle('');
    setDomain('');
    setCategory('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Create New Artifact</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., I Was Wrong About Database Indexing"
                required
              />
            </div>
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
                Domain
              </label>
              <input
                type="text"
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., Software Engineering"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., Process, Technical, Communication"
                required
              />
            </div>
          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Create Artifact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewArtifactModal;