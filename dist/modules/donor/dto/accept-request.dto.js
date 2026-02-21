"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptRequestInput = void 0;
const swagger_1 = require("@nestjs/swagger");
class AcceptRequestInput {
}
exports.AcceptRequestInput = AcceptRequestInput;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "req_123" }),
    __metadata("design:type", String)
], AcceptRequestInput.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6.5244, required: false }),
    __metadata("design:type", Number)
], AcceptRequestInput.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3.3792, required: false }),
    __metadata("design:type", Number)
], AcceptRequestInput.prototype, "longitude", void 0);
//# sourceMappingURL=accept-request.dto.js.map