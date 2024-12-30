import { selectUser } from "@/redux/slices/authentication";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import CustomForm from "../custom/CustomForm";
import { addressForm } from "@/constants/formInputs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  addAddress,
  deleteAddress,
  fetchAddresses,
  selectAddress,
  updateAddress,
} from "@/redux/slices/address";
import { useToast } from "@/hooks/use-toast";
import AddressCard from "./AddressCard";

const GameForgeProfile = () => {
  const [showForm, setShowForm] = useState(false);
  const user = useSelector(selectUser);
  const address = useSelector(selectAddress);
  const [isEditId, setIsEditId] = useState(null);
  const [defaultTF, setDefaultTF] = useState(false);

  const order = []
  const [selectedOrder, setSelectedOrder] = useState(null);


  const dispatch = useDispatch();

  const { toast } = useToast();

  const initialFormData = {
    label: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    isDefault: defaultTF,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    setFormData({ ...formData, isDefault: defaultTF });
  }, [defaultTF]);

  useEffect(() => {
    setDefaultTF(formData.isDefault);
  }, [formData.isDefault]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }
  function handleEditAddress(id) {
    const currentEdit = address.find((addr) => addr._id === id);
    if (currentEdit) {
      setFormData(currentEdit);
      setDefaultTF(formData.isDefault);
      setIsEditId(id);
      setShowForm(true);
    }
  }

  function handleDeleteAddress(id) {
    dispatch(deleteAddress(id));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditId) {
      dispatch(updateAddress({ formData, id: isEditId })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAddresses());
          setShowForm(false);
          toast({ title: `${data?.payload?.message}` });
          setIsEditId(null)
        }
      });
    } else {
      if (address && address.length >= 2) {
        return toast({ title: "You cannot have more than two addresses" });
      }

      dispatch(addAddress(formData)).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: `${data?.payload?.message}`,
          });
          setFormData(initialFormData);
          setShowForm(false);
        }
      });
    }
  }

  return (
    <div className="flex flex-col p-6 w-[70vw]">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-6">
        {user.image ? (
          <img
            src={user?.image}
            alt="profile pic"
            className="w-24 h-24 rounded-full shadow-lg"
          />
        ) : (
          <User className="w-24 h-24 border-2 border-purple-500 rounded-full shadow-lg p-2" />
        )}
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <hr className="mb-8" />

      {/* Tabs Section */}
      <Tabs defaultValue="address" className="w-full">
        <TabsList className="mb-4 border-b bg-gray-400 text-white">
          <TabsTrigger value="address" className="mr-4 ">
            Address
          </TabsTrigger>
          <TabsTrigger value="orders" className="mr-4">
            Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="mr-4">
            Wishlist
          </TabsTrigger>
        </TabsList>

        {/* Address Tab Content */}
        {/* Address Tab Content */}
        <TabsContent value="address" className="mt-6 w-full">
          <div className="flex flex-col items-start w-full space-y-6">
            {/* Header and Button */}
            <div className="flex justify-between items-center w-full">
              <h3 className="text-2xl font-semibold text-gray-300">
                Address Book
              </h3>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-purple-500 hover:bg-purple-600 transition-all duration-300">
                {showForm ? "Cancel" : "Add New Address"}
              </Button>
            </div>

            {/* Address Form */}
            {showForm && (
              <div className="w-full  rounded-lg shadow-md p-4 border border-purple-300">
                <CustomForm
                  formData={formData}
                  inputs={addressForm}
                  buttonText={isEditId ? "Save Changes" : "Add Address"}
                  isDefault={defaultTF}
                  setIsDefault={setDefaultTF}
                  onSubmit={handleSubmit}
                  handleChange={handleChange}
                />
              </div>
            )}

            {/* List of Addresses */}
            <div className="flex flex-wrap w-full space-y-4">
              {!isEditId && address && address.length > 0 ? (
                address.map((address) => (
                  <AddressCard
                    key={"address" + address._id}
                    address={address}
                    isCheckout={false}
                    handleDelete={handleDeleteAddress}
                    handleEdit={handleEditAddress}
                  />
                ))
              ) : (
                <p className="text-gray-500 italic">No addresses added yet.</p>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Orders Tab Content */}
        <TabsContent value="orders" className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Order History</h3>
          {/* Add Order List Component here */}
          <p className="text-gray-600">{!order.length? "You currently have no orders." : ""}</p>

          <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                {/* <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedOrder(order)} className="bg-purple-500 hover:bg-purple-600">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <OrderDetailsDialog order={selectedOrder} />
                </Dialog> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </TabsContent>

        {/* Wishlist Tab Content */}
        <TabsContent value="wishlist" className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Wishlist</h3>
          {/* Add Wishlist Component here */}
          <p className="text-gray-600">Your wishlist is empty.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameForgeProfile;
