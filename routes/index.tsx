import { Handlers, PageProps } from "$fresh/server.ts";
import DocsList from "../islands/DocsList.tsx";
import { defaultStorage } from "../misc/storage.ts";

interface Data {
  docs: string[];
}

export const handler: Handlers<Data, Record<never, never>> = {
  async GET(_req, ctx) {
    const docs = await defaultStorage.list();
    return ctx.render({ ...ctx.state, docs });
  },
};

export default function Home(props: PageProps<Data>) {
  return <DocsList docs={props.data.docs} />;
}
