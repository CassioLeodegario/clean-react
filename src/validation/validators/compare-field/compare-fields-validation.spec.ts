import { InvalidFieldError } from '@/validation/errors';
import { CompareFieldsValidation } from './compare-fields-validation';
import faker from 'faker';
import { FieldValidation } from '@/validation/protocols/field-validation';

const makeSut = (field: string, fieldToCompare: string): FieldValidation => {
  return new CompareFieldsValidation(field, fieldToCompare);
};

describe('CompareFieldsValidation', () => {
  test('Should Return Error if compare is invalid', () => {
    const fieldName = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(fieldName, fieldToCompare);
    const error = sut.validate({ [fieldName]: faker.random.word(), [fieldToCompare]: faker.random.word() });
    expect(error).toEqual(new InvalidFieldError(fieldName));
  });

  test('Should Return falsy if compare is valid', () => {
    const fieldName = faker.database.column();
    const fieldToCompare = faker.database.column();
    const valueToCompare = faker.random.word();
    const sut = makeSut(fieldName, fieldToCompare);
    const error = sut.validate({ [fieldName]: valueToCompare, [fieldToCompare]: valueToCompare });
    expect(error).toBeFalsy();
  });
});
