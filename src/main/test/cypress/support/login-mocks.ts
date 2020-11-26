import faker from 'faker';
import * as Helper from './http-mocks';

export const mockInvalidCredentialsError = (): void => Helper.mockUnauthorizedError(/login/);
export const mockUnexpectedError = (): void => Helper.mockServerError(/login/, 'POST');
export const mockOk = (): void => Helper.mockOk(/login/, 'POST', { accessToken: faker.random.uuid(), name: faker.name.findName() });
export const mockInvalidData = (): void => Helper.mockOk(/login/, 'POST', { invalid: faker.random.uuid() });
