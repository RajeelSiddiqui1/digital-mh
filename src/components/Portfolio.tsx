import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, X, ExternalLink, Github } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projectService } from "../services/api";
import type { IProject, IProjectCategory } from "../types";

// Project Modal
const ProjectModal = ({ project, onClose }: { project: IProject; onClose: () => void }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Get category title
  const getCategoryTitle = () => {
    if (typeof project.cateogryId === 'object' && project.cateogryId !== null) {
      return (project.cateogryId as IProjectCategory).title;
    }
    return "Project";
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Content - Fixed with internal scroll */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-card rounded-2xl border border-border overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <X size={20} />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1">
            {/* Main Image - Clickable */}
            <div 
              className="relative cursor-pointer"
              onClick={() => setSelectedImage(project.fileAttachment?.url)}
            >
              <img
                src={project.fileAttachment?.url}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              {/* Zoom icon */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 bg-background/80 rounded text-xs text-muted-foreground">
                Click to enlarge
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 -mt-12 relative">
              {/* Category Badge */}
              <span className="inline-block mb-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                {getCategoryTitle()}
              </span>

              {/* Title */}
              <h3 className="font-display text-2xl font-bold mb-3">{project.title}</h3>

              {/* Description */}
              <div className="mb-6">
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Multiple Attachments - Clickable */}
              {project.multipleAttachments && project.multipleAttachments.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Gallery (Click to enlarge)</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {project.multipleAttachments.map((attachment, index) => (
                      <div 
                        key={index}
                        className="relative cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => setSelectedImage(attachment.url)}
                      >
                        <img
                          src={attachment.url}
                          alt={`${project.title} - ${index + 1}`}
                          className="w-full h-20 object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Link */}
              {project.liveLink && (
                <div className="flex gap-3">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full Screen Image Viewer */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <X size={20} />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

const Portfolio = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Fetch projects from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const data = await projectService.getAllProjects();
                setProjects(data);
            } catch (err) {
                setError('Failed to fetch projects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (project: IProject) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    // Get category title helper
    const getCategoryTitle = (categoryId: string | IProjectCategory) => {
        if (typeof categoryId === 'object' && categoryId !== null) {
            return categoryId.title;
        }
        return "Project";
    };

    return (
        <section id="portfolio" className="section-padding bg-background relative overflow-hidden">
            {/* Background decoration */}
            <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl"
                style={{ y }}
            />

            <div ref={containerRef} className="mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                        Portfolio
                    </span>
                    <h2 className="heading-lg mb-4">
                        Recent{" "}
                        <span className="italic text-primary">projects</span>
                    </h2>
                    <p className="text-body mx-auto max-w-xl">
                        A selection of our latest work showcasing the diverse range of
                        digital solutions we deliver for our clients.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="text-xl text-muted-foreground">Loading projects...</div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="text-xl text-red-500">{error}</p>
                    </div>
                )}

                {/* Projects Grid */}
                {!loading && !error && projects.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.15,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15
                                }}
                            >
                                <motion.div
                                    className="group relative overflow-hidden rounded-2xl bg-card cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => handleProjectClick(project)}
                                >
                                    {/* Image with zoom effect */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src={project.fileAttachment?.url}
                                            alt={project.title}
                                            className="aspect-[4/3] w-full object-cover"
                                            loading="lazy"
                                        />
                                    </motion.div>

                                    {/* Overlay with slide-up effect */}
                                    <motion.div 
                                        className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent p-6"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div 
                                            className="flex w-full items-end justify-between"
                                            initial={{ y: 20 }}
                                            whileHover={{ y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div>
                                                <motion.span 
                                                    className="mb-1 block text-xs font-semibold uppercase tracking-wider text-primary"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    {getCategoryTitle(project.cateogryId)}
                                                </motion.span>
                                                <h3 className="font-display text-xl font-bold text-background">
                                                    {project.title}
                                                </h3>
                                            </div>
                                            <motion.span 
                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
                                                whileHover={{ scale: 1.2, rotate: 45 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ArrowUpRight size={18} />
                                            </motion.span>
                                        </motion.div>
                                    </motion.div>

                                    {/* Corner accent */}
                                    <motion.div 
                                        className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* No Projects */}
                {!loading && !error && projects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No projects available.</p>
                    </div>
                )}
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={handleCloseModal} />
            )}
        </section>
    );
};

export default Portfolio;
