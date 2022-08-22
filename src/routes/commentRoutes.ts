import Router from 'express';
import {check } from 'express-validator';
import validateFields from '../middlewares/validate-fields';
import CommentController from '../controllers/commentController'

const router = Router();

router.get( '/',  CommentController.findComment );

router.post( '/',
    [
        check('body', 'the body is required').not().isEmpty(),
        check('author', 'the author is required').not().isEmpty(),
        check('articleId', 'the author is required').not().isEmpty(),
        validateFields,
    ], 
    CommentController.createComment 
);

router.put( '/:id',
    [
        check('body', 'the body is required').not().isEmpty(),
        check('author', 'the author is required').not().isEmpty(),
        check('articleId', 'the author is required').not().isEmpty(),
        validateFields,
    ],
    CommentController.updateComment
);

router.delete( '/:id',
                CommentController.deleteComment
             );
module.exports = router;