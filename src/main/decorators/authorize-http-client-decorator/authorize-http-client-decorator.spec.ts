import { HttpRequest } from '@/data/protocols/http';
import { GetStorageSpy, mockHttpRequest, HttpClientSpy } from '@/data/test';
import { mockAccountModel } from '@/domain/test';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import faker from 'faker';

type SutTypes = {
  sut: AuthorizeHttpClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpClientSpy: HttpClientSpy;
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpClientSpy = new HttpClientSpy();
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy);
  return {
    sut,
    getStorageSpy,
    httpClientSpy
  };
};

describe('AuthorizeHttpClientDecorator', () => {
  test('Should call GetStorage with correct value', async() => {
    const { getStorageSpy, sut } = makeSut();
    sut.request(mockHttpRequest());
    expect(getStorageSpy.key).toBe('account');
  });

  test('Should not add headers if GetStorage if invalid', async() => {
    const { sut, httpClientSpy } = makeSut();
    const httpRequest: HttpRequest = {
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      }
    };
    sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toBe(httpRequest.headers);
  });

  test('Should add headers to HttpGetClient', async() => {
    const { sut, getStorageSpy,httpClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpRequest = {
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      url: faker.internet.url()
    };
    sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);

    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    });
  });

  test('Should merge headers to HttpGetClient', async() => {
    const { sut, getStorageSpy,httpClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const field = faker.random.words();
    const httpRequest: HttpRequest = {
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      url: faker.internet.url(),
      headers: {
        field
      }
    };
    sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    });
  });

  test('Should return the same result as HttpClient', async() => {
    const { sut, httpClientSpy } = makeSut();
    const httpResponse = await sut.request(mockHttpRequest());
    expect(httpResponse).toEqual(httpClientSpy.response);
  });
});
