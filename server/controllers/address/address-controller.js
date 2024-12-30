const Address = require("../../models/address");

//add

const addAddress = async (req, res) => {
  try {
    const {
      label,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phone,
      isDefault,
    } = req.body;
    const userId = req.user.id;

    if (!userId || !phone || !city || !state || !postalCode || !country) {
      return res
        .status(400)
        .json({ success: false, message: "Some fields were not filled" });
    }

    let address = await Address.findOne({ userId });
    if (!address) {
      // Create a new address document with the userId and initial address
      address = new Address({
        userId,
        addresses: [
          {
            label,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            phone,
            isDefault,
          },
        ],
      });
    } else {
      if (isDefault) {
        address.addresses = address.addresses.map(addr => ({
          ...addr,
          isDefault: false,
        }));
      }
      address.addresses.push({
        label,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        phone,
        isDefault,
      });
    }

    await address.save();
    res
      .status(201)
      .json({
        success: true,
        address: address.addresses,
        message: "Address added successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// get

const fetchAdresses = async (req, res) => {
  try {
    const userId = req.user.id;
    const address = await Address.findOne({ userId });
    if (!address) {
      return res
        .status(404)
        .json({
          sucess: false,
          message: "No address for this user was found",
          address: [],
        });
    }
    res.status(201).json({ success: true, address: address.addresses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

//update
const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const {
      label,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phone,
      isDefault,
    } = req.body;

    // Find the address document for the user
    const addressDocument = await Address.findOne({ userId });

    if (!addressDocument) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    const addressToUpdate = addressDocument.addresses.find(
      (addr) => addr._id.toString() === id
    );

    if (!addressToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Address with that id not found" });
    }

    if (isDefault) {
      addressDocument.addresses = addressDocument.addresses.map(addr => ({
        ...addr,
        isDefault: false,
      }));
    }

    addressToUpdate.label = label || addressToUpdate.label;
    addressToUpdate.addressLine1 = addressLine1 || addressToUpdate.addressLine1;
    addressToUpdate.addressLine2 = addressLine2 || addressToUpdate.addressLine2;
    addressToUpdate.city = city || addressToUpdate.city;
    addressToUpdate.state = state || addressToUpdate.state;
    addressToUpdate.postalCode = postalCode || addressToUpdate.postalCode;
    addressToUpdate.country = country || addressToUpdate.country;
    addressToUpdate.phone = phone || addressToUpdate.phone;
    addressToUpdate.isDefault =
      isDefault !== undefined ? isDefault : addressToUpdate.isDefault;

    await addressDocument.save();

    res
      .status(200)
      .json({
        success: true,
        address: addressDocument.addresses,
        message: "Address updated successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// delete

const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Address ID is required" });
    }

    const addressDoc = await Address.findOne({ userId });

    if (!addressDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    // Filter out the address to delete by creating a new array without the matching address
    addressDoc.addresses = addressDoc.addresses.filter(
      (address) => address._id.toString() !== id
    );

    // Save the updated document
    await addressDoc.save();

    return res
      .status(200)
      .json({ success: true, addresses: addressDoc.addresses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { addAddress, deleteAddress, updateAddress, fetchAdresses };
