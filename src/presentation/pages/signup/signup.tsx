import React, { useState } from 'react';
import Styles from './signup-styles.scss';
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo Obrigatório',
    emailError: 'Campo Obrigatório',
    passwordError: 'Campo Obrigatório',
    passwordConfirmationError: 'Campo Obrigatório',
    mainError: ''
  });

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state }}>
        <form className={Styles.form} >
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <button data-testid="submit" disabled className={Styles.submit}>
          Entrar
          </button>
          <span data-testid="signup" className={Styles.link}>Voltar para o Login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;