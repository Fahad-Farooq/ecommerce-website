import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Order Placed Successfully
      </h1>
      <p className="text-gray-700 mb-6">
        Thank You For Purchase. Your Order Is Being Processed
      </p>
      <Link
        to={"/"}
        className="bg-green-600 text-white px-4 py-2 rounded-mg hover:bg-green-700 transition"
      >
        Back To Shop
      </Link>
    </div>
  );
};

export default OrderSuccess;
