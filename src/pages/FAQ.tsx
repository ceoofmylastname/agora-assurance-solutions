import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0, 1, 2])); // Open first 3 by default

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      category: "Tax-Free Retirement Accounts (TFRA)",
      questions: [
        {
          question: "What is a Tax-Free Retirement Account (TFRA) and who qualifies?",
          answer: "A TFRA lets you grow retirement savings completely tax-free, with no required minimum distributions or annual contribution limits. Any U.S. resident with earned income can apply."
        },
        {
          question: "How does a TFRA differ from a Roth IRA?",
          answer: "Unlike a Roth IRA, TFRAs have no RMDs and truly unlimited contributions. Withdrawals—including earnings—are always tax-free, but contributions aren't tax-deductible."
        },
        {
          question: "Can I roll over my 401(k) or IRA into a TFRA?",
          answer: "Yes—you can transfer retirement funds from a 401(k) or traditional IRA into a TFRA without triggering immediate taxes. Your funds then grow and distribute tax-free."
        },
        {
          question: "Are there any income limits for contributing to a TFRA?",
          answer: "No—there are no IRS-imposed income or contribution limits for TFRAs, making them ideal for high earners seeking additional tax-free growth. Always check your custodian's policies."
        },
        {
          question: "How do I track my TFRA performance?",
          answer: "Track monthly statements in your secure portal or download CSV reports for deeper analysis. Use our built-in performance dashboard to monitor gains and allocations."
        },
        {
          question: "What is a Roth IRA vs a TFRA?",
          answer: "A Roth IRA uses after-tax contributions with annual limits and no tax on qualified distributions, while a TFRA has no contribution limits, no RMDs, and tax-free growth and withdrawals."
        },
        {
          question: "How do catch-up contributions work for retirement accounts?",
          answer: "Account holders aged 50+ can contribute extra above standard limits in many plans—but TFRAs have no caps, so you bypass catch-up rules entirely."
        },
        {
          question: "What is a Roth conversion?",
          answer: "A Roth conversion transfers funds from a traditional IRA or 401(k) into a Roth IRA by paying taxes on pre-tax amounts; this does not apply to TFRAs since they're post-tax vehicles."
        },
        {
          question: "How does required minimum distribution (RMD) affect my TFRA?",
          answer: "TFRAs do not have RMD requirements, unlike traditional IRAs and 401(k)s, giving you full control over withdrawal timing."
        },
        {
          question: "What are the tax benefits of a TFRA?",
          answer: "TFRA earnings and qualified distributions are entirely tax-free, offering an efficient way to grow and transfer wealth."
        },
        {
          question: "Are contributions to a TFRA tax-deductible?",
          answer: "No—TFRA contributions use after-tax dollars and aren't deductible, but the trade-off is tax-free growth and withdrawals."
        },
        {
          question: "Can I name beneficiaries for my TFRA?",
          answer: "Yes—you designate primary and contingent beneficiaries to ensure a smooth, tax-free transfer to heirs."
        },
        {
          question: "How does estate planning incorporate my TFRA?",
          answer: "TFRAs pass outside of probate, providing a direct, tax-free inheritance for your beneficiaries."
        },
        {
          question: "How do Roth IRAs compare to TFRAs?",
          answer: "Roth IRAs cap annual contributions and enforce qualified distribution rules, whereas TFRAs have no limits, no RMDs, and tax-free distributions anytime."
        },
        {
          question: "What is a SEP IRA?",
          answer: "A SEP IRA is a retirement plan for self-employed or small business owners with higher contribution limits—but it still has RMDs, unlike a TFRA."
        },
        {
          question: "What is a SIMPLE IRA?",
          answer: "A SIMPLE IRA is a low-cost plan for small businesses requiring mandatory employer contributions; it has contribution limits and RMDs."
        },
        {
          question: "How do I choose between a brokerage account and a TFRA?",
          answer: "Consider tax treatment, contribution limits, and distribution flexibility: TFRAs offer tax-free growth with no caps, while brokerage gains are taxable."
        },
        {
          question: "Can I hold real estate in a TFRA?",
          answer: "Certain self-directed TFRAs allow real estate investments, subject to custodian policies and IRS rules."
        },
        {
          question: "What investment options are available in a TFRA?",
          answer: "Stocks, bonds, ETFs, mutual funds, and other securities—depending on your TFRA custodian's offerings."
        },
        {
          question: "How much can I contribute annually to my TFRA?",
          answer: "There are no IRS contribution limits for TFRAs, though custodians may set practical minimums or maximums."
        },
        {
          question: "What happens if I exceed TFRA contribution limits?",
          answer: "Since TFRAs have no IRS limits, over-contribution isn't a concern—always confirm any custodian rules."
        },
        {
          question: "How do distributions work from my TFRA?",
          answer: "Qualified withdrawals—including earnings—are tax-free. Non-qualified distributions require proof of basis but avoid tax on gains."
        },
        {
          question: "What is a taxable distribution?",
          answer: "A distribution without proper basis documentation may be subject to ordinary income tax on amounts exceeding contributions."
        },
        {
          question: "How does Section 72(t) apply to my TFRA?",
          answer: "Section 72(t) penalty-free early withdrawal rules apply to IRAs/401(k)s—but not to TFRAs, which have no early-withdrawal penalties."
        },
        {
          question: "Can I take a hardship distribution from my TFRA?",
          answer: "TFRAs do not support hardship withdrawals; consider policy loans or annuity withdrawals for emergencies."
        },
        {
          question: "How does the SECURE Act affect TFRAs?",
          answer: "The SECURE Act's RMD and retirement-plan changes do not apply to TFRAs, allowing uninterrupted tax-free growth."
        }
      ]
    },
    {
      category: "Debt Reduction Plans",
      questions: [
        {
          question: "What is a Debt Reduction Plan and how does it work?",
          answer: "A Debt Reduction Plan accelerates your payoff using proven snowball or avalanche methods. We analyze your balances, set a custom schedule, and guide you to eliminate debt faster."
        },
        {
          question: "How do I pay off my loans faster with Agora's plan?",
          answer: "We recommend either paying smallest balances first (snowball) or highest-interest balances first (avalanche) based on your goals—both slash total interest and shorten payoff time."
        },
        {
          question: "Can I use a HELOC to consolidate my debt?",
          answer: "Yes—a Home Equity Line of Credit can refinance high-interest debt at lower rates. See if you qualify on our HELOC page."
        },
        {
          question: "Do you offer an interactive debt-payoff calculator?",
          answer: "Absolutely—we provide a calculator where you enter balances and rates to visualize payoff timelines and interest savings. It's free and instant."
        }
      ]
    },
    {
      category: "Fixed Indexed Annuities (FIA)",
      questions: [
        {
          question: "What is a Fixed Indexed Annuity (FIA)?",
          answer: "An FIA ties your principal to a market index—like the S&P 500—for upside gains while guaranteeing you never lose your initial investment. It blends growth potential with downside protection."
        },
        {
          question: "What are caps, spreads, and participation rates?",
          answer: "Caps limit maximum credited gains; spreads reduce gains by a set percentage; participation rates determine what percentage of index gains you receive."
        },
        {
          question: "How long is the surrender charge period?",
          answer: "Surrender charges typically last 5–10 years, tapering down until you have full liquidity."
        },
        {
          question: "What are the surrender charges for fixed indexed annuities?",
          answer: "Charges apply if you withdraw above the free-withdrawal limit during the surrender-charge period. Review your contract for specifics."
        },
        {
          question: "What is a free withdrawal provision in annuities?",
          answer: "You can withdraw up to 10 % of your contract value annually without surrender charges."
        },
        {
          question: "How do annuity income riders work?",
          answer: "Income riders guarantee a lifetime income stream based on a roll-up rate and payout percentage."
        },
        {
          question: "What is a guaranteed lifetime withdrawal benefit (GLWB)?",
          answer: "A GLWB rider ensures you can withdraw a set percentage of contract value for life, regardless of market performance."
        },
        {
          question: "Can I annuitize my contract for lifetime income?",
          answer: "Yes—you can convert your annuity into a guaranteed income stream for life."
        },
        {
          question: "What happens when my annuity's surrender charge period ends?",
          answer: "Surrender charges drop to zero, giving you full liquidity (subject to tax rules)."
        },
        {
          question: "How are annuity earnings taxed?",
          answer: "Earnings are taxed as ordinary income upon withdrawal or distribution."
        },
        {
          question: "What is the impact of inflation on annuities?",
          answer: "Inflation can erode fixed payments; consider cost-of-living riders or indexed products for inflation protection."
        },
        {
          question: "How does market volatility impact FIAs?",
          answer: "Indexed annuities protect principal with downside floors while capturing upside within caps."
        },
        {
          question: "How do interest rate changes affect annuity crediting?",
          answer: "Crediting rates adjust based on prevailing rates, impacting future interest credits."
        },
        {
          question: "What is a participation rate in FIAs?",
          answer: "The percentage of index gains credited to your annuity contract."
        },
        {
          question: "How does a floor protect my annuity principal?",
          answer: "A floor guarantees you won't lose principal during negative index periods."
        },
        {
          question: "How do I withdraw funds from my annuity?",
          answer: "Submit a withdrawal request in your portal—funds are typically disbursed within 5–7 business days."
        },
        {
          question: "What fees apply to annuity withdrawals?",
          answer: "Fees depend on surrender schedules, free-withdrawal allowances, and carrier rules."
        }
      ]
    },
    {
      category: "Home Equity Line of Credit (HELOC)",
      questions: [
        {
          question: "How do I qualify for a HELOC?",
          answer: "Qualify with at least 15 % equity, a solid credit score, and stable income. Rates reset annually but stay below most unsecured loans."
        },
        {
          question: "What can I use my HELOC funds for?",
          answer: "Home improvements, debt consolidation, education, or emergencies. Borrow and repay as needed during the draw period."
        }
      ]
    },
    {
      category: "Life Settlements",
      questions: [
        {
          question: "What is a life settlement?",
          answer: "A life settlement lets policyholders aged 65+ sell an existing life-insurance policy for a lump sum—more than surrender value, less than death benefit."
        },
        {
          question: "How do I know if I qualify for a life settlement?",
          answer: "Eligibility depends on age, health profile, and policy type. Submit basic details for a no-cost assessment and offer within days."
        }
      ]
    },
    {
      category: "Mortgage Protection Insurance",
      questions: [
        {
          question: "What's the difference between term life and mortgage protection insurance?",
          answer: "Term life covers any financial need for a set term, while mortgage protection ties the death benefit directly to your loan balance."
        },
        {
          question: "What is the minimum coverage amount for mortgage protection insurance?",
          answer: "Minimums start at $50,000, with higher limits based on your lender's requirements."
        },
        {
          question: "How is mortgage protection different from regular term life?",
          answer: "Mortgage protection's benefit decreases as your loan balance declines, ensuring your home is paid off if something happens."
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const popularQuestions = [
    faqData[0].questions[0], // What is a Tax-Free Retirement Account (TFRA) and who qualifies?
    faqData[1].questions[0], // What is a Debt Reduction Plan and how does it work?
    faqData[2].questions[0], // What is a Fixed Indexed Annuity (FIA)?
    faqData[3].questions[0]  // How do I qualify for a HELOC?
  ];

  return (
    <PageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a Tax-Free Retirement Account (TFRA) and who qualifies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A TFRA lets you grow retirement savings completely tax-free, with no required minimum distributions or annual contribution limits. Any U.S. resident with earned income can apply."
                }
              },
              {
                "@type": "Question",
                "name": "How does a TFRA differ from a Roth IRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Unlike a Roth IRA, TFRAs have no RMDs and truly unlimited contributions. Withdrawals—including earnings—are always tax-free, but contributions aren't tax-deductible."
                }
              },
              {
                "@type": "Question",
                "name": "Can I roll over my 401(k) or IRA into a TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes—you can transfer retirement funds from a 401(k) or traditional IRA into a TFRA without triggering immediate taxes. Your funds then grow and distribute tax-free."
                }
              },
              {
                "@type": "Question",
                "name": "Are there any income limits for contributing to a TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No—there are no IRS-imposed income or contribution limits for TFRAs, making them ideal for high earners seeking additional tax-free growth. Always check your custodian's policies."
                }
              },
              {
                "@type": "Question",
                "name": "How do I track my TFRA performance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Track monthly statements in your secure portal or download CSV reports for deeper analysis. Use our built-in performance dashboard to monitor gains and allocations."
                }
              },
              {
                "@type": "Question",
                "name": "What is a Roth IRA vs a TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Roth IRA uses after-tax contributions with annual limits and no tax on qualified distributions, while a TFRA has no contribution limits, no RMDs, and tax-free growth and withdrawals."
                }
              },
              {
                "@type": "Question",
                "name": "How do catch-up contributions work for retirement accounts?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Account holders aged 50+ can contribute extra above standard limits in many plans—but TFRAs have no caps, so you bypass catch-up rules entirely."
                }
              },
              {
                "@type": "Question",
                "name": "What is a Roth conversion?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Roth conversion transfers funds from a traditional IRA or 401(k) into a Roth IRA by paying taxes on pre-tax amounts; this does not apply to TFRAs since they're post-tax vehicles."
                }
              },
              {
                "@type": "Question",
                "name": "How does required minimum distribution (RMD) affect my TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TFRAs do not have RMD requirements, unlike traditional IRAs and 401(k)s, giving you full control over withdrawal timing."
                }
              },
              {
                "@type": "Question",
                "name": "What are the tax benefits of a TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TFRA earnings and qualified distributions are entirely tax-free, offering an efficient way to grow and transfer wealth."
                }
              },
              {
                "@type": "Question",
                "name": "Are contributions to a TFRA tax-deductible?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No—TFRA contributions use after-tax dollars and aren't deductible, but the trade-off is tax-free growth and withdrawals."
                }
              },
              {
                "@type": "Question",
                "name": "Can I name beneficiaries for my TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes—you designate primary and contingent beneficiaries to ensure a smooth, tax-free transfer to heirs."
                }
              },
              {
                "@type": "Question",
                "name": "How does estate planning incorporate my TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TFRAs pass outside of probate, providing a direct, tax-free inheritance for your beneficiaries."
                }
              },
              {
                "@type": "Question",
                "name": "How do Roth IRAs compare to TFRAs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Roth IRAs cap annual contributions and enforce qualified distribution rules, whereas TFRAs have no limits, no RMDs, and tax-free distributions anytime."
                }
              },
              {
                "@type": "Question",
                "name": "What is a SEP IRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A SEP IRA is a retirement plan for self-employed or small business owners with higher contribution limits—but it still has RMDs, unlike a TFRA."
                }
              },
              {
                "@type": "Question",
                "name": "What is a SIMPLE IRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A SIMPLE IRA is a low-cost plan for small businesses requiring mandatory employer contributions; it has contribution limits and RMDs."
                }
              },
              {
                "@type": "Question",
                "name": "How do I choose between a brokerage account and a TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Consider tax treatment, contribution limits, and distribution flexibility: TFRAs offer tax-free growth with no caps, while brokerage gains are taxable."
                }
              },
              {
                "@type": "Question",
                "name": "Can I hold real estate in a TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Certain self-directed TFRAs allow real estate investments, subject to custodian policies and IRS rules."
                }
              },
              {
                "@type": "Question",
                "name": "What investment options are available in a TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stocks, bonds, ETFs, mutual funds, and other securities—depending on your TFRA custodian's offerings."
                }
              },
              {
                "@type": "Question",
                "name": "How much can I contribute annually to my TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "There are no IRS contribution limits for TFRAs, though custodians may set practical minimums or maximums."
                }
              },
              {
                "@type": "Question",
                "name": "What happens if I exceed TFRA contribution limits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Since TFRAs have no IRS limits, over-contribution isn't a concern—always confirm any custodian rules."
                }
              },
              {
                "@type": "Question",
                "name": "How do distributions work from my TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Qualified withdrawals—including earnings—are tax-free. Non-qualified distributions require proof of basis but avoid tax on gains."
                }
              },
              {
                "@type": "Question",
                "name": "What is a taxable distribution?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A distribution without proper basis documentation may be subject to ordinary income tax on amounts exceeding contributions."
                }
              },
              {
                "@type": "Question",
                "name": "How does Section 72(t) apply to my TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Section 72(t) penalty-free early withdrawal rules apply to IRAs/401(k)s—but not to TFRAs, which have no early-withdrawal penalties."
                }
              },
              {
                "@type": "Question",
                "name": "Can I take a hardship distribution from my TFRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TFRAs do not support hardship withdrawals; consider policy loans or annuity withdrawals for emergencies."
                }
              },
              {
                "@type": "Question",
                "name": "How does the SECURE Act affect TFRAs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The SECURE Act's RMD and retirement-plan changes do not apply to TFRAs, allowing uninterrupted tax-free growth."
                }
              },
              {
                "@type": "Question",
                "name": "What is a Debt Reduction Plan and how does it work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Debt Reduction Plan accelerates your payoff using proven snowball or avalanche methods. We analyze your balances, set a custom schedule, and guide you to eliminate debt faster."
                }
              },
              {
                "@type": "Question",
                "name": "How do I pay off my loans faster with Agora's plan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We recommend either paying smallest balances first (snowball) or highest-interest balances first (avalanche) based on your goals—both slash total interest and shorten payoff time."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use a HELOC to consolidate my debt?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes—a Home Equity Line of Credit can refinance high-interest debt at lower rates. See if you qualify on our HELOC page."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer an interactive debt-payoff calculator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely—we provide a calculator where you enter balances and rates to visualize payoff timelines and interest savings. It's free and instant."
                }
              },
              {
                "@type": "Question",
                "name": "What is a Fixed Indexed Annuity (FIA)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "An FIA ties your principal to a market index—like the S&P 500—for upside gains while guaranteeing you never lose your initial investment. It blends growth potential with downside protection."
                }
              },
              {
                "@type": "Question",
                "name": "What are caps, spreads, and participation rates?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Caps limit maximum credited gains; spreads reduce gains by a set percentage; participation rates determine what percentage of index gains you receive."
                }
              },
              {
                "@type": "Question",
                "name": "How long is the surrender charge period?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Surrender charges typically last 5–10 years, tapering down until you have full liquidity."
                }
              },
              {
                "@type": "Question",
                "name": "What are the surrender charges for fixed indexed annuities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Charges apply if you withdraw above the free-withdrawal limit during the surrender-charge period. Review your contract for specifics."
                }
              },
              {
                "@type": "Question",
                "name": "What is a free withdrawal provision in annuities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can withdraw up to 10 % of your contract value annually without surrender charges."
                }
              },
              {
                "@type": "Question",
                "name": "How do annuity income riders work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Income riders guarantee a lifetime income stream based on a roll-up rate and payout percentage."
                }
              },
              {
                "@type": "Question",
                "name": "What is a guaranteed lifetime withdrawal benefit (GLWB)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A GLWB rider ensures you can withdraw a set percentage of contract value for life, regardless of market performance."
                }
              },
              {
                "@type": "Question",
                "name": "Can I annuitize my contract for lifetime income?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes—you can convert your annuity into a guaranteed income stream for life."
                }
              },
              {
                "@type": "Question",
                "name": "What happens when my annuity's surrender charge period ends?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Surrender charges drop to zero, giving you full liquidity (subject to tax rules)."
                }
              },
              {
                "@type": "Question",
                "name": "How are annuity earnings taxed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Earnings are taxed as ordinary income upon withdrawal or distribution."
                }
              },
              {
                "@type": "Question",
                "name": "What is the impact of inflation on annuities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Inflation can erode fixed payments; consider cost-of-living riders or indexed products for inflation protection."
                }
              },
              {
                "@type": "Question",
                "name": "How does market volatility impact FIAs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Indexed annuities protect principal with downside floors while capturing upside within caps."
                }
              },
              {
                "@type": "Question",
                "name": "How do interest rate changes affect annuity crediting?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Crediting rates adjust based on prevailing rates, impacting future interest credits."
                }
              },
              {
                "@type": "Question",
                "name": "What is a participation rate in FIAs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The percentage of index gains credited to your annuity contract."
                }
              },
              {
                "@type": "Question",
                "name": "How does a floor protect my annuity principal?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A floor guarantees you won't lose principal during negative index periods."
                }
              },
              {
                "@type": "Question",
                "name": "How do I withdraw funds from my annuity?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Submit a withdrawal request in your portal—funds are typically disbursed within 5–7 business days."
                }
              },
              {
                "@type": "Question",
                "name": "What fees apply to annuity withdrawals?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Fees depend on surrender schedules, free-withdrawal allowances, and carrier rules."
                }
              },
              {
                "@type": "Question",
                "name": "How do I qualify for a HELOC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Qualify with at least 15 % equity, a solid credit score, and stable income. Rates reset annually but stay below most unsecured loans."
                }
              },
              {
                "@type": "Question",
                "name": "What can I use my HELOC funds for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Home improvements, debt consolidation, education, or emergencies. Borrow and repay as needed during the draw period."
                }
              },
              {
                "@type": "Question",
                "name": "What is a life settlement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A life settlement lets policyholders aged 65+ sell an existing life-insurance policy for a lump sum—more than surrender value, less than death benefit."
                }
              },
              {
                "@type": "Question",
                "name": "How do I know if I qualify for a life settlement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Eligibility depends on age, health profile, and policy type. Submit basic details for a no-cost assessment and offer within days."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between term life and mortgage protection insurance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Term life covers any financial need for a set term, while mortgage protection ties the death benefit directly to your loan balance."
                }
              },
              {
                "@type": "Question",
                "name": "What is the minimum coverage amount for mortgage protection insurance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Minimums start at $50,000, with higher limits based on your lender's requirements."
                }
              },
              {
                "@type": "Question",
                "name": "How is mortgage protection different from regular term life?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mortgage protection's benefit decreases as your loan balance declines, ensuring your home is paid off if something happens."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <SEO 
        title="Frequently Asked Questions - Agora Assurance Solutions"
        description="Get answers to common questions about life insurance, coverage options, application process, and working with Agora Assurance Solutions. Expert guidance made simple."
        keywords={['insurance FAQ', 'life insurance questions', 'term life FAQ', 'final expense questions', 'insurance process', 'Agora questions', 'insurance help']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-2 md:px-4 py-8 md:py-16 pt-20 md:pt-24">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12 px-4 mt-4 md:mt-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
              Get instant answers to common questions about insurance coverage, our process, and working with Agora's licensed professionals.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-6 md:mb-8 px-2">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-base rounded-lg"
              />
            </div>
          </div>

          {/* Popular Questions */}
          {!searchTerm && (
            <div className="mb-8 md:mb-12 px-4">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6 text-center">Popular Questions</h2>
              <div className="grid gap-3 md:grid-cols-2 md:gap-4 max-w-4xl mx-auto">
                {popularQuestions.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer touch-manipulation" onClick={() => {
                    const questionText = item.question;
                    setSearchTerm(questionText);
                  }}>
                    <CardContent className="p-4 md:p-5">
                      <h3 className="font-medium text-primary text-sm md:text-base leading-relaxed break-words">
                        {item.question}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Categories */}
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8 md:mb-12">
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {category.category}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"></div>
                </div>
                
                <div className="grid gap-4 md:gap-6">
                  {category.questions.map((item, questionIndex) => {
                    const globalIndex = categoryIndex * 100 + questionIndex;
                    const isOpen = openItems.has(globalIndex);
                    
                    return (
                      <div 
                        key={questionIndex} 
                        className="group relative bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full p-4 md:p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-200 relative z-20 bg-transparent"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-base md:text-lg font-semibold text-foreground leading-relaxed pr-2 group-hover:text-primary transition-colors duration-200 flex-1">
                              {item.question}
                            </h3>
                            <div className="flex-shrink-0 mt-1">
                              <div className={`p-1 rounded-full transition-all duration-200 ${isOpen ? 'bg-primary/10 rotate-180' : 'bg-muted/50 group-hover:bg-primary/10'}`}>
                                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                              </div>
                            </div>
                          </div>
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4"></div>
                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                        
                        {/* Subtle hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchTerm && (
            <div className="text-center py-8 md:py-12 px-4">
              <p className="text-muted-foreground text-base md:text-lg break-words">
                No questions found matching "{searchTerm}". Try different keywords or browse our categories above.
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="text-center mt-12 md:mt-16 mx-4 p-6 md:p-8 bg-muted/30 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4 leading-tight">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
              Our licensed insurance professionals are here to provide personalized guidance for your specific situation.
            </p>
            <Link to="/booking">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base touch-manipulation min-h-[44px]">
                Speak with an Expert
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQ;
