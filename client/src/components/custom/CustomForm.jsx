import React from "react";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import CustomCheckbox from "./CusomCheckbox";

const CustomForm = ({
  title,
  formData,
  isDefault, 
  setIsDefault,
  handleChange,
  inputs,
  onSubmit,
  buttonText,
  customStyles,
  isLoading,
}) => {
  const handleCheckedChanged = ()=>{
    setIsDefault(prev => !prev)
  }
  const renderInputField = (input) => {
    const { name, placeholder, label } = input;
    switch (input.type) {
      case "textarea":
        return (
          <textarea
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            rows={input.rows || 4}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring resize-none"
            required={input.required}
          />
        );
      case "select":
        return (
          <Select
            name={name}
            value={formData[name]}
            onValueChange={(value) => handleChange({ target: { name, value } })}
            required={input.required} // Required prop
          >
            <SelectTrigger className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring">
              <SelectValue placeholder={`Select a ${input.label}`} />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-white">
              <SelectGroup>
                <SelectLabel className="text-gray-400">
                  {input.label}
                </SelectLabel>
                {input.options?.map((option, idx) => (
                  <SelectItem
                    key={idx}
                    value={option.value}
                    className="text-white hover:bg-gray-600">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
        case "checkbox":
          return(
            <CustomCheckbox label={label} checked={isDefault} onCheckedChange={handleCheckedChanged} />
          )

      default:
        return (
          <Input
            type={input.type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring"
            required={input.required}
          />
        );
    }
  };

  return (
    <form
      className={`bg-transparent text-white rounded-lg ${customStyles}`}
      onSubmit={onSubmit}>
      {title && <h2 className="text-xl text-purple-400 mb-4">{title}</h2>}

      {/* Render each input field */}
      {inputs.map((input, idx) => (
        <div className="mb-4" key={idx}>
          <label className="block text-gray-300 mb-2">{input.label}</label>
          {renderInputField(input)}
        </div>
      ))}

      {/* Submit button */}
      {buttonText && <Button
        type="submit"
        className=" bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded w-full"
        disabled={isLoading}>
        {isLoading ? "Submitting..." : buttonText}
      </Button>}
    </form>
  );
};

export default CustomForm;
