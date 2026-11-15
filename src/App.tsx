import { useState, useEffect, useCallback, useRef } from 'react'
import { Globe, Zap, Shield, Bot, TrendingUp, MessageCircle, CheckCircle, ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Menu, X, Mail, Phone, Quote, Sparkles, Layers, Rocket, Star, Play } from 'lucide-react'

export default function App() {
  // --- NAVIGATION & PAGE STATE ---
  const [currentPage, setCurrentPage] = useState<'home' | 'why-us' | 'services'>('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle')
  
  // --- PRELOADER STATE ---
  const [isLoading, setIsLoading] = useState(true)
  const [loadStep, setLoadStep] = useState(0)

  // --- HERO MAC ANIMATION STATE ---
  const [typedUrl, setTypedUrl] = useState('')
  const [showCards, setShowCards] = useState(false)
  const fullUrl = 'www.dovlix.com'

  // --- TESTIMONIALS STATE ---
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  // --- FAQ STATE ---
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // --- ANIMATED NUMBERS STATE ---
  const [statsVisible, setStatsVisible] = useState(false)
  const [counts, setCounts] = useState({ stat1: 0, stat2: 0, stat3: 0, stat4: 0, stat5: 0, stat6: 0 })
  const statsRef = useRef<HTMLDivElement>(null)

  // PRELOADER EFFECT
  useEffect(() => {
    if (loadStep < 6) {
      const timer = setTimeout(() => setLoadStep(prev => prev + 1), 300)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setIsLoading(false), 800)
      return () => clearTimeout(timer)
    }
  }, [loadStep])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // MAC BROWSER ANIMATION SEQUENCE
  useEffect(() => {
    if (currentPage !== 'home' || isLoading) return
    setTypedUrl('')
    setShowCards(false)
    let i = 0
    const typingInterval = setInterval(() => {
      setTypedUrl(fullUrl.slice(0, i + 1))
      i++
      if (i === fullUrl.length) {
        clearInterval(typingInterval)
        setTimeout(() => setShowCards(true), 800)
      }
    }, 150)
    return () => clearInterval(typingInterval)
  }, [currentPage, isLoading])

  // SCROLL TRIGGER FOR STATS ANIMATION
  useEffect(() => {
    if (currentPage !== 'why-us') return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.2 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [currentPage])

  // NUMBER COUNTING LOGIC
  useEffect(() => {
    if (!statsVisible) return
    let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0
    const interval = setInterval(() => {
      let done = true
      if (c1 < 42.9) { c1 = Math.min(c1 + 1, 42.9); done = false }
      if (c2 < 39.7) { c2 = Math.min(c2 + 1, 39.7); done = false }
      if (c3 < 59.4) { c3 = Math.min(c3 + 1, 59.4); done = false }
      if (c4 < 15) { c4 += 1; done = false }
      if (c5 < 82) { c5 += 1; done = false }
      if (c6 < 30) { c6 += 2; done = false }
      setCounts({ stat1: parseFloat(c1.toFixed(1)), stat2: parseFloat(c2.toFixed(1)), stat3: parseFloat(c3.toFixed(1)), stat4: c4, stat5: c5, stat6: c6 })
      if (done) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [statsVisible])

  // NAVIGATION HELPERS
  const navigateTo = (page: 'home' | 'why-us' | 'services', sectionId?: string) => {
    setCurrentPage(page)
    setMenuOpen(false)
    if (!sectionId) {
      window.scrollTo(0, 0)
    } else {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const scrollToPricing = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home')
      setTimeout(() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const scrollToContact = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home')
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  // TESTIMONIAL SLIDER LOGIC
  const testimonials = [
    { quote: "I was losing bookings because people couldn't find me online. Now the website does the work while I'm with clients.", author: 'Naledi Mokoena', role: "Owner, Naledi's Hair Studio", metric: '3x more bookings', initial: 'N' },
    { quote: "Dovlix built me a booking system that sends confirmations automatically. I used to spend 2 hours a day on WhatsApp. Now it's zero.", author: 'Sipho Dlamini', role: 'Founder, SparkleClean Services', metric: '10hrs/week saved', initial: 'S' },
    { quote: "My old website looked cheap. Clients judged me before they even called. Now I look like a real business.", author: 'Riaan van der Merwe', role: 'Owner, Van der Merwe Plumbing', metric: 'Professional presence', initial: 'R' },
    { quote: "I was scared of the monthly fee. But one new client covers it. I got three in the first month.", author: 'Zanele Khumalo', role: "Owner, Zee's Catering", metric: '3 new clients', initial: 'Z' },
    { quote: "The free audit alone was worth it. He told me exactly what was wrong and how to fix it.", author: 'Fatima Patel', role: "Owner, Fatima's Fabric & Tailoring", metric: 'Trust built', initial: 'F' },
  ]

  const nextTestimonial = useCallback(() => setCurrentTestimonial((p) => (p + 1) % testimonials.length), [testimonials.length])
  const prevTestimonial = useCallback(() => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length), [testimonials.length])

  useEffect(() => {
    const t = setInterval(nextTestimonial, 6000)
    return () => clearInterval(t)
  }, [nextTestimonial])

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragStartX(clientX)
  }
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragOffset(clientX - dragStartX)
  }
  const handleDragEnd = () => {
    if (!isDragging) return
    if (dragOffset < -50) nextTestimonial()
    else if (dragOffset > 50) prevTestimonial()
    setIsDragging(false)
    setDragOffset(0)
  }

  const tm = testimonials[currentTestimonial]

  // FORM SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')
    const formPayload = new FormData()
    formPayload.append('access_key', 'd7491172-e669-4746-8755-8ed0e4eb5c61')
    formPayload.append('name', formData.name)
    formPayload.append('email', formData.email)
    formPayload.append('message', formData.message)
    formPayload.append('subject', 'New Dovlix Enquiry')
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formPayload })
      const data = await response.json()
      if (data.success) {
        setFormStatus('sent')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setFormStatus('idle'), 5000)
      } else {
        setFormStatus('idle')
      }
    } catch {
      setFormStatus('idle')
    }
  }

  // DATA ARRAYS
  const services = [
    { icon: <Globe size={22} />, title: 'Professional Websites', desc: 'High-performance business websites built to convert visitors into paying customers.' },
    { icon: <Zap size={22} />, title: 'Business Automation', desc: 'Bookings, follow-ups, invoicing — running silently while you focus on growth.' },
    { icon: <Bot size={22} />, title: 'AI Agents & Chatbots', desc: 'WhatsApp bots and web assistants that capture leads and book appointments 24/7.' },
    { icon: <TrendingUp size={22} />, title: 'SEO & Growth', desc: 'Get found on Google. Organic search traffic turned into predictable revenue.' },
    { icon: <Layers size={22} />, title: 'Marketing Assets', desc: 'Branded content that makes your business look world-class.' },
    { icon: <Star size={22} />, title: 'Content Creation', desc: 'Social graphics, short-form video editing, email newsletters, and blog posts.' },
    { icon: <Shield size={22} />, title: 'Security & Maintenance', desc: 'SSL certificates, DDoS protection, daily backups, and ongoing updates.' },
    { icon: <Rocket size={22} />, title: 'Digital Strategy', desc: 'We map your goals, audience, and budget into a clear roadmap.' },
  ]

  const tiers = [
    { name: 'Launch', price: '3,500', monthly: '350', features: ['3-page custom website', 'Mobile responsive', 'Contact form', 'Basic SEO setup', 'Domain & hosting', '1 revision round'], popular: false, icon: <Rocket size={20} /> },
    { name: 'Grow', price: '7,500', monthly: '650', features: ['Everything in Launch', '5-7 page website', 'Booking system/lead capture', 'WhatsApp integration', '3 pro emails', 'Google Business Profile'], popular: true, icon: <TrendingUp size={20} /> },
    { name: 'Elevate', price: '14,000', monthly: '1,100', features: ['Everything in Grow', 'Unlimited pages', 'Custom AI chatbot', 'Advanced automation', 'Client portal', 'Analytics dashboard'], popular: false, icon: <Sparkles size={20} /> },
  ]

  const faqs = [
    { q: "How long does a website take to build?", a: "Most projects kick off within 24–48 hours of our first conversation. A standard website takes 1–2 weeks to design, build, and launch. More complex systems with automation or AI take 2–4 weeks." },
    { q: "Do I own the website and domain?", a: "Yes, 100%. Once the final payment is made, the website, domain, and all the code belong entirely to you. We don't hold your business hostage." },
    { q: "How does the payment structure work?", a: "We require a full deposit upfront to secure your spot in our build queue and begin the design phase. This ensures we are fully committed to your project from day one. There are no surprise fees later." },
    { q: "What does the monthly fee actually cover?", a: "The monthly fee covers cloud hosting, SSL security certificates, daily backups, minor content updates, and ongoing technical support. It ensures your site stays fast, secure, and online." },
    { q: "Are there any hidden costs?", a: "No. We believe in transparent pricing. The once-off build fee and the monthly hosting fee are exactly what you see on our pricing page." },
    { q: "Can I cancel the monthly plan?", a: "Yes, you can cancel your monthly hosting and maintenance plan at any time with 30 days' notice. If you cancel, we will hand over all the website files to you." },
    { q: "Can you help if I already have a website?", a: "Absolutely. We can audit your current site, modernise the design, improve the speed, or add automation and AI tools to your existing setup." },
    { q: "Do you do SEO and Google Ads?", a: "We build every site with basic SEO (titles, descriptions, Google indexing) so you are ready to be found. We also offer ongoing SEO retainers and can manage Google Ads campaigns as a separate service." },
    { q: "Who writes the content and takes the photos?", a: "We can do either. If you have your own text and photos, we will use them. If you don't, we offer content creation and copywriting as an add-on. We also use high-quality premium stock imagery." },
    { q: "How do we communicate during the project?", a: "We keep it simple. We use WhatsApp for quick updates and questions, and email for sending formal designs and proposals." },
    { q: "What happens if I want to change something after the site is live?", a: "If you are on a monthly managed plan, minor text and image changes are included. For major design changes, we will send you a quick, transparent quote." },
    { q: "Will an AI chatbot make my business sound robotic?", a: "Not at all. We train the AI using your specific business information, tone of voice, and FAQs. It acts like a smart, polite receptionist that knows your business inside and out." },
  ]

  const letters = ['D', 'O', 'V', 'L', 'I', 'X']

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex gap-2 text-5xl md:text-7xl font-bold tracking-tight">
          {letters.map((char, i) => (
            <span key={i} className={`transition-all duration-500 ease-out ${i < loadStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className={i < 3 ? 'text-slate-900' : 'text-blue-800'}>{char}</span>
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-blue-100 selection:text-blue-900" style={{fontFamily: 'Inter, system-ui, sans-serif', scrollBehavior: 'smooth'}}>
      
      <style>{`
        .page-transition { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .scroll-reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* FLOATING WHATSAPP BUTTON */}
      <a href="https://wa.me/27662135026" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300 group" aria-label="Chat on WhatsApp">
        <MessageCircle size={28} className="group-hover:animate-pulse" />
      </a>

      {/* NAVBAR */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || currentPage !== 'home' ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'}`}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-1 focus:outline-none">
            <span className="text-xl font-bold tracking-tight text-slate-900">DOV<span className="text-blue-800">LIX</span></span>
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <button onClick={() => navigateTo('services')} className={`hover:text-blue-800 transition-colors ${currentPage === 'services' ? 'text-blue-800 font-medium' : ''}`}>Services</button>
            <button onClick={() => navigateTo('why-us')} className={`hover:text-blue-800 transition-colors ${currentPage === 'why-us' ? 'text-blue-800 font-medium' : ''}`}>Why Us</button>
            <button onClick={scrollToPricing} className="hover:text-blue-800 transition-colors">Pricing</button>
            <button onClick={() => navigateTo('services', 'faq-section')} className="hover:text-blue-800 transition-colors">FAQ</button>
            <button onClick={scrollToContact} className="hover:text-blue-800 transition-colors">Contact</button>
          </div>
          <button onClick={scrollToContact} className="hidden md:inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all">
            Get Started <ArrowRight size={14} />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-900 p-2">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-6 py-6 flex flex-col gap-5">
            <button onClick={() => navigateTo('services')} className="text-left text-slate-600 hover:text-blue-800 text-sm">Services</button>
            <button onClick={() => navigateTo('why-us')} className="text-left text-slate-600 hover:text-blue-800 text-sm">Why Us</button>
            <button onClick={scrollToPricing} className="text-left text-slate-600 hover:text-blue-800 text-sm">Pricing</button>
            <button onClick={() => navigateTo('services', 'faq-section')} className="text-left text-slate-600 hover:text-blue-800 text-sm">FAQ</button>
            <button onClick={scrollToContact} className="text-left text-slate-600 hover:text-blue-800 text-sm">Contact</button>
            <button onClick={scrollToContact} className="bg-blue-800 text-white px-5 py-3 rounded-lg text-center text-sm font-medium">Get Started</button>
          </div>
        )}
      </nav>

      {/* --- PAGE: HOME --- */}
      {currentPage === 'home' && (
        <div className="page-transition">
          <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-blue-50/50 via-white to-white">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-xs text-blue-800 mb-10">
                <Shield size={12} /> Digital transformation for businesses ready to grow
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-slate-900 tracking-tight leading-tight mb-8">
                We build the <span className="text-blue-800 font-normal">digital engine</span><br />behind your business.
              </h1>
              
              <div className="w-full max-w-2xl mx-auto mt-10 mb-16 rounded-xl overflow-hidden shadow-2xl shadow-blue-200/50 border border-slate-200 bg-white">
                <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 ml-4 bg-white rounded-md border border-slate-200 px-3 py-1 flex items-center gap-2">
                    <Shield size={12} className="text-slate-400" />
                    <span className="text-xs text-slate-600 font-mono">
                      {typedUrl}
                      <span className="animate-pulse">|</span>
                    </span>
                  </div>
                </div>
                <div className="bg-slate-50 h-[240px] flex items-center justify-center relative overflow-hidden">
                  {!showCards && (
                    <div className="text-slate-400 flex flex-col items-center gap-3">
                      <div className="w-6 h-6 border-2 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs font-light">Connecting...</span>
                    </div>
                  )}
                  {showCards && (
                    <div className="flex gap-4 px-6 w-full animate-[slideUpFade_0.8s_ease-out_forwards]">
                      {['Websites', 'Automation', 'AI Agents'].map((item, i) => (
                        <div key={i} className="flex-1 bg-white border border-blue-100 shadow-sm rounded-lg p-4 text-center" style={{ animationDelay: `${i * 150}ms` }}>
                          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-800">
                            {i === 0 ? <Globe size={16} /> : i === 1 ? <Zap size={16} /> : <Bot size={16} />}
                          </div>
                          <p className="text-xs font-semibold text-slate-800">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigateTo('services')} className="inline-flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-7 py-3.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-200">
                  Explore Services <ArrowRight size={16} />
                </button>
                <a href="https://wa.me/27662135026" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 px-7 py-3.5 rounded-lg text-sm font-medium transition-all">
                  <MessageCircle size={16} /> WhatsApp Us
                </a>
              </div>
            </div>
          </section>

          <section className="py-24 bg-white">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Welcome to Dovlix</p>
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">Who is Dovlix?</h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-8">
                We are a South African digital agency that builds the digital engine behind your business. We don't just make things look good — we build systems that work. Every project is engineered to save you time, bring in more clients, and run smoothly without constant attention from you. We take the tech off your plate so you can focus on what you do best.
              </p>
              <button onClick={() => navigateTo('why-us')} className="inline-flex items-center gap-2 text-blue-800 font-medium hover:text-blue-900 transition-colors">
                Read our full story <ArrowRight size={16} />
              </button>
            </div>
          </section>

          <section className="py-24 bg-slate-50 border-y border-slate-200">
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center mb-16">
                <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Our Core Services</p>
                <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">What We Build For You</h2>
                <p className="text-slate-500 text-base font-light max-w-2xl mx-auto">We engineer digital ecosystems that automate your admin, capture more clients, and modernise how your business operates.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-800 mb-6"><Globe size={24} /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Websites</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">A high-performance website built to convert visitors into paying customers. We design mobile-first, fast-loading sites that make your business look credible and professional.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-800 mb-6"><Zap size={24} /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Business Automation</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Bookings, follow-ups, and invoicing running silently in the background. We connect your tools so you can stop doing manual admin and focus on growing your business.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-800 mb-6"><Bot size={24} /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">AI Agents & Chatbots</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">WhatsApp bots and web assistants that capture leads and book appointments 24/7. Never miss a potential client again, even when your office is closed.</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-16">
                <div className="text-center mb-10">
                  <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-2">Proof of Work</p>
                  <h3 className="text-3xl font-light text-slate-900 mb-4">See the Digital Engine in Action</h3>
                  <p className="text-slate-500 text-base font-light max-w-2xl mx-auto">Watch the concept rundown of how we build high-converting websites and automated systems for Sales & Service businesses.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <a href="https://youtu.be/MHD1K_ViwCo" target="_blank" rel="noopener noreferrer" className="group block relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-blue-300 transition-all duration-500">
                    <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="flex-1 ml-4 bg-white rounded-md border border-slate-200 px-3 py-1 flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-mono">youtube.com/watch?v=MHD1K_ViwCo</span>
                      </div>
                    </div>
                    <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-80 group-hover:opacity-60 transition-opacity"></div>
                      <div className="relative z-10 w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <Play size={32} className="text-white ml-1" fill="currentColor" />
                      </div>
                      <p className="absolute bottom-6 text-white font-medium text-lg">Watch the Concept Rundown</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="pricing" className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-16 text-center">
                <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Investment</p>
                <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">Transparent Pricing</h2>
                <p className="text-slate-500 text-base font-light max-w-xl mx-auto">Every business is different. These tiers give you a starting point — we'll tailor the final proposal to your needs.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {tiers.map((tier, i) => (
                  <div key={i} className={`relative bg-white border rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${tier.popular ? 'border-blue-400 shadow-xl shadow-blue-100 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-200 hover:shadow-lg'}`}>
                    {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-800 text-white px-4 py-1 rounded-full text-xs font-semibold">MOST POPULAR</div>}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-800">{tier.icon}</div>
                      <h3 className="text-xl font-semibold text-slate-900">{tier.name}</h3>
                    </div>
                    <div className="mb-6"><span className="text-4xl font-light text-slate-900">R{tier.price}</span><span className="text-slate-500 text-sm"> once-off</span></div>
                    <div className="mb-6 pb-6 border-b border-slate-100"><span className="text-lg font-medium text-blue-800">R{tier.monthly}</span><span className="text-slate-500 text-sm"> /month</span></div>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />{f}</li>
                      ))}
                    </ul>
                    <button onClick={scrollToContact} className={`block w-full text-center py-3 rounded-lg font-medium text-sm transition-all ${tier.popular ? 'bg-blue-800 text-white hover:bg-blue-900 shadow-lg shadow-blue-200' : 'border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-800'}`}>Get Started</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-slate-50 border-y border-slate-200">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-16 text-center">
                <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Testimonials</p>
                <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">The Feeling of Transformation</h2>
              </div>
              <div className="relative mx-auto max-w-3xl">
                <div onMouseDown={handleDragStart} onMouseMove={handleDragMove} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd} onTouchStart={handleDragStart} onTouchMove={handleDragMove} onTouchEnd={handleDragEnd} className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm cursor-grab active:cursor-grabbing select-none" style={{ transform: `translateX(${dragOffset * 0.3}px)`, transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}>
                  <Quote className="text-blue-200 mb-6" size={32} />
                  <p className="text-lg md:text-xl font-light leading-relaxed text-slate-700 mb-8 italic">"{tm.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium text-base">{tm.initial}</div>
                    <div><p className="text-sm font-medium text-slate-900">{tm.author}</p><p className="text-xs text-slate-500 font-light">{tm.role}</p></div>
                    <div className="ml-auto bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-medium text-blue-800">{tm.metric}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className="flex gap-1.5">{testimonials.map((_, i) => (<button key={i} onClick={() => setCurrentTestimonial(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-8 bg-blue-800' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`} />))}</div>
                  <div className="flex gap-1.5">
                    <button onClick={prevTestimonial} className="p-1.5 rounded-lg border border-slate-200 hover:border-blue-300 text-slate-500 hover:text-blue-800 transition-colors"><ChevronLeft size={16} /></button>
                    <button onClick={nextTestimonial} className="p-1.5 rounded-lg border border-slate-200 hover:border-blue-300 text-slate-500 hover:text-blue-800 transition-colors"><ChevronRight size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-16 text-center">
                <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Contact</p>
                <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">Let's Build Something</h2>
                <p className="text-slate-500 text-base font-light">One conversation. No obligation. Just clarity.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div>
                  {formStatus === 'sent' ? (
                    <div className="bg-slate-50 border border-green-200 rounded-2xl p-10 text-center h-full flex flex-col justify-center items-center">
                      <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5"><CheckCircle size={28} className="text-green-600" /></div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Your enquiry has been submitted</h4>
                      <p className="text-slate-500 text-sm font-light">We will contact you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-white border border-slate-200 focus:border-blue-400 rounded-lg px-4 py-3.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition-colors font-light" />
                      <input type="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full bg-white border border-slate-200 focus:border-blue-400 rounded-lg px-4 py-3.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition-colors font-light" />
                      <textarea placeholder="Tell us about your business..." rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="w-full bg-white border border-slate-200 focus:border-blue-400 rounded-lg px-4 py-3.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition-colors resize-none font-light" />
                      <button type="submit" disabled={formStatus === 'sending'} className="w-full py-3.5 rounded-lg text-sm font-medium bg-blue-800 hover:bg-blue-900 text-white transition-all shadow-lg shadow-blue-200 disabled:opacity-50">{formStatus === 'sending' ? 'Submitting...' : 'Send Message'}</button>
                    </form>
                  )}
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Or reach us directly</h3>
                  <a href="tel:0662135026" className="flex items-center gap-4 bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-xl p-4 transition-all group">
                    <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-blue-800 group-hover:bg-blue-800 group-hover:text-white transition-all"><Phone size={18} /></div>
                    <div><p className="text-sm font-medium text-slate-900">Call Us</p><p className="text-xs text-slate-500 font-light">066 213 5026</p></div>
                  </a>
                  <a href="mailto:info@dovlix.com" className="flex items-center gap-4 bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-xl p-4 transition-all group">
                    <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-blue-800 group-hover:bg-blue-800 group-hover:text-white transition-all"><Mail size={18} /></div>
                    <div><p className="text-sm font-medium text-slate-900">Email Us</p><p className="text-xs text-slate-500 font-light">info@dovlix.com</p></div>
                  </a>
                  <a href="https://wa.me/27662135026" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-xl p-4 transition-all group">
                    <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-blue-800 group-hover:bg-blue-800 group-hover:text-white transition-all"><MessageCircle size={18} /></div>
                    <div><p className="text-sm font-medium text-slate-900">WhatsApp</p><p className="text-xs text-slate-500 font-light">066 213 5026</p></div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* --- PAGE: SERVICES --- */}
      {currentPage === 'services' && (
        <div className="page-transition pt-32 pb-24 min-h-screen bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Capabilities</p>
              <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">What We Build For You</h1>
              <p className="text-slate-500 text-base font-light max-w-2xl mx-auto">We don't just build websites. We engineer digital ecosystems that automate your admin, capture more clients, and modernise how your business operates.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-800 mb-6">{s.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div id="faq-section" className="mt-32 pt-16 border-t border-slate-200 max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Got Questions?</p>
                <h2 className="text-3xl font-light text-slate-900">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                      <span className="font-medium text-slate-900">{faq.q}</span>
                      <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 text-center">
              <button onClick={scrollToContact} className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-xl text-base font-medium transition-all shadow-lg shadow-blue-200">
                Discuss Your Project <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PAGE: WHY US --- */}
      {currentPage === 'why-us' && (
        <div className="page-transition pt-32 pb-24 min-h-screen bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">The Reality</p>
              <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">Why You Need Dovlix</h1>
              <p className="text-slate-500 text-base font-light max-w-2xl mx-auto">The numbers don't lie. South African businesses are losing customers every day because they are invisible online.</p>
            </div>

            <div ref={statsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
              <div className={`bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm scroll-reveal ${statsVisible ? 'visible' : ''}`}>
                <p className="text-5xl font-light text-blue-800 mb-3">{counts.stat1}%</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">of South African small businesses have no real website</p>
                <p className="text-slate-400 text-xs font-light">Watts Digital, 2026</p>
              </div>
              <div className={`bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm scroll-reveal ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
                <p className="text-5xl font-light text-blue-800 mb-3">{counts.stat2}%</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">have no web presence at all — no site, no social page</p>
                <p className="text-slate-400 text-xs font-light">Watts Digital, 2026</p>
              </div>
              <div className={`bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm scroll-reveal ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                <p className="text-5xl font-light text-blue-800 mb-3">{counts.stat3}%</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">of businesses in small towns are invisible online</p>
                <p className="text-slate-400 text-xs font-light">Watts Digital, 2026</p>
              </div>
              <div className={`bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm scroll-reveal ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                <p className="text-5xl font-light text-blue-800 mb-3">+{counts.stat4}%</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">growth in online sales while traditional sales stay flat</p>
                <p className="text-slate-400 text-xs font-light">SACCI, 2025</p>
              </div>
              <div className={`bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm scroll-reveal ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
                <p className="text-5xl font-light text-blue-800 mb-3">{counts.stat5}%</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">of consumers look up a business online before deciding</p>
                <p className="text-slate-400 text-xs font-light">Industry Data, 2026</p>
              </div>
              <div className={`bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm scroll-reveal ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '500ms' }}>
                <p className="text-5xl font-light text-blue-800 mb-3">&lt;{counts.stat6}min</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">is all the time you have to win a customer online</p>
                <p className="text-slate-400 text-xs font-light">BrightLocal, 2026</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-12 mb-20">
              <div className={`bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm scroll-reveal ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
                <h3 className="text-2xl font-light text-slate-900 mb-4">The Risk of Waiting</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  When a potential customer searches for a service you offer, they almost always choose one of the first three businesses they find. If you don't have a website, or if it looks outdated, you are instantly handing those clients to your competitors.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
                    <p className="text-4xl font-light text-red-500 mb-2">5-20</p>
                    <p className="text-slate-600 text-sm">potential clients lost every month</p>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
                    <p className="text-4xl font-light text-red-500 mb-2">R0</p>
                    <p className="text-slate-600 text-sm">earned online without a system</p>
                  </div>
                </div>
              </div>

              <div className={`bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm scroll-reveal ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '700ms' }}>
                <h3 className="text-2xl font-light text-slate-900 mb-4">How Dovlix Changes the Game</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  We don't just build a website; we build a digital engine that works for you 24/7. We combine high-converting design with automation and AI to ensure you capture every lead and operate more efficiently. 
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3"><CheckCircle className="text-blue-800 shrink-0 mt-0.5" size={20} /><span className="text-slate-600"><strong className="text-slate-900">Capture more leads:</strong> A modern website builds instant trust.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="text-blue-800 shrink-0 mt-0.5" size={20} /><span className="text-slate-600"><strong className="text-slate-900">Save time:</strong> Automation handles bookings and follow-ups.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="text-blue-800 shrink-0 mt-0.5" size={20} /><span className="text-slate-600"><strong className="text-slate-900">Never miss out:</strong> AI chatbots answer questions at 2 AM.</span></li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button onClick={scrollToContact} className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-xl text-base font-medium transition-all shadow-lg shadow-blue-200">
                Let's Modernise Your Business <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:flex md:items-center md:justify-between">
          <button onClick={() => navigateTo('home')} className="text-lg font-bold tracking-tight mb-6 md:mb-0 text-slate-900 focus:outline-none">DOV<span className="text-blue-800">LIX</span></button>
          <div className="flex flex-wrap gap-8 text-xs text-slate-500 font-light">
            <button onClick={() => navigateTo('services')} className="hover:text-blue-800 transition-colors">Services</button>
            <button onClick={() => navigateTo('why-us')} className="hover:text-blue-800 transition-colors">Why Us</button>
            <button onClick={scrollToPricing} className="hover:text-blue-800 transition-colors">Pricing</button>
            <button onClick={() => navigateTo('services', 'faq-section')} className="hover:text-blue-800 transition-colors">FAQ</button>
            <button onClick={scrollToContact} className="hover:text-blue-800 transition-colors">Contact</button>
          </div>
          <div className="mt-6 md:mt-0 text-xs text-slate-500 font-light">
            <a href="mailto:info@dovlix.com" className="hover:text-blue-800 transition-colors">info@dovlix.com</a>
          </div>
        </div>
        <div className="border-t border-slate-100 py-5 text-center text-[10px] text-slate-400 font-light">© 2026 Dovlix Solutions. Engineered in South Africa.</div>
      </footer>

    </div>
  )
}