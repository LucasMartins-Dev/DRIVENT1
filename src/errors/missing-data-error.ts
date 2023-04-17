import { ApplicationError } from '@/protocols';

export function missingDataError(): ApplicationError {
  return {
    name: 'MissingDataError',
    message: 'The data is missing.',
  };
}
