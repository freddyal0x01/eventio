import { ourFileRouter } from "src/uploadthing/uploadthing-router";
import { createNextPageApiHandler } from "uploadthing/next-legacy";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;
