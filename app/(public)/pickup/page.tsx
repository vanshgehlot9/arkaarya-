"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { 
  ArrowLeft, ArrowRight, CheckCircle2, MapPin, Loader2, UploadCloud, 
  ShieldAlert, Phone, Trash2, X, RefreshCw, Truck, Check, AlertCircle 
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { submitPickupRequest } from "@/app/actions/submitPickup";
import { State, City } from "country-state-city";

// Dynamically import the map to avoid SSR issues (Leaflet needs window)
const LocationMapPreview = dynamic(
  () => import("@/components/LocationMapPreview"),
  { ssr: false }
);

const IN_STATES = State.getStatesOfCountry("IN");

// E-Waste Categories Data (MUST remain exactly as is)
const E_WASTE_CATEGORIES = [
  "Laptops / Notebooks", "Desktop Computers", "Monitors", "Servers", 
  "Networking Equipment", "Printers / Scanners", "Mobile Phones", "Tablets",
  "Televisions", "UPS / Inverters", "Batteries", "Cables / Wires", 
  "Routers / Switches", "Hard Disks / SSDs", "CPUs / Motherboards", 
  "RAM / Memory", "Keyboards / Mouse", "CCTV Equipment", "Telecom Equipment",
  "Electronic Components / PCB", "Industrial Electronics", "Consumer Electronics",
  "Mixed E-Waste", "Other"
];

// Helper: Shake animation variants for validation
const shakeVariants = {
  initial: { x: 0 },
  shake: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } }
};

// Moved OUTSIDE component to prevent re-mounting and losing input focus on every keystroke
const ErrorWrapper = ({ field, errors, children }: { field: string, errors: Record<string, string>, children: React.ReactNode }) => (
  <motion.div variants={shakeVariants} animate={errors[field] ? "shake" : "initial"} className="relative w-full">
    {children}
    {errors[field] && (
      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-5 left-1 text-[11px] font-bold text-red-500 flex items-center gap-1 z-10">
        <AlertCircle size={12} /> {errors[field]}
      </motion.div>
    )}
  </motion.div>
);

