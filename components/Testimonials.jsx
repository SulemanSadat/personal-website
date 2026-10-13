"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { IconPlayerPause as FiPause } from "@tabler/icons-react";
import { assetPath } from "../lib/site-path";
const Helmand = assetPath("/assets/Customers/Helmand Photo.jpg");
const BilalKakar = assetPath("/assets/Customers/BilalKakar.jpg");
const AzizRastegari = assetPath("/assets/Customers/AzizRastegari.jpg");
// import Asadullah from "../assets/Customers/Asadullah.jpg";
const Mahdi = assetPath("/assets/Customers/Mahdi.jpg");
const NematullahKhan = assetPath("/assets/Customers/Nematullah - Azizi Jewellery.jpg");



const testimonials = [
  {
    id: 1,
    name: "Bilal Kakar",
    role: "CEO, MobiMix",
    rating: 5,
    text: "Sadat Sahib is a hardworking and creative content creator who always delivers professional results. Highly recommended!",
    avatar: BilalKakar,
  },

  {
    id: 2,
    name: "Helmand Ahmadzai",
    role: "Founder, National Oxford",
    rating: 5,
    text: "Suleman is a highly skilled and reliable Full Stack Developer who consistently delivers outstanding results. Highly recommended!",
    avatar: Helmand,
  },

     {
    id: 3,
    name: "Nematullah Khan",
    role: "Founder, Azizi Jewellery",
    rating: 5,
    text: "Suleman did an amazing job building our custom Shopify store. He nailed the luxury design we wanted and even helped us optimize our costs to boost our ROI. Highly recommended!",
    avatar: NematullahKhan,
  },
     {
    id: 4,
    name: "Mahdi Rezaei",
    role: "Freelancer, UpWork",
    rating: 5,
    text: "Working with Suleman was truly inspiring,his professionalism and creativity make him highly recommended!",
    avatar: Mahdi,
  },


   {
    id: 5,
    name: "M. Aziz Rastegari",
    role: "Head of Computer Science Department, Avicenna University",
    rating: 5,
    text: "Suleman has great talent and strong skills as a developer, I’m proud to have recognized his hard work and excellence.",
    avatar: AzizRastegari,
  },



  // {
  //   id: 5,
  //   name: "Asadullah Mujadadi",
  //   role: "Manager, Omair Prime",
  //   rating: 5,
  //   text: "العمل مع سليمان أظهر لي تفكيره التقني القوي والتزامه بتقديم الجودة — إنه مهندس محترف بحق.",
  //   avatar: Asadullah,
  // },

];

export default function Testimonials({ autoPlay = true }) {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => { const rect = sectionRef.current.getBoundingClientRect(); setVisible(!document.hidden && rect.bottom > 0 && rect.top < innerHeight); };
    const observer = new IntersectionObserver(update);
    observer.observe(sectionRef.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  const [paused, setPaused] = useState(!autoPlay);
  const [interacting, setInteracting] = useState(false);
  const reducedMotion = useReducedMotion();
  

  useEffect(() => {
    if (!visible || paused || interacting || reducedMotion) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [visible, paused, interacting, reducedMotion]);


  const renderStars = (count) =>
    Array.from({ length: count }).map((_, i) => (
      <span key={i} className="star">★</span>
    ));

 return (
  <section ref={sectionRef} className="dark-carousel-wrapper" id="testimonials" aria-labelledby="testimonials-title" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocus={() => setInteracting(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
    <span className="section-eyebrow">Good work. Lasting relationships.</span>
    <h2 className="carousel-heading" id="testimonials-title">Testimonials</h2>
    <p className="carousel-subtitle">
      Hear what professionals and collaborators have to say about working with me.
    </p>

    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {testimonials.map((t) => (
          <div key={t.id} className="carousel-slide" aria-hidden={testimonials[index].id !== t.id}>
            <div className="testimonial-card">
              <div className="testimonial-profile">
                <Image src={t.avatar} alt={t.name} loading="lazy" width={56} height={56} />
                <div className="profile-info">
                 <h3 className="verified-name">{t.name}<span className="testimonial-verified" role="img" aria-label="Verified testimonial"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5 12.2 3l2.7-.1.9 2.5 2.2 1.6-.8 2.6.8 2.6-2.2 1.6-.9 2.5-2.7-.1L10 18.5 7.8 17l-2.7.1-.9-2.5L2 13l.8-2.6L2 7.8l2.2-1.6.9-2.5 2.7.1L10 1.5Z"/><path className="testimonial-verified-check" d="m6.8 10.2 2.1 2.1 4.4-4.6"/></svg></span></h3>
                    <p>{t.role}</p>
                    <div className="stars" aria-label={`${t.rating} out of 5 stars`}><span aria-hidden="true">{renderStars(t.rating)}</span></div>
                  </div>
                </div>
                <p className="testimonial-text">“{t.text}”</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="carousel-dots">
        {testimonials.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            aria-label={`Show testimonial from ${testimonials[i].name}`}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
        <button type="button" className="carousel-pause" onClick={() => setPaused(!paused)} aria-label={paused ? "Play testimonials" : "Pause testimonials"}><FiPause aria-hidden="true" /></button>
      </div>

    </section>
  );
}


