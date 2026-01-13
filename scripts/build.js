import { generatePosts } from "./generate_posts.js";
import { generatePostList } from "./generate_post_list.js";
import { generateRSS } from "./generate_rss.js";

console.log(`Generating blog posts...`);
generatePosts("content/blog", "public/blog", "templates/blog_post.html");

console.log(`Generating blog post list...`);
generatePostList("content/blog", "public/blog", "templates/blog_post_list.html", "blog");

console.log(`Generating RSS feed...`);
generateRSS("content/blog", "public/blog", "templates/rss.xml", "index.xml", "jazali.org", "blog");
