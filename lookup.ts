import { run, Factory, Task } from './asyncflow';
import dns from 'dns';
import util from 'util';

const resolveNs = util.promisify(dns.resolveNs);

class LookupFactory implements Factory {
    make(line: string): Task {
        return new Lookup(line);
    }
}

class Lookup implements Task {
    private state: 'other' | 'error' | 'cloudflare' = 'other';

    constructor(private name: string) {}

    async process(): Promise<void> {
        try {
            const nameservers = await resolveNs(this.name);
            if (nameservers.some(ns => ns.endsWith('.ns.cloudflare.com'))) {
                this.state = 'cloudflare';
            }
        } catch (err) {
            this.state = 'error';
        }
    }

    print(): void {
        console.log(`${this.name}: ${this.state}`);
    }
}

(async function main() {
    const factory = new LookupFactory();
    await run(factory);
})();