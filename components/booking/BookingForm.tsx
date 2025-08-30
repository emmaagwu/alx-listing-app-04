// const BookingForm = () => (
//   <div className="bg-white p-6 shadow-md rounded-lg">
//     <h2 className="text-xl font-semibold">Contact Detail</h2>
//     <form>
//       {/* Contact Information */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label>First Name</label>
//           <input type="text" className="border p-2 w-full mt-2" />
//         </div>
//         <div>
//           <label>Last Name</label>
//           <input type="text" className="border p-2 w-full mt-2" />
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mt-4">
//         <div>
//           <label>Email</label>
//           <input type="email" className="border p-2 w-full mt-2" />
//         </div>
//         <div>
//           <label>Phone Number</label>
//           <input type="text" className="border p-2 w-full mt-2" />
//         </div>
//       </div>

//       {/* Payment Information */}
//       <h2 className="text-xl font-semibold mt-6">Pay with</h2>
//       <div className="mt-4">
//         <label>Card Number</label>
//         <input type="text" className="border p-2 w-full mt-2" />
//       </div>
//       <div className="grid grid-cols-2 gap-4 mt-4">
//         <div>
//           <label>Expiration Date</label>
//           <input type="text" className="border p-2 w-full mt-2" />
//         </div>
//         <div>
//           <label>CVV</label>
//           <input type="text" className="border p-2 w-full mt-2" />
//         </div>
//       </div>

//       {/* Billing Address */}
//       <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
//       <div className="mt-4">
//         <label>Street Address</label>
//         <input type="text" className="border p-2 w-full mt-2" />
//       </div>
//       <div className="grid grid-cols-2 gap-4 mt-4">
//         <div>
//           <label>City</label>
//           <input type="text" className="border p-2 w-full mt-2" />
//         </div>
//         <div>
//           <label>State</label>
//           <input type="text" className="border p-2 w-full mt-2" />
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mt-4">
//         <div>
//           <label>Zip Code</label>
//           <input type="text" className="border p-2 w-full mt-2" />
//         </div>
//         <div>
//           <label>Country</label>
//           <input type="text" className="border p-2 w-full mt-2" />
//         </div>
//       </div>

//       {/* Submit Button */}
//       <button className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md w-full">
//         Confirm & Pay
//       </button>
//     </form>
//   </div>
// );

// export default BookingForm;


import { useState } from "react";
import axios from "axios";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/bookings", formData);
      setSuccess("✅ Booking confirmed!");
      console.log("Booking response:", response.data);
    } catch (err) {
      console.error("Booking error:", err);
      setError("❌ Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Contact Detail</h2>
      <form onSubmit={handleSubmit}>
        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
        </div>

        {/* Payment Information */}
        <h2 className="text-xl font-semibold mt-6">Pay with</h2>
        <div className="mt-4">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="border p-2 w-full mt-2"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Expiration Date</label>
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
        </div>

        {/* Billing Address */}
        <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
        <div className="mt-4">
          <label>Street Address</label>
          <input
            type="text"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            className="border p-2 w-full mt-2"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md w-full"
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>

        {/* Feedback messages */}
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {success && <p className="mt-2 text-green-600">{success}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
