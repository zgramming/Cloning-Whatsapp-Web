import axios from 'axios';

import { ValidatorResponseInterface } from '@/interface/validator-response.interface';

const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data;

    if (Array.isArray(response?.errors)) {
      const { errors }: ValidatorResponseInterface = response;

      const message = errors.map((err) => err.msg).join(', ');
      return {
        success: false,
        data: null,
        message,
      };
    }

    return {
      success: false,
      data: null,
      message: response?.message,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }

  return {
    success: false,
    data: null,
    message: 'Something went wrong',
  };
};

// eslint-disable-next-line import/prefer-default-export
export { errorHandler };
