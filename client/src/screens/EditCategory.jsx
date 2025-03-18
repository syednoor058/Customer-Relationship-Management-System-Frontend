import { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdDeleteOutline, MdOutlineSave } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  editCategory,
  getCategoryById,
} from "../components/apiServices/apiServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function EditCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleReset = () => {
    setCategoryName("");
  };

  const handleEditCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resData = await editCategory(categoryId, categoryName);
      handleReset();
      navigate(`/dashboard/categories`);
      toast.success(resData.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCategoryById(categoryId);
        setCategoryName(data.inventory_category.category_name);
        // console.log(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId, token]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="w-full text-gray-500 flex flex-col gap-5 pt-5">
      <div className="w-full text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-col gap-2">
        <Link to="/dashboard/categories">
          <div className="flex flex-row gap-1  rounded-xl">
            <span className="text-4xl">
              <IoIosArrowRoundBack />
            </span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-5 bg-primaryColor rounded-sm">
        <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800 pt-5 px-3 lg:px-0">
          <span className="text-2xl lg:text-3xl">
            <FcInfo />
          </span>
          <span>Edit Category</span>
        </div>
        <div className="w-full lg:w-[40%] shadow-xl border border-blue-200 p-3 lg:p-5 rounded-sm">
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={handleEditCategorySubmit}
          >
            <div className="flex flex-col gap-3">
              <div>Category Name</div>
              <input
                className="w-full px-2 py-3 bg-transparent border rounded-sm border-gray-300 outline-none"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                required
              />
            </div>
            <div className="w-full flex flex-row gap-3 justify-start items-center">
              <div className="flex">
                <button
                  type="submit"
                  className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
                >
                  <span className="text-lg lg:text-xl">
                    <MdOutlineSave />
                  </span>
                  Save
                </button>
              </div>
              <div className="flex">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm border border-blue-500 text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-row gap-2 justify-center items-center"
                >
                  <span className="text-lg lg:text-xl text-blue-500">
                    <MdDeleteOutline />
                  </span>
                  Discard
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
