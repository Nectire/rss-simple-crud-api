import 'dotenv/config';
import http from 'http';
import { Methods, StatusCode, StatusMessage } from './enums';
import { UserController } from './controllers/userController';
import { PageNotFoundError } from './errors';

export function createServer(portParam = 3000) {
  const hostname = process.env.LOCAL;
  const port = process.env.PORT || portParam;

  const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    const [api, users, id] = url!.split('/').splice(1);

    if (!url?.includes('api/users')) {
      res
        .writeHead(StatusCode.NotFound, StatusMessage.NotFound, {
          'Content-Type': 'text/plain'
        })
        .end(new PageNotFoundError().message);
      return;
    }

    if (method === Methods.GET && users === 'users' && !id) {
      await new UserController().getUsers(req, res);
      return;
    }

    if (method === Methods.GET && users === 'users' && id) {
      await new UserController().getUser(id, res);
      return;
    }

    if (method === Methods.POST && users === 'users') {
      await new UserController().createUser(req, res);
      return;
    }

    if (method === Methods.PUT && users === 'users' && id) {
      await new UserController().updateUser(id, req, res);
      return;
    }

    if (method === Methods.DELETE && users === 'users' && id) {
      await new UserController().deleteUser(id, res);
      return;
    }

  });

  server.listen(port as number, hostname, undefined, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Worker ${process.pid} started\n`);
  });
  return server
}