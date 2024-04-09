import moongoose, { Schema } from "moongoose";
import mongooseAggregatePaginate, {
  aggregatePaginate,
} from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: [true, "Video is very much required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is very much required"],
    },
    title: {
      type: String,
      required: [true, "Title is very much required"],
    },
    description: {
      type: String,
      required: [true, "Title is very much required"],
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);
// Video is name of module
export const Video = moongoose.model("Video", videoSchema);
