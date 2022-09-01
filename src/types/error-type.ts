// INTERFACES
export interface OwnError {
  message: string;
  status: number;
  stack?: string | undefined;
}

export interface CustomeError {
  message: string;
  name: string;
  status: number;
  stack?: string | undefined;
  setError: () => OwnError;
}
