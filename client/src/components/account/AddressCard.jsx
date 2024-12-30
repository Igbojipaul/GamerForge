import React from "react";

const AddressCard = ({ address, handleEdit, handleDelete, isCheckout }) => {

  
  return (
    <div className="max-w-md p-6 mx-auto mb-4 bg-gray-300 border rounded-lg shadow-md">
      {/* Address Label */}
      <h3 className="text-lg font-semibold text-purple-700">
        {address?.label} Address
      </h3>

      {/* Address Details */}
      <p className="mt-2 text-gray-700">
        {address.addressLine1}
        {address.addressLine2 && `, ${address.addressLine2}`}
      </p>
      <p className="text-gray-600">
        {address.city}, {address.state} {address.postalCode}
      </p>
      <p className="text-gray-600">{address.country}</p>
      <p className="mt-2 text-gray-600">Phone: {address.phone}</p>

      {/* Default Address Tag */}
      {address.isDefault && (
        <span className="inline-block px-2 py-1 mt-3 text-xs font-semibold text-white bg-purple-500 rounded-full">
          Default
        </span>
      )}

      {/* Action Buttons */}
      {!isCheckout && (
        <div className="flex mt-6 space-x-4">
          <button
            onClick={() => handleEdit(address._id)}
            className="px-4 py-2 text-sm text-purple-700 transition-colors duration-200 border border-purple-500 rounded-lg hover:bg-purple-600 hover:text-white">
            Edit
          </button>
          <button
            onClick={() => handleDelete(address._id)}
            className="px-4 py-2 text-sm text-red-600 transition-colors duration-200 border border-red-500 rounded-lg hover:bg-red-600 hover:text-white">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
