import { Injectable, type NestMiddleware, UnauthorizedException } from "@nestjs/common"
import type { JwtService } from "@nestjs/jwt"
import type { Request, Response, NextFunction } from "express"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return next()
    }

    try {
      const token = authHeader.replace("Bearer ", "")
      const decoded = this.jwtService.verify(token)
      ;(req as any).user = decoded
      next()
    } catch (error) {
      throw new UnauthorizedException("Invalid token")
    }
  }
}
