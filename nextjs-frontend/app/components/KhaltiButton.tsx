"use client"
const KhaltiButton = () => {
  const handlePayment = async () => {
    try {

      //Sendin the request to the backend of khatli for the payment

      const res = await fetch('api/khalti/initiate', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.payment_url) {
        //if data is fetched then there will be redirect to the payment page
        window.location.href = data.payment_url;
      } else {
        alert('Payment failed. Try again.');
        console.log(data)
      }
    } catch (error) {
      console.error(error);
      alert('Error initiating payment.');
    }
  };

  return (

    //Button to strt the process
    <button onClick={handlePayment} className="bg-purple-600 text-white px-4 py-2 rounded">
      Pay with Khalti
    </button>
  );
};

export default KhaltiButton;