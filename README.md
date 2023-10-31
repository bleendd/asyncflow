# asyncflow Solution

Asyncflow is a simple and efficient library for processing tasks concurrently in Node. It allows you to easily create, process, and print tasks in parallel, taking advantage of Nodes's asynchronous and non-blocking nature.

## Features

- **Concurrent Processing**: Efficiently handles multiple tasks at once.
- **Modular Design**: Easily add new tasks without altering the core logic.
- **Type Safety**: Leveraging TypeScript for robust and error-free code.

## Usage

To use asyncflow, you need to implement two interfaces:

1. `Factory`: This interface is responsible for creating new Task instances from input lines.
2. `Task`: This interface represents the tasks that will be processed concurrently. It includes methods for processing and printing the results.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- [TypeScript](https://www.typescriptlang.org/)
- A package manager like [npm](https://www.npmjs.com/) (comes bundled with Node.js)

## Getting Started

### Running

1. Npm install
   ```bash
   npm install
   ```
2. Compile
   ```bash
   npx tsc
   ```

### Lookup Example

```bash
node dist/lookup.js < records
```

### XKCD Downlaoder Example

```bash
seq 5 | node dist/xkcd_download.js
```

Where seq 5 generates sequential numbers 1 to 5 and feeds them as standard output to the asyncflow process.
