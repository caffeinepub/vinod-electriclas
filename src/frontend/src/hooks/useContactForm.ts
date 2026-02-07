import { useState, FormEvent, ChangeEvent } from 'react';
import { useSubmitContactForm } from './useQueries';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  message?: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const submitMutation = useSubmitContactForm();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return {
    formData,
    errors,
    status: submitMutation.isPending ? 'loading' : submitMutation.isSuccess ? 'success' : submitMutation.isError ? 'error' : 'idle',
    errorMessage: submitMutation.error?.message,
    handleChange,
    handleSubmit,
    resetStatus: () => submitMutation.reset(),
  };
}
