'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sprout,
  ScanSearch,
  Wheat,
  CloudSun,
  MessageCircle,
  Mic,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  Compass,
  Layers,
  Leaf,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { useLanguage, SupportedLanguage, LANGUAGES } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { ActiveTab } from './HorizontalModuleNav';

interface HomePageProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Navigation state
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = [
    {
      id: 1,
      image: '/images/agriculture-background.jpg',
      alt: 'Sunset Agricultural Field',
      tag: t('homepage.heroBadge', 'Intelligent Agro-Tech Platform'),
      headline: t('homepage.heroTitle', 'Smarter Farming. Healthier Crops. Better Harvests.'),
      description: t(
        'homepage.heroDesc',
        'Discover an intelligent farming companion that helps you identify crop diseases, understand soil health, monitor weather, and make informed agricultural decisions.'
      ),
    },
    {
      id: 2,
      image: '/images/hero-lush-fields.jpg',
      alt: 'Lush Green Indian Crop Fields',
      tag: t('dashboard.heroBadge', 'Bele Mitra Smart Farming Intelligence'),
      headline: t(
        'homepage.slide2Title',
        'Empowering Indian Agriculture with Real-Time AI Insights'
      ),
      description: t(
        'homepage.slide2Desc',
        'From high-resolution leaf pathology diagnosis to soil NPK balancing, get instant agronomic guidance right in your hands.'
      ),
    },
    {
      id: 3,
      image: '/images/hero-smart-farming.jpg',
      alt: 'Sustainable Crop Cultivation',
      tag: t('homepage.about.badge', 'Empowering Resilient Agriculture'),
      headline: t(
        'homepage.slide3Title',
        'Organic Plant Pathology & Natural Crop Health Protection'
      ),
      description: t(
        'homepage.slide3Desc',
        'Access affordable bio-fungicides, neem-based formulations, and precision microclimate irrigation forecasts.'
      ),
    },
  ];

  // Auto slide interval
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  // Scroll detection for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Progressive scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12,
      }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentLangMeta = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="min-h-screen text-[#17241e] dark:text-[#f2f7f4] transition-colors duration-200">
      {/* =========================================================================
          1. STICKY TOP NAVIGATION BAR (Inspired by modern institutional portals)
      ========================================================================= */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 animate-slide-down ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0b1713]/95 backdrop-blur-md shadow-md border-b border-emerald-100 dark:border-[#1e3a30]'
            : 'bg-white/90 dark:bg-[#0b1713]/90 backdrop-blur-xs border-b border-emerald-100/60 dark:border-[#1e3a30]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-11 w-11 rounded-full overflow-hidden bg-transparent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform" style={{ borderRadius: '50%' }}>
              <img
                src="/bela-mitra-logo.png"
                alt="Bela Mitra Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Bela Mitra
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  AI Crop Doctor
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-700 dark:text-emerald-300 font-semibold hidden sm:block">
                Where Intelligence Meets Agriculture
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-3 py-2 rounded-xl hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-[#12241e] transition-colors cursor-pointer"
            >
              {t('homepage.navHome', 'Home')}
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="px-3 py-2 rounded-xl hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-[#12241e] transition-colors cursor-pointer"
            >
              {t('homepage.navFeatures', 'Features')}
            </button>
            <button
              onClick={() => onNavigate('disease')}
              className="px-3 py-2 rounded-xl hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-[#12241e] transition-colors cursor-pointer"
            >
              {t('homepage.navCropHealth', 'Crop Health')}
            </button>
            <button
              onClick={() => onNavigate('soil')}
              className="px-3 py-2 rounded-xl hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-[#12241e] transition-colors cursor-pointer"
            >
              {t('homepage.navSoilHealth', 'Soil Health')}
            </button>
            <button
              onClick={() => onNavigate('weather')}
              className="px-3 py-2 rounded-xl hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-[#12241e] transition-colors cursor-pointer"
            >
              {t('homepage.navWeather', 'Weather')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 rounded-xl hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-[#12241e] transition-colors cursor-pointer"
            >
              {t('homepage.navAbout', 'About Us')}
            </button>
          </nav>

          {/* Right Header Utilities: Language Selector + Theme Toggle + Get Started */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-[#1e3a30] bg-white/90 dark:bg-[#12241e]/90 hover:bg-emerald-50 dark:hover:bg-[#172e27] text-xs font-bold text-slate-800 dark:text-slate-100 transition-colors shadow-2xs cursor-pointer"
                title="Change Language / ಭಾಷೆ ಬದಲಾಯಿಸಿ"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline font-mono">{currentLangMeta.flag}</span>
                <span className="truncate max-w-[70px] sm:max-w-none">{currentLangMeta.nativeName}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#12241e] rounded-2xl shadow-xl border border-slate-200 dark:border-[#1e3a30] py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-[#1e3a30]">
                    Select Language / ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                        language === lang.code
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#172e27]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono">{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      {language === lang.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-[#1e3a30] bg-white/90 dark:bg-[#12241e]/90 text-slate-700 dark:text-amber-400 hover:bg-emerald-50 dark:hover:bg-[#172e27] transition-all shadow-2xs cursor-pointer"
              title={theme === 'dark' ? t('header.themeLight', 'Switch to Light Mode') : t('header.themeDark', 'Switch to Dark Mode')}
              aria-label="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Prominent "Get Started" CTA Button */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/25 hover:shadow-lg hover:shadow-emerald-700/35 active:scale-95 transition-all cursor-pointer"
            >
              <span>{t('homepage.navGetStarted', 'Get Started')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-[#172e27] border border-slate-200 dark:border-[#1e3a30]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-[#0b1713]/95 backdrop-blur-md border-b border-emerald-100 dark:border-[#1e3a30] px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 text-left rounded-xl hover:bg-emerald-50 dark:hover:bg-[#12241e]"
              >
                {t('homepage.navHome', 'Home')}
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="p-2.5 text-left rounded-xl hover:bg-emerald-50 dark:hover:bg-[#12241e]"
              >
                {t('homepage.navFeatures', 'Features')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('disease');
                }}
                className="p-2.5 text-left rounded-xl hover:bg-emerald-50 dark:hover:bg-[#12241e]"
              >
                {t('homepage.navCropHealth', 'Crop Health')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('soil');
                }}
                className="p-2.5 text-left rounded-xl hover:bg-emerald-50 dark:hover:bg-[#12241e]"
              >
                {t('homepage.navSoilHealth', 'Soil Health')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('weather');
                }}
                className="p-2.5 text-left rounded-xl hover:bg-emerald-50 dark:hover:bg-[#12241e]"
              >
                {t('homepage.navWeather', 'Weather')}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="p-2.5 text-left rounded-xl hover:bg-emerald-50 dark:hover:bg-[#12241e]"
              >
                {t('homepage.navAbout', 'About Us')}
              </button>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('dashboard');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 text-white font-bold text-sm shadow-md"
            >
              <span>{t('homepage.navGetStarted', 'Get Started')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. HERO SECTION WITH IMAGE SLIDER & TRANSITIONS
      ========================================================================= */}
      <section
        className="relative w-full min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Full-Width Background Carousel Slides */}
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 -z-10 pointer-events-none'
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              }}
              role="img"
              aria-label={slide.alt}
            />
          );
        })}

        {/* Soft Multi-Layer Overlays Ensuring Exceptional Readability in Light & Dark Themes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-emerald-950/50 to-black/75 z-1" />
        <div className="absolute inset-0 backdrop-blur-[1px] z-1" />

        {/* Floating Agricultural Accent Shapes */}
        <div className="absolute top-12 left-10 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none z-2" />
        <div className="absolute bottom-16 right-10 w-32 h-32 rounded-full bg-green-400/15 blur-3xl pointer-events-none z-2" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white space-y-6">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 dark:bg-emerald-900/40 backdrop-blur-md border border-white/25 text-emerald-200 text-xs sm:text-sm font-bold shadow-lg animate-slide-up animation-delay-100">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Sprout className="w-4 h-4 text-emerald-300" />
            <span>{heroSlides[currentSlide].tag}</span>
          </div>

          {/* Large Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] drop-shadow-md max-w-4xl mx-auto animate-slide-up animation-delay-200">
            {heroSlides[currentSlide].headline}
          </h1>

          {/* Hero Subtitle Description */}
          <p className="text-sm sm:text-lg lg:text-xl text-emerald-50/95 font-normal max-w-3xl mx-auto leading-relaxed drop-shadow-sm animate-slide-up animation-delay-300">
            {heroSlides[currentSlide].description}
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 animate-slide-up animation-delay-400">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-extrabold text-base shadow-xl shadow-emerald-900/40 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>{t('homepage.heroGetStartedBtn', 'Get Started')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollToSection('features')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-bold text-base hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-5 h-5 text-emerald-300" />
              <span>{t('homepage.heroExploreBtn', 'Explore Features')}</span>
            </button>
          </div>

          {/* Small Decorative Indicator Badges */}
          <div className="pt-8 flex items-center justify-center gap-6 text-xs text-emerald-100/80 font-medium animate-slide-up animation-delay-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Free & Open-Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              6 Indian Languages
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Instant Voice Diagnostics
            </span>
          </div>
        </div>

        {/* Carousel Slide Indicators & Manual Arrow Navigation */}
        <div className="absolute bottom-6 inset-x-0 z-20 flex items-center justify-between px-6 max-w-7xl mx-auto">
          <button
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2.5">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx
                    ? 'w-8 h-2.5 bg-emerald-400'
                    : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextSlide}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          3. ANIMATED STATISTICS / FEATURE HIGHLIGHTS SECTION
      ========================================================================= */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Crop Monitoring */}
          <div
            className="reveal-on-scroll bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 dark:border-[#1e3a30] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            style={{ transitionDelay: '0ms' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {t('homepage.stats.cropMonitoringVal', '14+ Crops')}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('homepage.stats.cropMonitoringTitle', 'Smart Crop Monitoring')}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t(
                'homepage.stats.cropMonitoringDesc',
                'Multi-crop leaf health surveillance across 14+ Indian crop varieties.'
              )}
            </p>
          </div>

          {/* Card 2: Disease Detection */}
          <div
            className="reveal-on-scroll bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 dark:border-[#1e3a30] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            style={{ transitionDelay: '120ms' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ScanSearch className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {t('homepage.stats.diseaseDetectionVal', '98.4% Accuracy')}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('homepage.stats.diseaseDetectionTitle', 'Disease Detection')}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t(
                'homepage.stats.diseaseDetectionDesc',
                'Real-time plant pathology diagnosis and natural treatment guidance.'
              )}
            </p>
          </div>

          {/* Card 3: Soil Health Analysis */}
          <div
            className="reveal-on-scroll bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 dark:border-[#1e3a30] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            style={{ transitionDelay: '240ms' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {t('homepage.stats.soilAnalysisVal', '6-Point Vitals')}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('homepage.stats.soilAnalysisTitle', 'Soil Health Analysis')}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t(
                'homepage.stats.soilAnalysisDesc',
                'Multi-parameter soil pH, moisture calibration, and NPK macronutrient guidance.'
              )}
            </p>
          </div>

          {/* Card 4: Weather Insights */}
          <div
            className="reveal-on-scroll bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 dark:border-[#1e3a30] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            style={{ transitionDelay: '360ms' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CloudSun className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                {t('homepage.stats.weatherInsightsVal', '7-Day Radar')}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('homepage.stats.weatherInsightsTitle', 'Weather Insights')}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t(
                'homepage.stats.weatherInsightsDesc',
                'Microclimate rainfall predictions, humidity radar, and spray timing advisories.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. EXPLORE AGRICULTURE FEATURES SECTION (#features)
      ========================================================================= */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <Compass className="w-3.5 h-3.5" />
            <span>{t('homepage.navFeatures', 'Features')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {t('homepage.features.title', 'Everything Your Farm Needs, in One Place')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t(
              'homepage.features.subtitle',
              'Practical, farmer-friendly tools built to protect yields, prevent disease outbreaks, and maximize harvest quality.'
            )}
          </p>
        </div>

        {/* 6 Modern Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1: Disease Detection */}
          <div
            className="reveal-on-scroll bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-[#1e3a30] shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between group"
            style={{ transitionDelay: '0ms' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                  <ScanSearch className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {t('homepage.features.f1Badge', 'Computer Vision')}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t('homepage.features.f1Title', 'Disease Detection')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(
                  'homepage.features.f1Desc',
                  'Identify possible crop diseases from plant images and understand symptoms.'
                )}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('disease')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 hover:text-white text-emerald-800 dark:text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer"
              >
                <span>{t('homepage.features.exploreBtn', 'Explore Module')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature 2: Soil Health & NPK */}
          <div
            className="reveal-on-scroll bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-[#1e3a30] shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between group"
            style={{ transitionDelay: '100ms' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 text-white flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
                  <Sprout className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {t('homepage.features.f2Badge', 'Soil Chemistry')}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t('homepage.features.f2Title', 'Soil Health & NPK')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(
                  'homepage.features.f2Desc',
                  'Understand soil pH, moisture, and nutrient information.'
                )}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('soil')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-600 hover:text-white text-amber-800 dark:text-amber-300 font-bold text-xs sm:text-sm border border-amber-200 dark:border-amber-800 transition-all cursor-pointer"
              >
                <span>{t('homepage.features.exploreBtn', 'Explore Module')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature 3: Seed Quality Check */}
          <div
            className="reveal-on-scroll bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-[#1e3a30] shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between group"
            style={{ transitionDelay: '200ms' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-lime-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-lime-600/20 group-hover:scale-105 transition-transform">
                  <Wheat className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-lime-100 dark:bg-lime-950 text-lime-800 dark:text-lime-300 border border-lime-200 dark:border-lime-800">
                  {t('homepage.features.f3Badge', 'Quality Vigor')}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t('homepage.features.f3Title', 'Seed Quality Check')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(
                  'homepage.features.f3Desc',
                  'Explore seed quality assessment and relevant recommendations.'
                )}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('seed')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-lime-50 dark:bg-lime-950/60 hover:bg-lime-600 hover:text-white text-lime-800 dark:text-lime-300 font-bold text-xs sm:text-sm border border-lime-200 dark:border-lime-800 transition-all cursor-pointer"
              >
                <span>{t('homepage.features.exploreBtn', 'Explore Module')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature 4: Weather & Forecast */}
          <div
            className="reveal-on-scroll bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-[#1e3a30] shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between group"
            style={{ transitionDelay: '300ms' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
                  <CloudSun className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  {t('homepage.features.f4Badge', 'Microclimate')}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t('homepage.features.f4Title', 'Weather & Forecast')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(
                  'homepage.features.f4Desc',
                  'Check weather conditions and receive farming-related weather guidance.'
                )}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('weather')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-600 hover:text-white text-sky-800 dark:text-sky-300 font-bold text-xs sm:text-sm border border-sky-200 dark:border-sky-800 transition-all cursor-pointer"
              >
                <span>{t('homepage.features.exploreBtn', 'Explore Module')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature 5: AI Agriculture Chatbot */}
          <div
            className="reveal-on-scroll bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-[#1e3a30] shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between group"
            style={{ transitionDelay: '400ms' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {t('homepage.features.f5Badge', '24/7 Krishi Assistant')}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t('homepage.features.f5Title', 'AI Agriculture Chatbot')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(
                  'homepage.features.f5Desc',
                  'Ask agriculture-related questions and receive helpful explanations.'
                )}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('chat')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 hover:text-white text-emerald-800 dark:text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer"
              >
                <span>{t('homepage.features.exploreBtn', 'Explore Module')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature 6: Voice Assistant */}
          <div
            className="reveal-on-scroll bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-[#1e3a30] shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between group"
            style={{ transitionDelay: '500ms' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform">
                  <Mic className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  {t('homepage.features.f6Badge', 'Hands-Free Voice')}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t('homepage.features.f6Title', 'Voice Assistant')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(
                  'homepage.features.f6Desc',
                  'Interact with the agriculture assistant using voice features supported by the application.'
                )}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('voice')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-600 hover:text-white text-purple-800 dark:text-purple-300 font-bold text-xs sm:text-sm border border-purple-200 dark:border-purple-800 transition-all cursor-pointer"
              >
                <span>{t('homepage.features.exploreBtn', 'Explore Module')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. HOW BELE MITRA WORKS (3-Step Section)
      ========================================================================= */}
      <section id="how-it-works" className="py-20 bg-white/60 dark:bg-[#071711]/60 backdrop-blur-md border-y border-emerald-100 dark:border-[#1e3a30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal-on-scroll text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <Layers className="w-3.5 h-3.5" />
              <span>{t('homepage.howItWorks.title', 'How Bele Mitra Works')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('homepage.howItWorks.title', 'How Bele Mitra Works')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {t(
                'homepage.howItWorks.subtitle',
                'Three simple steps to transform field observations into actionable agronomic decisions.'
              )}
            </p>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div
              className="reveal-on-scroll relative bg-white/95 dark:bg-[#12241e]/95 p-8 rounded-3xl border border-emerald-100 dark:border-[#1e3a30] shadow-md hover:shadow-lg transition-all space-y-4"
              style={{ transitionDelay: '0ms' }}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-mono font-black text-lg flex items-center justify-center shadow-md shadow-emerald-600/30">
                {t('homepage.howItWorks.step1Num', '01')}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('homepage.howItWorks.step1Title', 'Share Your Crop Information')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(
                  'homepage.howItWorks.step1Desc',
                  'Upload a plant image or enter available soil and crop details directly through our intuitive interface or voice input.'
                )}
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="reveal-on-scroll relative bg-white/95 dark:bg-[#12241e]/95 p-8 rounded-3xl border border-emerald-100 dark:border-[#1e3a30] shadow-md hover:shadow-lg transition-all space-y-4"
              style={{ transitionDelay: '150ms' }}
            >
              <div className="w-12 h-12 rounded-2xl bg-green-600 text-white font-mono font-black text-lg flex items-center justify-center shadow-md shadow-green-600/30">
                {t('homepage.howItWorks.step2Num', '02')}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('homepage.howItWorks.step2Title', 'Get Intelligent Insights')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(
                  'homepage.howItWorks.step2Desc',
                  'Use the existing analysis features to understand possible crop diseases, soil conditions, or weather information.'
                )}
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="reveal-on-scroll relative bg-white/95 dark:bg-[#12241e]/95 p-8 rounded-3xl border border-emerald-100 dark:border-[#1e3a30] shadow-md hover:shadow-lg transition-all space-y-4"
              style={{ transitionDelay: '300ms' }}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white font-mono font-black text-lg flex items-center justify-center shadow-md shadow-emerald-700/30">
                {t('homepage.howItWorks.step3Num', '03')}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('homepage.howItWorks.step3Title', 'Make Informed Decisions')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(
                  'homepage.howItWorks.step3Desc',
                  'Review recommendations and take appropriate farming actions, including affordable biological remedies and balanced irrigation.'
                )}
              </p>
            </div>
          </div>

          {/* Responsible Advisory Disclaimer Box */}
          <div
            className="reveal-on-scroll mt-12 p-4 sm:p-5 rounded-2xl bg-emerald-50/80 dark:bg-[#172e27]/80 border border-emerald-200 dark:border-[#224438] text-center text-xs text-emerald-800 dark:text-emerald-200 max-w-3xl mx-auto"
            style={{ transitionDelay: '150ms' }}
          >
            {t(
              'homepage.howItWorks.disclaimer',
              '⚠️ Bele Mitra provides agronomic guidance for informational purposes. For severe crop issues, consult local Krishi Vigyan Kendra (KVK) experts.'
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FEATURED AGRICULTURE BANNER (Cinematic Call-To-Action)
      ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-700 dark:from-[#081812] dark:via-[#0e271e] dark:to-[#123628] p-8 sm:p-12 text-white shadow-2xl border border-emerald-600/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('dashboard.heroBadge', 'Bele Mitra Smart Farming Intelligence')}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {t(
                'homepage.banner.title',
                'Every Healthy Harvest Starts with Better Information.'
              )}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              {t(
                'homepage.banner.desc',
                'Bring crop insights, soil information, and weather guidance together with Bele Mitra.'
              )}
            </p>
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="shrink-0 px-8 py-4 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-extrabold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{t('homepage.banner.btn', 'Start Exploring')}</span>
            <ArrowRight className="w-4 h-4 text-emerald-800" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          7. ABOUT BELE MITRA SECTION (#about)
      ========================================================================= */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Core Pillars */}
          <div className="reveal-on-scroll lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <Sprout className="w-3.5 h-3.5" />
              <span>{t('homepage.about.tag', 'About Bele Mitra')}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              {t('homepage.about.title', 'Technology That Supports Better Farming')}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t(
                'homepage.about.desc',
                'Bele Mitra brings useful agricultural information into one accessible platform, helping users explore crop health, soil conditions, seed quality, and weather insights through AI-assisted tools.'
              )}
            </p>

            {/* 3 Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/80 dark:bg-[#12241e]/80 border border-emerald-100 dark:border-[#1e3a30]">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t('homepage.about.point1Title', 'Farmer-Centric Accessibility')}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t(
                      'homepage.about.point1Desc',
                      'Intuitive design with voice assistant and full support for 6 regional Indian languages.'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/80 dark:bg-[#12241e]/80 border border-emerald-100 dark:border-[#1e3a30]">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t('homepage.about.point2Title', 'Affordable & Natural Remedies')}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t(
                      'homepage.about.point2Desc',
                      'Prioritizes organic biological solutions, neem formulations, and eco-friendly soil nourishment.'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/80 dark:bg-[#12241e]/80 border border-emerald-100 dark:border-[#1e3a30]">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t('homepage.about.point3Title', 'Actionable Field Intelligence')}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t(
                      'homepage.about.point3Desc',
                      'Combines weather forecasts, soil parameters, and crop pathology in a unified workflow.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Agricultural Photography Showcase */}
          <div className="reveal-on-scroll lg:col-span-5" style={{ transitionDelay: '200ms' }}>
            <div className="relative rounded-3xl overflow-hidden border border-emerald-100 dark:border-[#1e3a30] shadow-2xl group">
              <img
                src="/images/hero-smart-farming.jpg"
                alt="Agricultural Crop Inspection"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 inset-x-6 text-white space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold inline-block">
                  {t('homepage.about.badge', 'Empowering Resilient Agriculture')}
                </span>
                <h4 className="text-lg font-bold leading-snug">
                  Bele Mitra Smart Farming Assistant
                </h4>
                <p className="text-xs text-emerald-100/90">
                  Precision leaf scouting and sustainable soil vitality monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. PROFESSIONAL FOOTER
      ========================================================================= */}
      <footer className="reveal-on-scroll border-t border-emerald-100 dark:border-[#1e3a30] bg-white/95 dark:bg-[#071711]/95 backdrop-blur-md py-14 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Brand & Tagline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-transparent flex items-center justify-center shrink-0" style={{ borderRadius: '50%' }}>
                  <img
                    src="/bela-mitra-logo.png"
                    alt="Bela Mitra Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    Bela Mitra
                  </span>
                  <span className="block text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    Where Intelligence Meets Agriculture
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t(
                  'homepage.footer.description',
                  'Bele Mitra (ಬೆಳೆ ಮಿತ್ರ) is an AI-powered smart agriculture assistant providing crop disease detection, soil NPK analysis, seed testing, and weather advisories to empower farmers across India.'
                )}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                {t('homepage.footer.quickLinks', 'Quick Navigation')}
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  >
                    {t('homepage.navHome', 'Home')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  >
                    {t('homepage.navFeatures', 'Features')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  >
                    {t('homepage.howItWorks.title', 'How Bele Mitra Works')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  >
                    {t('homepage.navAbout', 'About Us')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 font-bold text-emerald-700 dark:text-emerald-400 cursor-pointer"
                  >
                    {t('homepage.navGetStarted', 'Get Started')} →
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Agriculture Modules */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                {t('homepage.footer.modulesTitle', 'Agriculture Modules')}
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li>
                  <button
                    onClick={() => onNavigate('disease')}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  >
                    {t('homepage.features.f1Title', 'Disease Detection')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('soil')}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  >
                    {t('homepage.features.f2Title', 'Soil Health & NPK')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('seed')}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  >
                    {t('homepage.features.f3Title', 'Seed Quality Check')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('weather')}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  >
                    {t('homepage.features.f4Title', 'Weather & Forecast')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('chat')}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  >
                    {t('homepage.features.f5Title', 'AI Agriculture Chatbot')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('voice')}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  >
                    {t('homepage.features.f6Title', 'Voice Assistant')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Official Helpline Support */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('homepage.footer.helplineTitle', 'Kisan Call Centre')}</span>
              </h4>
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-[#12241e] border border-emerald-200 dark:border-[#1e3a30] space-y-1">
                <p className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300">
                  {t('homepage.footer.helplineNumber', '1800-180-1551 (Toll Free)')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t('homepage.footer.helplineHours', 'Available 6:00 AM – 10:00 PM Daily')}
                </p>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                {t(
                  'homepage.footer.disclaimer',
                  'Agricultural recommendations are AI-assisted guidelines designed to support smart farming practices.'
                )}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-emerald-100 dark:border-[#1e3a30] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 gap-2">
            <span>
              {t(
                'homepage.footer.copyright',
                '© 2026 Bele Mitra – AI Crop Doctor. Built for Resilient Agriculture.'
              )}
            </span>
            <span>English • ಕನ್ನಡ • हिंदी • తెలుగు • தமிழ் • मराठी</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
