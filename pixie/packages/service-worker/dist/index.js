"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerServiceWorker = void 0;
const logger_1 = require("logger");
function registerServiceWorker(scriptURL, scope) {
    return __awaiter(this, void 0, void 0, function* () {
        if ('serviceWorker' in navigator) {
            try {
                const registration = yield navigator.serviceWorker.register(scriptURL, {
                    scope: scope,
                });
                if (registration.installing) {
                    (0, logger_1.log)('Service worker installing');
                }
                else if (registration.waiting) {
                    (0, logger_1.log)('Service worker installed');
                }
                else if (registration.active) {
                    (0, logger_1.log)('Service worker active');
                }
            }
            catch (error) {
                (0, logger_1.log)(`Error Registration failed with ${error}`);
            }
        }
    });
}
exports.registerServiceWorker = registerServiceWorker;
;
