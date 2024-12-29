import { useState } from 'react';
import { Customer } from '../types';
import * as customerService from '../services/customer.service';
import toast from 'react-hot-toast';
import { CustomerFormData } from '../lib/validators/customer';

export function useCustomer() {
  const [loading, setLoading] = useState(false);

  const searchCustomer = async (identification: string): Promise<Customer | null> => {
    setLoading(true);
    try {
      return await customerService.searchCustomer(identification);
    } catch (error) {
      toast.error('Error al buscar el cliente');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (customerData: CustomerFormData & { user_id: string }) => {
    setLoading(true);
    try {
      await customerService.createCustomer(customerData);
      toast.success('Cliente registrado exitosamente');
      return true;
    } catch (error: any) {
      if (error.code === '23505') {
        toast.error('Ya existe un cliente con esta identificación');
      } else {
        toast.error('Error al registrar el cliente');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    searchCustomer,
    createCustomer
  };
}