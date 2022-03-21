export const internalServerError = (err) => {
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
    };
  } else {
    return {
      status: false,
      errorMessage: "Internal server error, please check your server.",
    };
  }
};

export const successStatus = (response) => {
  return {
    status: true,
    data: response.data,
  };
};
