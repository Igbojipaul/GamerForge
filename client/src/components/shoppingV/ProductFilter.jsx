import { useEffect, useState } from "react";
import { categories, brands } from "../../constants/sortItems"; 
import { motion } from "framer-motion";
import CustomCheckbox from "../custom/CusomCheckbox";

const ProductFilter = ({ selectedBrands, selectedCategories, setSelectedBrands, setSelectedCategories, handleBrandChange, handleCategoryChange }) => {
  const [searchCategory, setSearchCategory] = useState('');
  const [searchBrand, setSearchBrand] = useState('');


  useEffect(() => {
    const getCategories = sessionStorage.getItem("selectedCategories")
    const getBrands= sessionStorage.getItem("selectedBrands")
    const storedCategories = JSON.parse(getCategories);
    const storedBrands = JSON.parse(getBrands);

    if (storedCategories) setSelectedCategories(storedCategories);
    if (storedBrands) setSelectedBrands(storedBrands);
  }, []);

  const filteredCategories = categories.filter(category =>
    category.label.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const filteredBrands = brands.filter(brand =>
    brand.label.toLowerCase().includes(searchBrand.toLowerCase())
  );

  return (
    <div className="h-full p-4 text-white bg-gray-900 rounded-lg">
      <h2 className="mb-4 text-lg font-semibold">Filter By</h2>

      {/* Categories */}
      <div className="mb-4">
        <h3 className="mb-2 font-semibold text-md">Categories</h3>
        <input
          type="text"
          placeholder="Search categories..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="p-2 mb-2 text-white bg-gray-800 border border-gray-600 rounded h-9"
        />
        <motion.div 
          className="flex flex-col h-48 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-900" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredCategories.map((category) => (
            <CustomCheckbox
              key={category.value}
              id={`category-${category.value}`}
              checked={selectedCategories.includes(category.value)}
              onCheckedChange={() => handleCategoryChange(category.value)}
              label={category.label}
            />
          ))}
        </motion.div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="mb-2 font-semibold text-md">Brands</h3>
        <input
          type="text"
          placeholder="Search brands..."
          value={searchBrand}
          onChange={(e) => setSearchBrand(e.target.value)}
          className="p-2 mb-2 text-white bg-gray-800 border border-gray-600 rounded h-9"
        />
        <motion.div 
          className="flex flex-col h-48 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-900" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredBrands.map((brand) => (
            <CustomCheckbox
              key={brand.value}
              id={`brand-${brand.value}`}
              checked={selectedBrands.includes(brand.value)}
              onCheckedChange={() => handleBrandChange(brand.value)}
              label={brand.label}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductFilter;
