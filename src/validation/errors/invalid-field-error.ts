export class InvalidFieldError extends Error {
  constructor(fieldName: string) {
    super(`Valor inválido para o campo ${fieldName}`);
    this.name = 'InvalidFieldError';
  }
}
