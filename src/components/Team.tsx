import { useState, useEffect, useRef } from "react";
import { Linkedin, Twitter, Facebook, Instagram, Globe, Github, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { teamService } from "../services/api";
import type { ITeamMember } from "../types";

// Map role to display text
const getRoleDisplay = (role: string): string => {
  const roleMap: Record<string, string> = {
    owner: "Owner",
    manager: "Manager",
    teamlead: "Team Lead",
    employee: "Team Member",
  };
  return roleMap[role] || role;
};

// Get icon for social platform
const getSocialIcon = (platform: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    linkedin: <Linkedin size={16} />,
    twitter: <Twitter size={16} />,
    facebook: <Facebook size={16} />,
    instagram: <Instagram size={16} />,
    website: <Globe size={16} />,
    github: <Github size={16} />,
  };
  return iconMap[platform.toLowerCase()] || <Globe size={16} />;
};

// Team Member Modal
const TeamMemberModal = ({ member, onClose }: { member: ITeamMember; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
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
        className="relative w-full max-w-lg max-h-[90vh] bg-card rounded-2xl border border-border overflow-hidden shadow-2xl flex flex-col"
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
          {/* Header Image */}
          <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0">
            {member.profilePic?.url && (
              <img
                src={member.profilePic.url}
                alt={member.name}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-32 h-32 rounded-full object-cover border-4 border-card shadow-xl"
              />
            )}
          </div>

          {/* Content */}
          <div className="pt-20 pb-6 px-6">
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-semibold">{getRoleDisplay(member.role)}</p>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">About</h4>
              <p className="text-muted-foreground">{member.intro}</p>
            </div>

            {member.email && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Contact</h4>
                <a 
                  href={`mailto:${member.email}`} 
                  className="text-primary hover:underline"
                >
                  {member.email}
                </a>
              </div>
            )}

            {member.socials && member.socials.length > 0 && (
              <div className="pb-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Connect</h4>
                <div className="flex justify-center gap-3 flex-wrap">
                  {member.socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      title={social.platform}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Team = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<ITeamMember | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const data = await teamService.getAllTeams();
        setTeamMembers(data);
      } catch (err) {
        setError('Failed to fetch team members');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleMemberClick = (member: ITeamMember) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  return (
    <section id="team" className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        style={{ y }}
      />

      <div ref={containerRef} className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl text-center mx-auto"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
            Our Team
          </span>
          <h2 className="heading-lg mb-4">
            Meet the <span className="italic text-primary">experts</span>
          </h2>
          <p className="text-body mx-auto max-w-xl">
            We are a team of passionate digital marketers, developers, and designers dedicated to driving your success.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-xl text-muted-foreground">Loading team members...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        )}

        {/* Team Grid */}
        {!loading && !error && teamMembers.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
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
                <motion.div 
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleMemberClick(member)}
                >
                  {/* Image overlay */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <motion.img
                      src={member.profilePic?.url || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    {/* Social icons on hover */}
                    {member.socials && member.socials.length > 0 && (
                      <motion.div 
                        className="absolute bottom-6 left-6 flex gap-3 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                      >
                        {member.socials.slice(0, 3).map((social, idx) => (
                          <a 
                            key={idx}
                            href={social.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform"
                          >
                            {getSocialIcon(social.platform)}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary text-sm font-semibold mb-3">{getRoleDisplay(member.role)}</p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{member.intro}</p>
                    
                    {/* Visible social icons */}
                    {member.socials && member.socials.length > 0 && (
                      <div className="flex gap-3">
                        {member.socials.slice(0, 3).map((social, idx) => (
                          <motion.a 
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            whileHover={{ scale: 1.2, y: -2 }}
                          >
                            {getSocialIcon(social.platform)}
                          </motion.a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {/* No team members */}
        {!loading && !error && teamMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No team members available.</p>
          </div>
        )}
      </div>

      {/* Team Member Modal */}
      {selectedMember && (
        <TeamMemberModal member={selectedMember} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default Team;
