import { ApplicationError } from '@/protocols';

export function cepInvalidError(): ApplicationError {
  return {
    name: 'CepInvalidError',
    message: 'Your cep must be 8 numbers long!',
  };
}