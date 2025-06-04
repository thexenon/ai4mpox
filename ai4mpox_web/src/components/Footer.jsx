import React from 'react';
function Footer() {
  return (
    <footer className="bg-gray-200 text-center py-6 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-2">
        {/* Twitter */}
        <a
          href="https://x.com/emikpe9804"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 transition"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22.46 5.924c-.793.352-1.646.59-2.542.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082 4.48 4.48 0 0 0-7.635 4.085A12.72 12.72 0 0 1 3.112 4.89a4.48 4.48 0 0 0 1.387 5.976 4.44 4.44 0 0 1-2.03-.561v.057a4.48 4.48 0 0 0 3.594 4.393 4.48 4.48 0 0 1-2.025.077 4.48 4.48 0 0 0 4.184 3.11A8.98 8.98 0 0 1 2 19.54a12.67 12.67 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.22 9.22 0 0 0 24 4.59a8.93 8.93 0 0 1-2.54.697z" />
          </svg>
        </a>
        {/* Facebook */}
        {/* <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-800 transition"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
          </svg>
        </a> */}
        {/* Instagram */}
        <a
          href="https://www.instagram.com/ai4mpox"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395 2.697 2.376 2.414 3.488 2.355 4.769.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.059 1.281.342 2.393 1.323 3.374.981.981 2.093 1.264 3.374 1.323C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.281-.059 2.393-.342 3.374-1.323.981-.981 1.264-2.093 1.323-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.342-2.393-1.323-3.374-.981-.981-2.093-1.264-3.374-1.323C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        </a>
        {/* TikTok */}
        <a
          href="https://tiktok.com/@ai4mpox"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black hover:bg-gray-800 transition"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.75 2h2.25v12.25a3.25 3.25 0 1 1-3.25-3.25h1.25v2H11.5a1.25 1.25 0 1 0 1.25 1.25V2zm5.5 0h2.25v2.25h-2.25V2zm0 3.25h2.25v2.25h-2.25V5.25zm0 3.25h2.25v2.25h-2.25V8.5zm0 3.25h2.25v2.25h-2.25v-2.25zm0 3.25h2.25v2.25h-2.25v-2.25z" />
          </svg>
        </a>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/ai4-mpox-ghana-3790b0366"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
          </svg>
        </a>
        {/* Email */}
        {/* <a
          href="mailto:info@ai4mpox.org"
          aria-label="Email"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-500 hover:bg-gray-700 transition"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 13.065L2.4 6.6A2 2 0 0 1 4 4h16a2 2 0 0 1 1.6 2.6l-9.6 6.465zm9.6 1.335l-7.197 4.848a2 2 0 0 1-2.406 0L2.4 14.4V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3.6z" />
          </svg>
        </a> */}
        {/* YouTube */}
        <a
          href="https://youtube.com/@ai4mpox"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 transition"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.12C19.24 3.5 12 3.5 12 3.5s-7.24 0-9.391.566A2.994 2.994 0 0 0 .502 6.186C0 8.338 0 12 0 12s0 3.662.502 5.814a2.994 2.994 0 0 0 2.107 2.12C4.76 20.5 12 20.5 12 20.5s7.24 0 9.391-.566a2.994 2.994 0 0 0 2.107-2.12C24 15.662 24 12 24 12s0-3.662-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
      </div>
      <div className="font-extrabold text-2xl text-blue-700 mb-2">AI4Mpox</div>
      <p className="text-gray-700">
        &copy; {new Date().getFullYear()} AI4Mpox Ghana. All rights reserved.
      </p>
    </footer>
  );
}
export default Footer;
