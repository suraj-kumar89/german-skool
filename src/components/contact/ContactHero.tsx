import React from "react";
import useContactHero from "./useContactHero";
import GermanForm from "../german/GermanForm";
// const avatars: string[] = [
//   "https://media.onlinegermanskool.com/assets/socialicons/Facebook.svg",
//   "https://media.onlinegermanskool.com/assets/socialicons/Instagram.svg",
//   "https://media.onlinegermanskool.com/assets/socialicons/LinkedIn.svg",
//   "https://media.onlinegermanskool.com/assets/socialicons/YouTube.svg",
//   "https://media.onlinegermanskool.com/assets/socialicons/Twitter.svg",
// ];

// const RingCheck: React.FC<{ color?: string }> = ({ color = "#3AA376" }) => (
//   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
//     <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.6" />
//     <path d="M6.3 10.1l2.3 2.3L13.7 7.4" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <li className="flex items-start gap-2">
//     <RingCheck />
//     <span className="md:text-[15px] text-[13px] leading-6">{children}</span>
//   </li>
// );

// const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { error?: string }> = ({ error, ...props }) => (
//   <div className="space-y-1">
//     <input
//       {...props}
//       className={`w-full rounded-lg border bg-white px-3 py-3 text-sm outline-none transition placeholder:opacity-60 ${
//         error ? "border-red-400" : "border-gray-200"
//       } focus:border-gray-400`}
//     />
//     {error ? <p className="text-xs text-red-500">{error}</p> : null}
//   </div>
// );

// const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }> = ({ error, ...props }) => (
//   <div className="space-y-1">
//     <textarea
//       {...props}
//       className={`w-full min-h-[84px] rounded-lg border bg-white px-3 py-3 text-sm outline-none transition placeholder:opacity-60 ${
//         error ? "border-red-400" : "border-gray-200"
//       } focus:border-gray-400`}
//     />
//     {error ? <p className="text-xs text-red-500">{error}</p> : null}
//   </div>
// );

const ContactHero: React.FC = () => {
  const { COLORS } = useContactHero();

  return (
    <section className="w-full pt-20" style={{ background: "linear-gradient(180deg,#EEF2FF,#F7F9FF)" }}>
      <div className="mx-auto max-w-[1700px] px-6 md:px-[120px]">
        {/* grid becomes 1 col on mobile (hero centered), 2 cols on md+ */}
        <div className="mx-auto grid max-w-[1500px] items-start gap-10 py-12 md:grid-cols-[minmax(0,1fr)_620px] md:gap-0 md:py-16">
          {/* LEFT / HERO */}
          <div className="mx-auto max-w-[520px] text-center md:mx-0 md:max-w-none md:text-left">
            <h1 className="text-[28px] leading-[60px] font-semibold text-black sm:text-[32px] md:text-[48px]">
              We are always happy <br />to help
            </h1>
            {/* <p className="text-[28px] leading-[50px] font-normal text-black sm:text-[32px] md:text-[40px]" style={{ color: COLORS.body }}>
              {content.subtitle}
            </p> */}

            <p className="mt-3 text-[14px] leading-6 md:mt-4 md:max-w-xl" style={{ color: COLORS.body }}>
              Whether you're a prospective student, parent, alumni, or community <br /> member, we value your feedback and are eager to assist you.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-20 left-60 animate-bounce ">
               <img src="https://media.onlinegermanskool.com/msg.svg" alt="" />
            </div>
            <GermanForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
