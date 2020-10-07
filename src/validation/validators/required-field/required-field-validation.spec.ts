import { RequiredFieldError } from '@/validation/errors';
import { RequiredFieldValidation } from './required-field-validation';
import faker from 'faker';
import { FieldValidation } from '@/validation/protocols/field-validation';

const makeSut = (field: string): FieldValidation => {
  return new RequiredFieldValidation(field);
};

describe('RequiredFieldValidation', () => {
  test('Should Return Error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should Return falsy if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
