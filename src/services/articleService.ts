import { Types } from 'mongoose';
import { Article} from  '../models/article' ;
import  IArticle from '../models/iArticle';
import {Comment} from '../models/comment';

 class Articleservice{

   static async getArticle(req:any) : Promise<IArticle[]>{ 
    var perPage = 10 , page = Math.max(0, req.param?.page||1)
    return await Article.find({})
    .limit(perPage)
    .skip(perPage * (page - 1))
    .exec()
   }
  
   static async  getbyid (id: any): Promise<any>{

    return await Article.findById( id ).exec()
   }


   static async createArticle (req: any): Promise<IArticle> {
    const article = new Article({
        ...req.body
        });
        return await article.save();  
    }


    static async updateArticle(req: any) : Promise<any> {
    
        const id  = req.params.id;
        const articleChangelled = new Article({
            ...req.body
            });
        articleChangelled._id = new  Types.ObjectId(id)
        return   await Article.updateOne( {_id : articleChangelled._id}, 
                                                            articleChangelled,
                                                             { upsert: true } )

         
    }


    static async deleteArticle(id: any): Promise<any>  {

         await Comment.deleteMany({articleId :  new  Types.ObjectId(id)})
        .catch((err)=>{
            return new Promise((reject) => {
                reject(err)
            }) 
        })
  
        return await Article.findByIdAndDelete( id );

    }
 }

export default Articleservice;