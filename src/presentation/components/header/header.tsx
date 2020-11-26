import React, { memo, useContext } from 'react';
import { Logo } from '..';
import { ApiContext } from '@/presentation/contexts';
import Styles from './header-styles.scss';
import { useLogout } from '@/presentation/hooks';

const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext);
  const logout = useLogout();
  const buttonClick = (event: React.MouseEvent): void => {
    event.preventDefault();
    logout();
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={buttonClick}>Sair</a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
