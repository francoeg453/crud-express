import Router from 'express';
import { check }  from 'express-validator';
import   validateFields   from '../middlewares/validate-fields';
import  ArticleController from '../controllers/articleController';

const router = Router();

router.get( '/',  ArticleController.findArticle );

router.post( '/',
    [
        check('title', 'the title is required').not().isEmpty(),
        check('body', 'the body is required').not().isEmpty(),
        check('author', 'the author is required').not().isEmpty(),
        validateFields,
    ], 
    ArticleController.createArticle 
);

router.put( '/:id',
    [
        check('title', 'the title is required').not().isEmpty(),
        check('body', 'the body is required').not().isEmpty(),
        check('author', 'the author required').not().isEmpty(),
        validateFields,
    ],
    ArticleController.updateArticle
);

router.delete( '/:id',
ArticleController.deleteArticle
);

module.exports = router;