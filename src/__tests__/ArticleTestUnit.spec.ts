
const mockingoose = require("mockingoose");
const mongoose = require('mongoose')
import { Article} from '../models/article';
import { Types  } from 'mongoose';


describe('test mongoose article model', () => {
  afterEach(async() => {
    jest.restoreAllMocks()
  });

  afterAll(async() => {
    await mongoose.connection.close()
  });
  
  it('should return the articles with find', () => {
     const listArticles  =[
      {
          _id: "62f3baf00df57caa72445e4b",
          title: "fernet",
          body: "prueba",
          author: "franco",
      },
      {
          _id:"62f53358c91b1eb3c59dd0ef",
          title: "coca",
          body: "gaseosa",
          author: "riquelme",
      },
  ]

    mockingoose.Article.toReturn(listArticles, 'find');

    return Article.find().then((list) => {
      expect(JSON.parse(JSON.stringify(list))).toMatchObject(listArticles);
    });
  });

    it('should return the article with update', () => {
    const article =  {
      _id: "62f3baf00df57caa72445e4b",
      title: "beer",
      body: "test",
      author: "franco",
  };
  const articleChange =  {
    _id: "62f3baf00df57caa72445e4b",
    title: "beer",
    body: "test",
    author: "franco",
};

    mockingoose(Article).toReturn(article, 'updateOne');

    return Article
      .updateOne({ _id: new Types.ObjectId('62f3baf00df57caa72445e4b') },{ title : 'beer' , body: 'test' },{ upsert: true }) // this won't really change anything
      .where({ _id: '62f3baf00df57caa72445e4b' })
      .then(artReponse => {
        expect(JSON.parse(JSON.stringify(artReponse))).toMatchObject(articleChange);
      });
  });


    it('should return the article with delete', async () => {
      const deleteArticle =  {
        _id: "62f3baf00df57caa72445e4b",
        title: "beer",
        body: "test",
        author: "franco",
    };
  
      mockingoose(Article).toReturn( deleteArticle, 'deleteOne');
      return Article.deleteOne({_id: new Types.ObjectId('62f3baf00df57caa72445e4b')})
        .then(response => {
          expect(JSON.parse(JSON.stringify(response))).toMatchObject( JSON.parse(JSON.stringify(deleteArticle)));
        });
      });
});
describe("create", () => {

 it('should return the article with create',  (done)=> {
    const newArticle =  {
      _id: "62f3baf00df57caa72445e4b",
      title: "beer",
      body: "test",
      author: "franco",
  };
    
    // let article=   Article.create(newArticle);

    mockingoose(Article).toReturn(newArticle, 'save');
    done()

     Article.create(newArticle)
   .then(response => {
     expect(JSON.parse(JSON.stringify(response))).toMatchObject(newArticle);
   });
 });

});