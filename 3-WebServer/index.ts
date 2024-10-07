// > bun index.ts

Bun.serve({
  fetch(request: Request): Response | Promise<Response> {
    console.log(request.url);
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/')
      return Response.json({ message: 'Home!' })
    return new Response('Not found', { status: 404 })
  },
  hostname: '127.0.0.1', // Forcer l'écoute sur localhost
  port: 3000, // Par exemple, le port 3000
})
