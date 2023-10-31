export interface Factory {
    make(line: string): Task;
}

export interface Task {
    process(): Promise<void>;
    print(): void;
}

export async function run(f: Factory): Promise<void> {
    const tasks: Task[] = [];
    let inputData = '';

    process.stdin.on('data', (chunk) => {
        inputData += chunk;
    });

    process.stdin.on('end', async () => {
        const lines = inputData.split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
            tasks.push(f.make(line.trim()));
        }

        await Promise.all(tasks.map(task => task.process()));

        for (const task of tasks) {
            task.print();
        }
    });
}
