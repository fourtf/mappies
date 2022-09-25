import { HandlerContext, Handlers } from "$fresh/server.ts";
import { defaultStorage, isValidId } from "/misc/storage.ts";

export const handler: Handlers = {
  async PUT(req: Request, ctx: HandlerContext): Promise<Response> {
    const { id } = ctx.params;
    const body = await req.json();
    const value = body?.value;

    // validation
    if (!isValidId(id)) return new Response("id not valid", { status: 400 });
    if (typeof value !== "string") {
      return new Response("body.value must be string", { status: 400 });
    }

    // write
    defaultStorage.write(id, value);

    return new Response();
  },
  async GET(_req: Request, ctx: HandlerContext): Promise<Response> {
    const { id } = ctx.params;

    // validation
    if (!isValidId(id)) return new Response("id not valid", { status: 400 });

    // read
    const value = await defaultStorage.read(id);

    return new Response(value);
  },
};
