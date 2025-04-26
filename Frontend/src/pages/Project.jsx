import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [projectName, setProjectName] = useState("Project Details");

  useEffect(() => {
    fetchTasks();
    fetchProjectDetails();
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      const res = await axios.get(`/api/projects/${projectId}`);
      setProjectName(res.data.name);
    } catch (err) {
      console.error("Failed to fetch project details:", err);
    }
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/tasks/${projectId}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    setIsCreating(true);
    try {
      await axios.post(`/api/tasks/${projectId}`, taskForm);
      setTaskForm({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create task");
    } finally {
      setIsCreating(false);
    }
  };

  const updateTask = async (id, status) => {
    try {
      await axios.put(`/api/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="flex items-center text-gray-900 hover:text-gray-700 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold leading-tight text-gray-900">
              {projectName}
            </h2>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="p-6 bg-white rounded-lg shadow">
                <form onSubmit={createTask} className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 ">
                    Add New Task
                  </h3>
                  <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="task-title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Task Title
                      </label>
                      <input
                        type="text"
                        id="task-title"
                        placeholder="Enter task title"
                        value={taskForm.title}
                        onChange={(e) =>
                          setTaskForm({ ...taskForm, title: e.target.value })
                        }
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="task-description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Task Description
                      </label>
                      <input
                        type="text"
                        id="task-description"
                        placeholder="Enter task description"
                        value={taskForm.description}
                        onChange={(e) =>
                          setTaskForm({
                            ...taskForm,
                            description: e.target.value,
                          })
                        }
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={isCreating || !taskForm.title.trim()}
                      className="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isCreating ? "Adding..." : "Add Task"}
                    </button>
                  </div>
                </form>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Project Tasks
                  </h3>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-gray-500">Loading tasks...</div>
                    </div>
                  ) : tasks.length === 0 ? (
                    <div className="py-6 text-center text-gray-500">
                      <p>No tasks yet. Add your first task above.</p>
                    </div>
                  ) : (
                    <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
                      <ul className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                          <li key={task._id} className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {task.title}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {task.description}
                                  </p>
                                </div>
                                <div className="flex flex-shrink-0 ml-4 space-x-2">
                                  <span
                                    className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${getStatusColor(
                                      task.status
                                    )}`}
                                  >
                                    {task.status || "todo"}
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-end mt-4 space-x-2">
                                <button
                                  onClick={() =>
                                    updateTask(task._id, "in progress")
                                  }
                                  className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 cursor-pointer"
                                  disabled={task.status === "in progress"}
                                >
                                  Start
                                </button>
                                <button
                                  onClick={() =>
                                    updateTask(task._id, "completed")
                                  }
                                  className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 cursor-pointer"
                                  disabled={task.status === "completed"}
                                >
                                  Complete
                                </button>
                                <button
                                  onClick={() => deleteTask(task._id)}
                                  className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
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

export default Project;