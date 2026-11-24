import mongoose, { Schema, Document, Types } from "mongoose";


export interface IMailingList extends Document {
  _id: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}


const mailingListSchema = new Schema<IMailingList>(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
      maxlength: 254,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
  },
  { timestamps: true }
);

const MailingList = mongoose.models.MailingList || mongoose.model<IMailingList>("MailingList", mailingListSchema);
export default MailingList