import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";

const env = Deno.env.toObject();
const PORT = parseInt(env.PORT) || 4000;
const HOST = env.HOST || "127.0.0.1";


import router from "./routes/routes.ts";
import logger from './middlewares/logger.ts';
import notFound from './middlewares/notFound.ts';

const app = new Application();

// order of execution is important;
app.use(logger.logger);
app.use(logger.responseTime);

// Disable CORS
app.use( ({request, response}: { request: any; response: any }, next: Function) => {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
})

//Remainder App Routes
app.use(router.routes());
app.use(router.allowedMethods());

// 404 page
app.use(notFound);

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`Listening on: ${port}`);
});

// await app.listen(`${HOST}:${PORT}`);
await app.listen({ port: PORT });