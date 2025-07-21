const Features = () => (
  <>
    <section id ="features" className="px-6 py-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Comprehensive Online School Creation and Management Solutions
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard img="/f1.jpg" title="Streamlined Management for Students & Educators"
          desc="Our platform empowers school owners to create and manage schools effortlessly." />
        <FeatureCard img="/f2.jpg" title="Centralized Resource Storage for Learning"
          desc="Access all educational materials in one secure location tailored for each class." />
        <FeatureCard img="/f3.jpg" title="Interactive Features for Engaging Learning Experiences"
          desc="Facilitate class discussions and assessments through our innovative chat and exam tools." />
      </div>
    </section>

    <section className="px-6 py-10 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-4">Transforming Education with Innovative Features</h2>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
        Our platform allows for seamless creation of multiple schools. Educators can manage classes with robust tools designed for modern learning.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard img="/f4.jpg" title="Create Multiple Schools with Ease"
          desc="School owners can effortlessly establish and manage distinct educational institutions." />
        <FeatureCard img="/f5.jpg" title="Empower Educators with Advanced Tools"
          desc="Educators can take attendance, add resources, and engage students." />
        <FeatureCard img="/f6.jpg" title="Centralized Resource Storage for Students"
          desc="Students can access notes and materials in one place." />
      </div>
    </section>

   <section className="relative w-full h-48 md:h-56 my-10 bg-gradient-to-r from-blue-100 via-blue-200 to-indigo-200 rounded-xl shadow-lg">
  <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
    <p className="text-slate-800 text-lg md:text-xl font-semibold max-w-3xl">
      Shuleni revolutionizes the educational experience by providing a fully online platform that mirrors traditional schooling.
    </p>
  </div>
</section>


  </>
);

const FeatureCard = ({ img, title, desc }) => (
  <div>
    <img src={img} alt="" className="w-full h-40 object-cover rounded" />
    <h3 className="font-semibold mt-3">{title}</h3>
    <p className="text-gray-600 text-sm mt-1">{desc}</p>
  </div>
);

export default Features;
