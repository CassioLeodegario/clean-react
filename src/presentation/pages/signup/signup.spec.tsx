import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import SignUp from './signup';
import { Helper, ValidationStub } from '@/presentation/test/';
import faker from 'faker';

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <SignUp
      validation={validationStub}
    />

  );
  return {
    sut
  };
};

const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()): void => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

describe('SingUp component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', 'Campo Obrigatório');
    Helper.testStatusForField(sut, 'password', 'Campo Obrigatório');
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo Obrigatório');
  });

  test('Should show name error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name', validationError);
  });
});
