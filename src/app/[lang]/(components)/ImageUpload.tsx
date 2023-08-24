import { ReactElement } from "react";
import { BsImage } from "react-icons/bs";

interface ImageUploadProps {
  onImageUpload: (file: File | false) => void;
  label: string | ReactElement;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, label }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size <= 1048576 && (file.type === "image/png" || file.type === "image/jpeg")) {
        onImageUpload(file);
      } else {
        onImageUpload(false);
      }
    } else {
      onImageUpload(false);
    }
  };

  // file:h-full file:text-white file:bg-blue-700 file:hover:bg-blue-800 file:dark:bg-blue-600 file:dark:hover:bg-blue-700 file:rounded-lg

  return (
    <label className="w-fit flex justify-center align-middle h-fit">
      <BsImage className="mr-2 text-3xl hover:cursor-pointer text-blue-700 hover:text-blue-800 dark:text-blue-600 dark:hover:text-blue-700 "/>
      <input accept="image/*" onChange={handleImageChange} className="hidden" type="file" />
      <p className="w-20 text-xs text-gray-500 dark:text-gray-300 opacity-70">PNG, JPG (MAX. 1MB).</p>
    </label>
  );
};

export default ImageUpload;