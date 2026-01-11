import { generatePosts } from "./generate_posts.js";

console.log(`Generating blog posts...`);
generatePosts("content/blog", "public/blog", "templates/blog.html");
