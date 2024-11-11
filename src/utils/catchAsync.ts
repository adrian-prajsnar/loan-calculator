import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../types/AsyncHandler'

const asyncMiddleware = (fn: asyncHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next)
    }
}

export default asyncMiddleware
