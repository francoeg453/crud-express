import { Types } from 'mongoose';

import { Comment} from  '../models/comment' ;
import  IComment  from '../models/iComment';

 class CommentService{

   static async getComment(req: any) : Promise<any>{ 
    var perPage = 10 , page = Math.max(0, page = Math.max(0, req.param?.page||1))
    return await Comment.find()
    .limit(perPage)
    .skip(perPage * (page - 1))
  
   }
  
   static async  getbyid (id: any): Promise<any>{
    return await Comment.findById( id );
   }


   static async createComment (req: any): Promise<any> {
    const comment = new Comment({
        ...req.body
        });
        comment.articleId = new Types.ObjectId(comment.articleId)
       return await comment.save();  
     
    }


    static async updateComment(req: any) : Promise<any> {
    
        const id  = req.params.id;
        const commentChangelled = new Comment({
            ...req.body
            });
            commentChangelled._id = new  Types.ObjectId(id)
         await Comment.updateOne( {_id : commentChangelled._id}, 
                                   commentChangelled,
                                   { upsert: true } )

        return 
    }


    static async deleteComment(id: any): Promise<any>  {
       
        await Comment.findByIdAndDelete( id );
    
        return true
    }
 }

export default CommentService;