import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setIsCreating(true);
    try {
      await axios.post("/api/projects", { name: projectName });
      setProjectName("");
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create project");
    } finally {
      setIsCreating(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Project Manager
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="px-4 cursor-pointer py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold leading-tight text-gray-900">
              Dashboard
            </h2>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="p-6 bg-white rounded-lg shadow">
                <form
                  onSubmit={createProject}
                  className="flex items-center space-x-4"
                >
                  <div className="flex-1">
                    <label
                      htmlFor="project-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Project
                    </label>
                    <input
                      type="text"
                      id="project-name"
                      placeholder="Enter project name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isCreating || !projectName.trim()}
                    className="inline-flex cursor-pointer items-center px-4 py-2 mt-6 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isCreating ? "Creating..." : "Create Project"}
                  </button>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    Your Projects
                  </h3>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-gray-500">Loading projects...</div>
                    </div>
                  ) : projects.length === 0 ? (
                    <div className="py-6 text-center text-gray-500">
                      <p>No projects yet. Create your first project above.</p>
                    </div>
                  ) : (
                    <ul className="mt-4 divide-y divide-gray-200">
                      {projects.map((project) => (
                        <li
                          key={project._id}
                          onClick={() => navigate(`/project/${project._id}`)}
                          className="p-4 transition duration-150 ease-in-out cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-600 rounded-full">
                              <span className="text-lg font-medium">
                                {project.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-gray-900">
                                {project.name}
                              </h4>
                            </div>
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;