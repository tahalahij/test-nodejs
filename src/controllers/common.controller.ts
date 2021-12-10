import mongoose from '../connections/mongodb';
import { Request, Response } from 'express';
import { HTTP_CODE } from '../constants/enums';
import moment from 'moment';

export default {
    async healthCheck(req: Request, res: Response): Promise<Response | void> {
        const { mode } = req.query;
        if (mode === 'simple') {
            return res.status(HTTP_CODE.OK).send({ data: { success: true } });
        } else {
            const mongodbConnection = mongoose.connection.readyState;
            const status =
                mongodbConnection
                    ? HTTP_CODE.OK
                    : HTTP_CODE.SERVICE_UNAVAILABLE;
            return res.status(status).send({
                data: {
                    upTime: moment.utc(process.uptime() * 1000).format('HH:mm:ss'),
                    mongodbConnection,
                },
            });
        }
    }
}