export default function PickupForm() {
  const router = useRouter();

  // Navigation State
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  
  // Submission & Validation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pickupId, setPickupId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Modals
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // Geolocation state
  const [locStatus, setLocStatus] = useState("");

  const [formData, setFormData] = useState({
    pickupType: "",
    condition: "",
    categories: [] as string[],
    quantity: "",
    items: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    coordinates: "",
    date: "",
    time: "",
    urgency: "",
    need: "",
    name: "",
    company: "",
    phone: "",
    email: "",
    dataDestruction: "No",
    notes: "",
    consent: false
  });

  // Photos State
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Focus refs for validation
  const fieldRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const assignRef = (name: string) => (el: HTMLElement | null) => {
    fieldRefs.current[name] = el;
  };

  // Set min date for pickup
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const minDate = today.toISOString().slice(0, 10);

  // Dynamic Summary Computation
  const summary = useMemo(() => {
    const cats = formData.categories.length > 2 
      ? `${formData.categories.slice(0, 2).join(" + ")} + ${formData.categories.length - 2} more`
      : formData.categories.join(" + ");
    return {
      materials: cats || "No categories selected",
      details: `${formData.quantity || "Qty not set"} • ${formData.condition || "Condition not set"}${formData.items ? ` • ${formData.items} items` : ""}`
    };
  }, [formData.categories, formData.quantity, formData.condition, formData.items]);

  // Handlers
  const handleCategoryToggle = (cat: string) => {
    setErrors(prev => ({ ...prev, categories: "" }));
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    setErrors(prev => ({ ...prev, [field]: "" }));
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const validFiles = newFiles.filter(file => file.size <= 5 * 1024 * 1024);
    if (validFiles.length !== newFiles.length) {
      alert("Some files were skipped because they exceed the 5MB limit.");
    }
    const combinedFiles = [...photos, ...validFiles].slice(0, 5);
    setPhotos(combinedFiles);
    const newPreviews = combinedFiles.map(file => URL.createObjectURL(file));
    setPhotoPreviews(newPreviews);
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
    const newPreviews = [...photoPreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPhotoPreviews(newPreviews);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocStatus("Geolocation not supported.");
      return;
    }
    setLocStatus("Requesting location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        handleInputChange("coordinates", `${latitude.toFixed(6)}, ${longitude.toFixed(6)} (±${Math.round(accuracy)}m)`);
        setLocStatus("Location captured successfully.");
      },
      (err) => {
        setLocStatus("Unable to capture location.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    let firstInvalidField = "";

    const addError = (field: string, msg: string) => {
      newErrors[field] = msg;
      if (!firstInvalidField) firstInvalidField = field;
    };

    if (currentStep === 1) {
      if (!formData.pickupType) addError("pickupType", "Required");
      if (!formData.condition) addError("condition", "Required");
      if (!formData.quantity) addError("quantity", "Required");
      if (formData.categories.length === 0) addError("categories", "Select at least one category");
    }
    if (currentStep === 2) {
      if (!formData.address) addError("address", "Required");
      if (!formData.state) addError("state", "Required");
      if (!formData.city) addError("city", "Required");
      if (!formData.pincode) addError("pincode", "Required");
      else if (!/^\d{6}$/.test(formData.pincode)) addError("pincode", "Must be 6 digits");
      if (!formData.date) addError("date", "Required");
      if (!formData.time) addError("time", "Required");
      if (!formData.urgency) addError("urgency", "Required");
      if (!formData.need) addError("need", "Required");
    }
    if (currentStep === 3) {
      if (!formData.name) addError("name", "Required");
      if (!formData.phone) addError("phone", "Required");
      else if (formData.phone.length < 10) addError("phone", "Invalid phone number");
      if (!formData.email) {
        addError("email", "Required");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        addError("email", "Invalid email address");
      }

      if (!formData.consent) addError("consent", "Required to proceed");
    }

    setErrors(newErrors);

    if (firstInvalidField && fieldRefs.current[firstInvalidField]) {
      fieldRefs.current[firstInvalidField]?.focus();
      fieldRefs.current[firstInvalidField]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };
  
  const prevStep = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    router.push("/");
  };

  const generatePickupId = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `AA-EW-${y}${m}${day}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    const newPickupId = generatePickupId();
    setPickupId(newPickupId);
    const form = new FormData();
    form.append("pickupId", newPickupId);
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "categories") {
        (value as string[]).forEach(cat => form.append("categories", cat));
      } else {
        form.append(key, value as string);
      }
    });
    photos.forEach(photo => form.append("photos", photo));

    try {
      const result = await submitPickupRequest(form);
      if (result.success) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError(result.error || "An error occurred");
        setDirection(-1);
        setStep(3);
      }
    } catch (err) {
      setSubmitError("Failed to connect to the server. Please try again.");
      setDirection(-1);
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  const requiresDataDestruction = formData.categories.some(c => 
    ["Laptops / Notebooks", "Desktop Computers", "Servers", "Mobile Phones", "Hard Disks / SSDs"].includes(c)
  );

  const slideVariants = {
    initial: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    in: { opacity: 1, x: 0 },
    out: (dir: number) => ({ opacity: 0, x: dir * -40 })
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col font-sans relative overflow-x-hidden text-[#121212]">
      {/* Subtle Environmental Grid Background from Website */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: `linear-gradient(#00264A 1px, transparent 1px), linear-gradient(90deg, #00264A 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <Navbar onOpenCalculator={() => router.push("/")} />
      
      {/* PAGE INTRODUCTION */}
      {!isSubmitted && (
        <div className="relative z-10 pt-32 pb-8 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto w-full">
          <div className="text-[11px] font-bold tracking-widest text-[#629A13] uppercase mb-4 flex items-center gap-2">
            <span 
              onClick={() => router.push("/")} 
              className="text-[#5E6672] hover:text-[#00264A] cursor-pointer transition-colors"
            >
              Home
            </span>
            <span className="text-[#E3E8E4]">/</span>
            <span>Schedule Pickup</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#00264A] mb-4 tracking-tight leading-tight">
            Give Your E-Waste a<br className="hidden sm:block" /> Responsible Next Step.
          </h1>
          <p className="text-lg text-[#5E6672] max-w-2xl font-medium">
            Tell us what you have. We'll handle the rest responsibly. Book your collection in minutes and track your environmental impact.
          </p>
        </div>
      )}

      {/* SUCCESS SCREEN */}
      {isSubmitted ? (
        <main className="flex-1 relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-white p-8 sm:p-12 rounded-[28px] border border-[#E3E8E4] shadow-[0_20px_50px_rgba(0,38,74,0.06)] text-center"
          >
            <div className="w-24 h-24 bg-[#EBF5DC] text-[#629A13] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#00264A] mb-4">Pickup Request Received</h2>
            <p className="text-[#5E6672] mb-6 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Your request has been securely logged. Our logistics compliance manager will review it and contact you shortly.
            </p>
            
            <div className="bg-[#F8FAF7] border border-[#E3E8E4] rounded-2xl px-6 py-5 mb-8 text-lg font-bold text-[#00264A]">
              Request ID: <span className="text-[#629A13] ml-2 tracking-wide">{pickupId}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`https://wa.me/919908990874?text=${encodeURIComponent(`♻️ ArkaArya E-Waste Pickup Scheduled! 🚚\nPickup ID: ${pickupId}\nName: ${formData.name}\nType: ${formData.pickupType}\nCategories: ${formData.categories.join(", ")}\nQuantity: ${formData.quantity}\nDate: ${formData.date}\nTime: ${formData.time}\nLocation: ${formData.address}, ${formData.city}, ${IN_STATES.find(s => s.isoCode === formData.state)?.name || ""} - ${formData.pincode}\nContact: ${formData.phone}${formData.email ? `\nEmail : ${formData.email}` : ""}${formData.coordinates ? `\nUse my Location : https://maps.google.com/?q=${formData.coordinates.split(" (")[0].replace(" ", "")}` : ""}`)}`} 
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors shadow-sm"
              >
                <Phone size={18} /> Open in WhatsApp
              </a>
              <button
                onClick={() => router.push("/")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#00264A] text-white font-bold hover:bg-[#001A33] transition-colors shadow-sm"
              >
                <ArrowLeft size={18} /> Return to Homepage
              </button>
            </div>
          </motion.div>
        </main>
      ) : (
        /* MAIN FORM CONTAINER */
        <main className="flex-1 relative z-10 pb-32 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* 70% FORM AREA */}
            <div className="flex-1 w-full bg-white rounded-[28px] border border-[#E3E8E4] shadow-[0_12px_40px_rgba(0,38,74,0.04)] overflow-hidden flex flex-col">
              
              {/* HEADER CONNECTED TO WEBSITE IDENTITY */}
              <div className="relative bg-[#00264A] p-6 sm:p-8 overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#0a3861] to-transparent rounded-full blur-[60px] opacity-70 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1.5 tracking-tight">Schedule E-Waste Pickup</h2>
                    <p className="text-[#a5c3d9] text-xs sm:text-sm font-medium">Responsible collection • Secure data handling • Circular economy</p>
                  </div>

                  <div className="hidden sm:flex relative w-16 h-16 items-center justify-center mr-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-dashed border-[#629A13]/40 rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="bg-[#0a3861] p-3 rounded-full">
                      <RefreshCw size={22} className="text-[#629A13]" />
                    </motion.div>
                    <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-0 right-0 bg-white text-[#00264A] p-1.5 rounded-full shadow-lg">
                      <Truck size={12} />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE STEP NAVIGATION */}
              <div className="px-6 sm:px-10 py-5 border-b border-[#E3E8E4] bg-white shrink-0">
                <div className="flex items-center justify-between relative max-w-xl mx-auto">
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#E3E8E4] -z-10 -translate-y-1/2 rounded-full"></div>
                  <motion.div 
                    className="absolute top-1/2 left-0 h-[2px] bg-[#629A13] -z-10 -translate-y-1/2 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: (step - 1) / 3 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ width: "100%" }}
                  />
                  
                  {["Materials", "Pickup", "Details", "Confirm"].map((label, index) => {
                    const isCompleted = step > index + 1;
                    const isCurrent = step === index + 1;
                    return (
                      <div key={label} className="flex flex-col items-center gap-2 bg-white px-3">
                        <motion.div 
                          layout
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shadow-sm transition-colors duration-300 ${
                            isCompleted ? 'bg-[#629A13] text-white border-none' 
                            : isCurrent ? 'bg-white border-2 border-[#629A13] text-[#629A13]' 
                            : 'bg-[#F8FAF7] border border-[#E3E8E4] text-[#5E6672]'
                          }`}
                        >
                          {isCompleted ? <Check size={16} strokeWidth={3} /> : index + 1}
                        </motion.div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                          isCurrent ? 'text-[#00264A]' : 'text-[#5E6672]'
                        }`}>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FORM CONTENT */}
              <div className="p-6 sm:p-10 flex-1 overflow-hidden relative min-h-[480px]">
                <AnimatePresence custom={direction} mode="wait">
                  
                  {/* STEP 1: MATERIALS */}
                  {step === 1 && (
                    <motion.div key="step1" custom={direction} variants={slideVariants} initial="initial" animate="in" exit="out" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
                        <ErrorWrapper field="pickupType" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Pickup Type *</label>
                          <select ref={assignRef("pickupType")} value={formData.pickupType} onChange={e => handleInputChange("pickupType", e.target.value)} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.pickupType ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all cursor-pointer`}>
                            <option value="">Select an option...</option>
                            <option>Household / Individual</option><option>Corporate / Office</option><option>Factory / Industrial</option>
                            <option>School / College</option><option>Hospital / Healthcare</option><option>Government / PSU</option>
                            <option>Retail / Commercial</option><option>Bulk E-Waste Generator</option><option>Other</option>
                          </select>
                        </ErrorWrapper>

                        <ErrorWrapper field="condition" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Condition *</label>
                          <select ref={assignRef("condition")} value={formData.condition} onChange={e => handleInputChange("condition", e.target.value)} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.condition ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all cursor-pointer`}>
                            <option value="">Select an option...</option>
                            <option>Working</option><option>Partially Working</option><option>Non-Working</option>
                            <option>Damaged</option><option>Scrap</option><option>Mixed Condition</option><option>Not Sure</option>
                          </select>
                        </ErrorWrapper>
                      </div>

                      <ErrorWrapper field="categories" errors={errors}>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider">E-Waste Categories * (Multi-select)</label>
                          {formData.categories.length > 0 && <span className="text-[10px] font-bold bg-[#EBF5DC] text-[#155c33] px-2 py-1 rounded-md">{formData.categories.length} selected</span>}
                        </div>
                        <div ref={assignRef("categories")} tabIndex={-1} className="flex flex-wrap gap-2 outline-none">
                          {E_WASTE_CATEGORIES.map(cat => {
                            const isSelected = formData.categories.includes(cat);
                            return (
                              <button
                                key={cat} type="button" onClick={() => handleCategoryToggle(cat)}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all border ${isSelected ? 'bg-[#F1F7E8] border-[#629A13] text-[#155c33] shadow-sm' : 'bg-white border-[#E3E8E4] text-[#5E6672] hover:border-[#629A13] hover:bg-[#F8FAF7]'}`}
                              >
                                {isSelected && <Check size={14} strokeWidth={3} className="text-[#629A13]" />}
                                {cat}
                              </button>
                            );
                          })}
                        </div>
                      </ErrorWrapper>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        <ErrorWrapper field="quantity" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Approximate Quantity *</label>
                          <select ref={assignRef("quantity")} value={formData.quantity} onChange={e => handleInputChange("quantity", e.target.value)} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.quantity ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all cursor-pointer`}>
                            <option value="">Select an option...</option>
                            <option>Less than 10 kg</option><option>10–25 kg</option><option>25–50 kg</option>
                            <option>50–100 kg</option><option>100–250 kg</option><option>250–500 kg</option>
                            <option>500 kg–1 Ton</option><option>1–5 Tons</option><option>5+ Tons</option><option>Not sure</option>
                          </select>
                        </ErrorWrapper>
                        <ErrorWrapper field="items" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Approx. Number of Items</label>
                          <input type="number" min="0" placeholder="e.g. 35" value={formData.items} onChange={e => handleInputChange("items", e.target.value)} className="w-full h-[52px] px-4 bg-[#F8FAF7] border border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13] rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all" />
                        </ErrorWrapper>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: PICKUP */}
                  {step === 2 && (
                    <motion.div key="step2" custom={direction} variants={slideVariants} initial="initial" animate="in" exit="out" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="space-y-8">
                      <ErrorWrapper field="address" errors={errors}>
                        <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Pickup Address *</label>
                        <textarea ref={assignRef("address")} rows={2} placeholder="Building / street / landmark" value={formData.address} onChange={e => handleInputChange("address", e.target.value)} className={`w-full px-4 py-3 bg-[#F8FAF7] border ${errors.address ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all resize-none`} />
                      </ErrorWrapper>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <ErrorWrapper field="state" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">State *</label>
                          <select ref={assignRef("state")} value={formData.state} onChange={e => { handleInputChange("state", e.target.value); handleInputChange("city", ""); }} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.state ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all cursor-pointer`}>
                            <option value="">Select State</option>
                            {IN_STATES.map(st => (
                              <option key={st.isoCode} value={st.isoCode}>{st.name}</option>
                            ))}
                          </select>
                        </ErrorWrapper>

                        <ErrorWrapper field="city" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">City *</label>
                          <select ref={assignRef("city")} value={formData.city} onChange={e => handleInputChange("city", e.target.value)} disabled={!formData.state} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.city ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all cursor-pointer disabled:opacity-50`}>
                            <option value="">Select City</option>
                            {formData.state && City.getCitiesOfState("IN", formData.state).map(city => (
                              <option key={city.name} value={city.name}>{city.name}</option>
                            ))}
                          </select>
                        </ErrorWrapper>

                        <ErrorWrapper field="pincode" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Pincode *</label>
                          <input ref={assignRef("pincode")} type="text" maxLength={6} placeholder="5000XX" value={formData.pincode} onChange={e => handleInputChange("pincode", e.target.value.replace(/\D/g,''))} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.pincode ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all`} />
                        </ErrorWrapper>
                      </div>

                      <div className="flex flex-col gap-3 bg-[#F8FAF7] p-5 rounded-xl border border-[#E3E8E4]">
                        <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider">Automatic Location Pin</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input readOnly placeholder="Location not captured" value={formData.coordinates} className="flex-1 h-[52px] px-4 bg-white border border-[#E3E8E4] rounded-xl text-[15px] text-[#5E6672] outline-none" />
                          <button type="button" onClick={getLocation} className="flex items-center justify-center gap-2 h-[52px] px-6 bg-[#00264A] text-white font-bold rounded-xl hover:bg-[#001A33] transition-colors whitespace-nowrap shadow-sm">
                            <MapPin size={16} /> Use My Location
                          </button>
                        </div>
                        {locStatus && <p className="text-xs text-[#629A13] font-medium">{locStatus}</p>}

                        {/* Map preview — only shown once coordinates are captured */}
                        {formData.coordinates && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2">
                              <div className="flex items-center gap-1.5 mb-2">
                                <MapPin size={13} className="text-[#629A13]" />
                                <span className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider">Location Preview</span>
                              </div>
                              <LocationMapPreview coordinates={formData.coordinates} />
                              <p className="text-[11px] text-[#5E6672] mt-2">
                                📍 {formData.coordinates} — This is the exact GPS pin our team will navigate to.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E3E8E4]">
                        <ErrorWrapper field="date" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Preferred Date *</label>
                          <input ref={assignRef("date")} type="date" min={minDate} value={formData.date} onChange={e => handleInputChange("date", e.target.value)} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.date ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all`} />
                        </ErrorWrapper>
                        <ErrorWrapper field="time" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Preferred Time *</label>
                          <select ref={assignRef("time")} value={formData.time} onChange={e => handleInputChange("time", e.target.value)} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.time ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all cursor-pointer`}>
                            <option value="">Select</option>
                            <option>9:00 AM – 11:00 AM</option><option>11:00 AM – 1:00 PM</option><option>1:00 PM – 3:00 PM</option>
                            <option>3:00 PM – 5:00 PM</option><option>5:00 PM – 7:00 PM</option>
                          </select>
                        </ErrorWrapper>
                        <ErrorWrapper field="urgency" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Pickup Urgency *</label>
                          <select ref={assignRef("urgency")} value={formData.urgency} onChange={e => handleInputChange("urgency", e.target.value)} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.urgency ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all cursor-pointer`}>
                            <option value="">Select</option>
                            <option>Normal — within 2–3 working days</option><option>Priority — within 24 hours</option><option>Same Day — subject to availability</option>
                          </select>
                        </ErrorWrapper>
                      </div>

                      <ErrorWrapper field="need" errors={errors}>
                        <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">What do you need? *</label>
                        <select ref={assignRef("need")} value={formData.need} onChange={e => handleInputChange("need", e.target.value)} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.need ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all cursor-pointer`}>
                          <option value="">Select</option>
                          <option>Sell my e-waste</option><option>Request a pickup</option><option>Get an estimated quotation</option>
                          <option>Bulk disposal</option><option>Corporate e-waste contract</option><option>IT Asset Disposal (ITAD)</option>
                          <option>Data destruction</option><option>Recycling certificate</option><option>EPR / compliance support</option><option>Other</option>
                        </select>
                      </ErrorWrapper>
                    </motion.div>
                  )}

                  {/* STEP 3: DETAILS */}
                  {step === 3 && (
                    <motion.div key="step3" custom={direction} variants={slideVariants} initial="initial" animate="in" exit="out" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
                        <ErrorWrapper field="name" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Full Name *</label>
                          <input ref={assignRef("name")} type="text" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.name ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all`} />
                        </ErrorWrapper>
                        <div>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Company / Organization</label>
                          <input type="text" value={formData.company} onChange={e => handleInputChange("company", e.target.value)} className="w-full h-[52px] px-4 bg-[#F8FAF7] border border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13] rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all" />
                        </div>
                        <ErrorWrapper field="phone" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Mobile Number *</label>
                          <input ref={assignRef("phone")} type="tel" placeholder="+91" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value.replace(/[^\d+]/g, ''))} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all`} />
                        </ErrorWrapper>
                        <ErrorWrapper field="email" errors={errors}>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Email Address *</label>
                          <input ref={assignRef("email")} type="email" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} className={`w-full h-[52px] px-4 bg-[#F8FAF7] border ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13]'} rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all`} />
                        </ErrorWrapper>
                      </div>

                      {requiresDataDestruction && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 p-5 bg-[#F1F7E8] border border-[#629A13]/20 rounded-xl">
                          <div className="flex items-center gap-2 text-[#00264A] font-bold text-sm mb-1"><ShieldAlert size={18} className="text-[#629A13]" /> Secure Data Destruction</div>
                          <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider block">Do you require secure data destruction?</label>
                          <select value={formData.dataDestruction} onChange={e => handleInputChange("dataDestruction", e.target.value)} className="w-full h-[52px] px-4 bg-white border border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13] rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all cursor-pointer shadow-sm">
                            <option>No</option><option>Yes — Certificate of Data Destruction required</option><option>Yes — Secure data wiping</option><option>Yes — Physical destruction</option><option>Not sure — please advise</option>
                          </select>
                        </motion.div>
                      )}

                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider block">Upload E-Waste Photos (Optional)</label>
                        <p className="text-[11px] text-[#5E6672] mb-1">Upload up to 5 images (max 5MB each) to help us provide an accurate estimate.</p>
                        
                        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-[#E3E8E4] bg-[#F8FAF7] rounded-xl p-6 text-center cursor-pointer hover:border-[#629A13] hover:bg-[#F1F7E8] transition-all flex flex-col items-center gap-2 group">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <UploadCloud size={20} className="text-[#629A13]" />
                          </div>
                          <div className="text-[14px] font-bold text-[#00264A]">Click to browse files</div>
                          <input ref={fileInputRef} type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={handlePhotoUpload} className="hidden" />
                        </div>
                        
                        {photoPreviews.length > 0 && (
                          <div className="flex flex-wrap gap-3 mt-2">
                            {photoPreviews.map((src, i) => (
                              <div key={i} className="relative group rounded-lg overflow-hidden border border-[#E3E8E4] w-20 h-20 shadow-sm">
                                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-[#00264A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                  <button onClick={(e) => { e.stopPropagation(); removePhoto(i); }} className="text-white hover:text-red-400 p-1 transform hover:scale-110 transition-transform">
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <label className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-2 block">Additional Notes</label>
                        <textarea rows={2} value={formData.notes} onChange={e => handleInputChange("notes", e.target.value)} placeholder="Access instructions, special handling, etc." className="w-full px-4 py-3 bg-[#F8FAF7] border border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13] rounded-xl text-[15px] text-[#00264A] focus:outline-none focus:ring-1 transition-all resize-none" />
                      </div>

                      <ErrorWrapper field="consent" errors={errors}>
                        <label className="flex items-start gap-3 cursor-pointer mt-4 p-4 rounded-xl border border-[#E3E8E4] bg-[#F8FAF7] hover:border-[#629A13] transition-colors group">
                          <div className="mt-0.5 relative flex items-center justify-center shrink-0">
                            <input ref={assignRef("consent")} type="checkbox" checked={formData.consent} onChange={e => handleInputChange("consent", e.target.checked)} className="peer appearance-none w-4 h-4 border-2 border-[#d9e2dc] rounded-md checked:bg-[#629A13] checked:border-[#629A13] transition-colors cursor-pointer" />
                            <Check size={12} strokeWidth={4} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                          </div>
                          <span className="text-[13px] text-[#00264A] font-medium leading-relaxed group-hover:text-[#629A13] transition-colors">
                            I agree that ArkaArya Private Limited may securely process my data and contact me regarding this pickup request. *
                          </span>
                        </label>
                      </ErrorWrapper>
                    </motion.div>
                  )}

                  {/* STEP 4: CONFIRM */}
                  {step === 4 && (
                    <motion.div key="step4" custom={direction} variants={slideVariants} initial="initial" animate="in" exit="out" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="space-y-8">
                      {submitError && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold flex items-center gap-2">
                          <X size={18} /> {submitError}
                        </div>
                      )}

                      <div className="bg-[#F8FAF7] border border-[#E3E8E4] rounded-xl p-6 sm:p-8 space-y-6 text-[14px] text-[#00264A]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6">
                          <div>
                            <div className="text-[10px] text-[#629A13] font-bold uppercase tracking-wider mb-1">Pickup Type</div>
                            <div className="font-semibold">{formData.pickupType}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#629A13] font-bold uppercase tracking-wider mb-1">Quantity & Condition</div>
                            <div className="font-semibold">{formData.quantity} {formData.items && `(${formData.items} items)`} • {formData.condition}</div>
                          </div>
                          <div className="sm:col-span-2">
                            <div className="text-[10px] text-[#629A13] font-bold uppercase tracking-wider mb-1">E-Waste Categories</div>
                            <div className="font-semibold leading-relaxed">{formData.categories.join(", ")}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#629A13] font-bold uppercase tracking-wider mb-1">Schedule</div>
                            <div className="font-semibold">{formData.date} • {formData.time}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#629A13] font-bold uppercase tracking-wider mb-1">Contact</div>
                            <div className="font-semibold">{formData.name} • {formData.phone}</div>
                          </div>
                          <div className="sm:col-span-2">
                            <div className="text-[10px] text-[#629A13] font-bold uppercase tracking-wider mb-1">Address</div>
                            <div className="font-semibold">{formData.address}, {formData.city}, {IN_STATES.find(s => s.isoCode === formData.state)?.name || ""} - {formData.pincode}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* NAVIGATION BUTTONS */}
              <div className="p-6 sm:px-10 border-t border-[#E3E8E4] bg-[#F8FAF7] shrink-0 flex items-center justify-between">
                <div className="flex gap-3">
                  <button type="button" onClick={handleCancel} disabled={isSubmitting} className="px-5 py-3 rounded-xl bg-transparent text-[#5E6672] font-bold text-sm hover:bg-[#E3E8E4] hover:text-[#00264A] transition-colors disabled:opacity-50">
                    Cancel
                  </button>
                  {step > 1 && (
                    <button type="button" onClick={prevStep} disabled={isSubmitting} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E3E8E4] text-[#00264A] font-bold text-sm hover:border-[#00264A] transition-colors disabled:opacity-50 shadow-sm">
                      <ArrowLeft size={16} /> Back
                    </button>
                  )}
                </div>
                
                {step < 4 ? (
                  <button type="button" onClick={nextStep} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#629A13] text-white font-bold text-sm hover:bg-[#528210] hover:shadow-md transition-all group">
                    Next <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#00264A] text-white font-bold text-sm hover:bg-[#001A33] hover:shadow-md transition-all disabled:opacity-70 group">
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                    {isSubmitting ? "Processing..." : "Confirm Pickup"}
                  </button>
                )}
              </div>
            </div>

            {/* 30% DYNAMIC SUMMARY SIDEBAR (Desktop / Collapsible Mobile) */}
            <div className="w-full lg:w-[320px] shrink-0">
              <div className="sticky top-28 bg-white rounded-[24px] border border-[#E3E8E4] shadow-[0_8px_30px_rgba(0,38,74,0.03)] p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EBF5DC] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <h3 className="text-[11px] font-bold text-[#00264A] uppercase tracking-wider mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#629A13]"></span> Your Pickup
                </h3>
                
                <div className="space-y-5 relative z-10">
                  <motion.div layout>
                    <div className="text-[9px] text-[#5E6672] font-bold uppercase tracking-wider mb-1">Materials</div>
                    <div className="text-[13px] font-semibold text-[#00264A] leading-snug transition-all">{summary.materials}</div>
                    <div className="text-[11px] text-[#5E6672] mt-0.5">{summary.details}</div>
                  </motion.div>
                  
                  <div className="w-full h-px bg-[#E3E8E4]"></div>

                  <motion.div layout>
                    <div className="text-[9px] text-[#5E6672] font-bold uppercase tracking-wider mb-1">Location</div>
                    <div className="text-[13px] font-semibold text-[#00264A] leading-snug transition-all">{formData.city ? `${formData.city}, ` : ""}{IN_STATES.find(s => s.isoCode === formData.state)?.name || "Not set"} {formData.pincode ? `- ${formData.pincode}` : ""}</div>
                  </motion.div>

                  <div className="w-full h-px bg-[#E3E8E4]"></div>

                  <motion.div layout>
                    <div className="text-[9px] text-[#5E6672] font-bold uppercase tracking-wider mb-1">Schedule</div>
                    <div className="text-[13px] font-semibold text-[#00264A] leading-snug transition-all">{formData.date || "Not set"}</div>
                    <div className="text-[11px] text-[#5E6672] mt-0.5">{formData.time}</div>
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        </main>
      )}

      {/* CANCEL MODAL */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#00264A]/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-[24px] p-8 max-w-sm w-full shadow-2xl relative"
            >
              <h3 className="text-xl font-serif font-bold text-[#00264A] mb-2">Cancel your pickup request?</h3>
              <p className="text-[#5E6672] text-[14px] mb-8 leading-relaxed">
                Your current selections will not be submitted.
              </p>
              <div className="flex flex-col gap-3">
                <button onClick={() => setShowCancelModal(false)} className="w-full py-3 rounded-xl bg-[#F8FAF7] border border-[#E3E8E4] text-[#00264A] font-bold hover:bg-[#E3E8E4] transition-colors text-sm">
                  Continue Editing
                </button>
                <button onClick={confirmCancel} className="w-full py-3 rounded-xl bg-transparent text-red-500 font-bold hover:bg-red-50 transition-colors text-sm">
                  Cancel Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
