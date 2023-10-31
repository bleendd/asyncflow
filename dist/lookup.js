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
const asyncflow_1 = require("./asyncflow");
const dns_1 = __importDefault(require("dns"));
const util_1 = __importDefault(require("util"));
const resolveNs = util_1.default.promisify(dns_1.default.resolveNs);
class LookupFactory {
    make(line) {
        return new Lookup(line);
    }
}
class Lookup {
    constructor(name) {
        this.name = name;
        this.state = 'other';
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nameservers = yield resolveNs(this.name);
                if (nameservers.some(ns => ns.endsWith('.ns.cloudflare.com'))) {
                    this.state = 'cloudflare';
                }
            }
            catch (err) {
                this.state = 'error';
            }
        });
    }
    print() {
        console.log(`${this.name}: ${this.state}`);
    }
}
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const factory = new LookupFactory();
        yield (0, asyncflow_1.run)(factory);
    });
})();
