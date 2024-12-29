import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import { FormField } from './ui/FormField';
import { useAuth } from '../hooks/useAuth';
import { loginSchema, type LoginFormData } from '../lib/validators/auth';

export function LoginForm() {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => login(data.email, data.password);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <FormField
        label="Correo Electrónico"
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
      />

      <FormField
        label="Contraseña"
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? (
          'Iniciando sesión...'
        ) : (
          <>
            <LogIn className="w-5 h-5 mr-2" />
            Iniciar Sesión
          </>
        )}
      </button>
    </form>
  );
}