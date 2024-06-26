import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { socials } from "../constants";
import useIsMobile from "../hooks/useIsMobile";
import { AiOutlineMailLazy } from "../constants/icons";
import { VITE_PUBLIC_KEY, VITE_SERVICE_KEY, VITE_TEMPLATE_ID } from "../config";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.message.length < 100) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setLoading(true);
    emailjs
      .send(
        VITE_SERVICE_KEY,
        VITE_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Mohammad Alsmadi",
          from_email: form.email,
          to_email: "smadi.dev@gmail.com",
          message: form.message,
        },
        VITE_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ah, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className={`w-full flex flex-col justify-between mb-4`}>
      <div className="bg-darkBlue bg-opacity-80 flex-[1] md:flex-[0.5] flex-col p-4 md:p-8 rounded-md overflow-y-scroll shadow-2xl">
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact me.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-2 md:mt-6 gap-6 md:gap-8 flex flex-col"
        >
          <label className="flex flex-col">
            <span className="text-offWhite font-medium text-xs md:text-lg mb-2 md:mb-4">
              Your Name
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="What's your good name?"
              className="bg-offWhite py-2 md:py-4 px-4 md:px-6 placeholder:text-darkBlue text-darkBlue rounded-lg outline-none border-none font-medium text-xs md:text-lg"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-offWhite font-medium text-xs md:text-lg mb-2 md:mb-4">
              Your Email
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="What's your email address?"
              className="bg-offWhite py-2 md:py-4 px-4 md:px-6 placeholder:text-darkBlue text-darkBlue rounded-lg outline-none border-none font-medium text-xs md:text-lg"
            />
          </label>
          <div className="flex flex-col relative">
            <span className="text-offWhite font-medium text-xs md:text-lg mb-2 md:mb-4">
              Your Message
            </span>
            <textarea
              rows={6}
              name="message"
              value={form.message}
              required
              maxLength={2500}
              onChange={handleChange}
              placeholder="How can I help?"
              className={`bg-offWhite resize-none py-2 md:py-4 px-4 md:px-4 min-h-[130px] max-h-[150px] md:min-h-[200px] md:max-h-[200px] placeholder:text-darkBlue text-darkBlue rounded-lg outline-none font-medium text-xs md:text-lg ${
                isError ? "border-red-700 border-2 vibrate" : ""
              }`}
            />

            <p
              className={`text-sm text-offWhite absolute bottom-[-20px] right-1 select-none`}
            >
              {form.message.length}
            </p>
          </div>
          {isError && (
            <p className="ml-2 text-red-700 text-[10px] md:text-sm">
              Make sure the message is at least 100 characters long.
            </p>
          )}

          <div className="flex flex-row items-center justify-between w-full">
            <button
              type="submit"
              disabled={loading}
              className="w-[120px] md:w-[150px] mt-2 md:mt-4 flex flex-row justify-between items-center bg-offWhite hover:bg-white text-darkBlue font-bold py-2 px-4 border-b-4 border-primary hover:white rounded text-sm md:text-lg"
            >
              {loading ? "Sending..." : "Send"}
              <AiOutlineMailLazy />
            </button>
          </div>
        </form>
      </div>
      {isMobile && (
        <div
          className={"flex flex-row w-full justify-around items-center mt-4"}
        >
          <h3 className={"text-xl tracking-wider"}>{"Connect"}</h3>
          {socials.map((item, index) => {
            const Icon = item.icon;
            return (
              <Icon
                key={index}
                onClick={() => {
                  window.open(item.link, "_blank");
                }}
                className="h-7 w-7 transition-transform transform-gpu hover:scale-150 cursor-pointer"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
