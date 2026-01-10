import { Types, HydratedDocument } from "mongoose";
import { BloodRequest } from "../schema/blood-request.schema";
import { User } from "../../user/schemas/user.schema";
export interface BloodRequestWithCreatedBy extends Omit<BloodRequest, 'createdBy'> {
    _id: Types.ObjectId;
    createdBy: HydratedDocument<User>;
}
export interface BloodRequestFullyPopulated extends Omit<BloodRequest, 'createdBy' | 'assignedDonors'> {
    _id: Types.ObjectId;
    createdBy: HydratedDocument<User>;
    assignedDonors?: HydratedDocument<User>[];
}
