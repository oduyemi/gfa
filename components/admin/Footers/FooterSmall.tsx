
import Link from "next/link";

interface FooterSmallProps {
  absolute?: boolean;
}

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "MIT License", href: "/license" },
];

export const FooterSmall = ({
  absolute = false,
}: FooterSmallProps) => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`pb-6 ${
        absolute
          ? "absolute bottom-0 w-full bg-slate-800"
          : "relative"
      }`}
    >
      <div className="container mx-auto px-4">
        <hr
          className={`mb-6 border-0 border-t ${
            absolute ? "border-slate-600" : "border-slate-200"
          }`}
        />

        <div className="flex flex-wrap items-center justify-center md:justify-between">
          {/* Copyright */}
          <div className="w-full md:w-4/12">
            <div
              className={`py-1 text-center text-sm font-semibold md:text-left ${
                absolute ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Copyright © {year}{" "}
              <a
                href="https://www.creative-tim.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 text-sm font-semibold text-white transition-colors hover:text-slate-300"
              >
                Creative Tim
              </a>
              {" | "}Distributed by{" "}
              <a
                href="https://themewagon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 text-sm font-semibold text-white transition-colors hover:text-slate-300"
              >
                ThemeWagon
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="w-full px-4 md:w-8/12">
            <ul className="flex list-none flex-wrap justify-center md:justify-end">
              <li>
                <a
                  href="https://www.creative-tim.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-1 text-sm font-semibold text-white transition-colors hover:text-slate-300"
                >
                  Creative Tim
                </a>
              </li>

              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block px-3 py-1 text-sm font-semibold text-white transition-colors hover:text-slate-300"
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
