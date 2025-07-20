const Hero = () => (
  <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-white">
    <div className="flex-1 md:pr-12">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
        Welcome to <span className="text-blue-600">Shuleni</span>:<br />
        Transforming Education for a Digital World
      </h1>
      <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-4">
        Join us in redefining online learning — interactive, accessible, and high-quality education for all.
      </p>
      <button className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>

    <div className="flex-1 flex justify-end">
      <img
        src="/hero-img.jpg"
        alt="Hero"
        className="w-full max-w-[580px] h-auto object-contain"
      />
    </div>
  </section>
);

export default Hero;
