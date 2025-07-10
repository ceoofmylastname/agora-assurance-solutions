import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Search, Shield, Heart, TrendingUp, Home, DollarSign, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
  {
    id: '14',
    question: 'How much does life insurance actually cost per month?',
    answer: 'Life insurance costs vary significantly by age, health, and coverage type. A healthy 30-year-old might pay $20-40/month for $500,000 in term coverage, while a 50-year-old could pay $100-200/month for the same amount. Whole life insurance costs 10-15 times more but includes investment components.',
    category: 'Life Insurance',
    keywords: ['life insurance cost', 'monthly premiums', 'pricing factors']
  },
  {
    id: '15',
    question: 'What happens if I stop paying my life insurance premiums?',
    answer: 'For term life insurance, coverage ends immediately when payments stop. For whole life policies, you typically have a 30-day grace period. After that, the policy may use cash value to pay premiums automatically, convert to reduced paid-up insurance, or lapse entirely. Some policies offer non-forfeiture options to preserve some coverage.',
    category: 'Life Insurance',
    keywords: ['lapsed policy', 'grace period', 'non-forfeiture options']
  },
  {
    id: '16',
    question: 'Can I change my life insurance beneficiaries after buying a policy?',
    answer: 'Yes, you can change beneficiaries at any time unless you\'ve designated them as "irrevocable." Most beneficiaries are revocable, meaning you have complete control to update them. Simply contact your insurance company or agent to complete a beneficiary change form. It\'s important to review beneficiaries after major life events like marriage, divorce, or births.',
    category: 'Life Insurance',
    keywords: ['beneficiary changes', 'revocable beneficiary', 'policy updates']
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
  {
    id: '17',
    question: 'What\'s the difference between fixed and variable annuities?',
    answer: 'Fixed annuities provide guaranteed interest rates and predictable payments, protecting your principal from market risk. Variable annuities allow you to invest in sub-accounts (similar to mutual funds) with potential for higher returns but also market risk. Fixed annuities offer security, while variable annuities offer growth potential.',
    category: 'Annuities',
    keywords: ['fixed vs variable', 'guaranteed returns', 'market risk']
  },
  {
    id: '18',
    question: 'Can I withdraw money from my annuity before retirement?',
    answer: 'Yes, but early withdrawals typically incur surrender charges (often 5-10% in early years) and potential IRS penalties if you\'re under 59½. Most annuities allow penalty-free withdrawals of 10% annually after the first year. Emergency situations may qualify for hardship withdrawals with reduced penalties.',
    category: 'Annuities',
    keywords: ['early withdrawal', 'surrender penalties', 'hardship withdrawals']
  },
  {
    id: '19',
    question: 'How do annuity payments work in retirement?',
    answer: 'Annuities can provide payments for a specific period or for life. Common options include: life-only (highest payments, stops at death), life with period certain (guaranteed minimum payment period), or joint and survivor (continues for spouse). Payment amounts depend on your age, gender, interest rates, and payout option selected.',
    category: 'Annuities',
    keywords: ['annuity payouts', 'life payments', 'survivor benefits']
  },
  {
    id: '20',
    question: 'Are annuity payments taxable?',
    answer: 'Annuity taxation depends on how you funded the annuity. For qualified annuities (funded with pre-tax dollars like 401k rollovers), all payments are taxable as ordinary income. For non-qualified annuities (funded with after-tax dollars), only the earnings portion is taxable. The exclusion ratio determines the tax-free portion of each payment.',
    category: 'Annuities',
    keywords: ['annuity taxation', 'qualified vs non-qualified', 'exclusion ratio']
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
  {
    id: '21',
    question: 'What\'s the difference between final expense and regular life insurance?',
    answer: 'Final expense insurance typically offers smaller coverage amounts ($5,000-$50,000) with simplified underwriting, making it easier to qualify. Regular life insurance provides larger amounts with more thorough medical underwriting. Final expense is designed specifically for seniors and those with health issues who need basic coverage for end-of-life costs.',
    category: 'Final Expense',
    keywords: ['final expense vs life insurance', 'coverage amounts', 'senior insurance']
  },
  {
    id: '22',
    question: 'Can I get final expense insurance without a medical exam?',
    answer: 'Yes, most final expense policies don\'t require medical exams. They use simplified underwriting with basic health questions. Guaranteed acceptance policies ask no health questions at all but may have waiting periods (typically 2 years) before full coverage begins. This makes final expense insurance accessible to seniors with health issues.',
    category: 'Final Expense',
    keywords: ['no medical exam', 'guaranteed acceptance', 'waiting period']
  },
  {
    id: '23',
    question: 'At what age should I consider final expense insurance?',
    answer: 'Most people consider final expense insurance between ages 50-85, when health issues may prevent qualifying for traditional life insurance. However, purchasing earlier (even in your 40s) can lock in lower rates. If you have adequate life insurance covering final expenses, you may not need separate final expense coverage.',
    category: 'Final Expense',
    keywords: ['age for coverage', 'early purchase benefits', 'senior insurance']
  },
  {
    id: '24',
    question: 'Does final expense insurance have a cash value?',
    answer: 'Yes, final expense insurance is typically whole life insurance with a small cash value component. However, the cash value grows slowly and isn\'t the primary purpose. You can borrow against it, but this reduces the death benefit. The main value is providing guaranteed coverage for end-of-life expenses, not as an investment.',
    category: 'Final Expense',
    keywords: ['cash value', 'policy loans', 'whole life features']
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
  {
    id: '25',
    question: 'How does mortgage protection insurance work?',
    answer: 'Mortgage protection insurance pays off your remaining mortgage balance if you die. The coverage amount typically decreases as you pay down your mortgage. Premiums can be level or decreasing. The insurance company pays the lender directly, not your beneficiaries, which is why many experts prefer term life insurance instead.',
    category: 'Mortgage Protection',
    keywords: ['decreasing coverage', 'mortgage payoff', 'lender payment']
  },
  {
    id: '26',
    question: 'What\'s the difference between PMI and mortgage protection insurance?',
    answer: 'PMI (Private Mortgage Insurance) protects the lender if you default on your loan and is required for conventional loans with less than 20% down. Mortgage protection insurance protects your family by paying off the mortgage if you die. PMI benefits the lender; mortgage protection insurance benefits your family.',
    category: 'Mortgage Protection',
    keywords: ['PMI vs mortgage protection', 'lender protection', 'borrower protection']
  },
  {
    id: '27',
    question: 'Can I cancel mortgage protection insurance?',
    answer: 'Yes, you can typically cancel mortgage protection insurance at any time, though some policies have surrender charges in early years. You might cancel if you\'ve built sufficient equity, obtained adequate life insurance elsewhere, or your family could afford the mortgage payments without the insurance. Always ensure you have adequate coverage before canceling.',
    category: 'Mortgage Protection',
    keywords: ['policy cancellation', 'coverage alternatives', 'surrender charges']
  },
  {
    id: '28',
    question: 'Does mortgage protection insurance cover disability?',
    answer: 'Basic mortgage protection only covers death, but many policies offer optional disability riders for additional cost. These riders typically pay your mortgage payments if you become disabled and cannot work. However, standalone disability insurance often provides broader coverage and more flexibility than mortgage protection disability riders.',
    category: 'Mortgage Protection',
    keywords: ['disability coverage', 'mortgage disability', 'income protection']
  },

  // Tax Planning FAQs
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
  {
    id: '29',
    question: 'Are life insurance premiums tax deductible?',
    answer: 'Generally, no. Personal life insurance premiums are not tax deductible. However, business-owned life insurance premiums may be deductible in certain situations, such as key person insurance or when structured as employee benefits. Split-dollar arrangements and executive bonus plans have specific tax rules requiring professional guidance.',
    category: 'Tax Planning',
    keywords: ['premium deductibility', 'business insurance', 'tax deductions']
  },
  {
    id: '30',
    question: 'How does the estate tax exemption affect life insurance planning?',
    answer: 'The federal estate tax exemption is $13.61 million per person in 2025 (subject to change). Life insurance death benefits are included in your taxable estate unless owned by an irrevocable trust. For estates exceeding the exemption, life insurance can provide tax-free liquidity to pay estate taxes and transfer wealth efficiently.',
    category: 'Tax Planning',
    keywords: ['estate tax exemption', 'irrevocable trusts', 'estate liquidity']
  },
  {
    id: '31',
    question: 'What is a Modified Endowment Contract (MEC) and why should I avoid it?',
    answer: 'A MEC is a life insurance policy that fails the "7-pay test" by having too much premium paid too quickly. MECs lose favorable tax treatment - withdrawals and loans become taxable and subject to 10% penalties before age 59½. To avoid MEC status, limit premiums to the MEC limits calculated by your insurance company.',
    category: 'Tax Planning',
    keywords: ['MEC limits', '7-pay test', 'tax penalties']
  },
  {
    id: '32',
    question: 'Can I do a 1035 exchange with my life insurance or annuity?',
    answer: 'Yes, Section 1035 exchanges allow you to transfer cash value from one life insurance policy to another, or from an annuity to another annuity, without immediate tax consequences. You can also exchange an annuity for life insurance. However, you cannot exchange life insurance for an annuity. This is useful for upgrading to better products.',
    category: 'Tax Planning',
    keywords: ['1035 exchange', 'tax-free transfer', 'policy upgrade']
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
  },
  {
    id: '33',
    question: 'What should I expect during a life insurance medical exam?',
    answer: 'A medical exam typically includes height/weight measurements, blood pressure, pulse, urine sample, and blood draw. The examiner will ask health questions and may do an EKG. The exam is free, takes 30-45 minutes, and can usually be done at your home or workplace. Results are sent directly to the insurance company.',
    category: 'Process',
    keywords: ['medical exam process', 'health measurements', 'exam scheduling']
  },
  {
    id: '34',
    question: 'Can my life insurance application be denied?',
    answer: 'Yes, applications can be denied for health reasons, risky lifestyle factors, financial concerns, or incomplete information. Common reasons include undisclosed medical conditions, dangerous hobbies, high debt-to-income ratios, or inconsistent information. Working with an experienced agent can help avoid denials and find alternative coverage options.',
    category: 'Process',
    keywords: ['application denial', 'underwriting decline', 'coverage alternatives']
  },
  {
    id: '35',
    question: 'What happens if I miss information on my life insurance application?',
    answer: 'Insurance companies can contest claims for material misrepresentations during the first two years (contestability period). Minor omissions may not void coverage, but significant undisclosed health conditions could result in claim denial. Always be honest and complete on applications. If you discover an error, contact your insurer immediately to make corrections.',
    category: 'Process',
    keywords: ['application accuracy', 'contestability period', 'material misrepresentation']
  },
  {
    id: '36',
    question: 'How soon does my life insurance coverage begin?',
    answer: 'Coverage typically begins when your application is approved, your first premium is paid, and the policy is delivered. Some policies include interim coverage from the application date if you meet certain health requirements. Guaranteed issue policies may have waiting periods (graded death benefits) for the first 2-3 years.',
    category: 'Process',
    keywords: ['coverage effective date', 'interim coverage', 'policy delivery']
  }
];

const categories = [
  { name: 'Life Insurance', icon: Shield, color: 'blue-500' },
  { name: 'Annuities', icon: TrendingUp, color: 'green-500' },
  { name: 'Final Expense', icon: Heart, color: 'red-500' },
  { name: 'Mortgage Protection', icon: Home, color: 'orange-500' },
  { name: 'Tax Planning', icon: DollarSign, color: 'purple-500' },
  { name: 'Process', icon: Users, color: 'teal-500' }
];

const FAQSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Life Insurance');
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
    const matchesCategory = faq.category === selectedCategory;
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
        
        {/* Link to Dedicated FAQ Page */}
        <div className="text-center mt-12">
          <Link to="/faq">
            <Button size="lg" variant="outline" className="px-8 py-3">
              View All Frequently Asked Questions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;