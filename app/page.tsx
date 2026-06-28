"use client";

import { motion, Variants, Transition } from "framer-motion";
import { ArrowRight, ShieldCheck, HeartPulse, Phone, Mail, User, ChevronRight, Activity, Umbrella, Star } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Gradient } from "../lib/Gradient";
import VantaBackground from "../components/VantaBackground";
import WhatsAppButton from "../components/WhatsAppButton";
import { ShineBorder } from "../components/ShineBorder";

const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: springTransition }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-30 mix-blend-normal"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(0,168,150,0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: ""
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailTo = "albornozinsurance@gmail.com";
    const subject = `Nueva consulta de asesoría: ${formData.nombre}`;
    const body = `Hola Ingrid,\n\nMi nombre es ${formData.nombre}.\n\n📱 Teléfono: ${formData.telefono}\n✉️ Email: ${formData.email}\n\nQuisiera consultar lo siguiente:\n${formData.mensaje}`;
    
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  useEffect(() => {
    // We are replacing the WebGL Gradient with the exact video provided by the user.
    // const gradient = new Gradient();
    // gradient.initGradient("#gradient-canvas");

    return () => {
      // gradient.pause();
      // gradient.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#00A896] selection:text-slate-900 relative overflow-hidden">
      
      {/* Programmatic Animated Ribbon Background */}
      <div className="absolute top-0 left-0 w-full h-[800px] z-0 overflow-hidden pointer-events-none flex justify-center items-center opacity-100">
        <VantaBackground />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* I */}
                <rect x="6" y="6" width="4" height="28" fill="#0F172A" />
                {/* A left leg */}
                <path d="M22 6L14 34h4.5l6-21 6 21H35L27 6h-5z" fill="#0F172A" />
                {/* Teal dot */}
                <circle cx="24.5" cy="22" r="2.5" fill="#00A896" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-widest text-slate-900 leading-none">INGRID ALBORNOZ</span>
              <span className="text-[0.6rem] tracking-[0.2em] text-[#00A896] font-semibold">ASESORA INTEGRAL DE SALUD</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#servicios" className="hidden md:block hover:text-slate-900 transition-colors">Servicios</a>
            <a href="#beneficios" className="hidden md:block hover:text-slate-900 transition-colors">Beneficios</a>
            <a href="#contacto" className="px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm rounded-full bg-white/80 hover:bg-white border border-slate-200 text-slate-900 transition-all backdrop-blur-md shadow-md font-semibold">
              Contactar
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-10 pb-12 md:pt-20 md:pb-16 flex flex-col lg:flex-row items-center gap-16 relative">
          <motion.div 
            className="flex-1 text-center lg:text-left z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00A896]/30 mb-8 shadow-[0_0_20px_rgba(0,168,150,0.15)]">
              <span className="flex h-2 w-2 rounded-full bg-[#00A896] animate-pulse"></span>
              <span className="text-sm font-medium text-teal-800">Asesoría 100% Personalizada</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-[5rem] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.05]">
              Protege lo que <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#00A896] via-[#007064] to-teal-800">
                más importa.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Tranquilidad para tu futuro y el de tu familia con planes de salud y vida diseñados específicamente a tu medida.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#contacto" className="group relative inline-flex items-center p-[2px] rounded-full font-bold overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] animated-border">
                <span className="relative flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full w-full h-full">
                  <span>Asesoría Gratuita</span>
                  <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a href="#servicios" className="group flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Explorar Servicios
                <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 relative w-full max-w-lg lg:max-w-none z-10 lg:-mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
          >
            <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-2 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
              <img 
                src="/images/hero-family-clean.png" 
                alt="Health and Life Insurance" 
                className="w-full h-full object-cover rounded-[2.2rem]"
              />
              
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                className="absolute top-8 left-8 right-8 md:right-auto p-4 rounded-2xl glass border border-white/60 flex flex-col gap-1 z-20 backdrop-blur-xl shadow-2xl bg-white/40"
              >
                <h2 className="text-slate-900 font-black tracking-tight text-2xl md:text-3xl leading-none drop-shadow-sm">
                  Health & Life
                </h2>
                <span className="text-[#007064] font-bold tracking-widest text-sm uppercase drop-shadow-sm">
                  Insurance
                </span>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass border border-slate-300 flex items-center gap-4 z-20 backdrop-blur-xl bg-white/40 shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-[#00A896]/20 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#00A896]" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold">Agente Certificada</p>
                  <p className="text-sm text-slate-700 font-medium">Licencia oficial para protegerte</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Marquee Section */}
        <div className="w-full py-8 overflow-hidden relative z-10 bg-slate-50/60 backdrop-blur-md border-y border-slate-200/50 mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-max animate-scroll">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-20 px-10">
                {['Florida Blue', 'Ambetter', 'Oscar', 'Aetna', 'UnitedHealthcare', 'Cigna', 'Molina Healthcare', 'Humana'].map((carrier, j) => (
                  <span key={j} className="text-xl font-bold text-slate-700 uppercase tracking-widest opacity-80 hover:opacity-100 hover:text-slate-900 transition-opacity cursor-default">
                    {carrier}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Skewed Divider */}
        <div className="relative h-24 w-full overflow-hidden -mb-12 z-0">
          <div className="absolute inset-0 bg-white transform -skew-y-3 origin-top-left" />
        </div>

        {/* Services Section */}
        <section id="servicios" className="py-24 relative bg-white z-10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Coberturas a tu medida
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
                Soluciones integrales diseñadas para adaptarse a tu estilo de vida, necesidades familiares y presupuesto.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  icon: <HeartPulse className="w-8 h-8 text-white" />, 
                  title: "Seguros de Salud", 
                  desc: "Acceso a la mejor red médica. Planes individuales y familiares que cuidan de tu bienestar sin comprometer tu economía.",
                  img: "/images/media__1782407729478.png"
                },
                { 
                  icon: <Umbrella className="w-8 h-8 text-white" />, 
                  title: "Seguros de Vida", 
                  desc: "Garantiza el futuro financiero de los que más amas. Protección sólida ante cualquier imprevisto de la vida.",
                  img: "/images/life_insurance_family.png"
                },
                { 
                  icon: <Activity className="w-8 h-8 text-white" />, 
                  title: "Planes Complementarios", 
                  desc: "Coberturas adicionales dentales, visuales y de accidentes para una protección verdaderamente 360°.",
                  img: "/images/pagando.png"
                }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, ...springTransition }}
                >
                  <SpotlightCard className="group h-full rounded-3xl glass-card border border-slate-200/50 bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                    <div className="h-48 relative overflow-hidden m-2 rounded-2xl">
                      <Image src={service.img} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent" />
                    </div>
                    <div className="p-8 relative z-20">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00A896] to-[#007064] flex items-center justify-center absolute -top-10 left-8 shadow-lg shadow-[#00A896]/20 ring-4 ring-white">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 mt-2">{service.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-6 text-sm">{service.desc}</p>
                      <a href="#contacto" className="inline-flex items-center text-[#00A896] font-semibold hover:text-teal-300 transition-colors">
                        Cotizar ahora <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skewed Divider 2 */}
        <div className="relative h-32 w-full overflow-hidden -mt-12 z-0">
          <div className="absolute inset-0 bg-slate-50 transform skew-y-3 origin-bottom-right" />
        </div>

        {/* Value Prop / Features */}
        <section id="beneficios" className="py-32 bg-slate-50 relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6 relative">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={springTransition}
                className="relative rounded-2xl md:rounded-[2rem] overflow-hidden mt-8 md:mt-16 shadow-2xl bg-white hover:scale-[1.7] md:hover:scale-[2.2] hover:z-50 md:origin-left hover:shadow-[0_0_40px_rgba(0,168,150,0.5)] transition-all duration-500 ease-out cursor-zoom-in"
              >
                <ShineBorder className="w-full h-full rounded-[inherit]" borderWidth={4} duration={3} color="#00A896">
                  <img src="/images/buscas.png" alt="Happy family" className="w-full h-auto object-contain" />
                </ShineBorder>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springTransition, delay: 0.2 }}
                className="relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-white hover:scale-[1.7] md:hover:scale-[2.2] hover:z-50 md:origin-right hover:shadow-[0_0_40px_rgba(0,168,150,0.5)] transition-all duration-500 ease-out cursor-zoom-in"
              >
                <img src="/images/life_insurance_family.png" alt="Peace of mind" className="w-full h-auto object-contain" />
              </motion.div>
              
              {/* Decorative glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00A896] blur-[100px] opacity-20 pointer-events-none" />
            </div>
            
            <div className="flex-1">
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={springTransition}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
              >
                ¿Por qué elegirme como tu asesora?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...springTransition, delay: 0.1 }}
                className="text-slate-600 text-lg mb-10 font-light"
              >
                Mi compromiso va más allá de vender una póliza. Se trata de construir una relación de confianza para proteger tu patrimonio y tranquilidad a largo plazo.
              </motion.p>
              
              <div className="space-y-6">
                {[
                  "Análisis profundo de tus necesidades reales.",
                  "Acompañamiento en cada paso del proceso.",
                  "Representación ante las compañías aseguradoras.",
                  "Actualización constante sobre las mejores opciones del mercado."
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1), ...springTransition }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#00A896]/10 border border-[#00A896]/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <ShieldCheck className="w-4 h-4 text-[#00A896]" />
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-6">

            {/* Trust Metrics Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springTransition}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-20 p-8 md:p-12 rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-2xl border border-slate-700"
            >
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-[#00A896] mb-2 drop-shadow-md">+300</p>
                <p className="text-slate-300 font-medium tracking-wide uppercase text-sm">Familias Protegidas</p>
              </div>
              <div className="text-center relative md:py-0 py-4 border-y md:border-y-0 md:border-x border-slate-700/50">
                <p className="text-4xl md:text-5xl font-black text-[#00A896] mb-2 drop-shadow-md">+10</p>
                <p className="text-slate-300 font-medium tracking-wide uppercase text-sm">Años de Experiencia</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-[#00A896] mb-2 drop-shadow-md">100%</p>
                <p className="text-slate-300 font-medium tracking-wide uppercase text-sm">Asesoría Gratuita</p>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Historias de Familias Protegidas
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
                Únete a las más de 300 familias que ya confían su tranquilidad en mi asesoría. Descubre lo que dicen sobre su experiencia.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "María Gómez",
                  text: "Ingrid fue muy paciente y me explicó con detalle cada opción de seguro de salud. Ahora mi familia está cubierta y pagamos menos de lo que imaginaba.",
                  role: "Madre de familia",
                  rating: 5
                },
                {
                  name: "Carlos Rodríguez",
                  text: "El seguro de vida siempre me pareció complicado hasta que hablé con ella. Encontró el plan perfecto para mi presupuesto y me dio total tranquilidad.",
                  role: "Emprendedor",
                  rating: 5
                },
                {
                  name: "Familia Hernández",
                  text: "Excelente profesional. Nos ayudó a conseguir cobertura dental y visual para los niños sin complicaciones. La recomendamos al 100%.",
                  role: "Clientes desde 2021",
                  rating: 5
                }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, ...springTransition }}
                >
                  <SpotlightCard className="h-full rounded-3xl glass-card border border-slate-200 p-8 bg-slate-50 hover:bg-white transition-colors relative flex flex-col">
                    <div className="flex gap-1 mb-6 text-amber-400">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-8 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00A896] to-teal-800 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-32 relative overflow-hidden">
          {/* Ambient glow for form */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00A896] rounded-full blur-[150px] opacity-[0.15] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <ShineBorder className="rounded-[2.5rem] shadow-2xl" borderWidth={3} duration={6} color="#00A896">
              <SpotlightCard className="rounded-[inherit] h-full w-full p-8 md:p-14 border border-slate-200 bg-slate-50/90 backdrop-blur-2xl">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Hablemos de tu futuro</h2>
                  <p className="text-slate-600 text-lg font-light">Déjame tus datos y me comunicaré contigo a la brevedad para una asesoría sin costo.</p>
                </div>

              <form className="space-y-6" onSubmit={handleEmailSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 ml-1">Nombre Completo</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-slate-500 group-focus-within:text-[#00A896] transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        className="w-full bg-white/60 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:border-[#00A896] transition-all"
                        placeholder="Ej. Juan Pérez"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 ml-1">Teléfono</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-slate-500 group-focus-within:text-[#00A896] transition-colors" />
                      </div>
                      <input 
                        type="tel" 
                        required
                        value={formData.telefono}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        className="w-full bg-white/60 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:border-[#00A896] transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">Correo Electrónico</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-[#00A896] transition-colors" />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/60 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:border-[#00A896] transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">¿En qué te puedo ayudar?</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.mensaje}
                    onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    className="w-full bg-white/60 border border-slate-200 rounded-xl py-3.5 px-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:border-[#00A896] transition-all resize-none"
                    placeholder="Me interesa cotizar un seguro de salud para mi familia..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 mt-2 bg-gradient-to-r from-[#00A896] to-[#007064] text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(0,168,150,0.3)] hover:shadow-[0_0_30px_rgba(0,168,150,0.5)] hover:scale-[1.01] transition-all"
                >
                  Solicitar Asesoría
                </button>
              </form>
            </SpotlightCard>
            </ShineBorder>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 bg-slate-50 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="4" height="28" fill="#0F172A" />
              <path d="M22 6L14 34h4.5l6-21 6 21H35L27 6h-5z" fill="#0F172A" />
              <circle cx="24.5" cy="22" r="2.5" fill="#00A896" />
            </svg>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-widest text-slate-900 leading-none">INGRID ALBORNOZ</span>
              <span className="text-[0.55rem] tracking-[0.2em] text-[#00A896] font-semibold">ASESORA INTEGRAL DE SALUD</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-light">
            © {new Date().getFullYear()} Ingrid Albornoz Seguros. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a href="https://wa.me/13059469014" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-[#00A896] hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
            <a href="https://instagram.com/albornozinsurance" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-[#00A896] hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}
