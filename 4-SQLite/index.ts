// > bun index.ts
import Database from "bun:sqlite"

const db = new Database("db.sqlite", {create: true});

const q = `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0
)`;

db.exec(q);

type Task = {
  id: number;
  title: string;
  done: boolean;

}

const getAllTasks = "SELECT * FROM tasks;";
const insertTask = "INSERT INTO tasks (title, done) VALUES ($title, $done);";

Bun.serve({
  async fetch(request: Request): Promise<Response> {
    console.log(request.url);
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/tasks') {
      const tasks = db.query(getAllTasks).all();
      return Response.json(tasks);
    }

    if (request.method === 'POST' && url.pathname === '/tasks') {
      const task:Partial<Task> = await request.json();
      db.query(insertTask).run({$title: task.title!, $done: task.done!})
      return new Response('Task added', {status: 201});
    }

    return new Response('Not found', {status: 404})
  },
  hostname: '127.0.0.1', // Forcer l'écoute sur localhost
  port: 3000, // Par exemple, le port 3000
})
