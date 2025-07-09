
import { BlogPost } from './types';
import { finalExpensePosts } from './finalExpensePosts';
import { retirementPosts } from './retirementPosts';
import { lifeInsurancePosts } from './lifeInsurancePosts';

export const blogPosts: BlogPost[] = [
  ...finalExpensePosts,
  ...retirementPosts,
  ...lifeInsurancePosts
];

export type { BlogPost, ContentSection } from './types';
