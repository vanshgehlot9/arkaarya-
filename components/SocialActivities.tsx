"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, ArrowUpRight, Camera, Video, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase-browser";

// --- Types ---
type MediaType = "image" | "video";
type Category = "All" | "Community" | "Environment" | "Team" | "Events" | "News Feeds";

interface Activity {
  id: string;
  type: MediaType;
  category: Category;
  title: string;
  description: string;
  src: string;
  date?: string;
}

// Fetch dynamically via Supabase

const categories: Category[] = ["All", "Community", "Environment", "Team", "Events", "News Feeds"];

export const SocialActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("social_activities")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: true }); // We order by created_at since display_order wasn't created

        if (error) throw error;

        if (data) {
          const mapped = data.map((item: any) => {
            let formattedDate = "";
            if (item.activity_date) {
              const dateObj = new Date(item.activity_date);
              formattedDate = dateObj.toLocaleString("en-US", { month: "long", year: "numeric" });
            }

            return {
              id: item.id,
              type: item.media_type,
              category: (item.category === "Feed" ? "News Feeds" : item.category) as Category,
              title: item.title,
              description: item.description,
              src: item.media_url,
              date: formattedDate,
            };
          });
          setActivities(mapped);
          setFilteredActivities(mapped);
        }
      } catch (err) {
        console.error("Error fetching social activities:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(activities.filter((a) => a.category === activeCategory));
    }
  }, [activeCategory, activities]);

  const openLightbox = (id: string) => {
    const index = filteredActivities.findIndex((a) => a.id === id);
    if (index !== -1) setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const nextMedia = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredActivities.length);
    }
  };

  const prevMedia = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredActivities.length) % filteredActivities.length);
    }
  };

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [lightboxIndex]);

  return (
    <section id="social-activities" className="w-full py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8FAF7] border border-[#E3E8E4] text-[#00264A] text-xs font-semibold tracking-widest uppercase mb-6">
            Social Activities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#00264A] mb-6 leading-tight">
            Beyond Business. <br className="hidden sm:block" />
            <span className="text-[#629A13] italic font-normal">Creating Impact</span> Together.
          </h2>
          <p className="text-[#5E6672] text-lg leading-relaxed max-w-2xl font-sans">
            From community initiatives and environmental awareness to team activities and social responsibility, we believe meaningful change begins with people.
          </p>
        </motion.div>

        {/* Minimal Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border",
                activeCategory === cat
                  ? "bg-[#00264A] text-white border-[#00264A]"
                  : "bg-transparent text-[#5E6672] border-[#E3E8E4] hover:border-[#00264A]/30 hover:text-[#00264A]"
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 min-h-[400px] relative">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#629A13] gap-4">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="text-[#00264A] font-medium text-sm animate-pulse">Loading Activities...</p>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-[#5E6672] font-medium">
              No activities found for this category.
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((activity, idx) => {
                const isFeatured = idx === 0 && activeCategory === "All";
                // Editorial grid sizing logic
                const gridClass = isFeatured
                  ? "md:col-span-12 lg:col-span-8 row-span-2 min-h-[400px] lg:min-h-[600px]"
                  : "md:col-span-6 lg:col-span-4 min-h-[300px] lg:min-h-[400px]";

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    key={activity.id}
                    className={cn("group relative rounded-[20px] overflow-hidden cursor-pointer bg-[#F8FAF7] border border-[#E3E8E4]/50", gridClass)}
                    onClick={() => openLightbox(activity.id)}
                  >
                    {/* Media */}
                    {activity.type === "video" ? (
                      <video
                        src={activity.src}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={activity.src}
                        alt={activity.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    )}
                    
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00264A]/90 via-[#00264A]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Media Type Indicator */}
                    <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#00264A] text-[10px] font-bold tracking-widest uppercase shadow-sm">
                      {activity.type === "video" ? <Video size={12} className="text-[#629A13]" /> : <Camera size={12} className="text-[#629A13]" />}
                      {activity.type}
                    </div>

                    {/* Play Button for Video */}
                    {activity.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110">
                          <Play size={24} className="ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      
                      {isFeatured && (
                        <div className="text-[#629A13] text-[11px] font-bold tracking-widest uppercase mb-3 drop-shadow-md">
                          Featured Activity
                        </div>
                      )}
                      
                      <h3 className={cn("font-bold text-white mb-2 drop-shadow-md leading-tight", isFeatured ? "text-2xl lg:text-3xl" : "text-xl")}>
                        {activity.title}
                      </h3>
                      
                      <p className={cn("text-white/80 font-medium leading-relaxed drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100", isFeatured ? "text-base max-w-lg" : "text-sm line-clamp-2")}>
                        {activity.description}
                      </p>

                      {/* View Story Arrow */}
                      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 rounded-full bg-white text-[#00264A] flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-lg">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="inline-flex items-center gap-2 text-[#00264A] font-semibold text-sm hover:text-[#629A13] transition-colors group">
            <span className="border-b border-[#00264A]/20 pb-0.5 group-hover:border-[#629A13]/40">See More of Our Work</span>
            <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Full-Screen Premium Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001A33]/95 backdrop-blur-xl"
          >
            <div className="absolute inset-0" onClick={closeLightbox} />
            
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-12 md:px-20 flex flex-col items-center">
              
              <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-[21/9] max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
                <AnimatePresence mode="wait">
                  {filteredActivities[lightboxIndex].type === "video" ? (
                    <motion.video
                      key={filteredActivities[lightboxIndex].id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={filteredActivities[lightboxIndex].src}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <motion.img
                      key={filteredActivities[lightboxIndex].id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={filteredActivities[lightboxIndex].src}
                      alt={filteredActivities[lightboxIndex].title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Caption Area */}
              <motion.div 
                key={`caption-${filteredActivities[lightboxIndex].id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl text-center mt-8 text-white"
              >
                <div className="text-[#629A13] text-xs font-bold tracking-widest uppercase mb-2">
                  {filteredActivities[lightboxIndex].category} • {filteredActivities[lightboxIndex].date}
                </div>
                <h4 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                  {filteredActivities[lightboxIndex].title}
                </h4>
                <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
                  {filteredActivities[lightboxIndex].description}
                </p>
              </motion.div>

              {/* Navigation Controls */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>

              {/* Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-semibold tracking-widest">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(filteredActivities.length).padStart(2, '0')}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
