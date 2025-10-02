import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Protocol } from '../types';

export interface LogData {
  protocolId: string;
  wasSuccess: boolean;
  timeSaved: number;
}

interface LogProtocolUseModalProps {
  isOpen: boolean;
  protocols: Protocol[];
  onClose: () => void;
  onSave: (logData: LogData) => void;
}

const LogProtocolUseModal: React.FC<LogProtocolUseModalProps> = ({ isOpen, protocols, onClose, onSave }) => {
  const [selectedProtocol, setSelectedProtocol] = useState<string>('');
  const [wasSuccess, setWasSuccess] = useState<boolean>(true);
  const [timeSaved, setTimeSaved] = useState<string>('');

  useEffect(() => {
    // Pre-select the first protocol if available when the modal opens
    if (isOpen && protocols.length > 0) {
      setSelectedProtocol(protocols[0].id);
    }
  }, [isOpen, protocols]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timeSavedNum = parseInt(timeSaved, 10);
    if (!selectedProtocol || isNaN(timeSavedNum)) {
      alert('Please select a protocol and enter a valid time saved.');
      return;
    }
    onSave({ protocolId: selectedProtocol, wasSuccess, timeSaved: timeSavedNum });
    // Reset form and close
    setTimeSaved('');
    setWasSuccess(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Log Protocol Use</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="protocol" className="block text-sm font-medium text-gray-700 mb-1">
                Protocol Applied
              </label>
              <select
                id="protocol"
                value={selectedProtocol}
                onChange={(e) => setSelectedProtocol(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                {protocols.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Outcome</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="outcome" checked={wasSuccess} onChange={() => setWasSuccess(true)} className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">Success</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="outcome" checked={!wasSuccess} onChange={() => setWasSuccess(false)} className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">Failure</span>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="timeSaved" className="block text-sm font-medium text-gray-700 mb-1">
                Time Saved (minutes)
              </label>
              <input
                type="number"
                id="timeSaved"
                value={timeSaved}
                onChange={(e) => setTimeSaved(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., 30"
                required
              />
            </div>
          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Save Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogProtocolUseModal;