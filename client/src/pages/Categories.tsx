import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles, Grid, Layers } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { categoryService, servicesService } from '../services/api';
import type { ICategory, IService } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceModal from '../components/ServiceModal';

// Map icon names from API to Font Awesome class names
const getIconClass = (iconName: string): string => {
  const iconMap: Record<string, string> = {
    'faLaptop': 'fa-laptop',
    'faTag': 'fa-tag',
    'faBasketShopping': 'fa-basket-shopping',
    'faPalette': 'fa-palette',
    'faMobile': 'fa-mobile-screen',
    'faGlobe': 'fa-globe',
    'faChartLine': 'fa-chart-line',
    'faBullhorn': 'fa-bullhorn',
    'faShoppingCart': 'fa-shopping-cart',
    'faPencil': 'fa-pencil',
    'faBrush': 'fa-brush',
    'faCode': 'fa-code',
    'faDatabase': 'fa-database',
    'faCloud': 'fa-cloud',
    'faRobot': 'fa-robot',
    'faBrain': 'fa-brain',
    'faMagic': 'fa-wand-magic-sparkles',
  };
  
  return iconMap[iconName] || 'fa-folder';
};

// Skeleton loader for categories
const CategorySkeleton = () => (
  <div className="rounded-2xl border border-border bg-card p-8 animate-pulse">
    <div className="w-14 h-14 mb-4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
    <div className="space-y-2 mb-6">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
  </div>
);

// Service card with enhanced UI
const ServiceCard = ({ service, index, onClick }: { service: IService; index: number; onClick: () => void }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <div
        onClick={onClick}
        className="relative h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
      >
        {/* Image Container with Overlay */}
        <div className="relative h-52 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 animate-pulse" />
          )}
          {service.fileAttachment && (
            <img
              src={service.fileAttachment.url}
              alt={service.fileAttachment.name}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
            Service
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          
          {service.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {service.description}
            </p>
          )}
          
          <div className="flex items-center gap-2 text-primary font-medium">
            <span className="text-sm">Learn more</span>
            <motion.div
              animate={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight size={16} />
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Get category ID from URL query parameter
  const selectedCategoryId = searchParams.get('category');

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  // Fetch all categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch services when a category is selected
  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedCategoryId) return;
      
      try {
        setLoading(true);
        const data = await servicesService.getServicesByCategory(selectedCategoryId);
        setServices(data);
      } catch (err) {
        setError('Failed to fetch services');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [selectedCategoryId]);

  const handleCategoryClick = (categoryId: string) => {
    setSearchParams({ category: categoryId });
    // Smooth scroll to top of section
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBackToCategories = () => {
    setSearchParams({});
    setServices([]);
    // Smooth scroll to top of section
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleServiceClick = (service: IService) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const selectedCategory = useMemo(() => {
    return categories.find(c => c._id === selectedCategoryId);
  }, [categories, selectedCategoryId]);

  // Loading skeletons
  if (loading && categories.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 section-padding">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-16 space-y-4">
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="h-12 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => <CategorySkeleton key={i} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && categories.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 section-padding">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl">
              <p className="text-xl text-red-500 dark:text-red-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={handleCloseModal} />
        )}
      </AnimatePresence>

      <Header />
      
      <section 
        ref={containerRef}
        className="pt-24 section-padding bg-background relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
          style={{ y, opacity }}
        />
        <motion.div 
          className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]), opacity }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -30, 30, -30],
                x: [null, 30, -30, 30],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="mx-auto max-w-7xl relative z-10 px-4">
          {/* Back button with enhanced animation */}
          <AnimatePresence mode="wait">
            {selectedCategoryId && (
              <motion.div
                key="back-button"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-8"
              >
                <motion.button
                  onClick={handleBackToCategories}
                  className="group flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                  <span>Back to Categories</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header with dynamic content */}
          <motion.div
            key={selectedCategoryId ? 'services-header' : 'categories-header'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center"
              >
                {selectedCategoryId ? <Layers size={20} className="text-primary" /> : <Sparkles size={20} className="text-primary" />}
              </motion.div>
              <span className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                {selectedCategoryId ? 'Services' : 'Our Categories'}
              </span>
            </div>
            
            <h2 className="heading-lg mb-4 max-w-3xl">
              {selectedCategoryId ? (
                <>
                  <span className="text-primary">{selectedCategory?.title || 'Services'}</span>
                  {' '}by{' '}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    TheDigitalCube
                  </span>
                </>
              ) : (
                <>
                  Solutions that <span className="italic text-primary">drive growth</span>
                </>
              )}
            </h2>
            
            <p className="text-body max-w-2xl text-muted-foreground">
              {selectedCategoryId
                ? selectedCategory?.description || 'Explore our specialized services in this category.'
                : 'Discover our comprehensive range of digital marketing services tailored to elevate your brand and accelerate business growth.'}
            </p>
          </motion.div>

          {/* Loading indicator for services */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-12"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categories Grid */}
          <AnimatePresence mode="wait">
            {!selectedCategoryId && !loading && categories && categories.length > 0 && (
              <motion.div
                key="categories-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {categories?.map((category, index) => (
                  <motion.div
                    key={category._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    onHoverStart={() => setHoveredCategory(category._id)}
                    onHoverEnd={() => setHoveredCategory(null)}
                  >
                    <div
                      onClick={() => handleCategoryClick(category._id)}
                      className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
                    >
                      {/* Animated background gradient */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0"
                        animate={{
                          opacity: hoveredCategory === category._id ? 1 : 0,
                          scale: hoveredCategory === category._id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Animated corner decorations */}
                      <motion.div 
                        className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/10"
                        animate={{
                          scale: hoveredCategory === category._id ? 1.5 : 1,
                          rotate: hoveredCategory === category._id ? 45 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div 
                        className="absolute -left-12 -bottom-12 h-24 w-24 rounded-full bg-secondary/10"
                        animate={{
                          scale: hoveredCategory === category._id ? 1.5 : 1,
                          rotate: hoveredCategory === category._id ? -45 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="relative z-10">
                        {/* Category Icon with animation */}
                        {category.icon && (
                          <motion.div 
                            className="w-14 h-14 mb-4 flex items-center justify-center bg-primary/10 rounded-lg"
                            animate={{
                              scale: hoveredCategory === category._id ? 1.1 : 1,
                              rotate: hoveredCategory === category._id ? [0, -5, 5, 0] : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <i className={`fa-solid ${getIconClass(category.icon)} text-2xl text-primary`}></i>
                          </motion.div>
                        )}
                        
                        <h3 className="heading-md mb-3 text-xl">
                          {category.title}
                        </h3>
                        
                        <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                          {category.description}
                        </p>
                        
                        <motion.div 
                          className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary"
                          animate={{
                            x: hoveredCategory === category._id ? 5 : 0,
                          }}
                        >
                          View Services <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </motion.div>
                      </div>

                      {/* Animated bottom line */}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: "0%" }}
                        animate={{
                          width: hoveredCategory === category._id ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Services Grid */}
          <AnimatePresence mode="wait">
            {selectedCategoryId && !loading && services && services.length > 0 && (
              <motion.div
                key="services-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {services?.map((service, index) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    index={index}
                    onClick={() => handleServiceClick(service)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results state */}
          <AnimatePresence>
            {((!selectedCategoryId && !loading && (!categories || categories.length === 0)) ||
              (selectedCategoryId && !loading && services && services.length === 0)) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="inline-block p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                  <p className="text-lg text-muted-foreground">
                    {selectedCategoryId 
                      ? 'No services found for this category.' 
                      : 'No categories available.'}
                  </p>
                  {selectedCategoryId && (
                    <button
                      onClick={handleBackToCategories}
                      className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Browse Categories
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Categories;