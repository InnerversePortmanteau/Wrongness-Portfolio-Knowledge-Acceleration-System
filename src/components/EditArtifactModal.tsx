import React, { useState, useEffect } from 'react';
import { Artifact } from '../types';
import { X } from 'lucide-react';

interface EditArtifactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (artifact: Artifact) => void;
  artifact: Artifact | null;
}

const EditArtifactModal: React.FC<EditArtifactModalProps> = ({
  isOpen,
  onClose,
  onSave,
  artifact,
}) => {
  const [formData, setFormData] = useState<Artifact | null>(null);

  useEffect(() => {
    // When the modal is opened with a new artifact, update the form data
    if (artifact) {
      setFormData(artifact);
    }
  }, [artifact, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Artifact</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-300">Domain</label>
              <input
                type="text"
                name="domain"
                id="domain"
                value={formData.domain}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="wrongModel" className="block text-sm font-medium text-gray-300">The Wrong Model</label>
            <textarea
              name="wrongModel"
              id="wrongModel"
              rows={3}
              value={formData.wrongModel}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Add textareas for 'signal' and 'rebuild' similarly */}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditArtifactModal;