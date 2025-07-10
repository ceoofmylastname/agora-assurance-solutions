import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import lifeInsuranceAnalysis from '@/assets/life-insurance-analysis.webp';
import mortgageProtectionTruth from '@/assets/mortgage-protection-truth.webp';
import retirementStrategyComparison from '@/assets/retirement-strategy-comparison.webp';
import finalExpenseGuide from '@/assets/final-expense-guide.webp';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
  publishDate: string;
  slug: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '2025 Life Insurance Rate Analysis: What You Need to Know',
    excerpt: 'Comprehensive market analysis revealing insider data on rate trends, underwriting changes, and strategies to secure the best premiums in today\'s market.',
    image: lifeInsuranceAnalysis,
    category: 'Market Analysis',
    readTime: '8 min read',
    author: 'Sarah Johnson, CLU',
    publishDate: 'December 15, 2025',
    slug: '2025-life-insurance-rate-analysis',
    featured: true
  },
  {
    id: '2',
    title: 'The Hidden Costs of Mortgage Protection: A Licensed Agent\'s Perspective',
    excerpt: 'Industry secrets revealed: Why mortgage protection insurance might not be your best option and what licensed agents won\'t tell you.',
    image: mortgageProtectionTruth,
    category: 'Expert Insights',
    readTime: '6 min read',
    author: 'Michael Chen, CFP',
    publishDate: 'December 12, 2025',
    slug: 'hidden-costs-mortgage-protection'
  },
  {
    id: '3',
    title: 'Annuities vs. 401(k): Which Retirement Strategy Wins in 2025?',
    excerpt: 'Data-driven comparison of retirement strategies with real numbers, tax implications, and scenarios where each option excels.',
    image: retirementStrategyComparison,
    category: 'Retirement Planning',
    readTime: '10 min read',
    author: 'David Rodriguez, ChFC',
    publishDate: 'December 10, 2025',
    slug: 'annuities-vs-401k-2025-analysis'
  },
  {
    id: '4',
    title: 'Final Expense Insurance: The Complete Guide to Protecting Your Family\'s Future',
    excerpt: 'Everything you need to know about final expense insurance, including cost breakdowns, coverage options, and application strategies.',
    image: finalExpenseGuide,
    category: 'Insurance Guide',
    readTime: '12 min read',
    author: 'Lisa Thompson, LUTCF',
    publishDate: 'December 8, 2025',
    slug: 'complete-final-expense-insurance-guide'
  }
];

const BlogSection = () => {
  const navigate = useNavigate();

  const handleBlogClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleViewAllBlogs = () => {
    navigate('/blog');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Insurance{' '}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert analysis and professional insights from licensed insurance professionals
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Blog Post */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:row-span-2"
          >
            <Card 
              className="group h-full cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-background to-background/80"
              onClick={() => handleBlogClick(blogPosts[0].slug)}
            >
              <div className="relative h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
                        <img 
                          src={blogPosts[0].image} 
                          alt={blogPosts[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          width={640}
                          height={320}
                        />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{blogPosts[0].author}</p>
                      <p className="text-xs text-muted-foreground">{blogPosts[0].publishDate}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Regular Blog Posts */}
          <div className="space-y-6">
            {blogPosts.slice(1, 4).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <Card 
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-background to-background/80"
                  onClick={() => handleBlogClick(post.slug)}
                >
                  <div className="flex h-48">
                    <div className="relative w-1/3 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          width={320}
                          height={192}
                        />
                    </div>
                    <CardContent className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <span className="bg-secondary/80 text-secondary-foreground px-2 py-1 rounded-md font-medium">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-foreground">{post.author}</p>
                            <p className="text-xs text-muted-foreground">{post.publishDate}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Blogs CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            onClick={handleViewAllBlogs}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Explore All Insurance Insights
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;