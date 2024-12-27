// Using a simple base64 encoding for demo purposes
// In a production environment, use proper QR/barcode generation libraries
export const generateQRCode = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  return btoa(String.fromCharCode(...data));
};

export const generateBarcode = async (text: string): Promise<string> => {
  return btoa(text);
};