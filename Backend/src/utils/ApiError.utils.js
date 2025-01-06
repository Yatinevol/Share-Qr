class ApiError extends Error{
    constructor(statusCode, message="something went Wrong by ApiError",errors=[], stack ="" ){
        super();
        this.statusCode = statusCode
        this.message = message
        this.data = null
        this.success = false
        this.errors = errors
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTree(this,this.constructor)
        }

    }
}
export default ApiError;