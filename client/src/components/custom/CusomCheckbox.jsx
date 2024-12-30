import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox"; // Import the Shadcn Checkbox

const CustomCheckbox = ({ id, checked, onCheckedChange, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <ShadcnCheckbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="w-5 h-5 text-purple-500 bg-gray-800 border-gray-600 focus:ring-2 focus:ring-purple-500"
      />
      <label htmlFor={id} className="text-white cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox