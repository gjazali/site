# About This Site

A couple of days ago, a friend of mine sent me a link to [this website](https://motherfuckingwebsite.com/) and asked if I had known anything about it (if you're about to open that site, do prepare yourself for the amount profanity you're about to see). That was the first time I saw the site. Although, this practice of deliberately designing websites to be bare-boned is not unfamiliar to me. And because years of spending time on [Hacker News](https://news.ycombinator.com) have truly lowered my UI taste[^1], I actually love the design&mdash;or lack thereof&mdash;that goes into sites like the one mentioned above. Even without HN's influence[^2], though, I feel like I'd still take that "abomination of a site" (not my words) over the average modern site; which, in my opinion, take things way over the top. And over the years, they just get worse. In the age of ever-increasing drop shadows, padding sizes, and border radii (and not to mention their century-long loading time), barren-looking sites are starting to look more welcoming for me&mdash;and I'm not alone in having this opinion.

I've been thinking of making an actual personal website for years now. And with those views, I knew I wanted a site that:

1. is designed in the most minimal way possible but without being so ugly it burns retina of whoever had the misfortune of visiting it;
2. loads fast, with a small distribution directory size;
3. will function perfectly well without JavaScript in the client machine;
4. will look the same in every screen; and
5. will last pretty much forever without maintenance.

I've had experience building sites using React before, and with [server components](https://react.dev/reference/rsc/server-components), it is possible to make them run in the client machine without JavaScript. But they tend to be slower to load&mdash;and with my use case, a personal website, I didn't think that the developer experience it offers is worth the trade-off. Oh, and since I'm planning to host a blog, I wanted a way to write my posts in markdown and have it served to their readers as a regular old HTML file. Obviously, it doesn't make sense to have some JS library render the posts _every time_ the user loads them. (It's a waste of resource for a personal blog that only occasionally posts something new, and the fact is, having a client-side JS violates point number three.) So the rendering has to happen during build time.

I decided to host the site with Cloudflare Pages to make life a lot easier[^3]. And the fact that it supports `npm` in the build process means that I can use [`markdown-it`](https://github.com/markdown-it/markdown-it) to render my blog posts. The back-end capability, although not used during the time I'm writing this, is a good addition if I ever want to extend this site in the future. (I also like the fact that I can still avoid using JS in the client-side code with Cloudflare Pages' back-end system.) Without JS, I did have to resort to using the "Checkbox Hack" for this site's navbar (you'll see it when the screen is smaller than `600px` in width). But, so far, I've found it refreshing to write most of this site in just HTML and CSS.

You can view the source code for this site [here](https://github.com/gjazali/site).

(I don't really have much point in writing this post. I mostly just wanted to try out the blog's markdown rendering.)

[^1]: This is a joke.
[^2]: Among this is the fact that these bare-boned sites usually are more personal in terms of content and has way less commercialization; i.e., they don't exist for the main purpose making money off your attention through ads. Usually, this means higher quality.
[^3]: It has a built-in CI/CD system and Git integration and I don't have to worry about cyber attacks on my server (because it won't be on my server).
