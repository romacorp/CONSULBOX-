import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useCustomer } from '../hooks/useCustomer';
import { Customer } from '../types';
import { CustomerCard } from './customer/CustomerCard';

export function CustomerSearch() {
  const [searchId, setSearchId] = useState('');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { searchCustomer, loading } = useCustomer();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const result = await searchCustomer(searchId);
    setCustomer(result);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Número de identificación"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Buscar
        </button>
      </form>

      {customer && <CustomerCard customer={customer} />}
    </div>
  );
}