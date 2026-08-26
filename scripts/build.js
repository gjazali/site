import { copyAssets } from "./copy_assets.js";
import { generateCSS } from "./generate_css.js";
import { generateGenericPage } from "./generate_generic_page.js";
import { generateCV } from "./generate_cv.js";
import { generatePosts } from "./generate_posts.js";
import { generatePostList } from "./generate_post_list.js";
import { generateRSS } from "./generate_rss.js";

console.log(`Copying assets...`);
copyAssets("assets", "public/assets");

console.log(`Generating stylesheet...`);
generateCSS("templates/stylesheet.css", "public", "stylesheet");

console.log(`Generating 404 error page...`);
await generateGenericPage("templates/404.ejs", "public", "404");

console.log(`Generating main page...`);
await generateGenericPage("templates/main_page.ejs", "public", "index");

console.log(`Generating CV page...`);
await generateCV("templates/cv.ejs", "content/cv.json", "public/cv", "index");

console.log(`Generating contact page...`);
await generateGenericPage("templates/contact_page.ejs", "public/contact", "index");

console.log(`Generating blog posts...`);
await generatePosts("content/blog", "public/blog", "templates/post.ejs", "Blog", "blog");

console.log(`Generating blog post list...`);
await generatePostList("content/blog", "public/blog", "templates/blog_post_list.ejs");

console.log(`Generating RSS feed...`);
generateRSS("content/blog", "public/blog", "templates/rss.ejs", "index.xml", "jazali.org", "blog");

console.log(`Generating portfolio posts...`);
await generatePosts("content/portfolio", "public/portfolio", "templates/post.ejs", "Portfolio", "portfolio");

console.log(`Generating portfolio post list...`);
await generatePostList("content/portfolio", "public/portfolio", "templates/portfolio_post_list.ejs");
