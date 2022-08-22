
import {  Document, Types } from 'mongoose';
export  default interface IArticle extends Document{
    _id: Types.ObjectId,
    title:string,
    body :string,
    author:string,
}