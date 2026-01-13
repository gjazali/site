import { generatePosts } from "./generate_posts.js";
import { generatePostList } from "./generate_post_list.js"

console.log(`Generating blog posts...`);
generatePosts("content/blog", "public/blog", "templates/blog_post.html");
generatePostList("content/blog", "public/blog", "templates/blog_post_list.html", "blog");
