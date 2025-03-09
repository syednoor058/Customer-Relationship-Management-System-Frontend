import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function InventoryLedger() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const closeNavigate = () => {
    navigate("/dashboard/projects");
  };
  useEffect(() => {
    console.log(productId);
  }, [productId]);
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
        <div>
          <h1>Stock Ledger of {productId}</h1>
        </div>
      </div>
    </div>
  );
}
