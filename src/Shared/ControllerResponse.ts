import { Response } from "express";

export enum HttpStatus {
    OK = 200,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
  }

 class HttpResponse {

   static Ok(res: Response, data?: any ): any {
        return res.status(HttpStatus.OK).send(data);
    }
    
    static NotFound(res: Response, data?: any): Response {
        return res.status(HttpStatus.NOT_FOUND).send(data);
    }

    static Error(res: Response, data?: any): Response {
     
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(data);
    }
}

export default  HttpResponse ;