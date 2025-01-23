import ErrorBase from "./errorBase.js";

class NotFound extends ErrorBase {
  constructor(message = "Rota não encontrada.") {
    super(message, 404);
  }
}

export default NotFound;