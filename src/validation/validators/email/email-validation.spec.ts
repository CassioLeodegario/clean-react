import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from './email-validation';
import faker from 'faker';
import { FieldValidation } from '@/validation/protocols/field-validation';

const makeSut = (fieldName: string): FieldValidation => {
  return new EmailValidation(fieldName);
};

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const fieldName = faker.random.word();
    const sut = makeSut(fieldName);
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError(fieldName));
  });

  test('Should return falsy if email is valid', () => {
    const fieldName = faker.random.word();
    const sut = makeSut(fieldName);
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });

  test('Should return falsy if email is empty', () => {
    const fieldName = faker.random.word();
    const sut = makeSut(fieldName);
    const error = sut.validate('');
    expect(error).toBeFalsy();
  });
});
