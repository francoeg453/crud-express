import { Schema, model} from 'mongoose';
import  IArticle from '../models/iArticle';

const ArticleSchema = new Schema<IArticle>({

    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }  
},
{
    timestamps : true
});

ArticleSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})
export const  Article = model<IArticle>( 'Article', ArticleSchema );
