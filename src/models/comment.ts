import { Schema, model, Document, Types } from 'mongoose';
import  IComment from '../models/iComment';

const CommentSchema = new Schema({

    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    articleId: {
        type: Types.ObjectId,
        ref: 'Article',
        required: true,
    }
},
{
    timestamps : true
});
CommentSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

export const Comment = model<IComment>( 'Comment', CommentSchema );