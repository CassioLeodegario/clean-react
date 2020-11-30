import { RemoteLoadSurveyResult } from './remote-load-survey-result';
import faker from 'faker';
import { HttpGetClientSpy } from '@/data/test';

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct url', async() => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
