import React, { useEffect, useState } from "react";
import CustomForm from "@/components/custom/CustomForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import { getLabelByValue, productForm } from "@/constants/formInputs";
import { useSelector, useDispatch } from "react-redux";
import { selectLoading } from "@/redux/slices/authentication";
import ImageUpload from "@/components/Admin/imageUpload";
import ProductsTable from "@/components/Admin/ProductsTable";
import {
  addProduct,
  deleteProduct,
  fetchAllProducts,
  selectProducts,
  updateProduct,
} from "@/redux/slices/adminProducts";
import { useToast } from "@/hooks/use-toast";

const AdminProductsV = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [openSideNav, setOpenSideNav] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch, refresh]);

  const products = useSelector(selectProducts);

  const initialState = {
    name: "",
    description: "",
    price: "",
    image: "",
    imageName: "",
    category: "",
    brand: "",
    saleprice: "",
    stock: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { toast } = useToast();

  const onUrlChange = (url) => {
    setFormData({ ...formData, image: url });
  };

  const onChange = (file) => {
    setCurrentImage(file);
    setFormData({ ...formData, imageName: file.name });
  };

  const loading = useSelector(selectLoading);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };


  const handleAddProduct = () => {
    setFormData(initialState);
    setCurrentImage(null);
    setImageUrl(null);
    setIsEdit(null);

    // setOpenSideNav(true)
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateProduct({ id: editId, formData })).then((data) => {
        if (data) {
          setFormData(initialState);
          setCurrentImage(null);
          setImageUrl(null);
          setIsEdit(false);
          setOpenSideNav(false);
          toast({
            title: `${data.payload.message}`,
          });
          setRefresh(!refresh);
        }
      });
    } else {
      if (formData) {
        dispatch(addProduct(formData)).then((data) => {
          if (data.payload.success) {
            setFormData(initialState);
            setCurrentImage(null);
            setImageUrl(null);
            setIsEdit(false);
            setOpenSideNav(false);
            toast({
              title: `${data.payload.message}`,
            });
            setRefresh(!refresh);
          } else {
            toast({
              title: `${data.payload.message}`,
            });
          }
        });
      }
    }
  };

  const handleViewItem = (currentProduct) => {
    setEditId(currentProduct._id);

    setFormData({
      name: currentProduct.name,
      description: currentProduct.description,
      price: currentProduct.price,
      imageName: currentProduct.imageName,
      image: currentProduct.image,
      category: currentProduct.category,
      brand: currentProduct.brand,
      saleprice: currentProduct.saleprice,
      stock: currentProduct.stock,
    });
    setOpenSideNav(true);
    setImageUrl(currentProduct.image);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((data) => {
      if (data.payload.success) {
        setFormData(initialState);
        setCurrentImage(null);
        setImageUrl(null);
        setIsEdit(false);
        setOpenSideNav(false);
        toast({
          title: `${data.payload.message}`,
        });
        setRefresh(!refresh);
      } else {
        toast({
          title: `${data.payload.message}`,
        });
      }
    });
  };

  return (
    <div className="w-full p-6 text-white bg-gray-900 ">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-purple-400">
          Product Management
        </h1>
        <p className="text-gray-400">Manage your products here</p>
      </header>

      {/* Product List Section */}
      <section className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-gray-300">Products List</h2>
          <Sheet open={openSideNav} onOpenChange={setOpenSideNav}>
            <SheetTrigger>
              <span
                className="px-3 py-3 bg-purple-600 rounded-sm hover:bg-purple-700"
                onClick={() => handleAddProduct()}>
                Add Product
              </span>
            </SheetTrigger>
            <SheetContent className="p-0 overflow-y-scroll text-white bg-gray-800 bg-opacity-79">
              <SheetHeader className="p-6">
                <SheetTitle className="mb-4 text-xl text-purple-400">
                  {isEdit ? "Edit Product" : "Add a new Product"}
                </SheetTitle>
                <SheetDescription>
                  {isEdit
                    ? "Edit the product details"
                    : "Add a new product here"}
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 p-6">
                <ImageUpload
                  currentImage={currentImage}
                  onImageChange={onChange}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  onUrlChange={onUrlChange}
                  imageName={formData?.imageName}
                  productName={formData.name}
                />
                <CustomForm
                  formData={formData}
                  onSubmit={handlesubmit}
                  handleChange={handleChange}
                  inputs={productForm}
                  isLoading={loading}
                />
              </div>
              <SheetFooter className="px-4 py-2">
                <SheetClose
                  className="w-full px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
                  onClick={handlesubmit}>
                  {isEdit ? "Save changes" : "Add Product"}
                </SheetClose>

                {isEdit && (
                  <Button
                    onClick={() => handleDelete(editId)}
                    className="bg-red-500">
                    Delete
                  </Button>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Example Products */}
        <ProductsTable products={products} viewItem={handleViewItem} />
      </section>
    </div>
  );
};

export default AdminProductsV;
