import { InvalidFieldError } from '@/validation/errors';
import { MinLengthValidation } from './min-length-validation';
import faker from 'faker';

const makeSut = (fieldName: string, minLength: number): MinLengthValidation => {
  return new MinLengthValidation(fieldName, minLength);
};

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field, 5);
    const error = sut.validate(faker.random.alphaNumeric(4));
    expect(error).toEqual(new InvalidFieldError(field));
  });

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field, 5);
    const error = sut.validate(faker.random.alphaNumeric(5));
    expect(error).toBeFalsy();
  });
});
