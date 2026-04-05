/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Menu, 
  X,
  GraduationCap,
  Award,
  Clock,
  IndianRupee,
  ArrowRight,
  FileText,
  Download,
  Image as ImageIcon,
  Bell,
  Calendar,
  Facebook,
  Instagram,
  Youtube,
  Twitter
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform, animate } from 'motion/react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Counter = ({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [rounded]);

  return (
    <motion.span
      onViewportEnter={() => {
        if (!hasAnimated) {
          animate(count, value, { duration, ease: "easeOut" });
          setHasAnimated(true);
        }
      }}
    >
      {displayValue}{suffix}
    </motion.span>
  );
};

const RippleButton = ({ children, className, onClick, href, ...props }: any) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    if (onClick) onClick(event);
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      className={`relative overflow-hidden inline-flex items-center justify-center ${className}`}
      onClick={createRipple}
      {...props}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: ripple.y,
              left: ripple.x,
              width: 20,
              height: 20,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const AuraBlob = ({ className, color }: { className?: string; color: string }) => (
    <div className={`aura-blob animate-float ${className}`} style={{ backgroundColor: color, width: '400px', height: '400px' }} />
  );

  // Handle scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'SAPT 2026-27', href: '#sapt' },
    { name: 'Courses', href: '#courses' },
    { name: 'Scholarship', href: '#scholarship' },
    { name: 'Results', href: '#results' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const scholarshipData = [
    { class: '4th', total: 24000, r1_3: 15600, r4_10: 16800, r11_25: 18000, r26_50: 19200 },
    { class: '5th', total: 26000, r1_3: 16900, r4_10: 18200, r11_25: 19500, r26_50: 20800 },
    { class: '6th', total: 28000, r1_3: 18200, r4_10: 19600, r11_25: 21000, r26_50: 22400 },
    { class: '7th', total: 30000, r1_3: 19500, r4_10: 21000, r11_25: 22500, r26_50: 24000 },
    { class: '8th', total: 32000, r1_3: 20800, r4_10: 22400, r11_25: 24000, r26_50: 25600 },
    { class: '9th', total: 34000, r1_3: 22100, r4_10: 23800, r11_25: 25500, r26_50: 27200 },
    { class: '10th', total: 36000, r1_3: 23400, r4_10: 25200, r11_25: 27000, r26_50: 28800 },
  ];

  const syllabusData = [
    { class: 'III', subjects: 'Science: World of Plants, Animals, Air and Water, Human Body. Maths: Number System, Addition, Subtraction, Multiplication, Division. Reasoning: Coding-Decoding, Series, Patterns, Classification.' },
    { class: 'IV', subjects: 'Science: Plants and Animals, Human Body and Health, Work, Force and Energy. Maths: Number System, Factors and Multiples, Time and Calendar, Area and Measurement. Reasoning: Coding-Decoding, Series, Patterns, Classification.' },
    { class: 'V', subjects: 'Science: Plants and Animals, Human Body and Health, Light and Sound. Maths: Addition and Subtraction, LCM and HCF, Lines and Angles, Perimeter and Area. Reasoning: Coding-Decoding, Series, Patterns, Classification.' },
    { class: 'VI', subjects: 'Science: Components of Food, Separation of Substances, Body Movements, Motion. Maths: Knowing Our Numbers, Integers, Mensuration, Algebra, Ratio and Proportion. Reasoning: Series, Classification, Blood Relation Test, Patterns.' },
    { class: 'VII', subjects: 'Science: Nutrition in Plants and Animals, Fibre to Fabric, Acids, Bases and Salts. Maths: Fractions and Decimals, Comparing Quantities, Perimeter and Area, Algebraic Expressions. Reasoning: Coding-Decoding, Series, Blood Relation Test, Patterns.' },
    { class: 'VIII', subjects: 'Science: Microorganisms, Friends and Foes, Reproduction in Animals, Force and Pressure. Maths: Rational Numbers, Linear Equations in One Variable, Mensuration, Exponents and Powers. Reasoning: Series, Coding-Decoding, Blood Relation, Arithmetic Reasoning.' },
    { class: 'IX', subjects: 'Science: Gravitation, Force and Laws of Motion, Atoms and Molecules, Is Matter Around Us Pure. Maths: Number System, Polynomials, Quadrilaterals, Surface Area and Volume. Reasoning: Venn Diagram, Blood Relation Test, Series, Direction, Coding-Decoding.' },
    { class: 'X', subjects: 'Science: Life Processes, Light – Reflection and Refraction, Electricity, Carbon and Its Compounds. Maths: Surface Area and Volume, Trigonometry and Its Applications, Arithmetic Progressions. Reasoning: Coding-Decoding, Series, Blood Relation Test, Direction, Dice.' },
  ];

  const starAlumni = [
    { name: 'Soumya Yadav', college: 'MBBS, SNMC Agra' },
    { name: 'Tanu Gaur', college: 'MBBS, Sarojini Naidu Medical College' },
    { name: 'Riya Singh', college: 'IIT UNA (B.Tech)' },
    { name: 'Amol Gaur', college: 'B.Tech (CS), IIT Jodhpur' },
    { name: 'Madhur Sharma', college: 'B.Tech, IIT Kharagpur' },
    { name: 'Aman Sharma', college: 'B.Tech, IIT BHU' },
  ];

  const courses = [
    { 
      title: 'Regular Coaching', 
      desc: 'Class 4th to 10th (All Subjects) – Strong School & Board Foundation.', 
      icon: <BookOpen className="w-8 h-8 text-primary" /> 
    },
    { 
      title: 'AMU Entrance', 
      desc: 'Preparation for Class 6th, 9th & 11th with complete syllabus coverage.', 
      icon: <GraduationCap className="w-8 h-8 text-primary" /> 
    },
    { 
      title: 'Sainik School Entrance', 
      desc: 'Comprehensive coaching for written exams and interview guidance.', 
      icon: <Award className="w-8 h-8 text-primary" /> 
    },
    { 
      title: 'JNV Entrance Coaching', 
      desc: 'Complete preparation for Jawahar Navodaya Vidyalaya entrance exams.', 
      icon: <CheckCircle className="w-8 h-8 text-primary" /> 
    },
    { 
      title: 'BHU & JMI Entrance', 
      desc: 'Concept-based study with rigorous test series for BHU and JMI.', 
      icon: <Trophy className="w-8 h-8 text-primary" /> 
    },
    { 
      title: 'Olympiad Preparation', 
      desc: 'Competitive level training for Maths, Science, and English Olympiads.', 
      icon: <Users className="w-8 h-8 text-primary" /> 
    },
    { 
      title: 'Weekly Test Series', 
      desc: 'Regular assessment to track progress and improve performance.', 
      icon: <Calendar className="w-8 h-8 text-primary" /> 
    },
    { 
      title: 'Doubt Clearing Sessions', 
      desc: 'Personalized attention to resolve every student\'s academic queries.', 
      icon: <MessageCircle className="w-8 h-8 text-primary" /> 
    },
  ];

  const galleryImages = [
    { title: 'Classroom Session', category: 'Classroom', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop' },
    { title: 'Annual Prize Distribution', category: 'Events', img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop' },
    { title: 'Science Exhibition', category: 'Events', img: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800&auto=format&fit=crop' },
    { title: 'Interactive Learning', category: 'Classroom', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop' },
    { title: 'Modern Classroom Session', category: 'Classroom', img: '/images/modern-classroom.png' },
    { title: 'Cultural Program', category: 'Events', img: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=800&auto=format&fit=crop' },
    { title: 'Topper Celebration', category: 'Achievements', img: '/images/achieve-2.jpeg' },
    { title: 'Award Ceremony', category: 'Achievements', img: '/images/achieve-3.jpeg' },
    { title: 'Medal Winners', category: 'Achievements', img: '/images/achieve-4.jpeg' },
    { title: 'Outstanding Performance', category: 'Achievements', img: '/images/achieve-5.jpeg' },
  ];

  const galleryCategories = [
    { name: 'Achievements', img: '/images/achieve-2.jpeg', count: galleryImages.filter(img => img.category === 'Achievements').length },
    { name: 'Classroom', img: '/images/modern-classroom.png', count: galleryImages.filter(img => img.category === 'Classroom').length },
    { name: 'Events', img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop', count: galleryImages.filter(img => img.category === 'Events').length },
  ];

  const results = [
    { name: 'Aryan Sharma', exam: 'AMU Entrance', score: 'Selected (Class 9)', year: '2025' },
    { name: 'Priya Verma', exam: 'Sainik School', score: 'Qualified', year: '2025' },
    { name: 'Rahul Gupta', exam: 'Class 10 Board', score: '98.4%', year: '2024' },
    { name: 'Sneha Singh', exam: 'JNV Entrance', score: 'Selected', year: '2024' },
    { name: 'Harsh Vardhan', exam: 'AMU Entrance', score: 'Selected (Class 6)', year: '2025' },
    { name: 'Kavya Singh', exam: 'AMU Entrance', score: 'Selected (Class 9)', year: '2025' },
  ];

  const testimonials = [
    { name: 'Amit Kumar', role: 'AMU Aspirant', text: 'The faculty here is amazing. They make complex concepts so easy to understand. Highly recommended for AMU entrance prep!' },
    { name: 'Dr. S.P. Singh', role: 'Parent', text: 'My son showed significant improvement in his mock tests within 3 months of joining JMD Saksham for Sainik School prep.' },
    { name: 'Anjali Sharma', role: 'Class 10 Topper', text: 'The small batch size allowed me to clear all my doubts instantly. The study material for boards is top-notch.' },
  ];

  const faqs = [
    { q: 'What are the batch timings?', a: 'We offer Afternoon Batches (12:00 PM – 3:00 PM) and Evening Batches (3:00 PM – 7:00 PM). Doubt classes are as per schedule.' },
    { q: 'What is the mode of teaching?', a: 'Our primary mode is Offline Classroom Teaching, supplemented by Online Support (Notes, Test Updates, and Doubts via WhatsApp).' },
    { q: 'What is the fee structure?', a: 'Fees are not publicly displayed. For detailed fee information, please contact the institute directly or visit our campus.' },
    { q: 'Do you conduct regular tests?', a: 'Yes, we have a Weekly Test Series & Performance Analysis to track every student\'s progress.' },
  ];

  const whyUs = [
    { title: 'Expert Faculty', desc: 'Highly experienced teachers from top institutions.', icon: <Users className="w-10 h-10" /> },
    { title: 'Doubt Sessions', desc: 'Regular + special sessions to ensure no student is left behind.', icon: <MessageCircle className="w-10 h-10" /> },
    { title: 'Test Series', desc: 'Weekly test series with detailed performance analysis.', icon: <Trophy className="w-10 h-10" /> },
    { title: 'Offline Focus', desc: 'Main mode is offline classroom teaching for better interaction.', icon: <MapPin className="w-10 h-10" /> },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />
      
      {/* Background Aura */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <AuraBlob className="top-[-10%] left-[-10%]" color="#1A4FAB" />
        <AuraBlob className="bottom-[-10%] right-[-10%]" color="#F5A623" />
        <AuraBlob className="top-[40%] right-[-5%] opacity-10" color="#1A4FAB" />
      </div>

      {/* Top Bar */}
      <div className="hidden lg:block bg-primary text-white/90 py-3 border-b border-primary-dark/30 relative z-[60] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm font-medium tracking-wide">
          <div className="flex items-center space-x-6">
            <a href="tel:+919756399884" className="flex items-center gap-2 hover:text-white transition-colors group">
              <Phone className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              <span>+91 9756399884</span>
            </a>
            <a href="mailto:jmdsaksham.info@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors group">
              <Mail className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              <span>jmdsaksham.info@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-6 mr-6 border-r border-white/20 pr-6">
              <a href="#about" className="hover:text-white transition-colors">About Us</a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Aligarh, Uttar Pradesh</span>
            </div>
            <div className="flex items-center gap-4 pl-4 border-l border-white/20">
              <span className="text-accent animate-pulse font-bold tracking-widest uppercase text-[10px] bg-white/10 px-3 py-1 rounded-full">Admissions Open 2026-27</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed ${isScrolled ? 'top-0 shadow-lg bg-white/95 backdrop-blur-xl border-b border-slate-200' : 'lg:top-[45px] top-0 bg-white/50 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none border-b border-slate-200 lg:border-none'} left-0 right-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between ${isScrolled ? 'h-16' : 'h-24'} items-center transition-all duration-300`}>
            <div className="flex items-center">
              <a href="#" className="group flex items-center gap-3 md:gap-4 relative z-10">
                <div className={`flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 ${isScrolled ? 'h-14' : 'h-16 md:h-20'}`}>
                  <img src="/images/logo.jpeg" alt="JMD Saksham Classes" className="h-[140%] max-w-none w-auto object-cover rounded-full border-2 border-slate-100 shadow-sm" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-2xl font-bold leading-none tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                    JMD <span className="text-primary">Saksham</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
                    Classes Aligarh
                  </span>
                </div>
              </a>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1 relative z-10">
              {navLinks.filter(link => link.name !== 'About Us').map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="px-4 py-2 text-slate-700 hover:text-primary font-bold text-sm transition-all relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}
              <div className="pl-4 ml-4 border-l border-slate-200">
                <RippleButton 
                  href="https://wa.me/919756399884?text=Hello%20JMD%20Saksham%20Classes,%20I%20am%20interested%20in%20admission.%20Please%20provide%20more%20details." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white hover:bg-primary-dark px-8 py-2.5 rounded-full font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none"
                >
                  Join Now
                  <ArrowRight className="w-4 h-4" />
                </RippleButton>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <a href="tel:+919756399884" className="p-2 bg-primary/10 rounded-full text-primary">
                <Phone className="w-5 h-5" />
              </a>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white border-t border-slate-100 shadow-2xl absolute top-full left-0 right-0"
            >
              <div className="px-4 pt-4 pb-8 space-y-1">
                <div className="grid grid-cols-1 gap-2 px-2 mb-4">
                  <a 
                    href="#about" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center py-3 bg-slate-50 text-sm font-bold text-slate-700 rounded-xl hover:bg-primary hover:text-white transition-all"
                  >
                    About Us
                  </a>
                </div>
                {navLinks.filter(link => link.name !== 'About Us').map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-primary rounded-xl transition-all"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 px-4">
                  <RippleButton 
                    href="https://wa.me/919756399884?text=Hello%20JMD%20Saksham%20Classes,%20I%20am%20interested%20in%20admission.%20Please%20provide%20more%20details." 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all"
                  >
                    Enroll Now
                  </RippleButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* About Us Section (Replaces Home) */}
      <section id="about" className="pt-32 pb-20 md:pt-56 md:pb-40 bg-white relative overflow-hidden min-h-screen flex items-center">
        {/* Abstract Light Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4"></div>
        
        {/* Floating Geometric SVG Animations */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] w-[800px] h-[800px] border-[1px] border-slate-200 rounded-full opacity-50 pointer-events-none"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] right-[5%] w-[1000px] h-[1000px] border-[1px] border-slate-200 border-dashed rounded-full opacity-40 pointer-events-none"
        />
        
        {/* Floating Orbs for extra elegance */}
        <motion.div
           animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/4 left-[10%] w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full shadow-lg opacity-20 blur-[2px]"
        />
        <motion.div
           animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
           transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-1/4 right-[20%] w-24 h-24 bg-gradient-to-br from-accent to-yellow-400 rounded-full shadow-lg opacity-20 blur-[3px]"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="px-4 py-1.5 rounded-full border border-slate-200 bg-white/50 backdrop-blur-md flex items-center gap-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-primary font-bold uppercase tracking-widest text-xs">Serving Since 2012</span>
                </div>
              </motion.div>
              
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter text-slate-900"
              >
                Shaping <br />
                <span className="text-gradient">Bright Futures</span> <br />
                in Aligarh
              </motion.h1>
              
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-12 max-w-xl font-medium">
                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  JMD Saksham Classes is the most trusted coaching centre in Aligarh, established in 2012. Located on GT Road, we have shaped the academic futures of exceptional students for over 12 years.
                </motion.p>
                
                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  We specialize in AMU Entrance Preparation (Class 6th, 9th & 11th), Sainik School Entrance, Jawahar Navodaya Vidyalaya (JNV) Coaching, BHU & JMI Entrance Preparation, and Olympiad Training.
                </motion.p>

                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-bold text-slate-900 text-xl border-l-4 border-accent pl-5 py-2 bg-slate-50 rounded-r-lg">
                  We don't just prepare students for exams. We build confident, capable individuals.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-6 md:p-8 rounded-[2rem] space-y-4 max-w-xl"
              >
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                  <p className="text-slate-700 font-bold text-sm md:text-base">Ramsnehi Dham, Near Suman Hospital, Etah Chungi, GT Road, Aligarh – 202001</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-primary shrink-0" />
                  <p className="text-slate-700 font-bold text-sm md:text-base">+91 9756399884</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="relative hidden lg:block h-[700px] w-full"
            >
              <div className="relative z-10 w-full h-full rounded-[3rem] overflow-hidden glass-card p-3 border border-slate-200 animate-float shadow-2xl shadow-slate-300">
                <img src="/images/professional-students.png" alt="JMD Saksham Classes Aligarh - Best Coaching in Aligarh" className="w-full h-full object-cover rounded-[2.5rem]" />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
              
              <div className="absolute bottom-10 -left-12 glass-card bg-white/95 p-6 rounded-[2rem] z-20 animate-float-delayed flex items-center gap-5 border border-slate-200 shadow-xl">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <Trophy className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-slate-900 tracking-tight">12+ Years</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Of Excellence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SAPT 2026-27 Section */}
      <section id="sapt" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/clean-textile.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-light/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
                Annual Entrance Test
              </span>
              <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.05] text-slate-900">
                SAPT <span className="text-gradient">2026-27</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
                11th Annual Academic Assessment Program - Your Gateway to Excellence
              </p>
              <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mt-10 shadow-sm"></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {[
              { icon: <Trophy className="w-10 h-10 text-primary" />, title: "Benefits", items: ["Academic Fee Benefits up to 35%", "Attractive Prizes for Top Performers", "Merit-Based Recognition Certificates"] },
              { icon: <Clock className="w-10 h-10 text-primary" />, title: "Important Dates", custom: (
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Exam Date</p>
                    <p className="text-2xl font-black text-slate-900">8 Feb 2026</p>
                    <p className="text-sm font-semibold text-slate-500">Sunday, 10:00 AM</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Last Date to Apply</p>
                    <p className="text-2xl font-black text-slate-900">6 Feb 2026</p>
                  </div>
                </div>
              )},
              { icon: <BookOpen className="w-10 h-10 text-primary" />, title: "Test Pattern", items: ["50 Objective Questions", "Duration: 90 Minutes", "Total Marks: 200"] }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="glass-card p-10 rounded-[3rem] glass-card-hover group border-white"
              >
                <div className="bg-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 shadow-inner">
                  {card.icon}
                </div>
                <h3 className="text-3xl font-black mb-6 text-slate-900">{card.title}</h3>
                {card.items ? (
                  <ul className="space-y-4 text-slate-600 font-medium">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : card.custom}
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-[3.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-primary/20"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h3 className="text-4xl font-black mb-8 tracking-tight text-white drop-shadow-sm">Registration <br />Information</h3>
                <p className="text-xl mb-10 font-bold leading-relaxed text-blue-100">Forms available at JMD SAKSHAM CLASSES (Head Office and Branch Office). Secure your spot today!</p>
                <div className="flex flex-wrap gap-8">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">Registration Fee</p>
                    <p className="text-3xl font-black text-white">₹50/- <span className="text-lg font-bold opacity-80">Only</span></p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">Support Call</p>
                    <p className="text-3xl font-black text-white">9756399884</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                <h4 className="text-2xl font-black mb-8 flex items-center gap-3 text-slate-900">
                  <div className="w-2 h-8 bg-accent rounded-full"></div>
                  Marking Pattern
                </h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <span className="font-bold text-lg text-slate-700">Classes III - VII</span>
                    <span className="bg-green-100 text-green-700 border border-green-200 px-4 py-1.5 rounded-full font-black text-sm">+4 / 0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-slate-700">Classes VIII - X</span>
                    <span className="bg-orange-100 text-orange-700 border border-orange-200 px-4 py-1.5 rounded-full font-black text-sm">+4 / -1</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 mt-6 italic">* Correct / Incorrect marking scheme</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px]"></div>
        
        {/* Subtle geometric lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.02]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 L100,50 M50,0 L50,100" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
                Academic Excellence
              </span>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.05]">
                Our <br /><span className="text-gradient">Courses</span>
              </h2>
              <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-8 shadow-sm"></div>
              <p className="text-slate-600 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                Scientifically designed curriculum to bridge the gap between school education and competitive success.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {courses.map((course, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group glass-card p-10 rounded-[3rem] glass-card-hover relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 blur-2xl"></div>
                <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 border border-slate-100 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-500 shadow-inner">
                  {React.cloneElement(course.icon as React.ReactElement, { className: "w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" })}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed text-sm font-medium">{course.desc}</p>
                <a 
                  href="https://wa.me/919756399884?text=Hello%20JMD%20Saksham%20Classes,%20I%20am%20interested%20in%20admission.%20Please%20provide%20more%20details." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-bold text-slate-600 group-hover:gap-6 transition-all group-hover:text-primary"
                >
                  Know More <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship & Fees Section */}
      <section id="scholarship" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
                Merit Based Support
              </span>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.05]">
                Scholarship & <br /><span className="text-gradient">Fee Structure</span>
              </h2>
              <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-8 shadow-sm"></div>
              <p className="text-slate-600 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                Rank-wise scholarship on tuition fees for session 2025-26. We reward excellence.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="overflow-x-auto rounded-[3rem] shadow-xl border border-slate-200 glass-card bg-white"
          >
            <table className="w-full text-left border-collapse bg-transparent">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="p-8 font-black uppercase tracking-widest text-xs">Class</th>
                  <th className="p-8 font-black uppercase tracking-widest text-xs">Total Fee</th>
                  <th className="p-8 font-black uppercase tracking-widest text-xs text-primary">35% Off (R 1-3)</th>
                  <th className="p-8 font-black uppercase tracking-widest text-xs">30% Off (R 4-10)</th>
                  <th className="p-8 font-black uppercase tracking-widest text-xs">25% Off (R 11-25)</th>
                  <th className="p-8 font-black uppercase tracking-widest text-xs">20% Off (R 26-50)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scholarshipData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-8 font-black text-slate-900 text-xl">{row.class}</td>
                    <td className="p-8 text-slate-600 font-bold">₹{row.total.toLocaleString()}</td>
                    <td className="p-8 font-black text-primary text-xl bg-primary/5 transition-colors">₹{row.r1_3.toLocaleString()}</td>
                    <td className="p-8 text-slate-700 font-bold">₹{row.r4_10.toLocaleString()}</td>
                    <td className="p-8 text-slate-700 font-bold">₹{row.r11_25.toLocaleString()}</td>
                    <td className="p-8 text-slate-700 font-bold">₹{row.r26_50.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="mt-12 text-center text-slate-500 text-sm font-bold italic">* ₹4000/- Fixed Charges for Registration and miscellaneous apply. All Rights are Reserved to Management.</p>
        </div>
      </section>

      {/* Academic Plan Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
                Structured Learning
              </span>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-10 tracking-tighter leading-[1.05]">
                Academic Plan <br /><span className="text-gradient">2025-26</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Classes 4th to 7th", desc: "2 Hours/Day | Maths, Science, Social Science, English Grammar", icon: <BookOpen className="w-6 h-6" /> },
                  { title: "Classes 8th to 10th", desc: "2 Hours/Day | Maths, Science, Social Science, English, English Grammar", icon: <Users className="w-6 h-6" /> },
                  { title: "Session Duration", desc: "7th April 2025 to 31st March 2026", icon: <Calendar className="w-6 h-6" /> }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all flex items-start gap-6 relative overflow-hidden"
                  >
                    <div className="bg-white p-4 rounded-2xl text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500 border border-slate-100 shadow-sm relative z-10">
                      {item.icon}
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-black text-slate-900 text-xl mb-2">{item.title}</h4>
                      <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 blur-xl"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="bg-primary p-12 md:p-16 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-primary/20 border border-primary-light/10"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
              <div className="relative z-10">
                <div className="bg-white text-primary w-20 h-20 rounded-3xl flex items-center justify-center mb-10 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/20 blur-md pointer-events-none"></div>
                  <Trophy className="w-10 h-10 relative z-10" />
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tight drop-shadow-sm">Weekly Learning <br />Assessment (WLA)</h3>
                <p className="text-xl mb-12 text-blue-100 font-medium leading-relaxed">Regular evaluation to ensure conceptual clarity and exam readiness. We track every step of your progress.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20 hover:bg-white/20 transition-all">
                    <div className="bg-white p-3 rounded-xl text-primary shadow-lg"><Clock className="w-6 h-6" /></div>
                    <p className="font-black text-xl">2 Hours Weekly Test</p>
                  </div>
                  <div className="flex items-center gap-6 bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20 hover:bg-white/20 transition-all">
                    <div className="bg-white p-3 rounded-xl text-primary shadow-lg"><CheckCircle className="w-6 h-6" /></div>
                    <p className="font-black text-xl">Written / MCQ / Fill in Blanks</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results & Notice Board Section */}
      <section id="results" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent opacity-80 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className="text-left mb-16"
              >
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
                  Proven Results
                </span>
                <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.05]">
                  Our Success <br /><span className="text-gradient">Stories</span>
                </h2>
                <div className="w-20 h-1.5 bg-accent rounded-full mb-8 shadow-sm"></div>
                <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-2xl">Consistently producing top results in AMU, JMI, and Board Exams. Your success is our legacy.</p>
              </motion.div>
              
              {/* AMU Selections Highlight */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-[4rem] p-10 md:p-16 border border-slate-200 text-center relative overflow-hidden shadow-xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
                <div className="max-w-2xl mx-auto relative z-10">
                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">AMU Selection <span className="text-primary">2024-25</span></h3>
                  <p className="text-xl text-slate-600 mb-12 leading-relaxed font-medium">
                    We are proud to announce that <span className="font-black text-primary text-2xl">15+ Students</span> from JMD SAKSHAM CLASSES have been selected for AMU Class VI & IX Entrance this year!
                  </p>
                  <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group hover:-translate-y-1 transition-transform duration-500 shadow-sm hover:shadow-lg hover:border-primary/20">
                      <p className="text-5xl font-black text-primary mb-2">
                        <Counter value={500} suffix="+" />
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] group-hover:text-slate-700">Students Enrolled</p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group hover:-translate-y-1 transition-transform duration-500 shadow-sm hover:shadow-lg hover:border-primary/20">
                      <p className="text-5xl font-black text-primary mb-2">
                        <Counter value={12} suffix="+" />
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] group-hover:text-slate-700">Years Excellence</p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group hover:-translate-y-1 transition-transform duration-500 shadow-sm hover:shadow-lg hover:border-primary/20">
                      <p className="text-5xl font-black text-primary mb-2">
                        <Counter value={95} suffix="%" />
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] group-hover:text-slate-700">Success Results</p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group hover:-translate-y-1 transition-transform duration-500 shadow-sm hover:shadow-lg hover:border-primary/20">
                      <p className="text-5xl font-black text-primary mb-2">
                        <Counter value={8} suffix="+" />
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] group-hover:text-slate-700">Courses Offered</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] p-8 h-full relative overflow-hidden shadow-xl border border-slate-200 group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700 blur-[40px]"></div>
                <div className="flex items-center justify-between mb-10 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-light/10 p-2.5 rounded-xl text-primary border border-primary-light/20 shadow-sm">
                      <Bell className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-slate-900">Notice Board</h3>
                  </div>
                  <div className="flex items-center gap-2 bg-red-100 px-3 py-1 rounded-full border border-red-200">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">Live</span>
                  </div>
                </div>

                <div className="space-y-8 relative z-10">
                  {[
                    { date: '05 April', title: 'New Batch starting for AMU Entrance 2025-26.', isNew: true },
                    { date: '10 April', title: 'Scholarship Test (SAPT) Phase-II Registration Open.', isNew: true },
                    { date: '15 April', title: 'Parent-Teacher Meeting for Class 9th & 10th.', isNew: false },
                    { date: '20 April', title: 'Special Workshop on Time Management for Board Exams.', isNew: false }
                  ].map((notice, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5 group/item cursor-pointer relative"
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-200 group-hover/item:bg-primary group-hover/item:text-white group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-500 shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70 group-hover/item:opacity-90">{notice.date.split(' ')[1]}</span>
                        <span className="text-xl font-black leading-none mt-1">{notice.date.split(' ')[0]}</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1">
                          {notice.isNew && (
                            <span className="bg-accent/20 text-accent-dark text-[9px] font-black uppercase px-2 py-0.5 rounded-md border border-accent/20">New</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed group-hover/item:text-primary transition-colors duration-300">{notice.title}</p>
                      </div>
                      
                      {/* Connecting Line */}
                      {i !== 3 && (
                         <div className="absolute left-8 top-16 w-[1px] h-8 bg-slate-200"></div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-12 py-4 rounded-2xl border border-slate-200 bg-slate-50 font-black text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 group/btn relative z-10"
                >
                  View All Notices
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Star Alumni */}
          <div className="mb-20">
            <h3 className="text-2xl font-black text-slate-900 mb-10 text-center tracking-tight">Star Alumni</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {starAlumni.map((alumnus, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all hover:-translate-y-1 group"
                >
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{alumnus.name}</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">{alumnus.college}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {results.map((topper, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white rounded-[2rem] p-8 text-center border border-slate-200 group-hover:bg-primary transition-all duration-500 shadow-sm hover:shadow-2xl">
                  <h3 className="text-xl font-black mb-1 text-slate-900 group-hover:text-white transition-colors">{topper.name}</h3>
                  <p className="text-sm font-semibold text-slate-500 group-hover:text-blue-100 transition-colors mb-4">{topper.exam} ({topper.year})</p>
                  <div className="bg-slate-50 text-slate-900 group-hover:bg-white/20 group-hover:text-white py-2 px-6 rounded-full text-sm font-bold inline-block border border-slate-200 group-hover:border-white/30 transition-colors duration-500">
                    {topper.score}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">AMU & Sainik School <br /><span className="text-blue-200 drop-shadow-sm">Entrance Syllabus</span></h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full shadow-lg"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {syllabusData.map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl hover:bg-white/20 transition-all group">
                <div className="flex items-center gap-6 mb-6">
                  <div className="bg-white text-primary group-hover:scale-110 transition-transform duration-500 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                    {item.class}
                  </div>
                  <h4 className="font-black text-white text-2xl drop-shadow-sm">Class {item.class}</h4>
                </div>
                <p className="text-sm text-blue-100 font-semibold leading-relaxed">{item.subjects}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-32 bg-slate-50 text-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 animate-pulse-slow delay-1000 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
                The Saksham Advantage
              </span>
              <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[1.05] tracking-tighter text-slate-900">
                Sainik School <br /><span className="text-gradient">Coaching Aligarh</span>
              </h2>
              <p className="text-slate-600 mb-16 text-xl leading-relaxed font-semibold">
                We combine traditional teaching values with modern pedagogical techniques to deliver results that matter. Our focus is on holistic development.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                {whyUs.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-sm hover:shadow-lg text-primary">
                      {React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8 opacity-90 group-hover:opacity-100" })}
                    </div>
                    <h3 className="font-black text-slate-900 text-2xl mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border border-slate-200 group bg-white">
                <img 
                  src="/images/professional-students.png" 
                  alt="Sainik School Coaching Aligarh - Modern Classroom" 
                  className="w-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80"></div>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-12 -right-12 bg-white p-12 rounded-[3.5rem] shadow-2xl z-20 border border-slate-100"
              >
                <div className="text-6xl font-black mb-2 text-primary">14+</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Years of Excellence</div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px] animate-pulse-slow"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-slate-50 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
                Student Voices
              </span>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.05]">
                What Our <br /><span className="text-gradient">Students Say</span>
              </h2>
              <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-8 shadow-sm"></div>
              <p className="text-slate-600 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                Real stories from real students who achieved their dreams with JMD Saksham Classes.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 relative shadow-lg hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group"
              >
                <div className="text-primary/20 mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:text-primary">
                  <MessageCircle className="w-12 h-12 fill-current" />
                </div>
                <p className="text-slate-700 italic mb-10 leading-relaxed text-lg font-medium group-hover:text-slate-900 transition-colors duration-500">"{t.text}"</p>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center font-black text-2xl text-primary border border-slate-200 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xl">{t.name}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Director's Message */}
      {/* Director's Message */}
      <section className="py-32 bg-slate-50 relative">
        <div className="absolute inset-0 bg-white opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-white rounded-[4rem] p-10 md:p-24 text-slate-900 relative overflow-hidden shadow-xl border border-slate-200"
          >
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] animate-pulse-slow"></div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center relative z-10">
              <div className="lg:col-span-2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>
                  <img 
                    src="https://picsum.photos/seed/director2/600/800" 
                    alt="D.K. Singh - Director of JMD Saksham Classes Aligarh" 
                    className="rounded-[3rem] shadow-2xl border-8 border-white w-full relative z-10 group-hover:scale-[1.02] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-6 -left-6 -right-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 z-20 shadow-xl">
                    <p className="font-black text-2xl tracking-tight text-slate-900 mb-1">D.K. Singh</p>
                    <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em]">Director & Visionary</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-primary/20">
                    From the Director's Desk
                  </span>
                  <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[1.05] text-slate-900">Director's <br /><span className="text-gradient">Message</span></h2>
                  <div className="relative">
                    <div className="absolute -left-10 -top-10 text-9xl font-serif text-slate-100 select-none">"</div>
                    <p className="text-slate-600 text-2xl leading-relaxed mb-12 font-semibold italic relative z-10">
                      "We believe that action should speak louder than words. We hope to follow this in JMD Saksham Classes and we have suggested in the punch line of JMD Saksham Classes in Sanskrit 'उद्यमेन हि सिद्धयन्ति कार्याणि' which means all the works in this whole world will carry fruits by taking hard work into consideration. It is not about what we are thinking but it is all about what we are doing."
                    </p>
                  </div>
                  <div className="h-2 w-24 bg-accent mb-8 rounded-full shadow-sm"></div>
                  <h4 className="text-3xl font-black tracking-tight text-slate-900">D.K. Singh</h4>
                  <p className="text-primary font-bold uppercase tracking-[0.3em] text-xs mt-2">Founder & Director</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-40 left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] animate-pulse-slow pointer-events-none"></div>
        <div className="absolute bottom-40 right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] animate-pulse-slow delay-1000 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
                Common Queries
              </span>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.05]">
                Frequently Asked <br /><span className="text-gradient">Questions</span>
              </h2>
              <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-8 shadow-sm"></div>
            </motion.div>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <details className="group bg-slate-50 rounded-[2.5rem] border border-slate-200 overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-md">
                  <summary className="flex items-center justify-between p-8 cursor-pointer list-none outline-none">
                    <h3 className="text-xl font-black text-slate-800 group-open:text-primary transition-colors tracking-tight pr-6">{faq.q}</h3>
                    <div className="bg-white border border-slate-200 p-3 rounded-2xl text-primary group-open:bg-primary group-open:text-white group-open:border-primary group-open:rotate-180 transition-all duration-500 shrink-0 shadow-sm">
                      <ArrowRight className="w-6 h-6 rotate-90" />
                    </div>
                  </summary>
                  <div className="px-8 pb-8 text-slate-600 leading-relaxed text-lg font-medium">
                    <div className="h-[1px] w-full bg-slate-200 mb-6"></div>
                    {faq.a}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Gallery Section */}
      <section id="gallery" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
                Visual Journey
              </span>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.05]">
                Achievement <br /><span className="text-gradient">Gallery</span>
              </h2>
              <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-8 shadow-sm"></div>
              <p className="text-slate-600 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                Capturing moments of hard work, success, and academic celebration. Explore our vibrant campus life and celebrate our students' milestones.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {galleryCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15 }}
                onClick={() => setActiveGalleryCategory(cat.name)}
                className="relative group rounded-[3.5rem] overflow-hidden shadow-xl aspect-[4/5] cursor-pointer border-8 border-white"
              >
                <img 
                  src={cat.img} 
                  alt={`JMD Saksham Classes Aligarh - ${cat.name} Gallery`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 flex flex-col justify-end p-12">
                  <div className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full w-fit mb-6 shadow-lg">
                    {cat.count} Photos
                  </div>
                  <h4 className="text-white font-black text-4xl mb-4 tracking-tight drop-shadow-md">{cat.name}</h4>
                  <p className="text-blue-100 text-sm font-bold flex items-center gap-3 group-hover:gap-6 transition-all group-hover:text-accent drop-shadow-md">
                    View Gallery <ArrowRight className="w-5 h-5" />
                  </p>
                </div>
                <div className="absolute inset-0 border-0 group-hover:border-[16px] border-primary/20 transition-all duration-700 rounded-[3.5rem]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {activeGalleryCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="bg-white w-full max-w-7xl max-h-[90vh] rounded-[4rem] overflow-hidden flex flex-col relative shadow-2xl border border-slate-200"
            >
              <button 
                onClick={() => setActiveGalleryCategory(null)}
                className="absolute top-8 right-8 p-4 bg-slate-100 hover:bg-primary border border-slate-200 hover:text-white text-slate-600 rounded-full transition-all z-20 shadow-sm group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="p-12 md:p-20 overflow-y-auto custom-scrollbar">
                <div className="mb-16">
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-primary/20">
                    Category
                  </span>
                  <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">{activeGalleryCategory}</h3>
                  <div className="w-16 h-1.5 bg-accent rounded-full shadow-sm"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {galleryImages
                    .filter(img => img.category === activeGalleryCategory)
                    .map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="relative group rounded-[2.5rem] overflow-hidden shadow-lg aspect-[4/3] border-[6px] border-slate-50"
                      >
                        <img 
                          src={item.img} 
                          alt={`AMU Entrance Aligarh Achievement - ${item.title}`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                          <p className="text-white font-black text-xl tracking-tight drop-shadow-md">{item.title}</p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-slate-50 rounded-[4rem] shadow-xl overflow-hidden border border-slate-200 p-12 md:p-20 lg:p-24 text-slate-900 relative"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="relative z-10">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
                  Get In Touch
                </span>
                <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.05]">Our <span className="text-gradient">Centers</span></h2>
                <div className="w-20 h-1.5 bg-accent mx-auto rounded-full shadow-sm"></div>
              </div>

              <div className="mb-20 rounded-[3rem] overflow-hidden bg-white border border-slate-200 shadow-sm p-4 relative z-20">
                <iframe 
                  src="https://maps.google.com/maps?q=Arya+Nagar+Colony,+Near+Mansarovar,+Ramghat+Road,+Aligarh&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  className="rounded-[2rem] w-full h-[300px] md:h-[450px]"
                ></iframe>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                {[
                  { title: "Head Office", desc: "Arya Nagar Colony, Near Mansarovar, Ramghat Road, Aligarh" },
                  { title: "Branch Office 1", desc: "Ramsnehi Dham, Near Suman Hospital, Etah Chungi, Aligarh" },
                  { title: "Branch Office 2", desc: "Ozone City, Gate No. -1, Mahua Khera Road, Ozone City, Aligarh" }
                ].map((center, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-sm text-primary">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <h4 className="font-black text-xl mb-3 text-slate-900 group-hover:text-primary transition-colors">{center.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">{center.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center group bg-white p-10 rounded-[3rem] border border-slate-200 hover:border-primary/30 transition-all hover:shadow-lg shadow-sm"
                >
                  <div className="bg-primary/10 border border-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-2xl mb-2 text-slate-900">Call Us</h4>
                  <p className="text-gradient text-xl font-black">+91 9756399884</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center group bg-white p-10 rounded-[3rem] border border-slate-200 hover:border-primary/30 transition-all hover:shadow-lg shadow-sm"
                >
                  <div className="bg-primary/10 border border-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-2xl mb-2 text-slate-900">Email Us</h4>
                  <p className="text-gradient max-w-full truncate text-xl font-black">jmdsaksham.info@gmail.com</p>
                </motion.div>
              </div>

              <div className="max-w-md mx-auto relative z-10">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 text-center shadow-sm">
                  <h4 className="font-bold mb-4 text-primary text-lg">Quick Support</h4>
                  <p className="text-slate-600 mb-8 font-medium">Need instant help? Connect with our counselor on WhatsApp.</p>
                  <a 
                    href="https://wa.me/919756399884?text=Hello%20JMD%20Saksham%20Classes,%20I%20am%20interested%20in%20admission.%20Please%20provide%20more%20details." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-full font-bold hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    <WhatsAppIcon className="w-6 h-6" />
                    WhatsApp Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-24 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-10">
                <img src="/images/logo.jpeg" alt="JMD Saksham Classes" className="h-32 md:h-40 w-auto object-contain rounded-xl" />
              </div>
              <p className="text-slate-200 leading-relaxed font-semibold mb-10">
                Aligarh's premier coaching institute for AMU, JMI, Sainik School, and JNV entrance exams. Empowering students since 2011.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Youtube, Twitter].map((Icon, idx) => (
                  <motion.a 
                    key={idx}
                    href="#" 
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-accent hover:text-slate-900 transition-all shadow-lg"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-black mb-10 tracking-tight flex items-center gap-3 text-white">
                <div className="w-1.5 h-6 bg-accent rounded-full"></div>
                Quick Links
              </h4>
              <ul className="space-y-4">
                {['About Us', 'Courses', 'SAPT 2026', 'Results', 'Gallery', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-slate-200 hover:text-accent transition-colors font-semibold flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-black mb-10 tracking-tight flex items-center gap-3 text-white">
                <div className="w-1.5 h-6 bg-accent rounded-full"></div>
                Our Courses
              </h4>
              <ul className="space-y-4">
                {['AMU Entrance', 'Sainik School', 'JNV Entrance', 'Board Exams', 'Foundation (4-10)', 'SAPT Test'].map((course) => (
                  <li key={course}>
                    <a href="#courses" className="text-slate-200 hover:text-accent transition-colors font-semibold flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>
                      {course}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-black mb-10 tracking-tight flex items-center gap-3 text-white">
                <div className="w-1.5 h-6 bg-accent rounded-full"></div>
                Contact Info
              </h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 group">
                  <div className="bg-white/5 p-2.5 rounded-xl text-accent border border-white/10 group-hover:bg-accent group-hover:text-slate-900 transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-slate-200 text-sm leading-relaxed font-semibold">Arya Nagar Colony, Near Mansarovar, Ramghat Road, Aligarh</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="bg-white/5 p-2.5 rounded-xl text-accent border border-white/10 group-hover:bg-accent group-hover:text-slate-900 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-slate-200 text-sm font-bold">+91 9756399884</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="bg-white/5 p-2.5 rounded-xl text-accent border border-white/10 group-hover:bg-accent group-hover:text-slate-900 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-slate-200 text-sm font-bold">jmdsaksham.info@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm font-medium">
            <p>&copy; {new Date().getFullYear()} JMD Saksham Classes Aligarh. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a 
        href="https://wa.me/919756399884?text=Hello%20JMD%20Saksham%20Classes,%20I%20am%20interested%20in%20admission.%20Please%20provide%20more%20details." 
        target="_blank" 
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[#25D366] rounded-full"
        />
        <WhatsAppIcon className="w-8 h-8 relative z-10" />
        <span className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce z-20">
          Chat
        </span>
      </motion.a>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 bg-white/80 backdrop-blur-md text-primary p-4 rounded-full shadow-xl hover:bg-primary hover:text-white transition-all z-50 border border-slate-100"
      >
        <ArrowRight className="w-6 h-6 -rotate-90" />
      </button>
    </div>
  );
}
