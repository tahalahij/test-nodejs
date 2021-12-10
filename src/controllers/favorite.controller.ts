import { Request, Response } from "express";
import { Favorite } from "../models";
import { HTTP_CODE, MESSAGES } from "../constants/enums";


export default {
    async getFavorites(req: Request, res: Response): Promise<Response | void> {
        const {
            page,
            pageSize,
        } = req.query;
        const query = Favorite.find({})

        if (page && pageSize) {
            query.skip(Number(pageSize) * (Number(page) - 1))
                .limit(Number(pageSize))
                .select('-__v')// exclude  __v
        }

        const data = await query.lean();

        res.status(HTTP_CODE.OK).send({
            success: true,
            data
        });
    },
    async getFavorite(req: Request, res: Response): Promise<Response | void> {
        const { id } = req.params
        const data = await Favorite.findById(id).lean()
            .select('-__v')// exclude  __v;
        if (data) {
            return res.status(HTTP_CODE.OK).send({
                success: true,
                data
            });
        } else {
            return res.status(HTTP_CODE.NOT_FOUND).send({
                success: false,
                message: MESSAGES.FAVORITE_NOT_FOUND
            });
        }
    }
}
