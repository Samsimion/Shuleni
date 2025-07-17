const Hero = () => (
  <section className="flex flex-col md:flex-row items-center justify-between p-8">
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Shuleni:<br />Transforming Education for a Digital World
      </h1>
      <p className="text-gray-600">
        Join us in redefining online learning—interactive, accessible and high-quality education for all.
      </p>
    </div>
    <img src="/hero-img.jpg" alt="Hero" className="w-80 mt-8 md:mt-0" />
  </section>
);

export default Hero;
