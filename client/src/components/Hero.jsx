// src/components/Hero.jsx
export default function Hero() {
  return (
    <section className="bg-blue-50 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Welcome to Shuleni
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Bringing the full school experience online — interact, learn, and grow from anywhere.
        </p>
        <div className="mt-8">
          <a
            href="#features"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
}
