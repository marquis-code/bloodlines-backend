import { type NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";
export declare class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
