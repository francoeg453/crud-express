
const mockingoose = require("mockingoose");

import {Comment} from '../models/comment';
import { Types } from 'mongoose';
import { doesNotMatch } from 'assert';



describe('test mongoose comment model', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  });
  
  it('should return the comments with find', () => {
     const listComments  =[
        {
            "_id": "62f50e6c0d70ae8630ad30be",
            "body": "me encanta",
            "author": "juan",
            "articleId": "62f50e6c0d70ae8630ad30bf",
            "createdAt": "2022-08-11T14:13:00.577Z",
            "updatedAt": "2022-08-11T14:13:00.577Z"
        },
        {
            "_id": "62fa849c64de6a1ed1593397",
            "body": "mortalazo",
            "author": "luks",
            "articleId": "62f53358c91b1eb3c59dd0ef",
            "createdAt": "2022-08-15T17:38:36.981Z",
            "updatedAt": "2022-08-15T17:38:36.981Z"
        }
    ]

    mockingoose.Comment.toReturn(listComments, 'find');

    return Comment.find().then((list) => {
      expect(JSON.parse(JSON.stringify(list))).toMatchObject(listComments);
    });
  });

    it('should return the comment with update', () => {
    const comment =   {
        "_id": "62fa849c64de6a1ed1593397",
        "body": "mortalazo",
        "author": "luks",
        "articleId": "62f53358c91b1eb3c59dd0ef",
        "createdAt": "2022-08-15T17:38:36.981Z",
        "updatedAt": "2022-08-15T17:38:36.981Z"
    };
  const commentChange =  {
    "_id": "62fa849c64de6a1ed1593397",
    "body": "mortalazo",
    "author": "luks",
    "articleId": "62f53358c91b1eb3c59dd0ef",
    "createdAt": "2022-08-15T17:38:36.981Z",
    "updatedAt": "2022-08-15T17:38:36.981Z"
};

    mockingoose(Comment).toReturn(comment, 'updateOne');

    return Comment
      .updateOne({ _id: new Types.ObjectId('62f3baf00df57caa72445e4b') },{ title : 'beer' , body: 'test' },{ upsert: true }) // this won't really change anything
      .where({ _id: '62f3baf00df57caa72445e4b' })
      .then(reponse => {
        expect(JSON.parse(JSON.stringify(reponse))).toMatchObject(commentChange);
      });
  });


    it('should return the comment with delete', async () => {
      const deletecomment =  {
        "_id": "62fa849c64de6a1ed1593397",
        "body": "mortalazo",
        "author": "luks",
        "articleId": "62f53358c91b1eb3c59dd0ef",
        "createdAt": "2022-08-15T17:38:36.981Z",
        "updatedAt": "2022-08-15T17:38:36.981Z"
    };
  
      mockingoose(Comment).toReturn( deletecomment, 'deleteOne');
      return Comment.deleteOne({_id: new Types.ObjectId('62fa849c64de6a1ed1593397')})
        .then(response => {
          expect(JSON.parse(JSON.stringify(response))).toMatchObject( JSON.parse(JSON.stringify(deletecomment)));
        });
      });
});
describe("create", () => {

 it('should return the comment with create',  (done) => {
    const newComment =  {
        "_id": "62fa849c64de6a1ed1593397",
        "body": "mortalazo",
        "author": "luks",
        "articleId": "62f53358c91b1eb3c59dd0ef",
        "createdAt": "2022-08-15T17:38:36.981Z",
        "updatedAt": "2022-08-15T17:38:36.981Z"
    };
    
  Comment.create(newComment);

    mockingoose(Comment).toReturn(newComment, 'save');
    done()
      Comment.create(newComment)
      .then(response => {
        console.log(response)
        expect(JSON.parse(JSON.stringify(response))).toMatchObject(newComment);
      });
    });

});