import React, { useState } from 'react';
import { FundiFormData, SkillCategory, AvailabilityStatus, PaymentMode } from '../../types/fundi';

interface FundiFormProps {
  initialData?: Partial<FundiFormData>;
  onSubmit: (data: FundiFormData) => void;
  onCancel: () => void;
}

export function FundiForm({ initialData, onSubmit, onCancel }: FundiFormProps) {
  const [formData, setFormData] = useState<FundiFormData>({
    name: initialData?.name || '',
    skillCategory: initialData?.skillCategory || 'Plumber',
    availabilityStatus: initialData?.availabilityStatus || 'Available',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    paymentMode: initialData?.paymentMode || 'Cash',
    equipment: initialData?.equipment || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="skillCategory" className="block text-sm font-medium text-gray-700">
            Skill Category
          </label>
          <select
            id="skillCategory"
            value={formData.skillCategory}
            onChange={(e) => setFormData({ ...formData, skillCategory: e.target.value as SkillCategory })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
          >
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Painter">Painter</option>
            <option value="Mason">Mason</option>
          </select>
        </div>

        <div>
          <label htmlFor="availabilityStatus" className="block text-sm font-medium text-gray-700">
            Availability Status
          </label>
          <select
            id="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value as AvailabilityStatus })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
          >
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
          />
        </div>

        <div>
          <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700">
            Payment Mode
          </label>
          <select
            id="paymentMode"
            value={formData.paymentMode}
            onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value as PaymentMode })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
          >
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="M-Pesa">M-Pesa</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF8001] hover:bg-[#FF8001]/90"
        >
          Save Fundi
        </button>
      </div>
    </form>
  );
}