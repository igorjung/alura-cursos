import mongoose from "mongoose";
import ErrorBase from "../utils/errors/errorBase.js";
import InvalidRequest from "../utils/errors/invalidRequest.js";
import ValidationError from "../utils/errors/validationError.js";

// eslint-disable-next-line no-unused-vars
function handleErrors (err, req, res, next) {
	console.error("Error: ", err);
	
	if (err instanceof mongoose.Error.CastError) {
    new InvalidRequest().sendResponse(res);
	} else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendResponse(res);
	} else if (err instanceof ErrorBase) {
		err.sendResponse(res);
	} else {
    new ErrorBase().sendResponse(res);
	}
}

export default handleErrors;