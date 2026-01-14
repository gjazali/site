export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/cv")) {
      return new Response.redirect("https://static.jazali.net/documents/cv.pdf", 307);
    }

    return env.ASSETS.fetch(request);
  },
};
