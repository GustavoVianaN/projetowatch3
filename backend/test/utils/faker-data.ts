import { internet, random } from 'faker/locale/pt_BR';

export function generateUser() {
  return {
    user: internet.email().toLocaleLowerCase(),
    password: random.alphaNumeric(8),
  };
}
