import KhaltiButton from "../components/KhaltiButton";

export default function PaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] text-white p-4">
      {/* Container with gradient */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-400 p-6 rounded-2xl shadow-lg max-w-md w-full mb-6 ">
        <h2 className="text-xl font-semibold mb-4 text-center text-white">FOR PAYPAL PAYMENT</h2>
       <div> <KhaltiButton amount={10000} /></div>
      </div>

      {/* Another container with gradient */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 p-6 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center text-white">FOR KHALTI PAYMENT</h2>
        <div> <KhaltiButton amount={10000} /></div>
      </div>
    </div>
  );
}
