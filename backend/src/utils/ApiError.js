class ApiError extends Error{
    constructor(statusCode=500,message="Something Went Wrong", data=null, errors=[],stack=""){
        super(message)
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.errors = errors;
        this.success = false;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default ApiError;