export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/blog/")) {
      return env.ASSETS.fetch(request);
    }
    else if (url.pathname.startsWith("/cv/")) {
      return new Response.redirect("https://cv.jazali.org", 307);
    }

    return env.ASSETS.fetch(request);
  },
};
