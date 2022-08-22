import {  Document, Types } from 'mongoose';
export default interface IComment extends Document{
    _id: Types.ObjectId,
    body :string,
    author:string,
    articleId:any,
}