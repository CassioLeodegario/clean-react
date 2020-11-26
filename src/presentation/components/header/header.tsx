import React, { memo, useContext } from 'react';
import { Logo } from '..';
import { ApiContext } from '@/presentation/contexts';
import Styles from './header-styles.scss';
import { useHistory } from 'react-router-dom';

const Header: React.FC = () => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
  const logout = (event: React.MouseEvent): void => {
    event.preventDefault();
    setCurrentAccount(undefined);
    history.replace('/login');
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={logout}>Sair</a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
