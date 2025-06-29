# ApiService

`ApiService` is a lifecycle-managed, modular, and OpenAPI-compliant HTTP service built on top of [`Express`](https://expressjs.com),  
providing structured middleware layering, request/response validation, and standardized error formatting.

## 📦 Installation

This package includes the built dist folder in the repository because there are currently no plans to publish it to the public npm registry.

Consumers are expected to install it directly from GitHub, and the committed output ensures compatibility without requiring local builds.

```bash
npm install github:sudo-von/api#vX.Y.Z
```

## 🚀 Usage

```ts
import express from 'express';
import { ApiService } from "@sudo-von/api";

const app = express();
const api = new ApiService();

try {
  await api.init({
    app,
    apiDoc: "./usage.yaml",
    logger: console.log,
    paths: "./routes",
    port: 3000,
  });
} catch (error) {
  logger.error(error);
  await api.close({ logger });
  process.exit(1);
}
```

## ⚙️ Features

- Built on top of Express.
- Declarative initialization via init().
- Graceful shutdown via close().
- Logger integration for observability.
- Middleware-based request/response handling.
- OpenAPI spec-driven validation.
- Standardized API error formatting.

## 📁 Project Structure

```bash
├── middlewares/                # Core request/response middleware
├── openapi/                    # Middleware related to OpenAPI
├── constants.ts                # Shared constants (status codes, etc.)
├── errors.ts                   # Custom HTTP error classes
├── index.ts                    # Entry point for the package
├── service.ts                  # ApiService class
├── types.ts                    # Type definitions
```