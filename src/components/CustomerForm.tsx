import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { FormField } from './ui/FormField';
import { useCustomer } from '../hooks/useCustomer';
import { useAuth } from '../hooks/useAuth';

const customerSchema = z.object({
  identification: z.string().min(1, 'La identificación es requerida'),
  first_name: z.string().min(1, 'El nombre es requerido'),
  last_name: z.string().min(1, 'El apellido es requerido'),
  rating: z.number().min(1).max(5),
  comments: z.string().optional(),
});

type CustomerFormData = z.infer<typeof customerSchema>;

export function CustomerForm() {
  const { user } = useAuth();
  const { createCustomer, loading } = useCustomer();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = async (data: CustomerFormData) => {
    const success = await createCustomer({
      ...data,
      user_id: user!.id,
    });
    if (success) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Número de Identificación"
        name="identification"
        register={register}
        error={errors.identification?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Nombres"
          name="first_name"
          register={register}
          error={errors.first_name?.message}
        />

        <FormField
          label="Apellidos"
          name="last_name"
          register={register}
          error={errors.last_name?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Calificación
        </label>
        <select
          {...register('rating', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating} {rating === 1 ? 'estrella' : 'estrellas'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comentarios
        </label>
        <textarea
          {...register('comments')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? (
          'Guardando...'
        ) : (
          <>
            <Save className="w-5 h-5 mr-2" />
            Guardar Cliente
          </>
        )}
      </button>
    </form>
  );
}