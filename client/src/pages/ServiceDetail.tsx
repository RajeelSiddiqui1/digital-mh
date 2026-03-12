import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sparkles, Layers } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { categoryService, servicesService } from "../services/api";
import type { ICategory, IService } from "../types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceModal from "../components/ServiceModal";

// Map icon names from API to Font Awesome class names
const getIconClass = (iconName: string): string => {
  const iconMap: Record<string, string> = {
    faLaptop: "fa-laptop",
    faTag: "fa-tag",
    faBasketShopping: "fa-basket-shopping",
    faPalette: "fa-palette",
    faMobile: "fa-mobile-screen",
    faGlobe: "fa-globe",
    faChartLine: "fa-chart-line",
    faBullhorn: "fa-bullhorn",
    faShoppingCart: "fa-shopping-cart",
    faPencil: "fa-pencil",
    faBrush: "fa-brush",
    faCode: "fa-code",
    faDatabase: "fa-database",
    faCloud: "fa-cloud",
    faRobot: "fa-robot",
    faBrain: "fa-brain",
    faMagic: "fa-wand-magic-sparkles",
  };

  return iconMap[iconName] || "fa-folder";
};

// Skeleton loader for categories
const CategorySkeleton = () => (
  <div className="rounded-2xl border border-border bg-card p-8 animate-pulse">
    <div className="w-14 h-14 mb-4 bg-muted rounded-lg" />
    <div className="h-6 bg-muted rounded w-3/4 mb-3" />
    <div className="space-y-2 mb-6">
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-5/6" />
    </div>
    <div className="h-4 bg-muted rounded w-24" />
  </div>
);

// Service card with enhanced UI matching the theme
const ServiceCard = ({ service, index, onClick }: { service: IService; index: number; onClick: () => void }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <div
        onClick={onClick}
        className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
      >
        {/* Hover glow effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Corner decorations */}
        <motion.div 
          className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/10"
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute -left-12 -bottom-12 h-24 w-24 rounded-full bg-secondary/10"
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Image Container with loading state */}
        {service.fileAttachment && (
          <div className="relative h-48 overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
            )}
            <img
              src={service.fileAttachment.url}
              alt={service.fileAttachment.name}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        )}

        <div className="relative z-10 p-6">
          <h3 className="heading-md text-xl mb-2 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          
          <p className="text-sm leading-relaxed text-muted-foreground mb-6 line-clamp-2">
            {service.description}
          </p>
          
          <motion.div 
            className="flex items-center gap-2 text-sm font-semibold text-primary"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </motion.div>
        </div>

        {/* Video Attachment Preview */}
        {service.videoAttachment && service.videoAttachment.url && (
          <div className="relative z-10 px-6 pb-6">
            <div className="relative rounded-lg overflow-hidden">
              <video
                src={service.videoAttachment.url}
                className="w-full h-24 object-cover rounded"
                controls
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        {/* Bottom line that grows on hover */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Modal state
  const [selectedService, setSelectedService] = useState<IService | null>(null);

  // Get category ID from URL query parameter
  const selectedCategoryId = searchParams.get("category");

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Fix for the scroll offset warning - ensure containerRef is properly set
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Fetch all categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch categories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch services when a category is selected from URL
  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedCategoryId) return;

      try {
        setLoading(true);
        const data = await servicesService.getServicesByCategory(selectedCategoryId);
        setServices(data);
      } catch (err) {
        setError("Failed to fetch services");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [selectedCategoryId]);

  // Handle category click - update URL and fetch services
  const handleCategoryClick = (categoryId: string) => {
    setSearchParams({ category: categoryId });
    // Smooth scroll to top
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Reset to show categories again
  const handleBackToCategories = () => {
    setSearchParams({});
    setServices([]);
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle service click - open modal
  const handleServiceClick = (service: IService) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "unset";
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Get selected category details
  const selectedCategory = useMemo(() => {
    return categories.find((c) => c._id === selectedCategoryId);
  }, [categories, selectedCategoryId]);

  // All hooks are called before any conditional returns
  // Now we can safely render based on state

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section 
        ref={containerRef}
        className="pt-24 section-padding bg-background relative overflow-hidden"
      >
        {/* Background decoration */}
        <motion.div 
          className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
          style={{ y }}
        />
        <motion.div 
          className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
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
          {/* Back button with animation */}
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
                  className="group flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                  <span>Back to Categories</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header with reveal animation - always visible */}
          <motion.div
            key={selectedCategoryId ? 'services-header' : 'categories-header'}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-2xl"
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
                {selectedCategoryId ? 'Services' : 'Our Services'}
              </span>
            </div>
            
            <h2 className="heading-lg mb-4">
              {selectedCategoryId ? (
                <>
                  <span className="text-primary">{selectedCategory?.title || 'Services'}</span>
                </>
              ) : (
                <>
                  Solutions that <span className="italic text-primary">drive growth</span>
                </>
              )}
            </h2>
            
            <p className="text-body">
              {selectedCategoryId
                ? selectedCategory?.description || 'Explore our specialized services in this category.'
                : 'Discover our comprehensive range of digital marketing services tailored to elevate your brand and accelerate business growth.'}
            </p>
          </motion.div>

          {/* Loading States - always render but conditionally show */}
          <AnimatePresence>
            {/* Loading indicator for initial categories load */}
            {loading && categories.length === 0 && (
              <motion.div
                key="initial-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {[1, 2, 3, 4, 5, 6].map(i => <CategorySkeleton key={i} />)}
              </motion.div>
            )}

            {/* Error state */}
            {error && categories.length === 0 && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className="inline-block p-8 bg-destructive/10 rounded-2xl">
                  <p className="text-xl text-destructive mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}

            {/* Loading indicator for services */}
            {selectedCategoryId && loading && services.length === 0 && (
              <motion.div
                key="services-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-12"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categories Grid */}
          <AnimatePresence mode="wait">
            {!selectedCategoryId && !loading && !error && categories && categories.length > 0 && (
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
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
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
                      {/* Hover glow effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0"
                        animate={{ opacity: hoveredCategory === category._id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Corner decorations */}
                      <motion.div 
                        className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/10"
                        animate={{ scale: hoveredCategory === category._id ? 1.5 : 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div 
                        className="absolute -left-12 -bottom-12 h-24 w-24 rounded-full bg-secondary/10"
                        animate={{ scale: hoveredCategory === category._id ? 1.5 : 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="relative z-10">
                        {/* Category Icon */}
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
                        
                        <h3 className="heading-md mb-3 text-xl group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        
                        <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                          {category.description}
                        </p>
                        
                        <motion.div 
                          className="flex items-center gap-2 text-sm font-semibold text-primary"
                          animate={{ x: hoveredCategory === category._id ? 5 : 0 }}
                        >
                          View Services <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </motion.div>
                      </div>

                      {/* Bottom line that grows on hover */}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-1 bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: hoveredCategory === category._id ? "100%" : "0%" }}
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
            {selectedCategoryId && !loading && !error && services && services.length > 0 && (
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
            {!loading && !error && (
              <>
                {!selectedCategoryId && categories.length === 0 && (
                  <motion.div
                    key="no-categories"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <div className="inline-block p-8 bg-card rounded-2xl border border-border">
                      <p className="text-lg text-muted-foreground">
                        No categories available.
                      </p>
                    </div>
                  </motion.div>
                )}

                {selectedCategoryId && services.length === 0 && (
                  <motion.div
                    key="no-services"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <div className="inline-block p-8 bg-card rounded-2xl border border-border">
                      <p className="text-lg text-muted-foreground mb-4">
                        No services found for this category.
                      </p>
                      <button
                        onClick={handleBackToCategories}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Browse Categories
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={handleCloseModal} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Categories;