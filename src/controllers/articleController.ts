import { NextFunction, response } from 'express';
import  articleService  from '../services/articleService'
import   HttpResponse from '../Shared/ControllerResponse'

class ArticleController extends HttpResponse {

    static async findArticle (req: any, res = response, next: NextFunction) {

        try {
         return res.status(200).send(await articleService.getArticle(req));
        } catch (error) {
            return this.Error(res, error);
        };
    }

    static async findById (req: any, res = response, next: NextFunction) {
    
       try {
        const id  = req.params.id;
            const article =await articleService.getbyid(id)
        if ( !article ) {
            return this.NotFound(res,'Article not found by id')
        }
        return res.status(200).send(article);
       } catch (error) {
           return this.Error(res, error);
       };
   
     }
    
    
    static async createArticle (req: any, res = response, next: NextFunction) {

       try {
        return res.status(200).send(await articleService.createArticle(req));
       } catch (error) {
           return this.Error(res, error);
       };

     }
    
     static  async  updateArticle (req: any, res = response, next: NextFunction)  {
        
       try {
        const id  = req.params.id;
        const article = await articleService.getbyid(id)

        if ( !article ) {
            return this.NotFound(res,'Article not found by id')
        }

        return res.status(200).send(await articleService.updateArticle(req));
       } catch (error) {
           return this.Error(res, error);
       };
    }
    
    static  async  deleteArticle(req: any, res = response, next: NextFunction)  {
       
       try {
        const id  = req.params.id;
    
        const article = await articleService.getbyid( id )
    
        if ( !article ) {
            return this.NotFound(res,'Article not found by id')
        }
        return res.status(200).send( await articleService.deleteArticle( id ));
       } catch (error) {
           return this.Error(res, error);
       };
    }
 
}
export default ArticleController;