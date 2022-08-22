import { response }from 'express';
import { validationResult } from 'express-validator';

function validateFields (req:any, res: any = response , next : any ) {

    const errores = validationResult( req );

    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}

export default validateFields;
