import { NextFunction, Request, Response } from 'express'

type asyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<unknown>

export type { asyncHandler }
