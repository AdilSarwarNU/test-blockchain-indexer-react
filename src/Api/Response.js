const Response = {
  next: (response) => {
    if (!response.data || response.data.error === false)
      return response;

    throw Error(response.data.message);
  }
};

export default Response;
