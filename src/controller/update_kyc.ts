import {Request, Response, NextFunction} from 'express';
import { RegisterModel } from '../model/registerShema';



export const updateKyc = async (req:Request, res:Response, next:NextFunction):Promise<any>=>{
    const {user_id, isKycPending} =req.body;

    try{
        const updateStatus =  await RegisterModel.findOneAndUpdate(
            {user_id:user_id},
            {isKycPending:false},
            {new:true}
        );

        if(!updateStatus){
           return  res.status(400).json({message:"user not found"});
        }

        return res.status(200).json({message:"user Kyc updated successfully!"});
    }
    catch(error){
        res.status(500).json({message:'Internal server error'});
    }
}
