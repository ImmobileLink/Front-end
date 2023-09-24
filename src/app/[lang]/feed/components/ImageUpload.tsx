import { BsImage } from "react-icons/bs";

interface ImageUploadProps {
  onImageUpload: (file: File | false) => void;
  fileName: string | undefined;
}

export default function ImageUpload ({ onImageUpload, fileName }: ImageUploadProps ) {

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

  const style = "mr-2 text-3xl hover:cursor-pointer".concat(!fileName ? " text-gray-700 hover:text-gray-800" : " text-blue-700 hover:text-blue-800")  ;

  // file:h-full file:text-white file:bg-blue-700 file:hover:bg-blue-800 file:dark:bg-blue-600 file:dark:hover:bg-blue-700 file:rounded-lg

  return (
    <label className="w-full flex justify-center align-middle items-center h-fit">
      <BsImage className={style}/>
      <input accept="image/*" onChange={handleImageChange} className="hidden" type="file" />
      <p className="w-20 text-xs text-gray-500 dark:text-gray-300 opacity-70 text-ellipsis overflow-hidden ">{ !fileName ? "PNG, JPG (MAX. 1MB)." : fileName }</p>
    </label>
  );
};