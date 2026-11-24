"use client";
import { useState, type FormEvent } from "react";
import { Settings, Save, RotateCcw } from "lucide-react";

export const CardSettings = () => {
  const [formData, setFormData] = useState({
    username: "lucky.jesse",
    email: "jesse@example.com",
    firstName: "Lucky",
    lastName: "Jesse",
    address: "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
    city: "New York",
    country: "United States",
    postalCode: "Postal Code",
    about:
      "A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source.",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Connect your account update API here.
    console.log("Updated account:", formData);
  };

  const inputClass =
    "w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 shadow-sm placeholder:text-slate-300 transition-all duration-150 ease-linear focus:outline-none focus:ring-2 focus:ring-sky-500/30";

  const labelClass =
    "mb-2 block text-xs font-bold uppercase text-slate-600";

  return (
    <div className="relative mb-6 flex min-w-0 w-full flex-col break-words rounded-lg border-0 bg-slate-100 shadow-lg">
      {/* Header */}
      <div className="mb-0 rounded-t bg-white px-6 py-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h6 className="text-xl font-bold text-slate-700">
              My account
            </h6>
            <p className="mt-1 text-sm text-slate-400">
              Manage your personal account information.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded bg-sky-500 px-4 py-2 text-xs font-bold uppercase text-white shadow transition-all duration-150 hover:bg-sky-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Settings size={14} />
            Settings
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex-auto px-4 py-10 pt-6 lg:px-10">
        <form onSubmit={handleSubmit}>
          {/* User Information */}
          <h6 className="mb-6 mt-3 text-sm font-bold uppercase text-slate-400">
            User Information
          </h6>

          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label className={labelClass} htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label className={labelClass} htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label className={labelClass} htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label className={labelClass} htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b border-slate-300" />

          {/* Contact Information */}
          <h6 className="mb-6 mt-6 text-sm font-bold uppercase text-slate-400">
            Contact Information
          </h6>

          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-full">
              <div className="relative mb-3 w-full">
                <label className={labelClass} htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="w-full px-4 lg:w-4/12">
              <div className="relative mb-3 w-full">
                <label className={labelClass} htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="w-full px-4 lg:w-4/12">
              <div className="relative mb-3 w-full">
                <label className={labelClass} htmlFor="country">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="w-full px-4 lg:w-4/12">
              <div className="relative mb-3 w-full">
                <label className={labelClass} htmlFor="postalCode">
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b border-slate-300" />

          {/* About Me */}
          <h6 className="mb-6 mt-6 text-sm font-bold uppercase text-slate-400">
            About Me
          </h6>

          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-full">
              <div className="relative mb-3 w-full">
                <label className={labelClass} htmlFor="about">
                  About me
                </label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className={`${inputClass} resize-y`}
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  username: "lucky.jesse",
                  email: "jesse@example.com",
                  firstName: "Lucky",
                  lastName: "Jesse",
                  address:
                    "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
                  city: "New York",
                  country: "United States",
                  postalCode: "Postal Code",
                  about:
                    "A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source.",
                })
              }
              className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold uppercase text-slate-600 transition hover:bg-slate-50"
            >
              <RotateCcw size={14} />
              Reset
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded bg-sky-500 px-5 py-2.5 text-xs font-bold uppercase text-white shadow transition hover:bg-sky-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              <Save size={14} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
