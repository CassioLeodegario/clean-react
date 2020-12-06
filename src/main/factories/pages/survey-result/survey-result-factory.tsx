import React from 'react';
import { SurveyResult } from '@/presentation/pages';
import { makeRemoteLoadSurveyResult } from '../../usecases/load-survey-result/remote-load-survey-result-factory';
import { useParams } from 'react-router-dom';

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<{ id: string}>();
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
    />
  );
};
