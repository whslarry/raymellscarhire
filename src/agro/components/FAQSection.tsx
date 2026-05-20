import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useScrollReveal } from '../../lib/useScrollReveal';

type FAQItem = { question: string; answer: string };

const faqs: FAQItem[] = [
  {
    question: 'What certifications do your organic products carry?',
    answer: 'All our organic products are USDA Organic Certified and Non-GMO Project Verified. We also hold Fair Trade certification for select product lines. Every certification is documented and available for review on each product page.',
  },
  {
    question: 'How does your supply chain traceability work?',
    answer: 'We track every product from the specific field it was grown in, through harvest, processing, storage, and shipping. Each batch carries a unique traceability code that you can use to look up the full journey — including soil tests, harvest dates, and third-party quality checks.',
  },
  {
    question: 'What is your minimum order quantity?',
    answer: 'For grain and feed products, our minimum order is 1 metric ton. For seeds, oils, and specialty items, there is no minimum — you can order by the unit. We also offer sample packs for new customers who want to evaluate quality before committing.',
  },
  {
    question: 'Do you offer delivery or do I need to arrange pickup?',
    answer: 'We offer both. For orders over 5 tons within California, delivery is free. For smaller orders or out-of-state shipments, we work with reliable logistics partners and pass through their rates at cost — no markup.',
  },
  {
    question: 'How do you ensure product quality during storage and transit?',
    answer: 'Our warehouse facilities are temperature and humidity controlled with 24/7 monitoring. Grain is stored in aerated silos with regular moisture testing. All shipments include temperature loggers to verify conditions were maintained throughout transit.',
  },
  {
    question: 'Can I visit the farm or schedule a tour?',
    answer: 'Absolutely. We host monthly farm tours from April through October where you can walk the fields, meet our agronomists, and see our practices firsthand. Private tours for business partners can be arranged by contacting our team directly.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const revealRef = useScrollReveal(0.1);

  return (
    <section className="section-padding bg-forest-50/40" id="faq" ref={revealRef}>
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="inline-flex items-center gap-2 badge bg-forest-100 text-forest-700 mb-4">
              <HelpCircle className="h-3.5 w-3.5" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-900 mb-3">
              Common Questions
            </h2>
            <p className="text-gray-500">
              Everything you need to know about our products, processes, and partnerships.
            </p>
          </div>

          <div className="space-y-3 stagger-children">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border-2 transition-all duration-300 ${
                    isOpen
                      ? 'bg-white border-forest-200 shadow-lg shadow-forest-100/50'
                      : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className={`font-semibold transition-colors duration-300 ${isOpen ? 'text-forest-800' : 'text-gray-700'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-forest-100 rotate-180' : 'bg-gray-50 group-hover:bg-gray-100'
                    }`}>
                      <ChevronDown className={`h-4 w-4 transition-colors duration-300 ${
                        isOpen ? 'text-forest-600' : 'text-gray-400'
                      }`} />
                    </div>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-400 ${
                      isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
