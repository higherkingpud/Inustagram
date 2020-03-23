export enum Status {
  Initial = 'initial',
  Loading = 'loading',
  Loaded = 'loaded',
  Failure = 'failure',
}

export type Resource<T> =
  | { status: Status.Initial }
  | { status: Status.Loading }
  | { status: Status.Loaded, value: T }
  | { status: Status.Failure, error?: string };

export const initial = <T>(): Resource<T> => ({ status: Status.Initial });

export const loading = <T>(): Resource<T> => ({ status: Status.Loading });

export const loaded = <T>(value: T): Resource<T> => ({
  status: Status.Loaded,
  value,
});

export const failure = <T>(error?: string): Resource<T> => ({
  status: Status.Failure,
  error,
});
