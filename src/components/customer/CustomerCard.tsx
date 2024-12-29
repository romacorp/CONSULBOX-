import React from 'react';
import { Customer } from '../../types';
import { RatingStars } from '../ui/RatingStars';

interface CustomerCardProps {
  customer: Customer;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            {customer.first_name} {customer.last_name}
          </h3>
          <p className="text-gray-600">ID: {customer.identification}</p>
        </div>
        <RatingStars rating={customer.rating} />
      </div>
      {customer.comments && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Comentarios:</h4>
          <p className="mt-1 text-gray-600">{customer.comments}</p>
        </div>
      )}
    </div>
  );
}