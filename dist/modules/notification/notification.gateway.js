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
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let NotificationGateway = class NotificationGateway {
    constructor() {
        this.donationProgressSubject = new rxjs_1.Subject();
        this.bloodRequestSubject = new rxjs_1.Subject();
        this.broadcastSubject = new rxjs_1.Subject();
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    subscribeDonationProgress(client, requestId) {
        client.join(`donation-${requestId}`);
    }
    subscribeBloodRequests(client, userId) {
        client.join(`user-${userId}`);
    }
    broadcastDonationAccepted(data) {
        this.server.emit("donation-accepted", data);
        this.donationProgressSubject.next(data);
    }
    broadcastProgressUpdate(data) {
        this.server.to(`donation-${data.requestId}`).emit("progress-update", data);
        this.donationProgressSubject.next(data);
    }
    broadcastBloodRequest(data, userId) {
        if (userId) {
            this.server.to(`user-${userId}`).emit("blood-request", data);
            this.bloodRequestSubject.next(Object.assign(Object.assign({}, data), { userId }));
        }
        else {
            this.server.emit("blood-request", data);
            this.bloodRequestSubject.next(data);
        }
    }
    broadcastMessage(data) {
        this.server.emit("broadcast", data);
        this.broadcastSubject.next(data);
    }
    getDonationProgressStream(requestId) {
        return this.donationProgressSubject.asObservable().pipe((0, operators_1.filter)(data => data.requestId === requestId), (0, operators_1.map)(data => data));
    }
    getBloodRequestStream(userId) {
        return this.bloodRequestSubject.asObservable().pipe((0, operators_1.filter)(data => !data.userId || data.userId === userId), (0, operators_1.map)(data => data));
    }
    getBroadcastStream() {
        return this.broadcastSubject.asObservable();
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Function)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("subscribe-donation-progress"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, String]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "subscribeDonationProgress", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("subscribe-blood-requests"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, String]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "subscribeBloodRequests", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    (0, common_1.Injectable)()
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map