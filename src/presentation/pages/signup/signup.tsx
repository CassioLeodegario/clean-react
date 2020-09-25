import React from 'react';
import Styles from './signup-styles.scss';
import { Link } from 'react-router-dom';
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

const SignUp: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form className={Styles.form} >
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <button className={Styles.submit}>
          Entrar
          </button>
          <Link data-testid="signup" to="/login" className={Styles.link}>Voltar para o Login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
