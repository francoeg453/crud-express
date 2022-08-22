
import ArticleController from '../controllers/articleController';
import * as mocks from 'node-mocks-http';
import  ArticleService  from '../services/articleService';
import IArticle from '../models/iArticle';
import { Types } from 'mongoose';


describe('ArticleController', () => {
        
    afterEach(() => {
        jest.resetAllMocks();
    });
    
    it('CreateArticle - OK', async function() {
        
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        var article = <IArticle>{
            _id:  new Types.ObjectId('62f165797d3272395398efe7'),
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','62f165797d3272395398efe7');
        req._addBody("article", article);

        var spySend = jest.spyOn(res, 'send');
        jest.spyOn(ArticleService, 'createArticle').mockResolvedValue(article);
    
        await ArticleController.createArticle(req, res, next);

        expect(spySend).toHaveBeenCalledWith(article);
        expect(res.statusCode).toBe(200);
    });

    it('findArticle - WithoutArticles', async function() {
        var req = mocks.createRequest();
        var res = mocks.createResponse();

        var next = () => {};
        
        ArticleService.getArticle = jest.fn().mockResolvedValue([]);
        
        var spySend = jest.spyOn(res, 'send');

        await ArticleController.findArticle(req, res, next);

        expect(spySend).toHaveBeenCalledWith([]);
    });
    
    it('findArticle - One Article', async function() {
        const article = <IArticle>{
            author: 'author',
            body: 'body',
            title: 'title'
        };
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        ArticleService.getArticle = jest.fn().mockResolvedValue([article]);
        var spySend = jest.spyOn(res, 'send');
        
        await ArticleController.findArticle(req, res, next);
        
        var body = res._getData();
        expect(spySend).toHaveBeenCalledWith([article]);
        expect(body.length).toBe(1);
        
    });
    
    it('findById - not found', async function() {
        
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        req._setParameter('id','123165797d3272395398efe7')
        
        ArticleService.getbyid = jest.fn().mockResolvedValue(null);
        var spySend = jest.spyOn(res, 'send');
    
        await ArticleController.findById(req, res, next);
    
        expect(spySend).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(404);
    });
    
    it('findById - find one', async function() {
        const article = <IArticle>{
            _id: new Types.ObjectId('62f165797d3272395398efe7'),
            author: 'author',
            body: 'body',
            title: 'title'
        };
    
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        req._setParameter('id','62f165797d3272395398efe7')
        
        ArticleService.getbyid = jest.fn().mockResolvedValue(article);   
        var spySend = jest.spyOn(res, 'send');
    
        await ArticleController.findById(req, res, next);
    
        expect(spySend).toBeCalledTimes(1);
        expect(res.statusCode).toBe(200);
    });
    
    it('UpdateArticle - OK', async function() {    
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        var article = <IArticle>{
            _id: new Types.ObjectId('62f165797d3272395398efe7'),
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','62f165797d3272395398efe7');
        req._addBody("article", article);

        ArticleService.getbyid = jest.fn().mockResolvedValue(article);
        ArticleService.updateArticle = jest.fn().mockResolvedValue(article);

        const spySend = jest.spyOn(res, 'send');
    
        await ArticleController.updateArticle(req, res, next);
        
        expect(ArticleService.getbyid).toHaveBeenCalledTimes(1);
        expect(ArticleService.updateArticle).toHaveBeenCalledTimes(1);
        expect(spySend).toHaveBeenCalledWith(article);
        expect(res.statusCode).toBe(200);
    });

    it('UpdateArticle - bad request', async function() {
        
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        var article = <IArticle>{
            _id: new Types.ObjectId('62f165797d3272395398efe7'),
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','qwewe');
        req._addBody("article", article);
        jest.spyOn(ArticleService, 'updateArticle').mockResolvedValue(article);
    
        await ArticleController.updateArticle(req, res, next);
        expect(res.statusCode).toBe(404);
    });

    it('DeleteArticle - OK', async function() {    
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        var article = <IArticle>{
            _id:  new Types.ObjectId('62f165797d3272395398efe7'),
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','62f165797d3272395398efe7');
        req._addBody("article", article);
        var spyEnd = jest.spyOn(res, 'end');

        jest.spyOn(ArticleService, 'getbyid').mockResolvedValue(article);
        jest.spyOn(ArticleService, 'deleteArticle').mockResolvedValue(article);

        await ArticleController.deleteArticle(req, res, next);
    
        expect(spyEnd).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(200);
    });

    it('DeleteArticle - bad request', async function() {
        
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        var article = <IArticle>{
            _id:  new Types.ObjectId('62f165797d3272395398efe7'),
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','qwewe');
        req._addBody("article", article);
        jest.spyOn(ArticleService, 'deleteArticle').mockResolvedValue(article);
    
        await ArticleController.deleteArticle(req, res, next);

        expect(res.statusCode).toBe(404);
    });


});