import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow-md px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">📘 Shuleni</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Assessments</Link>
        <Link to="/submissions" className="hover:underline">Submissions</Link>
      </div>
    </nav>
  )
}
