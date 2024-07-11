// import Vue from 'vue';
//
// const WebSocketPlugin = {
//     install(Vue, options) {
//         const ws = new WebSocket('');
//
//         Vue.prototype.$websocket = {
//             send(message) {
//                 if (ws.readyState === WebSocket.OPEN) {
//                     ws.send(message);
//                 }
//             },
//             onMessage(callback) {
//                 ws.onmessage = callback;
//             },
//             onOpen(callback) {
//                 ws.onopen = callback;
//             },
//             onClose(callback) {
//                 ws.onclose = callback;
//             },
//             onError(callback) {
//                 ws.onerror = callback;
//             }
//         };
//
//         Vue.mixin({
//             created() {
//                 if (this.$options.websocket) {
//                     this.$websocket.onMessage = this.$options.websocket.onMessage;
//                     this.$websocket.onOpen = this.$options.websocket.onOpen;
//                     this.$websocket.onClose = this.$options.websocket.onClose;
//                     this.$websocket.onError = this.$options.websocket.onError;
//                 }
//             },
//             beforeDestroy() {
//                 if (this.$options.websocket) {
//                     this.$websocket.onMessage = null;
//                     this.$websocket.onOpen = null;
//                     this.$websocket.onClose = null;
//                     this.$websocket.onError = null;
//                 }
//             }
//         });
//     }
// };
//
// export default WebSocketPlugin;
