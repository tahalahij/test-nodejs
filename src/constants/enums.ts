export enum HTTP_CODE {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export enum MESSAGES {
    UNKNOWN_INTERNAL_ERROR = 'Unknown Server Error',
    FAVORITE_NOT_FOUND = 'Favorite not found',
    PROFILE_NOT_FOUND = 'Profile not found',
}

export enum LOG_LABELS {
    MONGODB_CONNECTION = 'MONGODB_CONNECTION',
    UNHANDLED_ERROR = 'UNHANDLED_ERROR',
    SEED = 'SEED',
    START_APP = 'START_APP',
}
