export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/feed") || url.pathname.startsWith("/rss")) {
      return Response.redirect(`${url.origin}/blog/index.xml`, 307);
    }

    return env.ASSETS.fetch(request);
  },
};
