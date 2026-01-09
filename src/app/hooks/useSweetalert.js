import Swal from "sweetalert2";

const useSweetAlert = () => {
  const confirm = async (
    options = {
      title: "ต้องการบันทึกสินค้าหรือไม่ ?",
      text: "",
      callback: () => {},
      other: {},
      icon: "warning",
      iconSrc: "",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ปิด",
      confirmButtonClass: "",
      cancelButtonClass: "",
      reverseButtons: false,
      focusCancel: false,
      focusConfirm: true,
    }
  ) => {
    try {
      const resultSwalAlert = await Swal.fire({
        title: options.title,
        text: options.text,
        showCancelButton: true,
        iconHtml: `<img src="${options.iconSrc}" />`,
        customClass: {
          icon: "border-none",
          // container: "custom-swal-container",
          container: `custom-swal-container ${
            options.reverseButtons ? "reverse-buttons" : ""
          }`,
          confirmButton: options.confirmButtonClass,
          cancelButton: options.cancelButtonClass,
        },
        confirmButtonText: options?.confirmButtonText,
        focusCancel: options?.focusCancel,
        focusConfirm: options?.focusConfirm,

        cancelButtonText: options?.cancelButtonText,
        showLoaderOnConfirm: true,
        showLoaderOnDeny: false,
        // confirmButtonColor: colors.dtGreen01,
        preConfirm: async () => {
          return options.callback();
        },
        ...options.other,
      });
      return resultSwalAlert;
    } catch (error) {
      console.error("Er", error);
    }
  };

  const notifyWarning = async (
    options = { title: "WARNING", text: "", other: {}, confirmButtonClass: "" }
  ) => {
    try {
      return await Swal.fire({
        title: options.title,
        text: options.text,
        icon: "warning",
        confirmButtonText: "ยืนยัน",
        width: "550px",
        // confirmButtonColor: colors.dtGreen01,
        // customClass: {
        //   confirmButton: "custome-confirm-notify",
        // },
        ...options.other,
      });
    } catch (error) {}
  };

  const notifySuccess = async (
    options = {
      title: "SUCCESS",
      text: "",
      other: {},
      confirmButtonClass: "",
      iconSrc: "",
    }
  ) => {
    try {
      return await Swal.fire({
        title: options.title,
        text: options.text,
        // icon: "success",
        iconHtml: `<img src="${options.iconSrc}" />`,
        confirmButtonText: "OK",
        // confirmButtonColor: colors.dtGreen01,
        customClass: {
          icon: "border-none",
          confirmButton: options.confirmButtonClass,
        },
        ...options.other,
      });
    } catch (error) {}
  };

  const notifyError = async (
    options = { title: "ERROR", text: "", other: {} }
  ) => {
    try {
      return await Swal.fire({
        title: options.title,
        text: options.text,
        icon: "error",
        confirmButtonText: "ยืนยัน",
        // confirmButtonColor: colors.dtGreen01,
        ...options.other,
      });
    } catch (error) {}
  };

  const confirmCreateUpdateAlert = ({ callbackFunc = () => {} }) => {
    Swal.fire({
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        htmlContainer: "custom-swal-html-container",
        confirmButton: "confirm-button-class",
        cancelButton: "cancel-button-class",
        icon: "custom-swal-icon",
      },
      title: "Save item?",
      html: "Do you want to save changes before leaving this page?",
      iconHtml: `<img src="/question.png" alt="question icon" />`,
      showCancelButton: true,
      confirmButtonText: "SAVE",
      cancelButtonText: "CANCEL",
      reverseButtons: true,
      preConfirm: callbackFunc,
    });
    // confirm({
    //   title: "Save item?",
    //   text: "Do you want to save changes before leaving this page?",
    //   confirmButtonText: "SAVE",
    //   cancelButtonText: "CANCEL",
    //   reverseButtons: true,
    //   iconSrc: "/question.png",
    //   confirmButtonClass:
    //     "bg bg-gymx-blue  text-cubic-black px-4 py-2 text-2xl w-[124px] h-[44px] font-BebasNeue rounded-none",
    //   cancelButtonClass:
    //     "swal-cancel-button bg-white border border-cubic-gray4 text-cubic-gray4 text-2xl  px-4 py-2  w-[124px] h-[44px] button-border font-BebasNeue rounded-none hover:border-gymx-blue hover:text-gymx-blue hover:bg-white",
    //   callback: callbackFunc,
    // });
  };

  const confirmDeleteAlert = ({ callbackFunc = () => {} }) => {
    Swal.fire({
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        htmlContainer: "custom-swal-html-container",
        confirmButton: "confirm-button-class",
        cancelButton: "cancel-button-class",
        icon: "custom-swal-icon",
      },
      title: "Delete item?",
      html: "Do you want to delete before leaving this page?",
      iconHtml: `<img src="/question.png" alt="question icon" />`,
      showCancelButton: true,
      confirmButtonText: "DELETE",
      cancelButtonText: "CANCEL",
      preConfirm: callbackFunc,
    });
    // confirm({
    //   title: "Delete item?",
    //   text: "Do you want to delete before leaving this page?",
    //   confirmButtonText: "Ok",
    //   cancelButtonText: "Cancel",
    //   iconSrc: "/question.png",
    //   confirmButtonClass:
    //     "bg-waraporn-red text-white px-4 py-2 rounded-full w-[124px] h-[44px]",
    //   cancelButtonClass:
    //     "swal-cancel-button bg-white text-waraporn-red  px-4 py-2 rounded-full w-[124px] h-[44px]",
    //   callback: callbackFunc,
    // });
  };

  return {
    confirm,
    notifyWarning,
    notifySuccess,
    notifyError,
    confirmCreateUpdateAlert,
    confirmDeleteAlert,
  };
};

export default useSweetAlert;
