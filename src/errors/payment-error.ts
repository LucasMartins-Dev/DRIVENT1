import { ApplicationError } from '@/protocols';

export function paymentError(): ApplicationError {
  return {
    name: 'PaymentError',
    message: 'Payment is required for this request!',
  };
}
