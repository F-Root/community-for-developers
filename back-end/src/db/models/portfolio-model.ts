import { model, Types, Document } from "mongoose";
import { PortfolioSchema, PortfolioType } from "../schemas/portfolio-schema";
import { getSearchCondition } from "../../utils/search-condition";
import {
  UpdateInfo,
  InputDTO,
  SearchInfo,
} from "../../interfaces/portfolio-interface";

const Portfolio = model<PortfolioType & Document>(
  "portofolios",
  PortfolioSchema
);
export class PortfolioModel {
  async findById(portId: string) {
    return await Portfolio.findOne({ _id: portId }).populate({
      path: "comments",
      populate: {
        path: "author",
        select: "nickname",
      },
    });
  }

  async findByUserId(userId: string) {
    return await Portfolio.find({ authorId: userId });
  }

  async getCountByUserId(userId: string) {
    return await Portfolio.find({ authorId: userId }).count();
  }

  async getScrapsCountByUserId(userId: string) {
    return await Portfolio.find({ scraps: new Types.ObjectId(userId) }).count();
  }

  async getScrapsByUserId(userId: string) {
    return await Portfolio.find({
      scraps: new Types.ObjectId(userId),
    }).populate({ path: "scraps", select: ["nickname", "imgUrl"] });
  }

  async findPortfoliosInit() {
    return await Portfolio.find({}).sort({ _id: -1 }).limit(12);
  }

  async findPortfolios(lastId: string) {
    const id = new Types.ObjectId(lastId);
    return await Portfolio.find({ _id: { $lt: id } })
      .sort({ _id: -1 })
      .limit(12);
  }

  async findBySearch(searchInfo: SearchInfo, page: number) {
    const searchCondition = getSearchCondition(searchInfo, page);
    return await Portfolio.aggregate(searchCondition);
  }

  async create(portInfo: InputDTO) {
    return await Portfolio.create(portInfo);
  }

  async update(portId: string, update: UpdateInfo) {
    const filter = { _id: portId };
    const option = { returnOriginal: false };

    return await Portfolio.findOneAndUpdate(filter, update, option);
  }

  async addUserInField(portId: string, userId: string, field: string) {
    const filter = { _id: portId };
    const option = { returnOriginal: false };
    return await Portfolio.findOneAndUpdate(
      filter,
      { $addToSet: { [field]: userId } },
      option
    );
  }

  async deleteUserInField(portId: string, userId: string, field: string) {
    const filter = { _id: portId };
    const option = { returnOriginal: false };
    return await Portfolio.findOneAndUpdate(
      filter,
      { $pull: { [field]: userId } },
      option
    );
  }

  async updateComment(
    portId: string,
    commentId: Types.ObjectId,
    setType: string
  ) {
    const filter = { _id: portId };
    const option = { returnOriginal: false };
    return await Portfolio.findOneAndUpdate(
      filter,
      { [setType]: { comments: commentId } },
      option
    );
  }

  async deleteById(portId: string) {
    return await Portfolio.findOneAndDelete({ _id: portId });
  }
}

const portfolioModel = new PortfolioModel();

export { portfolioModel };
