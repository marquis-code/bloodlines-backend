"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let GraphQLExceptionFilter = class GraphQLExceptionFilter {
    catch(exception, host) {
        if (exception.response) {
            return {
                message: exception.response.message || exception.message,
                statusCode: exception.response.statusCode || 500,
            };
        }
        return {
            message: exception.message || "Internal server error",
            statusCode: 500,
        };
    }
};
exports.GraphQLExceptionFilter = GraphQLExceptionFilter;
exports.GraphQLExceptionFilter = GraphQLExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GraphQLExceptionFilter);
//# sourceMappingURL=graphql-exception.filter.js.map