import { createMultiServer } from "./createMultiServer";
import { createServer } from "./createServer";

if (process.env.MULTI) {
  createMultiServer();
} else {
  createServer();
}