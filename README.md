# Enhancements
- Added winston logger to store the logs, and we can add `winston-elasticsearch-apm` as a `transport` to store the errors in `APM` and have errors in a dashboard
- Production ready code should have no `console.log()` as it's a bad practice as it has negative performance effect, and we should use `monitoring solutions` such as `APM` for metrics and errors, and store debugging logs in `filebeat` and use `Kibana` for indexing and performing search on them     
- It's a good practice to have a `index.ts` file to shorten the imports
- Added eslint and prettier to lint the code and all developers have the same code style
- Added eslint scripts in package.json
- `Favorite` and `Simulator` model needed to have reference to `Profile`, by storing `id` as string we won't be using the mongodb feature to populate function and much more  
- `Favorite` should store the  favorite1, favorite2, favorite3 in an array name `favorites` as they are just 3 strings with same type, although i think we could have more sophisticated db model structure :)
- Models needed some validations and restrictions in Schema
- Using export default in models for easier imports
- Added interfaces for models to use the full power of typescript and avoid further problems with it
- Spelling error `prefered_cryptocurrency`=> `preferred_cryptocurrency`
- I guess the field `euros` in `Simulator` model is redundant(, or it's the result of multiplying quantity and price?)
- Seed was trying to create a Simulator with fields `start_date, check_date, Crypto_price_check, Crypto_price_start` that didn't exist in model so removed them!
- Added `connection` directory for db connection, added mongodb connection file to use one `1 connection` for the app as it's the best practice to use existing connection (Using singleton for mongoose in models)
- It's better to create the db url in the app than to get it all from the env (more flexible)
- Variable names and field names didn't follow the same `naming convention` for example we had both `checkEnv` and `preferred_cryptocurrency` so choose the `camelCase` naming convention and applied it to entire project
- `checkEnv` function if statements needed to be updated as the value read from env should be compared with `undefined` as they may have the value of 0 or false 
- Added enums and constants for modifiability and consistency 
- Changed the seed to a named function, so we could write unit test for it
- This app without authentication is Not production ready but as you asked I've ignored authorization
- App should have rate limit for routes, the foundation of for that could be having authentication, so I've ignored this one too 
- We should avoid `var` to declare variables and based on the whether we intend to change it or not use `let` or `const`
- Added the `success` field to responses so client to check that field first then use the `data` and if there is a problem could send `success = false` and `message` field would contain details about the error that client can show to user
- Added different status codes for different scenarios such as `NOT_FOUND` or `CREATED`, ...
- Added post man collection in the root of project for testing: `test_nodejs.postman_collection`
## Routes
- Added `/v1` to route, so we could migrate to v2 without breaking backward compatibility with v1, and v1 users could still work with the app without any force update
- Added `Pagination` to GET routes cause fetching all docs at once would make the `response time` of route extremely high
- Cluster routes and use extends
- Use `lean()` for db calls that we don't intent to alter data
- It's a good practice to divide the logic to `routes`, `controllers` and `services` that the calling flow be `routes` => `controllers` => `services` and data is returned in this order `services` => `controllers` => `routes`, but in this app the logic is so little we can skip service layers
- We are sending all models fields to client if we need to skip some fields we can add transformer layer just before calling `res.send()`, but in this app it's not necessary yet
- Added a validation layer using `Joi validator` so we won't get invalid data from clients, used `express-validation` to validate requests
- Added healthCheck route, so we would know if server is up and running
- In order to validation objectId in params, added `joi-objectid` and as it doesn't have the type script definitions i added `custom.d.ts` file in `types` directory
### Favorite routes
- Changed the `/favorite` to `/favorites` as it's the best practice for REST API to use plural nouns 
- In `/favorites` routes moved `profile_id` from params to query as it's `/favorites` route, and the param would indicate the favourite's id not profile id, so changed the second route to accept favorite's id as param to get single favorite
### Profile routes
- Changed the `/profile` to `/profiles` as it's the best practice for REST API to use plural nouns
- In the POST profile route instead of having to 2 db calls we could just use `findOneAndUpdate` with `upsert:true` option so `if no document matches filter, MongoDB will insert one by combining filter and update` and `new:true` option to return the new document after update
### Simulator routes
- Changed the `/simulator` to `/simulators` as it's the best practice for REST API to use plural nouns 
- No need to create a new express server, we should use the existing one 
- Moved `/simulator` route to profile routes, the  route `/profiles/:id/simulators` will return simulators related to profile with `id` specified as param
- Route POST `/simulator/:profile_id` route  doesn't need the param as it can be in body, changed the route to POST `/simulators`
- Added the index for field `profile` as we are going to query based on that a lot
