import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dataset } from '../types';

export type NewDatasetData = Omit<Dataset, 'id' | 'status' | 'timeInvested' | 'protocolsExtracted' | 'protocolsValidated'>;

interface NewDatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (datasetData: NewDatasetData) => void;
}

const NewDatasetModal: React.FC<NewDatasetModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [relevance, setRelevance] = useState(3);
  const [signalDensity, setSignalDensity] = useState(3);
  const [transferability, setTransferability] = useState(3);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !type || !url) {
      alert('Please fill out Name, Type, and URL.');
      return;
    }
    onSave({ name, type, url, relevance, signalDensity, transferability });
    // Reset form and close
    setName('');
    setType('');
    setUrl('');
    setRelevance(3);
    setSignalDensity(3);
    setTransferability(3);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Add New Dataset</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., Stripe Incident Reports" required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <input
                  type="text" id="type" value={type} onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="e.g., Postmortem, Q&A" required
                />
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="url" id="url" value={url} onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="https://..." required
                />
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
                <h3 className="text-sm font-medium text-gray-700">Priority Scoring</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="relevance" className="block text-xs text-gray-600 mb-1">Relevance: {relevance}</label>
                        <input type="range" id="relevance" min="1" max="5" value={relevance} onChange={(e) => setRelevance(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
                    </div>
                    <div>
                        <label htmlFor="signalDensity" className="block text-xs text-gray-600 mb-1">Signal Density: {signalDensity}</label>
                        <input type="range" id="signalDensity" min="1" max="5" value={signalDensity} onChange={(e) => setSignalDensity(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
                    </div>
                    <div>
                        <label htmlFor="transferability" className="block text-xs text-gray-600 mb-1">Transferability: {transferability}</label>
                        <input type="range" id="transferability" min="1" max="5" value={transferability} onChange={(e) => setTransferability(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
                    </div>
                </div>
            </div>

          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Add Dataset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDatasetModal;