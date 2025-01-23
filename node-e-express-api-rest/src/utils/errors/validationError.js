import InvalidRequest from "./invalidRequest.js";

class validationError extends InvalidRequest {
  constructor(err) {
    const messages = Object.values(err.errors)
      .map(error => error.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${messages}`);
  }
}

export default validationError;