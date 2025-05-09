class ApiError extends Error{
   constructor(statusCode, message, errors=[]){
        super(message)
        this.statusCode=statusCode;
        this.message="something went wrong in api";
        this.errors=errors;
        this.data=null;
        this.success=false;
   }
}

export {ApiError}