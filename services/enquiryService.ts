
import { apiFetch } from './api';
import { db } from '../lib/db';

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  course: string;
}

export const submitEnquiry = async (data: EnquiryPayload): Promise<boolean> => {
  try {
    await apiFetch('/enquiry', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return true;
  } catch (err) {
    console.warn("Transmission failed. Persisting enquiry to local vault.");
    // Allow the user to complete the action even if the backend is down
    return await db.validateEnquiry(data);
  }
};
