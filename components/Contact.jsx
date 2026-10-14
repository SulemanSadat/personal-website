"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconArrowUpRight as FiArrowUpRight } from "@tabler/icons-react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim(),
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim(),
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim(),
};

const emailConfigured = Object.values(emailConfig).every(
  (value) => value && !value.startsWith("your_")
);

const deliveryErrorMessage = (error) => {
  const status = Number(error?.status);

  if (status === 400 || status === 422) {
    return "The contact service rejected the message configuration. Please email me directly while I fix it.";
  }

  if (status === 401 || status === 403) {
    return "The contact service is not authorised for this site. Please email me directly.";
  }

  if (status === 412) {
    return "The connected email service needs to be reauthorised. Please email me directly while it is restored.";
  }

  if (status === 429) {
    return "Too many messages were sent recently. Please wait a moment or email me directly.";
  }

  if (!navigator.onLine || !status) {
    return "The message could not reach the contact service. Check your connection and try again.";
  }

  return "The contact service could not accept your message. Please try again or email me directly.";
};

const fields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Your full name",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "your.email@example.com",
    autoComplete: "email",
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "What's this about?",
  },
  {
    name: "message",
    label: "Message",
    placeholder: "Tell me about your project...",
  },
];

export default function Contact({ embedded = false }) {
  const params = useSearchParams();
  const inquiryKey = params.toString();

  const inquiry = {
    subject: params.get("subject") || "",
    message: params.get("message") || "",
  };

  const Heading = embedded ? "h2" : "h1";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: inquiry.subject,
    message: inquiry.message,
  });

  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const formRef = useRef(null);
  const inFlight = useRef(false);

  // Populate the form when navigating from a pricing plan.
  useEffect(() => {
    const nextParams = new URLSearchParams(inquiryKey);

    const frame = requestAnimationFrame(() => {
      setFormData((previous) => ({
        ...previous,
        subject: nextParams.get("subject") || "",
        message: nextParams.get("message") || "",
      }));

      setErrors({});
    });

    return () => cancelAnimationFrame(frame);
  }, [inquiryKey]);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inFlight.current) return;

    const nextErrors = {};

    fields.forEach(({ name, label }) => {
      if (!formData[name].trim()) {
        nextErrors[name] = `${label} is required`;
      }
    });

    const email = formData.email.trim();

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      nextErrors.email = "Email is invalid";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please check the highlighted fields.");

      formRef.current?.elements
        .namedItem(Object.keys(nextErrors)[0])
        ?.focus();

      return;
    }

    if (!emailConfigured) {
      toast.error(
        "Contact form unavailable. Please email sadat.fullstack@gmail.com."
      );
      return;
    }

    inFlight.current = true;
    setSending(true);

    try {
      const name = formData.name.trim();
      const email = formData.email.trim();
      const subject = formData.subject.trim();
      const message = formData.message.trim();

      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          name,
          from_name: name,
          user_name: name,
          email,
          reply_to: email,
          user_email: email,
          subject,
          title: subject,
          message,
        },
        {
          publicKey: emailConfig.publicKey,
        }
      );

      if (response.status !== 200) {
        throw response;
      }

      toast.success(
        "Message accepted for delivery. Thank you! I'll reply as soon as I can.",
        { duration: 4500 }
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      toast.error(deliveryErrorMessage(error), {
        duration: 5500,
      });
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  return (
    <section
      className="contact-container"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-content">
        <div className="contact-header">
          <span className="section-eyebrow">
            Let&apos;s build something useful
          </span>

          <Heading
            className="contact-title section-heading"
            id="contact-title"
          >
            Contact Suleman Sadat
          </Heading>

          <p className="contact-subtitle">
            Let&apos;s discuss your full-stack web application,
            AI automation workflow, chatbot, mobile product or
            technical consulting needs.
          </p>
        </div>

        <div className="contact-main">
          <div className="contact-form-card" id="contact-form">
            <h2 className="form-title">Send a Message</h2>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact-form"
              noValidate
              aria-busy={sending}
            >
              {fields.map(({ name, label, ...field }) => {
                const Input =
                  name === "message" ? "textarea" : "input";

                return (
                  <div
                    key={name}
                    className={`form-group ${
                      name === "name" || name === "email"
                        ? ""
                        : "form-group--full"
                    }`}
                  >
                    <label
                      htmlFor={`contact-${name}`}
                      className="form-label"
                    >
                      {label}
                    </label>

                    <Input
                      {...field}
                      id={`contact-${name}`}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      required
                      rows={name === "message" ? 5 : undefined}
                      aria-invalid={Boolean(errors[name])}
                      aria-describedby={
                        errors[name]
                          ? `error-${name}`
                          : undefined
                      }
                      className={`${
                        name === "message"
                          ? "form-textarea"
                          : "form-input"
                      } ${
                        errors[name]
                          ? "form-input-error"
                          : ""
                      }`}
                    />

                    {errors[name] && (
                      <span
                        id={`error-${name}`}
                        className="error-message"
                      >
                        {errors[name]}
                      </span>
                    )}
                  </div>
                );
              })}

              <button
                type="submit"
                className="submit-button button-primary"
                disabled={sending}
              >
                {sending ? "Sending…" : "Send Message"}

                <FiArrowUpRight aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
