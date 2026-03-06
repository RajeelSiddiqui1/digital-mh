import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { categoryService } from '../services/api';
import type { ICategory } from '../types';


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

const Services = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const containerRef = useRef<HTMLDivElement>(null);
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
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Navigate to services page with category ID
  const handleCategoryClick = (categoryId: string) => {
    navigate(`/services?category=${categoryId}`);
  };

  const isLoading = loading && categories.length === 0;
  const hasError = error && categories.length === 0;

  return (
    <div className="min-h-screen bg-background">
     
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

        <div className="mx-auto max-w-7xl relative z-10 px-4">
          {/* Header with reveal animation */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
              Our Services
            </span>
            <h2 className="heading-lg mb-4">
              Solutions that <span className="italic text-primary">drive growth</span>
            </h2>
            <p className="text-body">
              We offer comprehensive digital marketing services tailored to elevate your brand and accelerate business growth.
            </p>
          </motion.div>

          {/* Error State */}
          {hasError && (
            <div className="text-center py-12">
              <p className="text-xl text-red-500">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="text-xl text-muted-foreground">Loading...</div>
            </div>
          )}

          {/* Categories Grid - Click to go to services page */}
          {!isLoading && !hasError && categories.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                >
                  <div
                    onClick={() => handleCategoryClick(category._id)}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    {/* Corner decorations */}
                    <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-150" />
                    <div className="absolute -left-12 -bottom-12 h-24 w-24 rounded-full bg-secondary/10 transition-transform duration-500 group-hover:scale-150" />

                    <div className="relative z-10">
                      {/* Category Icon */}
                      {category.icon && (
                        <div className="w-14 h-14 mb-4 flex items-center justify-center bg-primary/10 rounded-lg">
                          <i className={`fa-solid ${getIconClass(category.icon)} text-2xl text-primary`}></i>
                        </div>
                      )}
                      
                      <motion.h3 
                        className="heading-md mb-3 text-xl"
                        whileHover={{ x: 5 }}
                      >
                        {category.title}
                      </motion.h3>
                      
                      <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                        {category.description}
                      </p>
                      
                      <motion.div 
                        className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary"
                        whileHover={{ x: 5 }}
                      >
                        View Services <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </div>

                    {/* Bottom line that grows on hover */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-primary"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No categories found */}
          {!isLoading && !hasError && categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No categories available.</p>
            </div>
          )}
        </div>
      </section>
  
    </div>
  );
};

export default Services;
