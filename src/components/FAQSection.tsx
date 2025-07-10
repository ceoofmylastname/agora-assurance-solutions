import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Search, Shield, Heart, TrendingUp, Home, DollarSign, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

const faqData: FAQItem[] = [
  // Life Insurance FAQs
  {
    id: '1',
    question: 'How much life insurance do I actually need?',
    answer: 'The general rule is 10-12 times your annual income, but this varies based on your debts, dependents, and financial goals. Consider your mortgage, children\'s education costs, and your spouse\'s financial needs. A licensed agent can help calculate your exact coverage needs using income replacement and debt coverage methods.',
    category: 'Life Insurance',
    keywords: ['coverage amount', 'income replacement', 'financial planning']
  },
  {
    id: '2',
    question: 'What\'s the difference between term and whole life insurance?',
    answer: 'Term life provides temporary coverage for a specific period (10, 20, or 30 years) at lower premiums. Whole life offers permanent coverage with a cash value component that grows over time. Term is ideal for temporary needs like mortgage protection, while whole life serves estate planning and wealth transfer goals.',
    category: 'Life Insurance',
    keywords: ['term vs whole life', 'permanent insurance', 'cash value']
  },
  {
    id: '3',
    question: 'Can I get life insurance if I have health issues?',
    answer: 'Yes, many people with health conditions can still qualify for coverage. Options include simplified issue policies, guaranteed acceptance plans, or working with carriers that specialize in high-risk cases. The key is working with an experienced agent who knows which insurers are most favorable for your specific condition.',
    category: 'Life Insurance',
    keywords: ['health issues', 'medical conditions', 'high-risk insurance']
  },
  
  // Annuities FAQs
  {
    id: '4',
    question: 'Are annuities a good investment for retirement?',
    answer: 'Annuities can be excellent for retirement income planning, offering guaranteed payments and tax-deferred growth. They\'re particularly valuable for conservative investors seeking predictable income. However, fees and surrender charges vary significantly between products, making professional guidance essential for selection.',
    category: 'Annuities',
    keywords: ['retirement income', 'guaranteed payments', 'tax-deferred']
  },
  {
    id: '5',
    question: 'What are the fees associated with annuities?',
    answer: 'Annuity fees typically include management fees (0.5-3% annually), surrender charges (declining over 5-10 years), and optional rider fees. Fixed annuities generally have lower fees than variable annuities. Understanding the total cost structure is crucial before purchasing any annuity product.',
    category: 'Annuities',
    keywords: ['annuity fees', 'surrender charges', 'management costs']
  },

  // Final Expense FAQs
  {
    id: '6',
    question: 'How much does final expense insurance cost?',
    answer: 'Final expense insurance typically costs $30-$200 monthly, depending on age, health, and coverage amount. Most policies range from $5,000-$50,000 in coverage. The advantage is simplified underwriting - many policies require only a few health questions rather than a full medical exam.',
    category: 'Final Expense',
    keywords: ['final expense cost', 'burial insurance', 'simplified underwriting']
  },
  {
    id: '7',
    question: 'What does final expense insurance cover?',
    answer: 'Final expense insurance covers funeral costs, burial or cremation expenses, outstanding medical bills, and other end-of-life expenses. The average funeral costs $7,000-$12,000, making this coverage essential for protecting your family from unexpected financial burden during an already difficult time.',
    category: 'Final Expense',
    keywords: ['funeral costs', 'burial expenses', 'end-of-life costs']
  },

  // Mortgage Protection FAQs
  {
    id: '8',
    question: 'Is mortgage protection insurance worth it?',
    answer: 'Mortgage protection can be valuable, but term life insurance often provides better value and flexibility. Term life pays your beneficiaries directly (they can use funds for any purpose), while mortgage protection only pays the lender. Compare costs and benefits carefully before deciding.',
    category: 'Mortgage Protection',
    keywords: ['mortgage insurance', 'term life vs mortgage protection', 'home loan protection']
  },
  {
    id: '9',
    question: 'Do I need mortgage protection if I have life insurance?',
    answer: 'Not necessarily. If your existing life insurance coverage is sufficient to pay off your mortgage and provide for your family\'s other needs, additional mortgage protection may be redundant. Review your total coverage needs with a licensed agent to avoid over-insuring.',
    category: 'Mortgage Protection',
    keywords: ['mortgage coverage', 'life insurance adequacy', 'coverage review']
  },

  // Tax & Asset Protection FAQs
  {
    id: '10',
    question: 'How can life insurance help with tax planning?',
    answer: 'Life insurance offers several tax advantages: death benefits are generally tax-free, cash value grows tax-deferred, and you can access cash value through tax-free loans. Wealthy individuals use life insurance for estate planning to transfer wealth tax-efficiently and provide liquidity for estate taxes.',
    category: 'Tax Planning',
    keywords: ['tax-free death benefits', 'estate planning', 'wealth transfer']
  },
  {
    id: '11',
    question: 'What is asset protection and how does insurance help?',
    answer: 'Asset protection shields your wealth from creditors, lawsuits, and financial risks. Certain insurance products like domestic asset protection trusts and offshore structures can protect assets while providing insurance benefits. This strategy is particularly valuable for high-net-worth individuals and business owners.',
    category: 'Tax Planning',
    keywords: ['asset protection', 'creditor protection', 'wealth preservation']
  },

  // Process FAQs
  {
    id: '12',
    question: 'How long does the life insurance application process take?',
    answer: 'The application process typically takes 4-8 weeks from application to policy delivery. This includes the medical exam (if required), medical records review, and underwriting. Simplified issue policies can be approved in 24-48 hours, while complex cases may take longer.',
    category: 'Process',
    keywords: ['application timeline', 'underwriting process', 'policy approval']
  },
  {
    id: '13',
    question: 'Do I need a medical exam for life insurance?',
    answer: 'Not always. Many insurers offer no-exam policies up to certain coverage amounts (typically $250,000-$500,000). These policies use medical questionnaires and sometimes require phone interviews. Larger coverage amounts usually require a medical exam, which is free and typically done at your home or office.',
    category: 'Process',
    keywords: ['no medical exam', 'simplified issue', 'underwriting requirements']
  }
];

const categories = [
  { name: 'All', icon: Users, color: 'primary' },
  { name: 'Life Insurance', icon: Shield, color: 'blue-500' },
  { name: 'Annuities', icon: TrendingUp, color: 'green-500' },
  { name: 'Final Expense', icon: Heart, color: 'red-500' },
  { name: 'Mortgage Protection', icon: Home, color: 'orange-500' },
  { name: 'Tax Planning', icon: DollarSign, color: 'purple-500' },
  { name: 'Process', icon: Users, color: 'teal-500' }
];

const FAQSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get instant answers to common insurance questions from licensed professionals. 
            Find the information you need to make informed decisions about your financial protection.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg bg-background border-2 border-border hover:border-primary/50 focus:border-primary rounded-full shadow-lg"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-background text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left hover:bg-secondary/20 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${
                          openItems.has(faq.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openItems.has(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <CardContent className="px-6 pb-6 pt-0">
                          <div className="bg-secondary/30 rounded-lg p-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {faq.keywords.map((keyword) => (
                                <span
                                  key={keyword}
                                  className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No questions found matching your search. Try a different term or category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;