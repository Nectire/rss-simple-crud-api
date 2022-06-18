import cluster from 'cluster';
import {cpus} from 'os';
import { createServer } from './createServer';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  createServer();
}