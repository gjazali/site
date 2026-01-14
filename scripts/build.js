import { generatePosts } from "./generate_posts.js";
import { generatePostList } from "./generate_post_list.js";
import { generateRSS } from "./generate_rss.js";

console.log(`Generating blog posts...`);
generatePosts("content/blog", "public/blog", "templates/post.html", "Blog", "blog");

console.log(`Generating blog post list...`);
generatePostList("content/blog", "public/blog", "templates/blog_post_list.html", "blog");

console.log(`Generating RSS feed...`);
generateRSS("content/blog", "public/blog", "templates/rss.xml", "index.xml", "jazali.org", "blog");

console.log(`Generating portfolio posts...`);
generatePosts("content/portfolio", "public/portfolio", "templates/post.html", "Portfolio", "portfolio");

console.log(`Generating portfolio post list...`);
generatePostList("content/portfolio", "public/portfolio", "templates/portfolio_post_list.html", "portfolio");
