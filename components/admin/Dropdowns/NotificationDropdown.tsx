"use client";
import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck, ChevronRight } from "lucide-react";


const notifications = [
  {
    id: 1,
    title: "Action",
    description: "View your latest notification.",
  },
  {
    id: 2,
    title: "Another action",
    description: "Check your recent activity.",
  },
  {
    id: 3,
    title: "Something else here",
    description: "Explore more updates.",
  },
];

export const NotificationDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Notification trigger */}
      <button
        type="button"
        onClick={() => setDropdownOpen((previous) => !previous)}
        aria-label="Notifications"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        className="relative flex items-center justify-center rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
      >
        <Bell className="h-5 w-5" />

        {/* Notification indicator */}
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-lg border border-slate-100 bg-white py-2 shadow-xl sm:w-72"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 pb-3 pt-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Notifications
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                You have new updates
              </p>
            </div>

            <CheckCheck className="h-4 w-4 text-slate-400" />
          </div>

          {/* Notification items */}
          <div className="py-1">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                role="menuitem"
                onClick={() => setDropdownOpen(false)}
                className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-50"
              >
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {notification.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {notification.description}
                  </p>
                </div>

                <ChevronRight className="ml-2 h-4 w-4 shrink-0 text-slate-300" />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-1 border-t border-slate-100 px-4 pt-2">
            <button
              type="button"
              onClick={() => setDropdownOpen(false)}
              className="w-full py-2 text-center text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};