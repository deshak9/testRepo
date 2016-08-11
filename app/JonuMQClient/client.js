"use strict";
var Observable_1 = require('rxjs/Observable');
var io = require('socket.io-client');
var ChatService = (function () {
    function ChatService() {
        this.url = 'http://localhost:3000';
        this.socket = io();
    }
    ChatService.prototype.sendMessage = function (message) {
        this.socket.emit('add-message', message);
    };
    ChatService.prototype.getMessages = function () {
        var observable = new Observable_1.Observable(function (observer) {
            //this.socket = io();
            /*this.socket.on('message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };*/
        });
        return observable;
    };
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=client.js.map