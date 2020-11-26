import * as Http from './http-mocks';
import faker from 'faker';

export const mockEmailInUseError = (): void => Http.mockForbiddenError(/signup/, 'POST');
export const mockUnexpectedError = (): void => Http.mockServerError(/signup/, 'POST');
export const mockInvalidData = (): void => Http.mockOk(/signup/, 'POST', { invalid: faker.random.uuid() });
export const mockOk = (): void => Http.mockOk(/signup/, 'POST', { accessToken: faker.random.uuid(), name: faker.name.findName() });
