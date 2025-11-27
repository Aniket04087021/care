import React, { useState, useEffect } from "react";
import {
  Heart,
  Mail,
  User,
  MessageSquare,
  Phone,
  MapPin,
  Menu,
  X,
} from "lucide-react";

export default function CancerAwarenessApp() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch inspirational quote
  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://zenquotes.io/api/quotes|hope|courage"
      );
      const data = await res.json();
      setQuote(data[0]);
    } catch (err) {
      setQuote({
        content: "Hope is the thing with feathers that perches in the soul.",
        author: "Emily Dickinson",
      });
    } finally {
      setLoading(false);
    }
  };

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
      setErrors({});
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <>
      {/* Tiny CSS for fade-in effect */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade {
          animation: fadeIn 0.9s ease-out forwards;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Heart className="w-9 h-9 text-pink-500 fill-pink-500" />
              <h1 className="text-2xl font-bold text-gray-800">Cancer Awareness</h1>
            </div>

            <nav className="hidden md:flex gap-8">
              <a href="#home" className="text-gray-700 hover:text-pink-600 font-medium transition">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-pink-600 font-medium transition">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-pink-600 font-medium transition">
                Contact
              </a>
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t">
              <a
                href="#home"
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-6 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-6 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-6 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
              >
                Contact
              </a>
            </div>
          )}
        </header>

        {/* Hero */}
        <section id="home" className="py-16 px-4 sm:py-24">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade">
              <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
                Together We Can Make a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Difference
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Supporting those affected by cancer through awareness, education, and compassion.
              </p>
              <div className="flex flex-wrap gap-5">
                <a
                  href="#contact"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Get Involved
                </a>
                <a
                  href="#about"
                  className="inline-block px-8 py-4 bg-white text-pink-600 font-bold rounded-xl shadow-xl border-2 border-pink-500 hover:bg-pink-50 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="relative animate-fade" style={{ animationDelay: "0.3s" }}>
              <img
                src="/banner.png"
                alt="Cancer awareness"
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-2xl animate-pulse">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                  <span className="font-bold text-gray-800">Hope & Healing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl">
              {loading ? (
                <div className="space-y-4">
                  <div className="h-8 bg-white/30 rounded w-4/5 mx-auto"></div>
                  <div className="h-8 bg-white/30 rounded w-3/5 mx-auto"></div>
                </div>
              ) : (
                <>
                  <p className="text-2xl md:text-3xl text-white italic font-light leading-relaxed">
                    "{quote?.content}"
                  </p>
                  <p className="mt-6 text-pink-100 text-lg font-medium">— {quote?.author}</p>
                  <button
                    onClick={fetchQuote}
                    className="mt-8 px-8 py-3 bg-white text-pink-600 rounded-full font-bold hover:bg-pink-50 transition shadow-lg"
                  >
                    New Quote
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-4xl font-bold text-gray-800 mb-16">Our Mission</h3>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { Icon: Heart, title: "Support", color: "pink" },
                { Icon: User, title: "Awareness", color: "pink" },
                { Icon: MessageSquare, title: "Advocacy", color: "pink" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-2xl bg-${item.color}-50 hover:shadow-2xl transition-all hover:-translate-y-4 duration-500 animate-fade`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className={`w-20 h-20 bg-${item.color}-500 rounded-full mx-auto mb-6 flex items-center justify-center`}>
                    <item.Icon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h4>
                  <p className="text-gray-600">
                    {item.title === "Support" && "Emotional & practical help for patients and families."}
                    {item.title === "Awareness" && "Educating communities on prevention and early detection."}
                    {item.title === "Advocacy" && "Fighting for research funding and equal access to care."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 bg-gradient-to-b from-purple-50 to-pink-50">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-4xl font-bold text-center text-gray-800 mb-4">Get In Touch</h3>
            <p className="text-center text-gray-600 mb-12">We'd love to hear from you.</p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-white rounded-3xl shadow-2xl p-10">
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Heart className="w-12 h-12 text-white fill-white" />
                    </div>
                    <h4 className="text-3xl font-bold text-gray-800">Thank You!</h4>
                    <p className="text-gray-600 mt-2">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 rounded-xl border ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          } focus:ring-4 focus:ring-pink-200 focus:border-pink-500 outline-none transition`}
                          placeholder="Your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 rounded-xl border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          } focus:ring-4 focus:ring-pink-200 focus:border-pink-500 outline-none transition`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={`w-full pl-12 pr-4 py-4 rounded-xl border ${
                            errors.message ? "border-red-500" : "border-gray-300"
                          } focus:ring-4 focus:ring-pink-200 focus:border-pink-500 outline-none resize-none transition`}
                          placeholder="How can we help?"
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                {[
                  { Icon: Phone, label: "Phone", value: "+91 9898767654", color: "pink" },
                  { Icon: Mail, label: "Email", value: "support@cancerawareness.org", color: "purple" },
                  { Icon: MapPin, label: "Address", value: "123 Hope Street\nWellness City, Kalyan 421301", color: "pink" },
                ].map((info) => (
                  <div key={info.label} className="bg-white rounded-2xl shadow-xl p-8 flex gap-6">
                    <div className={`w-14 h-14 rounded-xl bg-${info.color}-100 flex items-center justify-center`}>
                      <info.Icon className={`w-7 h-7 text-${info.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{info.label}</h4>
                      <p className="text-gray-600 whitespace-pre-line">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
              <span className="text-2xl font-bold">Cancer Awareness & Support</span>
            </div>
            <p className="text-gray-400">Together we fight · together we heal · together we hope</p>
            <p className="text-gray-500 text-sm mt-4">© 2025 Cancer Awareness. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}