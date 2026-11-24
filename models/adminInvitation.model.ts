import mongoose, { Document, Schema, Types } from "mongoose";


export interface IAdminInvitation extends Document {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  role: "admin";
  temporaryPasswordHash: string | null;
  invitationOtpHash: string;
  expiresAt: Date;
  attempts: number;
  setupTokenHash: string | null;
  setupExpiresAt: Date | null;
  verifiedAt: Date | null;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const adminInvitationSchema = new Schema<IAdminInvitation>(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      required: true,
    },

    temporaryPasswordHash: {
      type: String,
      default: null,
      select: false,
    },
    invitationOtpHash: {
      type: String,
      required: true,
      select: false,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },

    setupTokenHash: {
      type: String,
      default: null,
      select: false,
    },
    setupExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

adminInvitationSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

adminInvitationSchema.index(
  { email: 1 },
  { unique: true }
);

const AdminInvitation = mongoose.models.AdminInvitation || mongoose.model<IAdminInvitation>(
    "AdminInvitation",
    adminInvitationSchema
  );

export default AdminInvitation;
