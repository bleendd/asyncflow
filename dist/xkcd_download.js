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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const asyncflow_1 = require("./asyncflow");
const URL_TEMPLATE = "https://xkcd.com/%s/info.0.json";
class ComicTaskFactory {
    make(line) {
        return new ComicTask(line);
    }
}
class ComicTask {
    constructor(id) {
        this.id = id;
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${URL_TEMPLATE.replace('%s', this.id)}`);
                this.comic = response.data;
            }
            catch (err) {
                this.error = err;
            }
        });
    }
    print() {
        if (this.error) {
            console.error(this.error.message);
        }
        else if (this.comic) {
            console.log(JSON.stringify(this.comic, null, 2));
        }
    }
}
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const factory = new ComicTaskFactory();
        yield (0, asyncflow_1.run)(factory);
    });
})();
