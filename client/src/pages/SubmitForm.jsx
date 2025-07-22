import { useState } from 'react';
import { createSubmission } from '../api/submissions';

function SubmitForm() {
  const [formData, setFormData] = useState({
    assessment_id: '',
    student_id: '',
    answers: '',
    score: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        ...formData,
        answers: JSON.parse(formData.answers)
      };
      await createSubmission(submissionData);
      alert("Submission successful");
    } catch (err) {
      alert("Error submitting. Check your inputs.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-blue-500 mb-6">Submit to Assessment</h2>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
        <div>
          <label className="block mb-1 text-slate-300">Assessment ID</label>
          <input type="text" name="assessment_id" onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-white" />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">Student ID</label>
          <input type="text" name="student_id" onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-white" />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">Answers (JSON)</label>
          <textarea name="answers" rows="4" onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-white" placeholder='{"q1": "Answer 1", "q2": "Answer 2"}'></textarea>
        </div>

        <div>
          <label className="block mb-1 text-slate-300">Score</label>
          <input type="number" name="score" onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-white" />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition p-2 rounded text-white font-bold shadow-lg">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SubmitForm;
