import { Profile, Simulator, Favorite } from "../models";
import Logger from "../utils/logger";

const seed = async () => {
    const profileId = '6093abb3dfd9da1deeae56f2'; // i suppose we use this id in other environments too so it has to be hard coded, if not this is irrelevant and we can use the _id returned from creating the first Profile
    await Promise.all([ // just for concurrency
        Profile.create({
            _id: profileId,
            name: 'name',
            nickname: 'nickname',
            email: 'email',
            divisa: 'divisa',
            capital: 123,
            preferredCryptocurrency: 'preferredCryptocurrency',
        }),
        Simulator.create({
            profile: profileId,
            dateRecorded: new Date(),
            cryptocurrency: 'BNB',
            euros: 6000,
            price: 600,
            quantity: 10,
        }),
        Favorite.create({
            profile: profileId,
            name: 'favorite',
            favorites: ['favorite1', 'favorite2', 'favorite3']
        })
    ]);
}
seed().then(() => Logger.info(Logger.labels.SEED, 'Seed successful'))
    .catch(e => Logger.info(Logger.labels.SEED, 'Seed failed', e))
