import { InvalidFieldError } from '@/validation/errors';
import { CompareFieldsValidation } from './compare-fields-validation';
import faker from 'faker';
import { FieldValidation } from '@/validation/protocols/field-validation';

const makeSut = (field: string, valueToCompare: string): FieldValidation => {
  return new CompareFieldsValidation(field, valueToCompare);
};

describe('CompareFieldsValidation', () => {
  test('Should Return Error if compare is invalid', () => {
    const fieldName = faker.database.column();
    const valueToCompare = faker.random.word();
    const sut = makeSut(fieldName, valueToCompare);
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError(fieldName));
  });

  test('Should Return falsy if compare is valid', () => {
    const fieldName = faker.database.column();
    const valueToCompare = faker.random.word();
    const sut = makeSut(fieldName, valueToCompare);
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
