"use client";
import useForm from "@/app/hooks/useForm";

import { useState } from "react";
// import { uploadData } from "aws-amplify/storage";
import { uploadData } from "@/app/utils/uploadData.util";
// import { useState } from "react";
import { Amplify } from "aws-amplify";
import awsmobile from "@/config/aws.config";
import { useRouter } from "next/navigation";
import useSweetAlert from "@/app/hooks/useSweetalert";
import { getBasePath } from "@/app/utils/api.util";
import { cubicApi } from "@/app/utils/path.util";
import { v4 as uuidv4 } from "uuid";
import { getExtensionFile } from "@/app/utils/general.util";
Amplify.configure(awsmobile);

export const initialRecipeForm = {
  card_home_desktop: "",
  card_home_mobile: "",
  thumbnail_title: "",
  thumbnail_description: "",
  thumbnail_tag: "",
  thumbnail_desktop: "",
  thumbnail_mobile: "",
  banner_name: "",
  banner_tag: [],
  banner_desktop: "",
  banner_mobile: "",
  headline: "",
  sub_headline: "",
  banner_description: "",
  classes: [],
  video_desktop: "",
  video_mobile: "",
  hide_class: false,
  first_gallery: "",
  second_gallery: "",
  third_gallery: "",
  fourth_gallery: "",
  fifth_gallery: "",
  sixth_gallery: "",
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

const useService = () => {
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

      if (form.banner_name.length > 20) {
        notifyWarning({
          title: "HERO BANNER NAME  is too long (max 20 characters)",
          // confirmButtonClass: "custome-confirm-notify",
        });
        return;
      }

      const CardHomeDesktopUpload = form.card_home_desktop.name;
      if (CardHomeDesktopUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.card_home_desktop.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.card_home_desktop,
        }).result;
        formData.card_home_desktop = keyUpload;
      }

      const CardHomeMobileUpload = form.card_home_mobile.name;
      if (CardHomeMobileUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.card_home_mobile.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.card_home_mobile,
        }).result;
        formData.card_home_mobile = keyUpload;
      }

      const thumbnailDesktopUpload = form.thumbnail_desktop.name;
      if (thumbnailDesktopUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.thumbnail_desktop.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.thumbnail_desktop,
        }).result;
        formData.thumbnail_desktop = keyUpload;
      }

      const thumbnailMobileUpload = form.thumbnail_mobile.name;
      if (thumbnailMobileUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.thumbnail_mobile.name);

        await uploadData({
          path: getBasePath(keyUpload),
          data: form.thumbnail_mobile,
        }).result;
        formData.thumbnail_mobile = keyUpload;
      }

      const bannerDesktopUpload = form.banner_desktop.name;
      if (bannerDesktopUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.banner_desktop.name);

        await uploadData({
          path: getBasePath(keyUpload),
          data: form.banner_desktop,
        }).result;
        formData.banner_desktop = keyUpload;
      }

      const bannerMobileUpload = form.banner_mobile.name;
      if (bannerMobileUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.banner_mobile.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.banner_mobile,
        }).result;
        formData.banner_mobile = keyUpload;
      }

      const videoDesktopUpload = form.video_desktop.name;
      if (videoDesktopUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.video_desktop.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.video_desktop,
        }).result;
        formData.video_desktop = keyUpload;
      }

      const videoMobileUpload = form.video_mobile.name;
      if (videoMobileUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.video_mobile.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.video_mobile,
        }).result;
        formData.video_mobile = keyUpload;
      }

      const firstGalleryUpload = form.first_gallery.name;
      if (firstGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.first_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.first_gallery,
        }).result;
        formData.first_gallery = keyUpload;
      }

      const secondGalleryUpload = form.second_gallery.name;
      if (secondGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.second_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.second_gallery,
        }).result;
        formData.second_gallery = keyUpload;
      }

      const thirdGalleryUpload = form.third_gallery.name;
      if (thirdGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.third_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.third_gallery,
        }).result;
        formData.third_gallery = keyUpload;
      }

      const fourthGalleryUpload = form.fourth_gallery.name;
      if (fourthGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.fourth_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.fourth_gallery,
        }).result;
        formData.fourth_gallery = keyUpload;
      }

      const fifthGalleryUpload = form.fifth_gallery.name;
      if (fifthGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.fifth_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.fifth_gallery,
        }).result;
        formData.fifth_gallery = keyUpload;
      }

      const sixthGalleryUpload = form.sixth_gallery.name;
      if (sixthGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.sixth_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.sixth_gallery,
        }).result;
        formData.sixth_gallery = keyUpload;
      }

      //loop  class_photo in classes

      const classes = form.classes.map((item) => {
        const classPhoto = item.class_photo.name;
        if (classPhoto) {
          const keyUpload =
            uuidv4() + "." + getExtensionFile(item.class_photo.name);
          uploadData({
            path: getBasePath(keyUpload),
            data: item.class_photo,
          }).result;
          item.class_photo = keyUpload;
        }
        return item;
      });

      formData.classes = classes;

      const { data } = await cubicApi.post("/service", formData);
      //   notifySuccess({
      //     title: "Success",
      //     text: "Your page has been updated",
      //     iconSrc: "/tick.png",
      //     confirmButtonClass:
      //       "bg-waraporn-red text-white px-4 py-2 rounded-full w-[124px] h-[44px]",
      //   });
      setCreateLoading(false);
      router.push("/service");
    } catch (error) {
      notifyError({
        title: "Error",
        text: error.message,
      });
    } finally {
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

      if (form.banner_name.length > 20) {
        notifyWarning({
          title: "HERO BANNER NAME  is too long (max 20 characters)",
          // confirmButtonClass: "custome-confirm-notify",
        });
        return;
      }

      const CardHomeDesktopUpload = form.card_home_desktop.name;
      if (CardHomeDesktopUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.card_home_desktop.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.card_home_desktop,
        }).result;
        formData.card_home_desktop = keyUpload;
      }

      const CardHomeMobileUpload = form.card_home_mobile.name;
      if (CardHomeMobileUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.card_home_mobile.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.card_home_mobile,
        }).result;
        formData.card_home_mobile = keyUpload;
      }

      const thumbnailDesktopUpload = form.thumbnail_desktop.name;
      if (thumbnailDesktopUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.thumbnail_desktop.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.thumbnail_desktop,
        }).result;
        formData.thumbnail_desktop = keyUpload;
      }

      const thumbnailMobileUpload = form.thumbnail_mobile.name;
      if (thumbnailMobileUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.thumbnail_mobile.name);

        await uploadData({
          path: getBasePath(keyUpload),
          data: form.thumbnail_mobile,
        }).result;
        formData.thumbnail_mobile = keyUpload;
      }

      const bannerDesktopUpload = form.banner_desktop.name;
      if (bannerDesktopUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.banner_desktop.name);

        await uploadData({
          path: getBasePath(keyUpload),
          data: form.banner_desktop,
        }).result;
        formData.banner_desktop = keyUpload;
      }

      const bannerMobileUpload = form.banner_mobile.name;
      if (bannerMobileUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.banner_mobile.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.banner_mobile,
        }).result;
        formData.banner_mobile = keyUpload;
      }

      const videoDesktopUpload = form.video_desktop.name;
      if (videoDesktopUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.video_desktop.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.video_desktop,
        }).result;
        formData.video_desktop = keyUpload;
      }

      const videoMobileUpload = form.video_mobile.name;
      if (videoMobileUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.video_mobile.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.video_mobile,
        }).result;
        formData.video_mobile = keyUpload;
      }

      const firstGalleryUpload = form.first_gallery.name;
      if (firstGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.first_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.first_gallery,
        }).result;
        formData.first_gallery = keyUpload;
      }

      const secondGalleryUpload = form.second_gallery.name;
      if (secondGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.second_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.second_gallery,
        }).result;
        formData.second_gallery = keyUpload;
      }

      const thirdGalleryUpload = form.third_gallery.name;
      if (thirdGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.third_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.third_gallery,
        }).result;
        formData.third_gallery = keyUpload;
      }

      const fourthGalleryUpload = form.fourth_gallery.name;
      if (fourthGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.fourth_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.fourth_gallery,
        }).result;
        formData.fourth_gallery = keyUpload;
      }

      const fifthGalleryUpload = form.fifth_gallery.name;
      if (fifthGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.fifth_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.fifth_gallery,
        }).result;
        formData.fifth_gallery = keyUpload;
      }

      const sixthGalleryUpload = form.sixth_gallery.name;
      if (sixthGalleryUpload) {
        const keyUpload =
          uuidv4() + "." + getExtensionFile(form.sixth_gallery.name);
        await uploadData({
          path: getBasePath(keyUpload),
          data: form.sixth_gallery,
        }).result;
        formData.sixth_gallery = keyUpload;
      }

      //loop  class_photo in classes

      const classes = form.classes.map((item) => {
        const classPhoto = item.class_photo.name;
        if (classPhoto) {
          const keyUpload =
            uuidv4() + "." + getExtensionFile(item.class_photo.name);
          uploadData({
            path: getBasePath(keyUpload),
            data: item.class_photo,
          }).result;
          item.class_photo = keyUpload;
        }
        return item;
      });

      formData.classes = classes;

      const { data } = await cubicApi.put(`/service/${form._id}`, formData);
      //   notifySuccess({
      //     title: "Success",
      //     text: "Your page has been updated",
      //     iconSrc: "/tick.png",
      //     confirmButtonClass:
      //       "bg-waraporn-red text-white px-4 py-2 rounded-full w-[124px] h-[44px]",
      //   });
      setCreateLoading(false);
      router.push("/service");
    } catch (error) {
      notifyError({
        title: "Error",
        text: error.message,
      });
    } finally {
    }
  };

  const DeleteData = async () => {
    try {
      await cubicApi.delete(`/service/${form._id}`);
      notifySuccess({
        title: "Success",
        text: "Your page has been updated",
        iconSrc: "/tick.png",

        confirmButtonClass:
          "bg-gymx-blue text-cubic-black px-4 py-2 rounded-full w-[124px] h-[44px]",
        // other: {
        //   preConfirm: () => {
        //     console.log(`Delete product id: ${form._id}`);
        //   },
        // },
      });
      router.push("/service");
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

export default useService;
