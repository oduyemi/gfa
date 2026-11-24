
import Link from "next/link";
import {
  TwitterOutlined,
  FacebookFilled,
  DribbbleOutlined,
  GithubOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const usefulLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Free Products", href: "/products" },
];

const resourceLinks = [
  { label: "MIT License", href: "/license" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: TwitterOutlined,
    color: "text-sky-500",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FacebookFilled,
    color: "text-blue-600",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com",
    icon: DribbbleOutlined,
    color: "text-pink-500",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: GithubOutlined,
    color: "text-slate-800",
  },
];

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-1/2">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 bg-slate-200 pb-6 pt-12 text-slate-800">
      <div
        className="pointer-events-none absolute -top-20 left-0 right-0 h-20 w-full overflow-hidden"
        style={{ transform: "translateZ(0)" }}
        aria-hidden="true"
      >
        <svg
          className="absolute bottom-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 2560 100"
        >
          <polygon
            className="fill-slate-200"
            points="2560 0 2560 100 0 100"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 text-center lg:grid-cols-2 lg:text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Let&apos;s keep in touch!
            </h2>

            <p className="mt-3 max-w-lg text-base leading-relaxed text-slate-600 lg:text-lg">
              Find us on any of these platforms. We typically respond within
              1–2 business days.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                  >
                    <Icon style={{ fontSize: 19 }} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-left">
            <FooterLinks title="Useful Links" links={usefulLinks} />
            <FooterLinks title="Other Resources" links={resourceLinks} />
          </div>
        </div>

        <div className="my-8 border-t border-slate-300" />

        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-medium text-slate-500">
            Copyright © {currentYear}{" "}
            <Link
              href="/"
              className="font-semibold text-slate-700 transition-colors hover:text-slate-900"
            >
              Notus React
            </Link>
            . All rights reserved.
          </p>

          <p className="flex flex-wrap items-center justify-center gap-1 text-sm font-medium text-slate-500">
            Distributed by{" "}
            <a
              href="https://themewagon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-slate-600 transition-colors hover:text-slate-900"
            >
              ThemeWagon
              <ExportOutlined />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
