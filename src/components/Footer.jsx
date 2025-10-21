"use client";

export default function Footer() {
  return (
    <footer className="mt-20 py-6 text-center text-sm text-indigo-300 border-t border-indigo-900">
      © {new Date().getFullYear()} AHKStrategies. All rights reserved.
    </footer>
  );
}
