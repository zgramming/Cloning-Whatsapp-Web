import axios from 'axios';

export const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return {
      success: false,
      data: null,
      message: error.response?.data.message,
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
