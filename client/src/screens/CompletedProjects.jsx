import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCompletedProjects } from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function CompletedProjects() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const getData = await getCompletedProjects();
        setCompleted(getData);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          <h1 className="w-full text-2xl font-bold flex flex-row gap-3 items-center text-gray-900 text-center  justify-center uppercase">
            All Completed Projects
          </h1>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="w-full">
            <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
              <th className="w-[20%] text-center py-3 px-2">ID</th>
              <th className="w-[80%] text-start py-3 px-2">Project Name</th>
            </tr>
          </thead>
          <tbody>
            {completed?.length > 0 ? (
              <>
                {completed.map((item, index) => (
                  <tr
                    key={index}
                    className={`text-sm font-light rounded-md ${
                      (index + 1) % 2 === 0 && "bg-gray-100"
                    }`}
                  >
                    <td className="py-4 px-2 text-center">{item.id}</td>
                    <td className="py-4 px-2 capitalize">
                      {item.project_name}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                <tr>
                  <td colSpan="6" className="py-10">
                    <p className="w-full text-center text-xl font-medium text-gray-400">
                      No completed project available!
                    </p>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
