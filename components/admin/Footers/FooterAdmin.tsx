import Link from "next/link";

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Process", href: "/how-it-works" },
];


export const FooterAdmin = () => {
  const year = 2026;
  return (
    <footer className="block py-4">
      <div className="container mx-auto px-4">
        <hr className="mb-4 border-0 border-t border-slate-200" />

        <div className="flex flex-wrap items-center justify-center md:justify-between">
          {/* Copyright */}
          <div className="w-full md:w-6/12">
            <div className="w-fit py-1 text-center text-sm font-semibold text-slate-500 md:text-left">
              Copyright © {year}{" "}
              <Link
                href="/"
                className="py-1 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-700"
              >
                Go Far Agency
              </Link>
              {" | "} All rights reserved
            </div>
          </div>

          {/* Footer navigation */}
          <div className="w-full px-4 md:w-6/12">
            <ul className="flex list-none flex-wrap justify-center md:justify-end">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block px-3 py-1 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
