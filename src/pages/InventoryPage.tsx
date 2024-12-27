import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { InventoryList } from '../components/inventory/InventoryList';
import { InventoryForm } from '../components/inventory/InventoryForm';
import { InventoryItem, InventoryFormData } from '../types/inventory';
import { inventoryStorage } from '../utils/inventoryStorage';

export function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setItems(inventoryStorage.getItems());
  }, []);

  const handleCreateItem = async (formData: InventoryFormData) => {
    const newItem = await inventoryStorage.saveItem(formData);
    setItems([...items, newItem]);
    setIsFormOpen(false);
  };

  const handleUpdateItem = (formData: InventoryFormData) => {
    if (!selectedItem) return;

    const updatedItem: InventoryItem = {
      ...selectedItem,
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    inventoryStorage.updateItem(updatedItem);
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    setSelectedItem(null);
    setIsFormOpen(false);
    setIsEditMode(false);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      inventoryStorage.deleteItem(itemId);
      setItems(items.filter(item => item.id !== itemId));
      setSelectedItem(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setIsEditMode(false);
            setSelectedItem(null);
          }}
          className="flex items-center px-4 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Item
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isEditMode ? 'Edit Item' : 'Add New Item'}
          </h2>
          <InventoryForm
            initialData={selectedItem || undefined}
            onSubmit={isEditMode ? handleUpdateItem : handleCreateItem}
            onCancel={() => {
              setIsFormOpen(false);
              setIsEditMode(false);
              setSelectedItem(null);
            }}
          />
        </div>
      ) : selectedItem ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold">{selectedItem.name}</h2>
              <p className="text-gray-600 mt-1">{selectedItem.description}</p>
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
                onClick={() => handleDeleteItem(selectedItem.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-medium text-gray-700">Quantity</h3>
              <p>{selectedItem.quantity}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Status</h3>
              <p>{selectedItem.status}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Min. Threshold</h3>
              <p>{selectedItem.minThreshold}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Last Updated</h3>
              <p>{new Date(selectedItem.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>

          {selectedItem.assignmentHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Assignment History</h3>
              <div className="space-y-2">
                {selectedItem.assignmentHistory.map(assignment => (
                  <div
                    key={assignment.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>{assignment.assigneeName}</span>
                    <span className="text-gray-500">
                      {new Date(assignment.dateAssigned).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">QR Code</h3>
              <img
                src={`data:image/png;base64,${selectedItem.qrCode}`}
                alt="QR Code"
                className="w-32 h-32"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Barcode</h3>
              <img
                src={`data:image/png;base64,${selectedItem.barcode}`}
                alt="Barcode"
                className="w-32 h-16"
              />
            </div>
          </div>

          <button
            onClick={() => setSelectedItem(null)}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Inventory
          </button>
        </div>
      ) : (
        <InventoryList
          items={items}
          onItemClick={setSelectedItem}
        />
      )}
    </div>
  );
}