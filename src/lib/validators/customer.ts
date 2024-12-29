import { z } from 'zod';

export const customerSchema = z.object({
  identification: z.string().min(1, 'La identificación es requerida'),
  first_name: z.string().min(1, 'El nombre es requerido'),
  last_name: z.string().min(1, 'El apellido es requerido'),
  rating: z.number().min(1).max(5),
  comments: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;