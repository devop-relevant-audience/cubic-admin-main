import CubicInput from "@/app/components/CubicInput";
import CubicTextArea from "@/app/components/CubicTextArea";
import UploadDisplayPhotoForClass from "./UploadDisplayPhotoForClass";

const ClassForm = ({ classData, index, setForm, form }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => {
      const updatedClasses = [...prevForm.classes]; // Clone array
      updatedClasses[index] = { ...updatedClasses[index], [name]: value }; // Update specific class

      return { ...prevForm, classes: updatedClasses }; // Update form state
    });
  };

  return (
    <div className="flex flex-col  space-y-4 bg bg-cubic-gray6 w-[294px] h-[570px] p-4">
      <div>
        <CubicInput
          title="Card Name"
          value={classData.class_name}
          onChange={handleInputChange}
          name="class_name"
          className="h-[45px]"
        />
      </div>
      <div>
        <CubicInput
          title="Duration"
          value={classData.duration}
          onChange={handleInputChange}
          name="duration"
        />
      </div>
      <div>
        <CubicTextArea
          title="Description"
          value={classData.class_description}
          onChange={handleInputChange}
          name="class_description"
          className="h-[145px]"
        />
      </div>
      <div>
        <UploadDisplayPhotoForClass
          form={form}
          setForm={setForm}
          value={form.classes[index].class_photo}
          overWriteClassName="w-full h-[130px] border border-dashed border-cubic-white"
          name="class_photo"
          photoDesctiption=""
          index={index}
        />
      </div>

      <div
        className="flex justify-center bg bg-cubic-red space-x-2 p-2 cursor-pointer"
        onClick={() => {
          setForm((prevForm) => {
            const updatedClasses = [...prevForm.classes]; // Clone array
            updatedClasses.splice(index, 1); // Remove specific class

            return { ...prevForm, classes: updatedClasses }; // Update form state
          });
        }}
      >
        <div>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.49967 4.58333V3.3C5.49967 3.02152 5.60503 2.75445 5.79257 2.55754C5.9801 2.36062 6.23446 2.25 6.49967 2.25H8.49967C8.76489 2.25 9.01925 2.36062 9.20678 2.55754C9.39432 2.75445 9.49968 3.02152 9.49968 3.3V4.58333M2.83301 4.58333H12.1663M6.33301 6.91667V9.83333M8.66634 6.91667V9.83333M11.583 4.58333L10.9997 11.7C10.9997 11.9785 10.8943 12.2455 10.7068 12.4425C10.5192 12.6394 10.2649 12.75 9.99967 12.75H4.99967C4.73446 12.75 4.4801 12.6394 4.29257 12.4425C4.10503 12.2455 3.99967 11.9785 3.99967 11.7L3.41634 4.58333H11.583Z"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-sm text-cubic-white">Delete</div>
      </div>
    </div>
  );
};

export default ClassForm;
