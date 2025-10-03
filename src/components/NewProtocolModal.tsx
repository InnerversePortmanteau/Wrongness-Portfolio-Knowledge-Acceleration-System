import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Protocol } from '../types.ts';

export type NewProtocolData = Omit<Protocol, 'id' | 'timesApplied' | 'successRate' | 'avgTimeSaved' | 'artifactSource'>;

interface NewProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (protocolData: NewProtocolData) => void;
  artifactSourceId: string;
}

const NewProtocolModal: React.FC<NewProtocolModalProps> = ({ isOpen, onClose, onSave, artifactSourceId }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Diagnostic' | 'Problem-Solving'>('Diagnostic');
  const [confidence, setConfidence] = useState<'high' | 'medium' | 'low'>('medium');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert('Please provide a name for the protocol.');
      return;
    }
    onSave({ name, category, confidence });
    // Reset form and close
    setName('');
    setCategory('Diagnostic');
    setConfidence('medium');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Extract New Protocol from {artifactSourceId}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Protocol Name</label>
              <input
                type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., Verify Execution Environment" required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <option value="Diagnostic">Diagnostic</option>
                  <option value="Problem-Solving">Problem-Solving</option>
                </select>
              </div>
              <div>
                <label htmlFor="confidence" className="block text-sm font-medium text-gray-700 mb-1">Initial Confidence</label>
                <select id="confidence" value={confidence} onChange={(e) => setConfidence(e.target.value as any)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Save Protocol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProtocolModal;