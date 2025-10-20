
import { supabase } from '@/integrations/supabase/client';

interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export const sendContactEmail = async (data: EmailData) => {
  try {
    const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
      body: data
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return result;
  } catch (error) {
    console.error('Error calling email function:', error);
    throw error;
  }
};

export const submitToWebhook = async (data: any) => {
  try {
    const { data: result, error } = await supabase.functions.invoke('submit-contact', {
      body: data
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Failed to submit to webhook: ${error.message}`);
    }

    return result;
  } catch (error) {
    console.error('Error calling webhook function:', error);
    throw error;
  }
};

export const submitInsuranceCalculator = async (data: any) => {
  try {
    const { data: result, error } = await supabase.functions.invoke('submit-calculator', {
      body: data
    });

    if (error) {
      console.error('Calculator submission error:', error);
      throw new Error(`Failed to submit calculator: ${error.message}`);
    }

    return result;
  } catch (error) {
    console.error('Error calling calculator function:', error);
    throw error;
  }
};
