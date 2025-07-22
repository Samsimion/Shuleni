import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchAssessments, fetchAssessmentById } from "../api/assessments";


function AssessmentsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    setLoading(true);
    if (id) {
      fetchAssessmentById(id)
        .then(data => {
          setSelected(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to load assessment.');
          setLoading(false);
        });
    } else {
      fetchAssessments()
        .then(data => {
          setAssessments(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to fetch assessments.');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-lg text-blue-400 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  // 💠 Render Assessment Detail
  if (id && selected) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <button
          onClick={() => navigate('/assessments')}
          className="text-blue-400 hover:underline text-sm mb-6"
        >
          &larr; Back to All Assessments
        </button>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-blue-500 mb-2">{selected.title}</h2>
          <p className="text-slate-300 text-lg capitalize">Type: {selected.type}</p>
          <p className="text-sm text-slate-400 mt-1">
            Due: {new Date(selected.due_date).toLocaleDateString('en-KE', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <p className="mt-4 text-slate-300 leading-relaxed">
            {selected.description || 'No description provided for this assessment.'}
          </p>
        </div>
      </div>
    );
  }

  // 💠 Render All Assessments List
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-8 text-blue-500">Assessments</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map(a => (
          <Link
            to={`/assessments/${a.id}`}
            key={a.id}
            className="block bg-gray-800 p-5 rounded-2xl shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-200 hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold text-blue-400">{a.title}</h3>
            <p className="text-slate-300 mt-1 capitalize">{a.type}</p>
            <p className="text-sm text-slate-400 mt-2">
              Due: {new Date(a.due_date).toLocaleDateString('en-KE', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AssessmentsPage;
