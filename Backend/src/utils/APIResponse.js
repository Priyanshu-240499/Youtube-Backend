class ApiResponse extends Error{
    constructor(statusCode, message, errors=[]){
         this.statusCode=statusCode;
         this.message="success";
         this.data=null;
         this.success= statusCode<400;
    }
 }
 
 export {ApiResponse}