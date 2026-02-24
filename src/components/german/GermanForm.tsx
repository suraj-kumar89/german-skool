import React from "react";
import useGerman from "./useGerman";
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";

/* ---------- country dropdown ---------- */

const countryCodeOptions = getCountries()
  .map((countryCode) => {
    const callingCode = getCountryCallingCode(countryCode);
    const countryName = en[countryCode];
    return `${countryName} (+${callingCode})`;
  })
  .sort();

/* ---------- Input ---------- */

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ type, value, placeholder, ...props }) => {
  const isDate = type === "date";
  const showOverlay = isDate && !value;

  return (
    <div className="relative">
      <input
        {...props}
        type={type}
        value={value}
        placeholder={isDate ? undefined : placeholder}
        className={`w-full rounded-lg bg-[#F0EFF1] px-3 py-3 text-sm outline-none ${
          showOverlay ? "date-mask-hidden" : ""
        }`}
      />
      {showOverlay && placeholder && (
        <span className="pointer-events-none absolute left-3 top-3 text-sm text-[#B2B0BA]">
          {placeholder}
        </span>
      )}
    </div>
  );
};

/* ---------- Textarea ---------- */

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea {...props} className="w-full min-h-[100px] rounded-lg bg-[#F0EFF1] px-3 py-3 text-sm" />
);

/* ---------- Select ---------- */

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder: string;
  options: string[];
};

const Select: React.FC<SelectProps> = ({ placeholder, options, value, ...props }) => (
  <select {...props} value={value} className="w-full rounded-lg bg-[#F0EFF1] px-3 py-3 text-sm">
    <option value="" disabled hidden>
      {placeholder}
    </option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

/* ---------- Main Form ---------- */

const GermanForm: React.FC = () => {
  const { content, form, setField, handleSubmit, loading, tefGoalOptions, germanLevelOptions } =
    useGerman();

  return (
    <div className="w-full md:w-[620px]">
      <div className="mx-auto max-w-[580px] rounded-2xl bg-white p-6 shadow">
        <h3 className="text-center text-[28px] font-semibold">{content.formTitle}</h3>

        <div className="mt-6 grid gap-3">
          <Input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
          />

          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
          />

          <Select
            placeholder="Country"
            value={form.countryCode}
            options={countryCodeOptions}
            onChange={(e) => setField("countryCode", e.target.value)}
          />

          <Input
            placeholder="Phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
          />

          <Select
            placeholder="Goal"
            value={form.goal}
            options={tefGoalOptions}
            onChange={(e) => setField("goal", e.target.value)}
          />

          <Select
            placeholder="German Level"
            value={form.germanLevel}
            options={germanLevelOptions}
            onChange={(e) => setField("germanLevel", e.target.value)}
          />

          <Input type="date" value={form.startDate} onChange={(e) => setField("startDate", e.target.value)} />

          <Textarea
            placeholder="Message"
            value={form.learningNeeds}
            onChange={(e) => setField("learningNeeds", e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="h-12 rounded-xl bg-[#A190FC] text-white"
          >
            {loading ? "Submitting..." : content.ctas.submit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GermanForm;
