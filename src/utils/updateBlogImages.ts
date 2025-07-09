
import { getImageForBlogPost } from './pixabayApi';
import { blogPosts } from '../data/blogPosts';

export const updateBlogPostsWithImages = async () => {
  const updatedPosts = await Promise.all(
    blogPosts.map(async (post) => {
      if (!post.imageUrl || post.imageUrl.includes('lovable-uploads')) {
        console.log(`Fetching image for: ${post.title}`);
        const newImageUrl = await getImageForBlogPost(post.title, post.category);
        if (newImageUrl) {
          return { ...post, imageUrl: newImageUrl };
        }
      }
      return post;
    })
  );
  
  return updatedPosts;
};
