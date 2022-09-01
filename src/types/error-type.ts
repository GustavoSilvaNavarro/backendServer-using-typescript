// INTERFACES
// ? Custome error
export interface OwnError {
  message: string;
  status: number;
  stack?: string | undefined;
}

// ? Defining error class
export interface CustomeError {
  message: string;
  name: string;
  status: number;
  stack?: string | undefined;
  setError: () => OwnError;
}
