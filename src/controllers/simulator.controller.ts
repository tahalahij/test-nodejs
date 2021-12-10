import { Request, Response } from "express";
import { Profile, Simulator } from "../models";
import { HTTP_CODE, MESSAGES } from "../constants/enums";

export default {
    async getSimulators(req: Request, res: Response): Promise<Response | void> {
        const {
            page,
            pageSize,
        } = req.query;
        const query = Simulator.find({})

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
    async createSimulator(req: Request, res: Response): Promise<Response | void> {
        const profileExists = await Profile.exists({ _id: req.body.profile })
        if (!profileExists) {
            res.status(HTTP_CODE.NOT_FOUND).send({
                success: false,
                message: MESSAGES.PROFILE_NOT_FOUND
            });
        }
        const data = await Simulator.create(req.body);
        res.status(HTTP_CODE.CREATED).send({
            success: true,
            data
        });
    }
}
