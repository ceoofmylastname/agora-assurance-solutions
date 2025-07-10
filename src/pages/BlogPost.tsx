import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User, Calendar, Share2, BookOpen, TrendingUp, Shield, Heart } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
  authorBio: string;
  publishDate: string;
  slug: string;
  tags: string[];
  tableOfContents: { id: string; title: string; }[];
}

const blogPostsData: Record<string, BlogPostData> = {
  '2024-life-insurance-rate-analysis': {
    id: '1',
    title: '2024 Life Insurance Rate Analysis: What You Need to Know',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 id="market-overview">Market Overview: A Year of Significant Changes</h2>
        <p>The life insurance industry has experienced unprecedented shifts in 2024, with rate adjustments affecting millions of policyholders and new applicants. According to our analysis of over 50 major insurers, premium rates have increased an average of 8-12% across most age groups and coverage amounts.</p>
        
        <h3>Key Rate Trends by Age Group</h3>
        <div class="bg-secondary/20 p-6 rounded-lg my-6">
          <h4>Ages 25-35: The Sweet Spot</h4>
          <p>Young adults continue to enjoy the most favorable rates, with some insurers actually <strong>reducing</strong> premiums by 3-5% for this demographic. The reason? Improved health metrics and lower mortality rates in this age group.</p>
          
          <h4>Ages 36-50: Moderate Increases</h4>
          <p>This age group faces the most significant rate increases, averaging 10-15%. Insurers cite increased claims from lifestyle-related health issues and delayed medical care during the pandemic.</p>
          
          <h4>Ages 51+: Strategic Pricing</h4>
          <p>Surprisingly, rate increases for older applicants have been more modest (5-8%), as insurers compete for this traditionally profitable segment.</p>
        </div>

        <h2 id="underwriting-changes">Revolutionary Underwriting Changes</h2>
        <p>2024 has brought the most significant underwriting innovations in decades. Here's what licensed agents need to know:</p>
        
        <h3>Accelerated Underwriting Expansion</h3>
        <p>Major insurers now offer no-exam policies up to $2 million for qualified applicants (previously $500,000-$1 million). This represents a 300% increase in coverage availability without medical exams.</p>
        
        <div class="bg-primary/10 border-l-4 border-primary p-6 my-6">
          <h4>💡 Insider Tip</h4>
          <p>Clients with excellent health profiles and stable finances can now secure substantial coverage in as little as 24-48 hours. However, the health questionnaires have become more detailed and sophisticated.</p>
        </div>

        <h2 id="rate-strategies">Proven Strategies to Secure Better Rates</h2>
        <p>After analyzing thousands of applications, we've identified several strategies that consistently result in better premium rates:</p>
        
        <h3>1. The Annual Physical Strategy</h3>
        <p>Applicants who can provide a recent physical exam (within 12 months) often receive preferred rates. This demonstrates proactive health management and provides insurers with current health data.</p>
        
        <h3>2. Multi-Policy Discounts</h3>
        <p>Bundling life insurance with disability or long-term care coverage can result in 5-10% premium reductions. Many agents overlook this opportunity.</p>
        
        <h3>3. Payment Frequency Optimization</h3>
        <p>Annual premium payments typically offer 3-8% savings compared to monthly payments. For a $500,000 policy, this can mean $200-400 in annual savings.</p>

        <h2 id="market-predictions">2025 Market Predictions</h2>
        <p>Based on our industry analysis and conversations with underwriters at major carriers, here's what we expect:</p>
        
        <ul>
          <li><strong>Continued Rate Stabilization:</strong> After two years of increases, rates should stabilize in most categories</li>
          <li><strong>Technology Integration:</strong> Expect wearable device integration and AI-powered health assessments</li>
          <li><strong>Simplified Products:</strong> More straightforward product designs with fewer riders and options</li>
          <li><strong>Direct-to-Consumer Growth:</strong> Online applications will continue expanding, though complex cases will still require agent assistance</li>
        </ul>

        <div class="bg-destructive/10 border-l-4 border-destructive p-6 my-6">
          <h4>⚠️ Important Warning</h4>
          <p>Rate increases are typically implemented on specific dates throughout the year. If you're considering life insurance, applying before rate increase dates can save thousands in premiums over the policy's lifetime.</p>
        </div>

        <h2 id="action-plan">Your Action Plan for 2024</h2>
        <p>Whether you're shopping for new coverage or reviewing existing policies, here's your step-by-step action plan:</p>
        
        <ol>
          <li><strong>Review Current Coverage:</strong> Ensure your coverage amount still meets your needs</li>
          <li><strong>Compare Rates:</strong> Get quotes from at least 3-4 highly-rated insurers</li>
          <li><strong>Consider Term Conversion:</strong> If you have convertible term insurance, review conversion options</li>
          <li><strong>Health Optimization:</strong> Schedule annual physicals and address any health concerns</li>
          <li><strong>Professional Consultation:</strong> Work with licensed agents who have access to multiple carriers</li>
        </ol>
      </div>
    `,
    image: '/lovable-uploads/life-insurance-analysis.jpg',
    category: 'Market Analysis',
    readTime: '8 min read',
    author: 'Sarah Johnson, CLU',
    authorBio: 'Sarah is a Chartered Life Underwriter with 15+ years of experience in the life insurance industry. She specializes in market analysis and has helped over 2,000 families secure appropriate coverage.',
    publishDate: 'December 15, 2024',
    slug: '2024-life-insurance-rate-analysis',
    tags: ['life insurance', 'rates', 'market trends', 'underwriting'],
    tableOfContents: [
      { id: 'market-overview', title: 'Market Overview: A Year of Significant Changes' },
      { id: 'underwriting-changes', title: 'Revolutionary Underwriting Changes' },
      { id: 'rate-strategies', title: 'Proven Strategies to Secure Better Rates' },
      { id: 'market-predictions', title: '2025 Market Predictions' },
      { id: 'action-plan', title: 'Your Action Plan for 2024' }
    ]
  },
  'hidden-costs-mortgage-protection': {
    id: '2',
    title: 'The Hidden Costs of Mortgage Protection: A Licensed Agent\'s Perspective',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 id="truth-about-mortgage-protection">The Truth About Mortgage Protection Insurance</h2>
        <p>After 12 years as a licensed insurance agent, I've seen countless families make costly mistakes with mortgage protection insurance. Today, I'm sharing the industry secrets that most agents won't tell you - and why term life insurance is almost always the better choice.</p>
        
        <div class="bg-destructive/10 border-l-4 border-destructive p-6 my-6">
          <h4>🚨 Industry Confession</h4>
          <p>Mortgage protection insurance typically pays agents 40-60% higher commissions than term life insurance. This creates a financial incentive that doesn't always align with your best interests.</p>
        </div>

        <h2 id="cost-comparison">Real Cost Comparison: The Numbers Don't Lie</h2>
        <p>Let's examine a real scenario: A 35-year-old homeowner with a $300,000 mortgage.</p>
        
        <div class="bg-secondary/20 p-6 rounded-lg my-6">
          <h3>Mortgage Protection Insurance:</h3>
          <ul>
            <li>Monthly Premium: $85-120</li>
            <li>Coverage: Decreases with mortgage balance</li>
            <li>Beneficiary: Mortgage lender (not your family)</li>
            <li>Total Cost (30 years): $30,600-43,200</li>
          </ul>
          
          <h3>Term Life Insurance ($300,000, 30-year):</h3>
          <ul>
            <li>Monthly Premium: $45-65</li>
            <li>Coverage: Remains level at $300,000</li>
            <li>Beneficiary: Your family (they choose how to use the money)</li>
            <li>Total Cost (30 years): $16,200-23,400</li>
          </ul>
        </div>

        <h2 id="hidden-costs">The Hidden Costs They Don't Mention</h2>
        
        <h3>1. Decreasing Coverage, Same Premium</h3>
        <p>Most mortgage protection policies maintain the same premium even as your coverage decreases. By year 15, you might be paying $100/month for only $150,000 in coverage.</p>
        
        <h3>2. Limited Payout Scenarios</h3>
        <p>Mortgage protection only pays if you die. Term life insurance can also provide cash value through accelerated death benefits for critical illness, terminal illness, and chronic illness.</p>
        
        <h3>3. No Cash Surrender Value</h3>
        <p>Unlike some life insurance policies, mortgage protection insurance has zero cash value. You cannot borrow against it or surrender it for cash.</p>

        <h2 id="when-it-makes-sense">When Mortgage Protection Actually Makes Sense</h2>
        <p>Despite my criticism, there are specific scenarios where mortgage protection insurance might be appropriate:</p>
        
        <ul>
          <li><strong>Uninsurable Health Conditions:</strong> If you can't qualify for traditional life insurance</li>
          <li><strong>Advanced Age:</strong> If you're over 60 and term life premiums are prohibitively expensive</li>
          <li><strong>Temporary Coverage:</strong> If you plan to pay off your mortgage within 5-10 years</li>
          <li><strong>Guaranteed Issue Products:</strong> When no health questions are asked (rare)</li>
        </ul>

        <h2 id="better-alternatives">Better Alternatives: What I Recommend Instead</h2>
        
        <h3>1. Level Term Life Insurance</h3>
        <p>Purchase term life insurance equal to your mortgage balance (or more). Your family receives the death benefit directly and can choose to pay off the mortgage or use the funds for other needs.</p>
        
        <h3>2. Decreasing Term Life Insurance</h3>
        <p>If you want coverage that decreases with your mortgage balance, decreasing term policies offer the same benefit at 30-50% lower cost than mortgage protection.</p>
        
        <h3>3. Convertible Term Policies</h3>
        <p>These policies allow you to convert to permanent insurance without health underwriting - providing flexibility as your needs change.</p>

        <div class="bg-primary/10 border-l-4 border-primary p-6 my-6">
          <h4>💡 Professional Recommendation</h4>
          <p>For most homeowners, I recommend purchasing term life insurance equal to 150% of your mortgage balance. This covers the mortgage and provides additional funds for family expenses during a difficult time.</p>
        </div>

        <h2 id="action-steps">Take Action: Your Next Steps</h2>
        <ol>
          <li><strong>Calculate Your Actual Need:</strong> Add up mortgage balance, final expenses, and 5-10 years of income replacement</li>
          <li><strong>Get Multiple Quotes:</strong> Compare term life insurance from at least 3 insurers</li>
          <li><strong>Review Annually:</strong> As your mortgage decreases, you might choose to reduce coverage</li>
          <li><strong>Consider Riders:</strong> Accelerated death benefit riders provide living benefits for critical illness</li>
          <li><strong>Work with Independent Agents:</strong> Agents who represent multiple companies can provide unbiased recommendations</li>
        </ol>
      </div>
    `,
    image: '/lovable-uploads/mortgage-protection-truth.jpg',
    category: 'Expert Insights',
    readTime: '6 min read',
    author: 'Michael Chen, CFP',
    authorBio: 'Michael is a Certified Financial Planner and licensed insurance agent with expertise in mortgage protection and debt elimination strategies. He has saved clients over $2.3 million in unnecessary insurance costs.',
    publishDate: 'December 12, 2024',
    slug: 'hidden-costs-mortgage-protection',
    tags: ['mortgage protection', 'insurance costs', 'expert advice'],
    tableOfContents: [
      { id: 'truth-about-mortgage-protection', title: 'The Truth About Mortgage Protection Insurance' },
      { id: 'cost-comparison', title: 'Real Cost Comparison: The Numbers Don\'t Lie' },
      { id: 'hidden-costs', title: 'The Hidden Costs They Don\'t Mention' },
      { id: 'when-it-makes-sense', title: 'When Mortgage Protection Actually Makes Sense' },
      { id: 'better-alternatives', title: 'Better Alternatives: What I Recommend Instead' },
      { id: 'action-steps', title: 'Take Action: Your Next Steps' }
    ]
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  const post = slug ? blogPostsData[slug] : null;

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('.blog-content');
      if (article) {
        const totalHeight = article.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('h2[id], h3[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [post]);

  if (!post) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested blog post could not be found.</p>
          <Button onClick={() => navigate('/blog')} variant="outline">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Button>
        </div>
      </PageLayout>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <PageLayout>
      <SEO 
        title={`${post.title} - Agora Assurance Solutions Blog`}
        description={post.content.replace(/<[^>]*>/g, '').substring(0, 160)}
        keywords={post.tags}
        imageUrl={post.image}
        isBlogPost={true}
        publishDate={post.publishDate}
        author={post.author}
        category={post.category}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-secondary/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button 
                onClick={() => navigate('/blog')}
                variant="ghost"
                className="mb-8 hover:bg-primary/10"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>

              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.publishDate}
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{post.author}</p>
                      <p className="text-sm text-muted-foreground">{post.authorBio}</p>
                    </div>
                  </div>
                  <Button onClick={handleShare} variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto flex gap-12">
              {/* Table of Contents - Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block w-80 shrink-0"
              >
                <div className="sticky top-24">
                  <Card className="p-6 bg-background/80 backdrop-blur-sm border-0 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Table of Contents</h3>
                    </div>
                    <nav className="space-y-2">
                      {post.tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
                            activeSection === item.id
                              ? 'bg-primary text-primary-foreground font-medium'
                              : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                          }`}
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </Card>
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex-1"
              >
                <Card className="p-8 lg:p-12 bg-background/80 backdrop-blur-sm border-0 shadow-lg">
                  <div 
                    className="blog-content prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                    <span className="text-muted-foreground font-medium mr-2">Tags:</span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>

                {/* Related Articles CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-12"
                >
                  <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-0 shadow-lg text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Ready to Secure Your Family's Financial Future?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Get a personalized quote from our licensed insurance experts. 
                      We'll help you find the right coverage at the best rates.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-primary hover:bg-primary/90">
                        Get Free Quote
                      </Button>
                      <Button size="lg" variant="outline" onClick={() => navigate('/blog')}>
                        Read More Articles
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default BlogPost;