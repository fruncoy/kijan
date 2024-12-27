import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { FundiList } from '../components/fundis/FundiList';
import { FundiForm } from '../components/fundis/FundiForm';
import { Fundi, FundiFormData } from '../types/fundi';
import { fundiStorage } from '../utils/fundiStorage';

export function FundisPage() {
  const [fundis, setFundis] = useState<Fundi[]>([]);
  const [selectedFundi, setSelectedFundi] = useState<Fundi | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setFundis(fundiStorage.getFundis());
  }, []);

  const handleCreateFundi = (formData: FundiFormData) => {
    const newFundi: Fundi = {
      id: crypto.randomUUID(),
      ...formData,
      payments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    fundiStorage.saveFundi(newFundi);
    setFundis([...fundis, newFundi]);
    setIsFormOpen(false);
  };

  const handleUpdateFundi = (formData: FundiFormData) => {
    if (!selectedFundi) return;

    const updatedFundi: Fundi = {
      ...selectedFundi,
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    fundiStorage.updateFundi(updatedFundi);
    setFundis(fundis.map(f => f.id === updatedFundi.id ? updatedFundi : f));
    setSelectedFundi(null);
    setIsFormOpen(false);
    setIsEditMode(false);
  };

  const handleDeleteFundi = (fundiId: string) => {
    if (window.confirm('Are you sure you want to delete this fundi?')) {
      fundiStorage.deleteFundi(fundiId);
      setFundis(fundis.filter(f => f.id !== fundiId));
      setSelectedFundi(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fundi Management</h1>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setIsEditMode(false);
            setSelectedFundi(null);
          }}
          className="flex items-center px-4 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Fundi
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isEditMode ? 'Edit Fundi' : 'Create New Fundi'}
          </h2>
          <FundiForm
            initialData={selectedFundi || undefined}
            onSubmit={isEditMode ? handleUpdateFundi : handleCreateFundi}
            onCancel={() => {
              setIsFormOpen(false);
              setIsEditMode(false);
              setSelectedFundi(null);
            }}
          />
        </div>
      ) : selectedFundi ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold">{selectedFundi.name}</h2>
              <p className="text-gray-600 mt-1">{selectedFundi.skillCategory}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setIsFormOpen(true);
                  setIsEditMode(true);
                }}
                className="px-4 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteFundi(selectedFundi.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-medium text-gray-700">Status</h3>
              <p>{selectedFundi.availabilityStatus}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Contact</h3>
              <p>{selectedFundi.phone}</p>
              <p>{selectedFundi.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Payment Mode</h3>
              <p>{selectedFundi.paymentMode}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Equipment</h3>
              <p>{selectedFundi.equipment.join(', ') || 'None assigned'}</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedFundi(null)}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Fundis
          </button>
        </div>
      ) : (
        <FundiList
          fundis={fundis}
          onFundiClick={setSelectedFundi}
        />
      )}
    </div>
  );
}