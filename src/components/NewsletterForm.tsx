'use client'

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Newsletter sign up"
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        placeholder="your@email.com"
        className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        Subscribe Free
      </button>
    </form>
  );
}
