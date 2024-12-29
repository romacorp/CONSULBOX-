import { supabase } from '../lib/supabase';
import { Customer } from '../types';
import { CustomerFormData } from '../lib/validators/customer';

export async function searchCustomer(identification: string): Promise<Customer | null> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('identification', identification)
    .single();

  if (error) throw error;
  return data;
}

export async function createCustomer(customerData: CustomerFormData & { user_id: string }) {
  const { error } = await supabase
    .from('customers')
    .insert([customerData]);

  if (error) throw error;
}