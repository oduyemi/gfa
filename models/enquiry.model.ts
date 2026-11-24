import mongoose, { Schema, type Document, type Model, Types } from "mongoose";


export enum EnquiryService {
    GENERAL = "General Enquiry",
    DIGITAL_CREATION = "Digital Creation",
    DIGITAL_EXECUTION = "Digital Execution",
    VIRTUAL_ASSISTANCE = "Managed Virtual Assistance",
}
  
export enum GeneralServiceInterest {
    DIGITAL_CREATION = "Digital Creation",
    DIGITAL_EXECUTION = "Digital Execution",
    VIRTUAL_ASSISTANCE = "Managed Virtual Assistance",
    MULTIPLE = "Multiple services",
    UNSURE = "I'm not sure yet",
}
  

export enum EnquiryStatus {
  PENDING = "pending",
  TREATED = "treated",
}


export enum CreationService {
  GRAPHIC_DESIGN = "Graphic design & branding",
  WEB_DEVELOPMENT = "Web design & development",
  VIDEO_EDITING = "Video editing",
  CONTENT_CREATION = "Content creation & writing",
  PROVIDER_SOURCING = "Sourcing service providers",
  OTHER = "Something else",
}


export enum ExecutionGoal {
  BRAND_AWARENESS = "Increase brand awareness",
  LEAD_GENERATION = "Generate leads",
  SALES = "Increase sales",
  ONLINE_PRESENCE = "Improve online presence",
  MARKETING_STRATEGY = "Build a marketing strategy",
  AUTOMATION = "Automate business processes",
  OTHER = "Other",
}

export enum MarketingChannel {
  INSTAGRAM = "Instagram",
  FACEBOOK = "Facebook",
  GOOGLE = "Google",
  YOUTUBE = "YouTube",
  TIKTOK = "TikTok",
  LINKEDIN = "LinkedIn",
  WEBSITE_SEO = "Website / SEO",
  NONE = "Not currently using any",
}

export enum BusinessStage {
  IDEA = "Idea / pre-launch",
  NEW_BUSINESS = "New business",
  ESTABLISHED = "Established business",
  GROWING = "Growing / scaling",
  REBRANDING = "Rebranding / repositioning",
}


export enum SupportTask {
  ADMIN = "Administrative support & data entry",
  EMAIL = "Email management",
  CALENDAR = "Calendar & appointment management",
  SOCIAL_MEDIA = "Social media scheduling",
  CUSTOMER_SERVICE = "Customer service",
  EVENTS = "Event coordination",
  RESEARCH = "Research",
  REPORTS = "Reports & documentation",
  OTHER = "Other",
}

export enum SupportType {
  HOURLY = "Hourly",
  PACKAGE = "Package",
  NOT_SURE = "Not sure",
}

export enum SupportHours {
  UP_TO_10 = "Up to 10 hours",
  HOURS_10 = "10 hours",
  HOURS_20 = "20 hours",
  HOURS_30 = "30 hours",
  OVER_30 = "More than 30 hours",
  FLEXIBLE = "Flexible / unsure",
}

export interface IEnquiry extends Document {
  _id: Types.ObjectId;

  fullname: string;
  email: string;
  phone: string;
  company?: string;
  service: EnquiryService;
  subject?: string;
  message: string;
  budget?: string;
  timeline?: string;
  serviceInterest?: GeneralServiceInterest;


  // Digital Creation
  creationServices?: CreationService[];
  projectName?: string;

  // Digital Execution
  goals?: ExecutionGoal[];
  channels?: MarketingChannel[];
  businessStage?: BusinessStage;

  // Managed Virtual Assistance
  supportTasks?: SupportTask[];
  supportType?: SupportType;
  hours?: SupportHours;

  status: EnquiryStatus;
  treatedAt?: Date;
  treatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (phone: string) => {
          const digits = phone.replace(/\D/g, "");
          return digits.length >= 7 && digits.length <= 15;
        },
        message: "Invalid phone number format",
      },
    },

    company: {
      type: String,
      trim: true,
    },

    service: {
      type: String,
      enum: Object.values(EnquiryService),
      required: true,
    },

    subject: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },

    budget: {
      type: String,
      trim: true,
    },

    timeline: {
      type: String,
      trim: true,
    },

    serviceInterest: {
        type: String,
        enum: Object.values(GeneralServiceInterest),
      },
      
    // Digital Creation
    creationServices: {
      type: [{
        type: String,
        enum: Object.values(CreationService),
      }],
      default: undefined,
    },

    projectName: {
      type: String,
      trim: true,
    },

    // Digital Execution
    goals: {
      type: [{
        type: String,
        enum: Object.values(ExecutionGoal),
      }],
      default: undefined,
    },

    channels: {
      type: [{
        type: String,
        enum: Object.values(MarketingChannel),
      }],
      default: undefined,
    },

    businessStage: {
      type: String,
      enum: Object.values(BusinessStage),
    },

    // Managed Virtual Assistance
    supportTasks: {
      type: [{
        type: String,
        enum: Object.values(SupportTask),
      }],
      default: undefined,
    },

    supportType: {
      type: String,
      enum: Object.values(SupportType),
    },

    hours: {
      type: String,
      enum: Object.values(SupportHours),
    },

    // Enquiry management
    status: {
      type: String,
      enum: Object.values(EnquiryStatus),
      default: EnquiryStatus.PENDING,
    },

    treatedAt: {
      type: Date,
    },

    treatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


enquirySchema.pre("validate", function () {
  // General enquiries must specify an area of interest.
  if (this.service === EnquiryService.GENERAL && !this.serviceInterest) {
    this.invalidate(
      "serviceInterest",
      "Please select what you're interested in.",
    );
    return;
  }

  const isGeneral = this.service === EnquiryService.GENERAL;

  const interest = isGeneral ? this.serviceInterest : this.service;

  const requiresCreation =
    interest === EnquiryService.DIGITAL_CREATION ||
    interest === GeneralServiceInterest.DIGITAL_CREATION ||
    interest === GeneralServiceInterest.MULTIPLE;

  const requiresExecution =
    interest === EnquiryService.DIGITAL_EXECUTION ||
    interest === GeneralServiceInterest.DIGITAL_EXECUTION ||
    interest === GeneralServiceInterest.MULTIPLE;

  const requiresAssistance =
    interest === EnquiryService.VIRTUAL_ASSISTANCE ||
    interest === GeneralServiceInterest.VIRTUAL_ASSISTANCE ||
    interest === GeneralServiceInterest.MULTIPLE;

  // Digital Creation
  if (requiresCreation && !this.creationServices?.length) {
    this.invalidate(
      "creationServices",
      "Please select at least one creation service.",
    );
  }

  // Digital Execution
  if (requiresExecution) {
    if (!this.goals?.length) {
      this.invalidate(
        "goals",
        "Please select at least one business goal.",
      );
    }

    if (!this.channels?.length) {
      this.invalidate(
        "channels",
        "Please select at least one marketing channel.",
      );
    }

    if (!this.businessStage) {
      this.invalidate(
        "businessStage",
        "Business stage is required.",
      );
    }
  }

  // Managed Virtual Assistance
  if (requiresAssistance) {
    if (!this.supportTasks?.length) {
      this.invalidate(
        "supportTasks",
        "Please select at least one support task.",
      );
    }

    if (!this.supportType) {
      this.invalidate(
        "supportType",
        "Support arrangement is required.",
      );
    }
  }
});
  


const Enquiry: Model<IEnquiry> = mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", enquirySchema);
export default Enquiry;
