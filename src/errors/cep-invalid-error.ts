import { ApplicationError } from '@/protocols';

export function cepInvalidError(): ApplicationError {
  return {
    name: 'CepInvalidError',
    message: 'Your CEP is invalid',
  };
}