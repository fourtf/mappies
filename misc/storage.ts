export const isValidId = (id: string) => /^[a-zA-Z0-9-_]+$/.test(id);
export interface Storage {
  read(id: string): Promise<string>;
  write(id: string, data: string): Promise<void>;
  list(): Promise<string[]>;
}

const fsBase = "./data";
const fsPath = (id: string) => `${fsBase}/${id}`;

export function fsStorage(): Storage {
  Deno.mkdirSync(fsBase, { recursive: true });

  return {
    async read(id) {
      return await Deno.readTextFile(fsPath(id));
    },
    async write(id, data) {
      await Deno.writeTextFile(fsPath(id), data);
    },
    async list() {
      const dirs = [];
      for await (const dir of await Deno.readDir(fsBase)) {
        if (dir.isFile) {
          dirs.push(dir.name);
        }
      }
      return dirs;
    },
  };
}

export const defaultStorage = fsStorage();
