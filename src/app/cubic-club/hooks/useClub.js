"use client";
import useForm from "@/app/hooks/useForm";

import { useState } from "react";
// import { uploadData } from "aws-amplify/storage";
import { uploadData } from "@/app/utils/uploadData.util";
import { Amplify } from "aws-amplify";
import awsmobile from "@/config/aws.config";
import { useRouter } from "next/navigation";
import useSweetAlert from "@/app/hooks/useSweetalert";
import { getBasePath } from "@/app/utils/api.util";
import { cubicApi } from "@/app/utils/path.util";
import { v4 as uuidv4 } from "uuid";
import { getExtensionFile } from "@/app/utils/general.util";

Amplify.configure(awsmobile);

const initialRecipeForm = {
  location_name: "",
  phone: "",
  postal: "",
  province: "",
  district: "",
  sub_district: "",
  address: "",
  link_map: "",
  sauna_room: false,
  shower_room: false,
  locker_room: false,
  wifi: false,
  refuel_bar: false,
  parking: false,
  free_boolean1: false,
  free_boolean2: false,
  free_text1: "",
  free_text2: "",
  photo: [],
};

const formValidation = (form) => {
  return {
    // title: !form.title,
    // slug: !form.slug,
    // description: !form.description,
    // desktop_banner_1: !form.desktop_banner_1,
    // mobile_banner_1: !form.mobile_banner_1,
  };
};

const useClub = () => {
  const {
    form,
    setForm,
    setFormError,
    setField,
    setError,
    error,
    checkFormError,
    isFormError,
  } = useForm(initialRecipeForm, {
    formValidation,
  });

  const [formMode, setFormMode] = useState("");

  const [createLoading, setCreateLoading] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);

  const {
    notifySuccess,
    notifyWarning,
    notifyError,
    confirm,
    confirmCreateUpdateAlert,
    confirmDeleteAlert,
  } = useSweetAlert();
  const router = useRouter();

  const CreateData = async () => {
    setCreateLoading(true);
    const formError = checkFormError(form);
    setError(() => formError);
    if (isFormError(formError)) {
      console.log("Error: ", formError);
      notifyWarning({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        // confirmButtonClass: "custome-confirm-notify",
      });
      return;
    }

    try {
      const formData = {
        ...form,
      };

      for (let i = 0; i <= form.photo.length; i++) {
        const uploadPhoto = form.photo[i]?.name;
        if (uploadPhoto) {
          const keyUpload =
            uuidv4() + "." + getExtensionFile(form.photo[i].name);

          await uploadData({
            path: getBasePath(keyUpload),
            data: form.photo[i],
          }).result;
          formData.photo[i] = keyUpload;
        }
      }

      const { data } = await cubicApi.post("/club", formData);
      //   notifySuccess({
      //     title: "Success",
      //     text: "Your page has been updated",
      //     iconSrc: "/tick.png",
      //     confirmButtonClass:
      //       "bg-waraporn-red text-white px-4 py-2 rounded-full w-[124px] h-[44px]",
      //   });
    } catch (error) {
      notifyError({
        title: "Error",
        text: error.message,
      });
    } finally {
      setCreateLoading(false);
      router.push("/cubic-club");
    }
  };

  const UpdateData = async () => {
    setCreateLoading(true);
    const formError = checkFormError(form);
    setError(() => formError);
    if (isFormError(formError)) {
      console.log("Error: ", formError);
      notifyWarning({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        // confirmButtonClass: "custome-confirm-notify",
      });
      return;
    }

    try {
      const formData = {
        ...form,
      };

      for (let i = 0; i <= form.photo.length; i++) {
        const uploadPhoto = form.photo[i]?.name;
        if (uploadPhoto) {
          const keyUpload =
            uuidv4() + "." + getExtensionFile(form.photo[i].name);

          await uploadData({
            path: getBasePath(keyUpload),
            data: form.photo[i],
          }).result;
          formData.photo[i] = keyUpload;
        }
      }

      const { data } = await cubicApi.put(`/club/${form._id}`, formData);
      //   notifySuccess({
      //     title: "Success",
      //     text: "Your page has been updated",
      //     iconSrc: "/tick.png",
      //     confirmButtonClass:
      //       "bg-waraporn-red text-white px-4 py-2 rounded-full w-[124px] h-[44px]",
      //   });
    } catch (error) {
      notifyError({
        title: "Error",
        text: error.message,
      });
    } finally {
      setCreateLoading(false);
      router.push("/cubic-club");
    }
  };

  const DeleteData = async () => {
    try {
      await cubicApi.delete(`/club/${form._id}`);
      notifySuccess({
        title: "Success",
        text: "Your page has been updated",
        iconSrc: "/tick.png",

        confirmButtonClass:
          "bg-gymx-blue text-[#f8f8f8] px-4 py-2 rounded-full w-[124px] h-[44px]",
        // other: {
        //   preConfirm: () => {
        //     console.log(`Delete product id: ${form._id}`);
        //   },
        // },
      });
      router.push("/cubic-club");
    } catch (error) {
      notifyError({
        title: "Error",
        text: error.message,
      });
    } finally {
      setCreateLoading(false);
    }
  };

  const onCreate = () => {
    confirmCreateUpdateAlert({
      callbackFunc: () => CreateData(),
    });
  };

  const onUpdate = () => {
    confirmCreateUpdateAlert({
      callbackFunc: UpdateData,
    });
  };

  const onDelete = () => {
    confirmDeleteAlert({
      callbackFunc: DeleteData,
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setField(name)(value);
  };

  return {
    form,
    setForm,
    setFormError,
    setField,
    error,
    createLoading,
    photoUploading,
    setPhotoUploading,
    setFormMode,
    formMode,
    onChangeInput,
    onCreate,
    onUpdate,
    onDelete,
  };
};

export default useClub;
