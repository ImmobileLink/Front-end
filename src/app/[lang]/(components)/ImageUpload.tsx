interface ImageUploadProps {
  onImageUpload: (file: File | false) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      if(file.size <= 1048576 && (file.type === "image/png" || file.type === "image/jpeg")){
        onImageUpload(file);
      } else {
      onImageUpload(false);
      }
    } else {
      onImageUpload(false);
    }
  };

  return (
    <div>
      <input accept="image/*" onChange={handleImageChange} maxLength={100} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" type="file" />
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG (MAX. 1MB).</p>
    </div>
  );
};

export default ImageUpload;