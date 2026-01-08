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
  desktop_photo: "",
  mobile_photo: "",
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

const useBanner = () => {
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

  const createHeroBanner = async () => {
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

      const uploadPhoto = form.desktop_photo.name;
      if (uploadPhoto) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.desktop_photo.name);

        await uploadData({
          path: getBasePath(keyUpload),
          data: form.desktop_photo,
        }).result;
        formData.desktop_photo = keyUpload;
      }

      const mobilePhoto = form.mobile_photo.name;
      if (mobilePhoto) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.mobile_photo.name);

        await uploadData({
          path: getBasePath(keyUpload),
          data: form.mobile_photo,
        }).result;
        formData.mobile_photo = keyUpload;
      }
      const { data } = await cubicApi.post("/banner", formData);
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
      router.push("/banner");
    }
  };

  const updateHeroBanner = async () => {
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

      const uploadPhoto = form.desktop_photo.name;
      if (uploadPhoto) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.desktop_photo.name);

        await uploadData({
          path: getBasePath(keyUpload),
          data: form.desktop_photo,
        }).result;
        formData.desktop_photo = keyUpload;
      }

      const mobilePhoto = form.mobile_photo.name;
      if (mobilePhoto) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.mobile_photo.name);

        await uploadData({
          path: getBasePath(keyUpload),
          data: form.mobile_photo,
        }).result;
        formData.mobile_photo = keyUpload;
      }

      const { data } = await cubicApi.put(`/banner/${form._id}`, formData);
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
      router.push("/banner");
    }
  };

  const deleteHeroBanner = async () => {
    try {
      await cubicApi.delete(`/banner/${form._id}`);
      notifySuccess({
        title: "Success",
        text: "Your page has been updated",
        iconSrc: "/tick.png",

        confirmButtonClass:
          "bg-waraporn-red text-white px-4 py-2 rounded-full w-[124px] h-[44px]",
        // other: {
        //   preConfirm: () => {
        //     console.log(`Delete product id: ${form._id}`);
        //   },
        // },
      });
      router.push("/banner");
    } catch (error) {
      notifyError({
        title: "Error",
        text: error.message,
      });
    } finally {
      setCreateLoading(false);
    }
  };

  const onCreateHeroBanner = () => {
    confirmCreateUpdateAlert({
      callbackFunc: () => createHeroBanner(),
    });
  };

  const onUpdateHeroBanner = () => {
    confirmCreateUpdateAlert({
      callbackFunc: updateHeroBanner,
    });
  };

  const onDeleteHeroBanner = () => {
    confirmDeleteAlert({
      callbackFunc: deleteHeroBanner,
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
    onCreateHeroBanner,
    onUpdateHeroBanner,
    onDeleteHeroBanner,
  };
};

export default useBanner;
