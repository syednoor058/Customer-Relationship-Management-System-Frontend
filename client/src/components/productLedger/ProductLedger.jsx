import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleProductLedger } from "../apiServices/apiServices";
import LoadingScreen from "../loadingScreen/LoadingScreen";

export default function ProductLedger() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const [ledger, setLedger] = useState([]);
  const closeNavigate = () => {
    navigate("/dashboard/products");
  };
  useEffect(() => {
    const fetchProductHistory = async () => {
      setLoading(true);
      try {
        const productLedger = await getSingleProductLedger(productId);
        console.log(productLedger);
        setLedger(productLedger);
      } catch (err) {
        toast.error(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchProductHistory();
  }, [productId]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-50 overflow-y-auto">
      <div className="w-[80%] p-10 bg-primaryColor rounded relative flex flex-col gap-10">
        <div className="flex absolute top-4 right-4">
          <div
            className="px-3 py-2 cursor-pointer"
            onClick={() => closeNavigate()}
          >
            Close
          </div>
        </div>

        <div className="w-full text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900 justify-center">
          <h1>Stock Ledger</h1>
        </div>
        <div>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="w-full">
              <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                <th className="w-[5%] text-center py-3 px-2">Index</th>

                <th className="w-[15%] text-center py-3 px-2">Quantity</th>
                <th className="w-[20%] text-start py-3 px-2">
                  Current Quantity
                </th>
                <th className="w-[20%] text-center py-3 px-2">
                  Previous Quantity
                </th>
                <th className="w-[10%] text-center py-3 px-2">Type</th>
                <th className="w-[30%] text-center py-3 px-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {ledger.length > 0 ? (
                <>
                  {ledger.map((item, index) => (
                    <tr
                      key={index}
                      className={`text-sm font-light rounded-md ${
                        (index + 1) % 2 === 0 && "bg-gray-200/60"
                      }`}
                    >
                      <td className="py-4 px-2 text-center">{index + 1}</td>

                      <td className="py-4 px-2 text-center">{item.qty}</td>
                      <td className="py-4 px-2">{item.current_qty}</td>
                      <td className="py-4 px-2 text-center">
                        {item.previous_qty}
                      </td>
                      <td className="py-4 px-2 text-center">{item.type}</td>
                      <td className="py-4 px-2 text-center">
                        {item.created_at.split(" ")[0]}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-xl font-semibold text-gray-400"
                    >
                      <p>No ledger found!</p>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
