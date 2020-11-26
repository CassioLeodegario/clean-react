import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list';
import { LoadSurveyList } from '@/domain/usecases';
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '../../http/api-url-factory';

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpGetClientDecorator());
};
