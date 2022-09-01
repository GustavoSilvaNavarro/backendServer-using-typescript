import { CustomeError, OwnError } from '../../types/error-type';

export class AppErrors extends Error implements CustomeError {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  setError(): OwnError {
    return {
      message: this.message,
      status: this.status,
      stack: this.stack,
    };
  }
}
