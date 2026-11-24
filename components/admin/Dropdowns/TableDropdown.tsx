"use client";
import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";


type TableDropdownProps = {
  onAction?: (action: string) => void;
};


export const TableDropdown = ({ onAction }: TableDropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const actions = [
    { label: "Action", value: "action" },
    { label: "Another action", value: "another-action" },
    { label: "Something else here", value: "something-else" },
  ];

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

  const handleAction = (action: string) => {
    onAction?.(action);
    setDropdownOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setDropdownOpen((previous) => !previous)}
        aria-label="Open table actions"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div
          role="menu"
          className="absolute right-full top-0 z-50 mr-2 min-w-48 rounded-lg border border-slate-100 bg-white py-2 text-left text-sm shadow-xl"
        >
          {actions.map((action) => (
            <button
              key={action.value}
              type="button"
              role="menuitem"
              onClick={() => handleAction(action.value)}
              className="block w-full whitespace-nowrap px-4 py-2 text-left text-sm font-normal text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};