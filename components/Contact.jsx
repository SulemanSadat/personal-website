"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef,useState } from "react";
import { IconArrowUpRight as FiArrowUpRight } from "@tabler/icons-react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your full name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", placeholder: "your.email@example.com", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
  { name: "message", label: "Message", placeholder: "Tell me about your project..." },
];

export default function Contact({ embedded = false }) {
  const params = useSearchParams();
  const inquiry = { subject: params.get("subject") || "", message: params.get("message") || "" };
  const inquiryKey = params.toString();
  const Heading = embedded ? "h2" : "h1";

  const [formData, setFormData] = useState({ name: "", email: "", subject: inquiry.subject, message: inquiry.message });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const formRef = useRef(null);
  const inFlight = useRef(false);

  useEffect(() => {
    const nextParams = new URLSearchParams(inquiryKey);
    const frame = requestAnimationFrame(() => {
      setFormData(previous => ({ ...previous, subject: nextParams.get("subject") || "", message: nextParams.get("message") || "" }));
      setErrors({});
      setStatus("");
    });
    return () => cancelAnimationFrame(frame);
  }, [inquiryKey]);









  const handleInputChange = ({ target: { name, value } }) => {
    setFormData(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: "" }));
    setStatus("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlight.current) return;
    const nextErrors = {};
    fields.forEach(({ name, label }) => { if (!formData[name].trim()) nextErrors[name] = `${label} is required`; });
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = "Email is invalid";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("Please check the highlighted fields.");
      formRef.current.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    inFlight.current = true;
    setSending(true);
    setStatus("");
    try {
      await emailjs.send("service_7070vhc", "template_woi80rn", {
        name: formData.name, email: formData.email, title: formData.subject, message: formData.message,
      }, "crN-_tAtx6kqlQUWY");
      toast.success("Message sent successfully!");
      setStatus("Message sent successfully! Thank you for getting in touch.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message.");
      setStatus("Your message could not be sent. Please try again or email me directly.");
    } finally { inFlight.current = false; setSending(false); }
  };

  return (
    <section className="contact-container" id="contact" aria-labelledby="contact-title">
      <div className="contact-content">
        <div className="contact-header">
          <span className="section-eyebrow">Let&apos;s build something useful</span>
          <Heading className="contact-title section-heading" id="contact-title">Contact Suleman Sadat</Heading>
          <p className="contact-subtitle">Let’s discuss your full-stack web application, AI automation workflow, chatbot, mobile product or technical consulting needs.</p>
        </div>
        <div className="contact-main">
          <div className="contact-form-card" id="contact-form">
            <h2 className="form-title">Send a Message</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate aria-busy={sending}>
              {fields.map(({ name, label, ...field }) => {
                const Input = name === "message" ? "textarea" : "input";
                return <div className={`form-group ${name === "name" || name === "email" ? "" : "form-group--full"}`} key={name}>
                  <label htmlFor={`contact-${name}`} className="form-label">{label}</label>
                  <Input {...field} id={`contact-${name}`} name={name} value={formData[name]} onChange={handleInputChange} required
                    rows={name === "message" ? 5 : undefined} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `error-${name}` : undefined}
                    className={`${name === "message" ? "form-textarea" : "form-input"} ${errors[name] ? "form-input-error" : ""}`} />
                  {errors[name] && <span id={`error-${name}`} className="error-message">{errors[name]}</span>}
                </div>;
              })}
              <button type="submit" className="submit-button button-primary" disabled={sending}>{sending ? "Sending…" : "Send Message"}<FiArrowUpRight aria-hidden="true" /></button>
              <p className="form-status" role="status">{status}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}




