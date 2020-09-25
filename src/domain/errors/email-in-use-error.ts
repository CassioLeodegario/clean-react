export class EmailInUseError extends Error {
  constructor() {
    super('Já existe um cadastro para o e-mail informado');
    this.name = 'EmailInUseError';
  }
}
