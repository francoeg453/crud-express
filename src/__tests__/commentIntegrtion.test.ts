import CommentController from '../controllers/commentController';
import * as mocks from 'node-mocks-http';
import  CommentService  from '../services/commentService';
import IComment from '../models/iComment';
import { Types } from 'mongoose';

describe('CommentController', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('CreateComment - OK', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId('123165797d32723953989999')
        };

        req._setParameter('id', '123165797d32723953989999')
        req._addBody("comment", comment);

        jest.spyOn(CommentService, 'createComment').mockResolvedValue(comment);
        var spySend = jest.spyOn(res, 'send');

        await CommentController.createComment(req, res, next);

        expect(spySend).toBeCalledWith(comment);
        expect(res.statusCode).toBe(200);
    });

    it('findById - not found', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };
        req._setParameter('id', '123165797d3272395398efe7')

        jest.spyOn(CommentService, 'getbyid').mockResolvedValue({});
        var spySend = jest.spyOn(res, 'send');

        await CommentController.findById(req, res, next);

        expect(spySend).toBeCalledTimes(1);
        expect(res.statusCode).toBe(200);
    });

    it('UpdateComment - OK', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId('123165797d32723953989999')
        };

        req._setParameter('id', '123165797d32723953989999');
        req._addBody("comment", comment);

        jest.spyOn(CommentService, 'getbyid').mockResolvedValue(comment);
        jest.spyOn(CommentService, 'updateComment').mockResolvedValue(comment);
        var spySend = jest.spyOn(res, 'send');

        await CommentController.updateComment(req, res, next);

        expect(spySend).toBeCalledWith(comment);
        expect(res.statusCode).toBe(200);
    });

    it('UpdateComment - bad request', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId('123165797d32723953989999')
        };

        req._setParameter('id', 'qwewe');
        req._addBody("comment", comment);

        await CommentController.updateComment(req, res, next);

        expect(res.statusCode).toBe(404);
    });

    it('DeleteComment - OK', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId('123165797d32723953989999')
        };

        req._setParameter('id', '123165797d32723953989999');
        req._addBody("comment", comment);

        jest.spyOn(CommentService, 'getbyid').mockResolvedValue(comment);
        jest.spyOn(CommentService, 'deleteComment').mockResolvedValue(true);

        var spyEnd = jest.spyOn(res, 'end');

        await CommentController.deleteComment(req, res, next);

        expect(spyEnd).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(200);
    });

    it('DeleteComment - bad request', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId('123165797d32723953989999')
        };

        req._setParameter('id', 'qwewe');
        req._addBody("comment", comment);

        await CommentController.deleteComment(req, res, next);

        expect(res.statusCode).toBe(404);
    });

});