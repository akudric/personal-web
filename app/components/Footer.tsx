import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
                DS
              </span>
              <span className="text-sm font-semibold text-slate-900">
                Code Flow
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              We help small businesses grow with clear, modern websites and
              custom applications—without unnecessary complexity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-slate-900">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-600 transition hover:text-slate-900"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-600 transition hover:text-slate-900"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-slate-600 transition hover:text-slate-900"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 transition hover:text-slate-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 transition hover:text-slate-900"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-sm font-semibold text-slate-900">Services</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-slate-600">Websites</li>
              <li className="text-slate-600">Web Applications</li>
              <li className="text-slate-600">Online Stores</li>
              <li className="text-slate-600">Custom Software</li>
              <li className="text-slate-600">Maintenance & Support</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-semibold text-slate-900">Legal</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-600 transition hover:text-slate-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-600 transition hover:text-slate-900"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-slate-600 transition hover:text-slate-900"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-center text-sm text-slate-600">
            © {new Date().getFullYear()} Code Flow j.d.o.o All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}