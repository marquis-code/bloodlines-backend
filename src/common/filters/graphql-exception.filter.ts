import { Catch, type ArgumentsHost } from "@nestjs/common"
import type { GqlExceptionFilter } from "@nestjs/graphql"

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception.response) {
      return {
        message: exception.response.message || exception.message,
        statusCode: exception.response.statusCode || 500,
      }
    }

    return {
      message: exception.message || "Internal server error",
      statusCode: 500,
    }
  }
}
