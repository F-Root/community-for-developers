import { Schema, Document, Types } from "mongoose";
export interface PortfolioType extends Document {
  authorId: Types.ObjectId;
  author: string;
  authorImg: string;
  title: string;
  description: string;
  skills: string;
  content: string;
  contentText: string;
  thumbnail: string;
  scraps: Types.ObjectId[];
  recommends: Types.ObjectId[];
  comments: Types.ObjectId[];
}

const PortfolioSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorImg: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    contentText: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: false,
      default: "",
    },
    scraps: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false,
      },
    ],
    recommends: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
        required: false,
      },
    ],
  },
  {
    collection: "portfolios",
    timestamps: true,
  }
);
export { PortfolioSchema };
