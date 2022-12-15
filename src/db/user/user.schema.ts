import { Schema, Document } from "mongoose"
import { authorizationSchema } from "../authorization/authorization.schema";
import { defaultSchema } from "../default/default.schema";
import { IUser } from "./user.interface";

export const UserRolesSchema: Schema = new Schema({
    roleID: { type: Schema.Types.ObjectId, ref: "UserRole" },
    branches: [{ type: Schema.Types.Mixed, ref: "Branch" }],
})
export const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: String,
    usertype: { type: String, required: false },
    email: { type: String, required: true },
    gender: { type: Number, enum: [0, 1], default: 0, required: false },
    chains: {
        type: [Schema.Types.ObjectId],
        //ref: "chain",
        required: false
    },
    verified: { type: Boolean, required: false, default: false },
    azureOid: { type: String, required: false },
    userRoles: [UserRolesSchema],
    active: { type: Boolean, required: false, default: false },
    dateOfBirth: { type: Date, required: false },
    hasExternalCredentials: { type: Boolean, required: false, default: false },
    externalUserID: { type: String, required: false, default: false },
    externalUserPassword: { type: String, required: false, default: false },
    qrCodeToken: { type: String, required: false, default: false },


}).add(authorizationSchema).add(defaultSchema);

UserSchema.index({ firstName: 1  }, { unique: false })
UserSchema.index({ lastName: 1  }, { unique: false })
UserSchema.index({ email: 1  }, { unique: false })


interface UserDocumentBase extends IUser, Document {

}

export type UserDocument = UserDocumentBase;
