import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteProjectAPI,
  getProjectsById,
} from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState();
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [deleteProject, setDeleteProject] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const deleteRes = await deleteProjectAPI(projectId);
      toast.success(deleteRes.message);
      navigate("/dashboard/projects");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const getData = await getProjectsById(projectId);
        setProject(getData);
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectId, token]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col gap-10 pb-10 font-light text-sm text-gray-600">
      {/* Delete Modal  */}

      {deleteProject && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-50">
          <div className="w-full h-screen flex justify-center items-center">
            <div className=" bg-primaryColor rounded p-10 text-lg">
              <div className="flex flex-col gap-5">
                <div className="w-full flex justify-center">
                  <p>Confirm to delete this project?</p>
                </div>
                <div className="w-full flex flex-row gap-5 justify-center items-center">
                  <div className="flex">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-5 py-2 bg-red-600 text-primaryColor rounded"
                    >
                      Confirm
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => setDeleteProject(false)}
                      className="px-5 py-2 border border-gray-500 text-gray-500 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-full flex flex-col gap-10 bg-primaryColor p-5 rounded drop-shadow-xl border border-gray-200">
        <div className="flex flex-col gap-10">
          <p className="w-full text-center font-semibold text-4xl text-gray-950 underline uppercase underline-offset-4">
            Project Details
          </p>
          <div className="w-full flex flex-col gap-5 items-center justify-center">
            <div className="flex flex-row gap-32 p-10 border border-dashed border-gray-400 rounded">
              <div>
                <table>
                  <tbody className="w-full flex flex-col gap-4">
                    <tr>
                      <td className="w-28">Name:</td>
                      <td className="text-gray-950 font-medium capitalize">
                        {project.project_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-28">Project ID:</td>
                      <td className="text-gray-950 font-medium">
                        {project.id}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-28">Budget:</td>
                      <td className="text-gray-950 font-medium">
                        {project.budget}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-28">Balance:</td>
                      <td className="text-gray-950 font-medium">
                        {project.balance}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-28">Created At:</td>
                      <td className="text-gray-950 font-medium">
                        {project.created_at.split(" ")[0]}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-28">Last Update:</td>
                      <td className="text-gray-950 font-medium">
                        {project.updated_at.split(" ")[0]}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <tbody className="w-full flex flex-col gap-4">
                    <tr>
                      <td className="w-28">Total Floor:</td>
                      <td className="text-gray-950 font-medium">
                        {project.total_floor === null
                          ? "N/A"
                          : project.total_floor}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-28">Total Unit:</td>
                      <td className="text-gray-950 font-medium">
                        {project.total_unit === null
                          ? "N/A"
                          : project.total_unit}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-28">Unit/Floor:</td>
                      <td className="text-gray-950 font-medium">
                        {project.per_floor_unit === null
                          ? "N/A"
                          : project.per_floor_unit}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-28">Total Shop:</td>
                      <td className="text-gray-950 font-medium">
                        {project.total_shop === null
                          ? "N/A"
                          : project.total_shop}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-28">Shop/Floor:</td>
                      <td className="text-gray-950 font-medium">
                        {project.per_floor_shop === null
                          ? "N/A"
                          : project.per_floor_shop}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="flex">
                <Link
                  to="/dashboard/projects"
                  className="px-5 py-2 border border-gray-500 text-gray-500 rounded"
                >
                  Back
                </Link>
              </div>
              <div className="flex">
                <Link
                  to={`/dashboard/projects/edit/${projectId}`}
                  className="px-5 py-2 bg-blue-600 text-primaryColor rounded"
                >
                  Edit
                </Link>
              </div>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setDeleteProject(true)}
                  className="px-5 py-2 bg-red-600 text-primaryColor rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
