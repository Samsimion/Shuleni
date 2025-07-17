// src/components/ContactForm.jsx
export default function ContactForm() {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <form className="max-w-2xl mx-auto space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-gray-300 p-3 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-gray-300 p-3 rounded"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border border-gray-300 p-3 rounded h-32"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
