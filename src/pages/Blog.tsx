import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Clock, User, Calendar, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import lifeInsuranceAnalysis from '@/assets/life-insurance-analysis.jpg';
import mortgageProtectionTruth from '@/assets/mortgage-protection-truth.jpg';
import retirementStrategyComparison from '@/assets/retirement-strategy-comparison.jpg';
import finalExpenseGuide from '@/assets/final-expense-guide.jpg';
import taxStrategies from '@/assets/tax-strategies.jpg';
import medicalExamTips from '@/assets/medical-exam-tips.jpg';

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
  tags: string[];
}

const allBlogPosts: BlogPost[] = [
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
    tags: ['life insurance', 'rates', 'market trends', 'underwriting']
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
    slug: 'hidden-costs-mortgage-protection',
    tags: ['mortgage protection', 'insurance costs', 'expert advice']
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
    slug: 'annuities-vs-401k-2025-analysis',
    tags: ['annuities', '401k', 'retirement planning', 'tax strategies']
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
    slug: 'complete-final-expense-insurance-guide',
    tags: ['final expense', 'burial insurance', 'family protection']
  },
  {
    id: '5',
    title: 'Tax-Advantaged Life Insurance Strategies for High-Income Earners',
    excerpt: 'Advanced planning techniques using life insurance for wealth transfer, estate planning, and tax optimization strategies.',
    image: taxStrategies,
    category: 'Tax Planning',
    readTime: '9 min read',
    author: 'Robert Kim, JD, CPA',
    publishDate: 'December 5, 2025',
    slug: 'tax-advantaged-life-insurance-strategies',
    tags: ['tax planning', 'estate planning', 'wealth transfer', 'high-income']
  },
  {
    id: '6',
    title: 'Life Insurance Medical Exam: Insider Tips to Get Better Rates',
    excerpt: 'Professional strategies to prepare for your life insurance medical exam and secure the lowest possible premiums.',
    image: medicalExamTips,
    category: 'Application Tips',
    readTime: '7 min read',
    author: 'Jennifer Walsh, RN',
    publishDate: 'December 3, 2025',
    slug: 'life-insurance-medical-exam-tips',
    tags: ['medical exam', 'application process', 'premium optimization']
  }
];

const categories = ['All', 'Market Analysis', 'Expert Insights', 'Retirement Planning', 'Insurance Guide', 'Tax Planning', 'Application Tips'];

const Blog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleBlogClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout>
      <SEO 
        title="Insurance Insights & Expert Analysis - Agora Assurance Solutions Blog"
        description="Stay informed with expert insurance insights, market analysis, and professional advice from licensed agents. Get the latest on life insurance, annuities, and financial protection strategies."
        keywords={['insurance blog', 'life insurance insights', 'market analysis', 'expert advice', 'insurance tips', 'retirement planning', 'financial protection']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Insurance{' '}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Insights
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Expert analysis, market insights, and professional guidance from licensed insurance professionals. 
                Get the knowledge you need to make informed financial protection decisions.
              </p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-6 text-lg bg-background border-2 border-border hover:border-primary/50 focus:border-primary rounded-full shadow-lg"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                        : 'bg-background text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card 
                    className="group h-full cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-background to-background/80"
                    onClick={() => handleBlogClick(post.slug)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.publishDate}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-sm font-medium text-foreground">{post.author}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-muted-foreground text-lg">
                  No articles found matching your search criteria. Try different keywords or select a different category.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Blog;