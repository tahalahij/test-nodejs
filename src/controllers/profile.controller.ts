import { Request, Response } from "express";
import { Profile, Simulator } from "../models";
import { HTTP_CODE } from "../constants/enums";

export default {
    async getProfiles(req: Request, res: Response): Promise<Response | void> {
        const {
            page,
            pageSize,
        } = req.query;
        const query = Profile.find({})

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
    async createProfile(req: Request, res: Response): Promise<Response | void> {
        const { email, name, nickname } = req.body;

        const data = await Profile.findOneAndUpdate(
            { email, nickname },
            { name },
            {
                new: true, upsert: true
            });
        res.status(HTTP_CODE.CREATED).send({
            success: true,
            data
        });
    },
    async getProfileSimulators(req: Request, res: Response): Promise<Response | void> {
        const { id: profile } = req.params;
        const data = await Simulator.find({ profile }).lean()
            .select('-__v')// exclude  __v
        res.status(HTTP_CODE.OK).send({
            success: true,
            data
        });
    }
}
