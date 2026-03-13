import { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Send,
  Sparkle,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { contactService } from "@/services/api";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Company email from environment
const COMPANY_EMAIL = "farhan1531@gmail.com";

const ContactInfo = [
  {
    icon: MapPin,
    title: "Our Headquarters",
    details:
      "#MH Enterprises, 3001 Markham Rd Unit 20, Scarborough, ON M1X 1L6, Canada",
    link: "https://www.google.com/maps/dir//MH+Enterprises,+3001+Markham+Rd+Unit+20,+Scarborough,+ON+M1X+1L6,+Canada/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x89d4d7007cf12483:0x7dac7e33e9a19404?sa=X&ved=1t:57443&ictx=111",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (289) 671-7979",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: "digitalmedia@mhenterprises.ca",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Monday - Friday: 9:00 AM - 5:00 PM EST\nSunday: Closed",
  },
];

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "seo",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send contact form data using the API service
      await contactService.sendContactForm({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        message: formData.message,
      });

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        service: "seo",
        message: "",
      });
    } catch (error) {
      console.error("Error sending contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-background">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-2xl text-center mx-auto"
      >
        <motion.span
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground dark:text-white"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Sparkle className="text-primary" size={14} />
          Let’s Connect
        </motion.span>

        <h2 className="heading-lg mb-4">
          Let’s build{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary dark:from-primary dark:to-secondary">
            something amazing
          </span>{" "}
          together
        </h2>

        <p className="text-muted-foreground max-w-xl mx-auto">
          Have a projecst in mind or need help growing your business online? Our
          team is ready to craft innovative digital solutions tailored to your
          goals. Reach out today and let’s turn your ideas into powerful digital
          experiences.
        </p>
      </motion.div>
      {/* Contact Form & Info Area */}
      <section className="section-padding relative">
        {/* Background decoration */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none"
          style={{ y }}
        />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                {ContactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="flex items-start gap-4 group"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <info.icon size={24} />
                    </motion.div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed hover:text-primary transition-colors underline"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                          {info.details}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Interactive Map */}
              <motion.div
                className="mt-12 w-full h-80 rounded-3xl border border-border overflow-hidden relative"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <MapContainer
                  center={[43.8246, -79.2654]}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[43.8246, -79.2654]}>
                    <Popup>
                      <div className="text-center">
                        <strong>MH Enterprises</strong>
                        <br />
                        3001 Markham Rd Unit 20
                        <br />
                        Scarborough, ON M1X 1L6
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-xl shadow-primary/5"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-2xl font-bold mb-6">
                  Send us a message
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <motion.div
                      className="space-y-2"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <label
                        htmlFor="firstName"
                        className="text-sm font-semibold text-foreground"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        required
                      />
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <label
                        htmlFor="lastName"
                        className="text-sm font-semibold text-foreground"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className="space-y-2"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-foreground"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      required
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <label
                      htmlFor="service"
                      className="text-sm font-semibold text-foreground"
                    >
                      Interested In
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                    >
                      <option value="seo">SEO Optimization</option>
                      <option value="social">Social Media Marketing</option>
                      <option value="ppc">PPC Advertising</option>
                      <option value="web">Web Development</option>
                      <option value="other">Other Services</option>
                    </select>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold text-foreground"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project goals..."
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                      required
                    ></textarea>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <Send className="animate-spin" size={18} />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight size={18} />
                      </>
                    )}
                  </motion.button>
                  {submitStatus === "success" && (
                    <p className="text-green-500 text-sm text-center mt-2">
                      Message sent successfukly... Please wait mfor reply!
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-500 text-sm text-center mt-2">
                      Failed to send message. Please try again.
                    </p>
                  )}
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
