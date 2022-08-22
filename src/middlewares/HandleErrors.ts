import { response }from 'express';

function HandleErrors (err: any ,req:any, res: any = response , next : any ) {
    console.log('err')
    return res.status(500).send(err);
}
export default HandleErrors;