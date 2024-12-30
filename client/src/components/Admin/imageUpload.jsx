import { File, LoaderCircle, UploadCloud, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

import axios from "axios";

const ImageUpload = ({
  onImageChange,
  currentImage,
  imageUrl,
  setImageUrl,
  onUrlChange,
  imageName,
  productName,
  maxFileSize = 5,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] =  useState(false)

  const demoName= imageName  

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= maxFileSize * 1024 * 1024) {
      onImageChange(file); 
    } else {
      alert(`File size should be less than ${maxFileSize}MB.`);
    }
  };

  // Drag and drop events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.size <= maxFileSize * 1024 * 1024) {
      onImageChange(file);
    } else {
      alert(`File size should be less than ${maxFileSize}MB.`);
    }
  };
  useEffect(() => {
    if (currentImage !== null) {
      setLoading(true);
      uploadImageToCloudinary();
    }
  }, [currentImage]);

  async function uploadImageToCloudinary() {
    const data = new FormData();
    data.append("file", currentImage);

    try {
      const result = await axios.post(
        "http://localhost:5000/api/admin/products/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result) {
        setLoading(false)        
        setImageUrl(result.data.result.url)       

        onUrlChange(result.data.result.url)
      };
    } catch (error) {
      setLoading(false);
      console.error("Upload error: ", error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle />
      </div>
    );
  }

  return (
    <div
      className={`border-2 ${
        isDragging ? "border-purple-500" : "border-gray-500 border-dotted"
      } rounded-lg p-4 flex flex-col justify-center items-center bg-gray-800 text-gray-300`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}>
      {imageUrl ? (
        <div className="flex flex-col items-center justify-center p-2 ">
          <div className="flex items-center justify-center w-full gap-2">
            <File />
            <p className="">{currentImage?.name || imageName || productName + '.jpg'}</p>
            <Button
              className="h-6 px-1 py-1 text-white bg-red-800 rounded-md hover:bg-purple-700"
              onClick={() => setImageUrl(null)}>
              <X />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="flex flex-col items-center justify-center mb-2 text-sm text-gray-400">
            <UploadCloud size={100} />
            <span className="font-bold text-center">
              Drag and drop an image, or click to upload
            </span>
          </p>
          <input
            type="file"
            className="hidden"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image-upload"
            className="px-4 py-1 text-sm text-white bg-purple-600 rounded-md cursor-pointer hover:bg-purple-700">
            Click to Add Image
          </label>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
