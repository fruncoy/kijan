import React, { useState } from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import { Upload, X } from 'lucide-react';

interface Image {
  id: string;
  url: string;
  caption: string;
  uploadedAt: string;
}

export function ProjectGallery({ projectId }: { projectId: string }) {
  const [images, setImages] = useProjectData<Image[]>('gallery', []);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: Image = {
          id: crypto.randomUUID(),
          url: e.target?.result as string,
          caption: '',
          uploadedAt: new Date().toISOString(),
        };
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Project Gallery</h2>
        <label className="cursor-pointer bg-[#FF8001] text-white px-4 py-2 rounded-lg hover:bg-[#FF8001]/90">
          <Upload className="h-5 w-5 inline-block mr-2" />
          Upload Images
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.url}
              alt={image.caption}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-4xl w-full p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="max-h-[80vh] mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}