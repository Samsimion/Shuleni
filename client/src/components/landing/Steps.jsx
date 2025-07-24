const Steps = () => (
  <section id = "services" className="py-12 px-6 text-center">
    <h2 className="text-2xl font-semibold mb-2">Easily Create Your Online School Today</h2>
    <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
      Starting your online school is simple and efficient. Follow our step-by-step guide to set up and manage your educational platform.
    </p>

    <div className="grid md:grid-cols-3 gap-8">
      <Step icon="🎓" title="Step 1: Create Your School Profile"
        desc="Begin by signing up and creating a unique profile for your school." />
      <Step icon="➕" title="Step 2: Add Students and Educators"
        desc="Easily invite students and educators to join your platform." />
      <Step icon="📚" title="Step 3: Manage Resources and Attendance"
        desc="Organize notes, books, and track attendance seamlessly." />
    </div>
  </section>
);

const Step = ({ icon, title, desc }) => (
  <div>
    <div className="text-3xl">{icon}</div>
    <h4 className="font-semibold mt-3">{title}</h4>
    <p className="text-sm text-gray-600 mt-1">{desc}</p>
  </div>
);

export default Steps;
