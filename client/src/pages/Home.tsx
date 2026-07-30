import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
        <h1 className="text-5xl font-bold text-blue-600">
          ERP CRM Portal
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Welcome to the ERP CRM Management System
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;