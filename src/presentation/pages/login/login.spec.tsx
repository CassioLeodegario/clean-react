import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Login from './login';
import { ValidationStub } from '@/presentation/test';
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
  const sut = render(<Login validation={validationStub}/>);
  return {
    sut
  };
};

describe('Login component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const emailIput = sut.getByTestId('email');
    fireEvent.input(emailIput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const passwordIput = sut.getByTestId('password');
    fireEvent.input(passwordIput, { target: { value: faker.internet.password() } });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();
    const emailIput = sut.getByTestId('email');
    fireEvent.input(emailIput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo Certo');
    expect(emailStatus.textContent).toBe('🟢');
  });

  test('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();
    const passwordIput = sut.getByTestId('password');
    fireEvent.input(passwordIput, { target: { value: faker.internet.password() } });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo Certo');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    const emailIput = sut.getByTestId('email');
    fireEvent.input(emailIput, { target: { value: faker.internet.email() } });
    const passwordIput = sut.getByTestId('password');
    fireEvent.input(passwordIput, { target: { value: faker.internet.password() } });
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('Should show spinner on submit', () => {
    const { sut } = makeSut();
    const emailIput = sut.getByTestId('email');
    fireEvent.input(emailIput, { target: { value: faker.internet.email() } });
    const passwordIput = sut.getByTestId('password');
    fireEvent.input(passwordIput, { target: { value: faker.internet.password() } });
    const submitButton = sut.getByTestId('submit');
    fireEvent.click(submitButton);
    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });
});
