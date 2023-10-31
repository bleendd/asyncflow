import axios from 'axios';
import { run, Factory, Task } from './asyncflow';

const URL_TEMPLATE = "https://xkcd.com/%s/info.0.json";

class ComicTaskFactory implements Factory {
    make(line: string): Task {
        return new ComicTask(line);
    }
}

class ComicTask implements Task {
    private comic?: Comic;
    private error?: Error;

    constructor(private id: string) {}

    async process(): Promise<void> {
        try {
            const response = await axios.get<Comic>(`${URL_TEMPLATE.replace('%s', this.id)}`);
            this.comic = response.data;
        } catch (err) {
            this.error = err as Error;
        }
    }

    print(): void {
        if (this.error) {
            console.error(this.error.message);
        } else if (this.comic) {
            console.log(JSON.stringify(this.comic, null, 2));
        }
    }
}

interface Comic {
    transcript: string;
    img: string;
    title: string;
    safe_title: string;
    num: number;
    day: string;
    month: string;
    year: string;
}

(async function main() {
    const factory = new ComicTaskFactory();
    await run(factory);
})();