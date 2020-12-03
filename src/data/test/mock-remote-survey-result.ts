import faker from 'faker';
import { RemoteLoadSurveyResult } from '../usecases/load-survey-result/remote-load-survey-result';

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  answers: [{
    image: faker.internet.url(),
    answer: faker.random.word(),
    count: faker.random.number(),
    percent: faker.random.number(100)
  },
  {
    answer: faker.random.word(),
    count: faker.random.number(),
    percent: faker.random.number(100)
  }]
});