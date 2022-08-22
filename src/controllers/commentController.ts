import {NextFunction, response } from 'express';
import  commentService  from '../services/commentService'
import   HttpResponse from '../Shared/ControllerResponse'

class CommnetController  extends HttpResponse{

     static async findComment (req: any, res = response, next: NextFunction) {
    
        try {
            return res.status(200).send(await commentService.getComment(req));
        } catch (error) {
            return this.Error(res, error);
        }
    }

    static async findById (req: any, res = response, next: NextFunction) {
        
        try {
            const id  = req.params.id;
            const comment = await commentService.getbyid(id)
            if ( !comment ) {
                 return this.NotFound(res, 'Comment not found by id');
            }
            return res.status(200).send(comment);
        } catch (error) {
            return this.Error(res, error);
        }     
    }
    
    static async createComment (req: any, res = response, next: NextFunction) {

        try {
            return res.status(200).send(await commentService.createComment(req));
        } catch (error) {
            return this.Error(res, error);
        }
        
     }
    
    static async  updateComment (req: any, res = response, next: NextFunction)  {

      try {
        const id  = req.params.id;
        const comment = await commentService.getbyid(id)
        if ( !comment ) {
             return this.NotFound(res, 'Comment not found by id');
        }
        return  res.status(200).send(await commentService.updateComment(req));
        } catch (error) {
            return this.Error(res, error);
        }
    }
    
    static  async  deleteComment(req: any, res = response, next: NextFunction)  {
    

      try {
        const id  = req.params.id;
    
        const article = await commentService.getbyid( id )
    
        if ( !article ) {
            return this.NotFound(res, 'Article not found by id');
        } 
   
        return res.status(200).send(await commentService.deleteComment( id ));
        } catch (error) {
            return this.Error(res, error);
        }
    }
 
}
export default CommnetController;