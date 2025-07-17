// src/components/FeatureSection.jsx
export default function FeatureSection() {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">Why Choose Shuleni?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-20">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Access Anytime</h3>
          <p className="text-gray-600">Study from anywhere, anytime, across devices.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
          <p className="text-gray-600">Engage with teachers and students just like in class.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Tests & Exams</h3>
          <p className="text-gray-600">Track your progress with real-time assessments.</p>
        </div>
      </div>
    </section>
  );
}
