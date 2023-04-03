export interface ValidatorResponseInterface {
  errors: Error[];
}

interface Error {
  msg: string;
  param: string;
  location: string;
}
