import { Types } from "mongoose";
import { portfolioModel, PortfolioModel } from "../db/models/portfolio-model";
import {
  InputDTO,
  UpdateInfo,
  SearchInfo,
} from "../interfaces/portfolio-interface";
import { AppError } from "../middlewares/error-handler";
import { deleteImage } from "../utils";
import { PortfolioType } from "../db/schemas/portfolio-schema";

class PortfolioService {
  constructor(private portfolioModel: PortfolioModel) {
    this.portfolioModel = portfolioModel;
  }
  async addPortfolio(portInfo: InputDTO) {
    const {
      authorId,
      author,
      authorImg,
      title,
      description,
      skills,
      content,
      contentText,
      thumbnail,
    } = portInfo;
    const newPortInfo = {
      authorId,
      author,
      authorImg,
      title,
      description,
      skills,
      content,
      contentText,
      thumbnail,
    };
    return await this.portfolioModel.create(newPortInfo);
  }

  async getPortfolios(lastId?: string) {
    if (lastId) {
      const portfolios = await this.portfolioModel.findPortfolios(lastId);
      if (!portfolios) {
        throw new AppError(400, "포토폴리오가 존재하지 않습니다.");
      }
      return portfolios;
    }
    const portfolios = await this.portfolioModel.findPortfoliosInit();
    if (!portfolios) {
      throw new AppError(400, "포토폴리오 정보가 없습니다.");
    }
    return portfolios;
  }

  async getPortfolio(portId: string) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new AppError(400, "포토폴리오 정보가 없습니다.");
    }
    return portfolio;
  }

  async getUserPortfolio(userId: string) {
    const portfolio = await this.portfolioModel.findByUserId(userId);
    if (!portfolio) {
      throw new AppError(400, "포토폴리오 정보가 없습니다.");
    }
    return portfolio;
  }

  async getUserScraps(userId: string) {
    const portfolio = await this.portfolioModel.getScrapsByUserId(userId);
    if (!portfolio) {
      throw new AppError(400, "포토폴리오 정보가 없습니다.");
    }
    return portfolio;
  }

  async getPortfoliosBySearch(searchInfo: SearchInfo, page: number) {
    const skills = searchInfo.skills;
    if (typeof skills === "string") {
      searchInfo.skills = [skills];
    }
    const portfolios = await this.portfolioModel.findBySearch(searchInfo, page);
    if (!portfolios) {
      throw new AppError(400, "검색과정에서 문제가 발생하였습니다.");
    }
    return portfolios;
  }

  async setPortfolio(portId: string, userId: string, portInfo: UpdateInfo) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new AppError(400, "포토폴리오 정보가 없습니다.");
    }
    if (!portfolio.authorId.equals(userId)) {
      throw new AppError(
        403,
        "자신의 포토폴리오만 수정 가능합니다.",
        "Forbidden Error"
      );
    }
    return await this.portfolioModel.update(portId, portInfo);
  }

  async setField(
    portId: string,
    userId: string,
    field: string,
    adding: boolean
  ) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new AppError(400, "포토폴리오 정보가 없습니다.");
    }
    if (adding) {
      return await this.portfolioModel.addUserInField(portId, userId, field);
    }
    return await this.portfolioModel.deleteUserInField(portId, userId, field);
  }

  async setPortfolioComment(portId: string, commentId: Types.ObjectId) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new AppError(400, "포토폴리오 정보가 없습니다.");
    }
    return await this.portfolioModel.updateComment(
      portId,
      commentId,
      "$addToSet"
    );
  }

  async deletePortfolioComment(portId: string, commentId: Types.ObjectId) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new AppError(400, "포토폴리오 정보가 없습니다.");
    }
    return await this.portfolioModel.updateComment(portId, commentId, "$pull");
  }

  async deletePortfolio(portId: string, userId: string) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new AppError(400, "포토폴리오 정보가 없습니다.");
    }
    if (!portfolio.authorId.equals(userId)) {
      throw new AppError(
        403,
        "자신의 포토폴리오만 삭제 가능합니다.",
        "Forbidden Error"
      );
    }
    await deleteImage((<PortfolioType>portfolio).thumbnail);
    return await this.portfolioModel.deleteById(portId);
  }
}

const portfolioService = new PortfolioService(portfolioModel);
export { portfolioService };
