export class UnexpectedError extends Error {
  constructor() {
    super('Erro inesperado. Tente novamente mais tarde');
    this.name = 'UnexpectedError';
  }
}
