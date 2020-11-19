import { Authentication } from '../usecases';
import faker from 'faker';

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});
