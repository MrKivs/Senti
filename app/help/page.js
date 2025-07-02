"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LifeBuoy,
  Mail,
  MessageSquare,
  BookOpen,
  Video,
  Users,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle,
} from "lucide-react";

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFaq = (id) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
    }, 1000);
  };

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <BookOpen className="w-5 h-5" />,
      faqs: [
        {
          id: "gs1",
          question: "How do I create my first chama?",
          answer:
            "To create your first chama, navigate to the &apos;My Chamas&apos; section and click &apos;Create New Chama&apos;. Fill in the required details including chama name, purpose, contribution amount, and frequency. You can then invite members to join your chama.",
        },
        {
          id: "gs2",
          question: "What information do I need to sign up?",
          answer:
            "To sign up for Senti, you&apos;ll need a valid email address, your full name, and a secure password. Optionally, you can add your phone number for additional security and notifications.",
        },
        {
          id: "gs3",
          question: "Is there a mobile app available?",
          answer:
            "Yes, Senti is available on both iOS and Android devices. You can download it from the App Store or Google Play Store. The mobile app provides all the features available on the web platform.",
        },
      ],
    },
    {
      id: "contributions",
      title: "Contributions & Payments",
      icon: <CheckCircle className="w-5 h-5" />,
      faqs: [
        {
          id: "cp1",
          question: "What payment methods are supported?",
          answer:
            "Senti supports multiple payment methods including M-Pesa, Airtel Money, bank transfers, and credit/debit cards. You can set your preferred payment method in your account settings.",
        },
        {
          id: "cp2",
          question: "How do I track my contributions?",
          answer:
            "All contributions are tracked in the &apos;History&apos; section of the app. You can view contributions by date, chama, or amount. Detailed reports are also available for download.",
        },
        {
          id: "cp3",
          question: "What happens if I miss a contribution?",
          answer:
            "If you miss a contribution, you&apos;ll be notified and given a grace period to make the payment. After the grace period, a small penalty fee may be applied according to your chama&apos;s rules.",
        },
      ],
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: <LifeBuoy className="w-5 h-5" />,
      faqs: [
        {
          id: "sp1",
          question: "How is my financial data protected?",
          answer:
            "Senti uses bank-level encryption to protect your data. All transactions are secured with SSL technology, and we comply with the highest financial security standards to keep your information safe.",
        },
        {
          id: "sp2",
          question: "Can I control who sees my chama information?",
          answer:
            "Yes, you have full control over your privacy settings. You can choose what information is visible to other chama members and adjust these settings at any time.",
        },
      ],
    },
    {
      id: "disbursements",
      title: "Disbursements & Withdrawals",
      icon: <CheckCircle className="w-5 h-5" />,
      faqs: [
        {
          id: "dw1",
          question: "How long do disbursements take?",
          answer:
            "Disbursements are typically processed within 24-48 hours. The exact time depends on your payment method and financial institution.",
        },
        {
          id: "dw2",
          question: "Are there fees for withdrawals?",
          answer:
            "Standard disbursements have no fees. For express disbursements (processed within 2 hours), a small fee of 1% of the disbursed amount applies.",
        },
      ],
    },
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  const supportResources = [
    {
      title: "Knowledge Base",
      description: "Browse our comprehensive guides and tutorials",
      icon: <BookOpen className="w-8 h-8 text-emerald-600" />,
      link: "#",
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: <Video className="w-8 h-8 text-amber-600" />,
      link: "#",
    },
    {
      title: "Community Forum",
      description: "Connect with other Senti users",
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-6">
            <LifeBuoy className="w-10 h-10 text-emerald-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-3">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions, browse our resources, or get in
            touch with our support team.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search help articles..."
                className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Help Categories
              </h2>
              <ul className="space-y-2">
                {faqCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                        activeCategory === category.id
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category.icon}
                      <span>{category.title}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Support Resources
                </h3>
                <div className="space-y-4">
                  {supportResources.map((resource, index) => (
                    <motion.a
                      key={index}
                      href={resource.link}
                      whileHover={{ y: -5 }}
                      className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                    >
                      <div className="mt-1">{resource.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {resource.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {resource.description}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - FAQs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
                  {faqCategories.find((cat) => cat.id === activeCategory)?.icon}
                  {
                    faqCategories.find((cat) => cat.id === activeCategory)
                      ?.title
                  }
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {filteredFaqs
                  .filter((category) => category.id === activeCategory)
                  .map((category) =>
                    category.faqs.length > 0 ? (
                      category.faqs.map((faq) => (
                        <div key={faq.id} className="p-6">
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className="flex justify-between items-center w-full text-left"
                          >
                            <h3 className="text-lg font-medium text-gray-800 pr-4">
                              {faq.question}
                            </h3>
                            {expandedFaqs[faq.id] ? (
                              <ChevronUp className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>

                          {expandedFaqs[faq.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 text-gray-600"
                            >
                              <p>{faq.answer}</p>
                              <div className="mt-4 flex gap-3">
                                <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">
                                  Was this helpful?
                                </button>
                                <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">
                                  Share feedback
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div key={category.id} className="p-10 text-center">
                        <div className="text-gray-400 mb-2">No FAQs found</div>
                        <p className="text-gray-500">
                          Try adjusting your search or browse other categories
                        </p>
                      </div>
                    )
                  )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Support
                </h2>
                <p className="text-gray-600 mt-1">
                  Can&apos;t find what you&apos;re looking for? Send us a
                  message.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-10 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Thank you for contacting us. Our support team will get back
                    to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Describe your issue or question..."
                    />
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Community Support */}
            <div className="mt-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Users className="w-8 h-8 text-white" />
                  <h2 className="text-xl font-semibold">Join Our Community</h2>
                </div>
                <p className="mb-6 max-w-xl">
                  Connect with other Senti users, share experiences, and get
                  help from our growing community.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-white text-emerald-600 hover:bg-gray-100 px-5 py-2.5 rounded-lg font-medium">
                    Visit Community Forum
                  </button>
                  <button className="bg-emerald-700/50 hover:bg-emerald-700/70 text-white px-5 py-2.5 rounded-lg font-medium">
                    Join WhatsApp Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
