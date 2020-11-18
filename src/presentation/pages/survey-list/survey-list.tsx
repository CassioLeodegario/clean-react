import { Footer, Header } from '@/presentation/components';
import React, { useEffect, useState } from 'react';
import { SurveyContext, SurveyListError, SurveyListItem } from '@/presentation/pages/survey-list/components';
import Styles from './survey-list-styles.scss';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
    reload: false
  });

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(error => setState({ ...state, error: error.message }));
  }, [state.reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          { state.error ? <SurveyListError /> : <SurveyListItem /> }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
