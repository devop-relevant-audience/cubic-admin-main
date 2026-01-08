"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { PlusIcon } from "../myicon/myicon";
import CubicButton from "../components/CubicButton";
import { cubicApi } from "../utils/path.util";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CubicDialog from "../components/CubicDialog";
import useExportCSV from "./hooks/useExport";

const STYLE_BG_TABLE = "  rounded-[20px] px-[14px] py-[17px] space-y-2";
const STYLE_HEAD_TABLE =
  "flex bg-cubic-yellow h-[50px] items-center rounded-[10px] text-2xl font-medium text-cubic-black px-[23px] py-[13px] font-BebasNeue ";
const STYLE_ROWS_TABLE =
  "flex items-center h-14  bg-cubic-black  px-[20px] pt-[19px] pb-[18px]  cursor-pointer border-b border-cubic-white";

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const mappingFieldForExcelPerson = (luckyDraw) => {
  return luckyDraw.map((lucky, index) => {
    return {
      no: index + 1,
      name: lucky.name,
      phone: lucky.phone,
      email: lucky.email,
      message: lucky.message,
    };
  });
};

const InquiryPage = () => {
  const router = useRouter();
  const [inquiry, setInquiry] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [detail, setDetail] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalRows / ITEMS_PER_PAGE);
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const loadInquiry = async () => {
    const { data } = await cubicApi.get("/inquiry", {
      sort: { createdAt: -1 },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
    });

    setInquiry(data.inquiries);
    setTotalRows(data.count);
  };

  useEffect(() => {
    loadInquiry();
  }, [currentPage]);

  const submitedHeader = [
    { name: "No", key: "no" },
    { name: "ชื่อและนามสกุล", key: "name" },
    { name: "เบอร์โทรศัพท์", key: "phone" },
    { name: "อีเมล", key: "email" },
    { name: "Message", key: "message" },
  ];

  const { exportExcel } = useExportCSV({
    fileName: `Inquiry`,
    headers: submitedHeader,
    // headerGroups: REPORT_HEADER_GROUPS,
    sheetName: `Inquiry`,
    // tableTitle: "รายงานการขายสินค้า",
  });

  const onClickExcelPerson = async () => {
    const limit = 50;
    const perPage = Math.ceil(totalRows / limit);
    let item = [];

    for (let i = 0; i < perPage; i++) {
      const { data } = await cubicApi.get("/inquiry", {
        sort: { createdAt: -1 },
        skip: i * limit,
        limit: limit,
      });
      item = [...item, ...data.inquiries];
    }

    exportExcel(mappingFieldForExcelPerson(item));
  };

  return (
    <div
      className={cn(
        " w-full min-h-screen bg bg-cubic-black pt-10 px-16  space-y-6"
      )}
    >
      <div className="flex justify-between  w-full">
        <div className="text-white text-5xl font-normal font-BebasNeue">
          Inquiry
        </div>
        <div
          className="flex items-center justify-center  border border-white p-4 rounded-xl cursor-pointer"
          onClick={onClickExcelPerson}
        >
          <div className="text-white">Export Excel</div>
        </div>
      </div>

      <CubicDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        detail={detail}
        setDetail={setDetail}
        reloadData={loadInquiry}
      />
      <div className={cn(STYLE_BG_TABLE)}>
        <div className={STYLE_HEAD_TABLE}>
          <div className="flex-1 ">Date </div>
          <div className="flex-1  ">Name</div>
          <div className="flex-1  ">Phone number</div>
          <div className="flex-1  ">Email</div>

          <div className="flex-1  ">Message</div>
        </div>

        {inquiry.map((inquiry, index) => (
          <div
            key={index}
            className={STYLE_ROWS_TABLE}
            onClick={() => {
              setOpenDialog(true);
              setDetail(inquiry);
            }}
          >
            <div className="flex-1 text-cubic-white ">
              {formatDate(inquiry.createdAt)}
            </div>
            <div className="flex-1 text-cubic-white ">{inquiry.name}</div>
            <div className="flex-1 text-cubic-white ">{inquiry.phone}</div>
            <div className="flex-1  text-cubic-white">{inquiry.email}</div>

            <div className="flex-1 text-cubic-white truncate">
              {inquiry.message}
            </div>
          </div>
        ))}
        <div className=" pt-5">
          <Pagination
            onNext={handleNext}
            onPrev={handlePrev}
            total={totalRows}
            currentPage={currentPage}
            totalPage={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
