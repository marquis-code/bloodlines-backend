import { type ArgumentsHost } from "@nestjs/common";
import type { GqlExceptionFilter } from "@nestjs/graphql";
export declare class GraphQLExceptionFilter implements GqlExceptionFilter {
    catch(exception: any, host: ArgumentsHost): {
        message: any;
        statusCode: any;
    };
}
