import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApiContext } from '@/presentation/contexts';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory';
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter';
import { PrivateRoute } from '@/presentation/components';
import { makeSurveyList } from '../factories/pages/survey-list/survey-list-factory';
import { SurveyResult } from '@/presentation/pages';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys" exact component={SurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
