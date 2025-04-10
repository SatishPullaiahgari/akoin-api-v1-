import mongoose, {Schema, Document} from 'mongoose'



export interface passwordResetSchema extends Document{
    username:string;
    email:string;
    newPassword:string;
} 

const password:Schema = new Schema<passwordResetSchema>({
    username:{type:String, required:true},
    email:{type:String, required:true},
    newPassword:{type:String, required:true}
});

export const passwordResetModel = mongoose.model<passwordResetSchema>("password", password);