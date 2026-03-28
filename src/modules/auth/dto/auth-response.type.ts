import { ApiProperty } from "@nestjs/swagger"

export class AuthResponse {
  @ApiProperty({ example: "ey..." })
  accessToken: string

  @ApiProperty({ example: "Login successful" })
  message: string
}

export class MessageResponse {
  @ApiProperty({ example: "Operation successful" })
  message: string
}

