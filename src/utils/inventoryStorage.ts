import { InventoryItem, InventoryFormData } from '../types/inventory';
import { generateQRCode, generateBarcode } from './codeGenerators';

const INVENTORY_KEY = 'inventory';

export const inventoryStorage = {
  getItems: (): InventoryItem[] => {
    const items = localStorage.getItem(INVENTORY_KEY);
    return items ? JSON.parse(items) : [];
  },

  saveItem: async (formData: InventoryFormData): Promise<InventoryItem> => {
    const items = inventoryStorage.getItems();
    const newItem: InventoryItem = {
      id: crypto.randomUUID(),
      ...formData,
      assignedTo: [],
      assignmentHistory: [],
      qrCode: await generateQRCode(formData.name),
      barcode: await generateBarcode(formData.name),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(INVENTORY_KEY, JSON.stringify([...items, newItem]));
    return newItem;
  },

  updateItem: (updatedItem: InventoryItem) => {
    const items = inventoryStorage.getItems();
    const updatedItems = items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(updatedItems));
  },

  deleteItem: (itemId: string) => {
    const items = inventoryStorage.getItems();
    localStorage.setItem(
      INVENTORY_KEY,
      JSON.stringify(items.filter(item => item.id !== itemId))
    );
  },

  getLowStockItems: () => {
    return inventoryStorage.getItems().filter(
      item => item.quantity <= item.minThreshold
    );
  },
};