import ErrorBase from "./errorBase.js";

class InvalidRequest extends ErrorBase {
  constructor(message = "Um ou mais dados fornecidos estão incorretos") {
    super(message, 400);
  }
}

export default InvalidRequest;