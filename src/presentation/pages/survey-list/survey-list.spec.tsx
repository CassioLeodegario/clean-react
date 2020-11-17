import React from 'react';
import { render, screen } from '@testing-library/react';
import SurveyList from './survey-list';

const makeSut = (): void => {
  render(<SurveyList />);
};

describe('SurveyListComponent', () => {
  test('Should Present 4 empty items on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });
});
