import { type NestMiddleware } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import type { Request, Response, NextFunction } from "express";
export declare class AuthMiddleware implements NestMiddleware {
    private jwtService;
    constructor(jwtService: JwtService);
    use(req: Request, res: Response, next: NextFunction): void;
}
