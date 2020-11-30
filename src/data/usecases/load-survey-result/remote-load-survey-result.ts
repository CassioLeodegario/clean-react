import { HttpGetClient } from '@/data/protocols/http';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpgetClient: HttpGetClient
  ) {}

  async load(): Promise<void> {
    this.httpgetClient.get({ url: this.url });
  }
}
