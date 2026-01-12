import { cn } from "@/lib/utils";

const Pagination = ({ total, onPrev, onNext, currentPage, totalPage }) => {
  return (
    <div className=" flex justify-between w-full">
      <div className="text-white text-base font-normal ">
        Total : {total} rows
      </div>

      <div className=" flex items-center space-x-2.5 ">
        <div
          onClick={onPrev}
          className={cn(
            currentPage === 1
              ? "cursor-not-allowed opacity-65 border border-slate-300 text-slate-300"
              : "cursor-pointer hover:bg-seedlab-yellow duration-200 hover:bg-gymx-blue border border-gymx-blue text-gymx-blue   hover:text-[#f8f8f8]",
            "w-[160px] h-12 px-3 py-2    justify-center items-center gap-2.5 inline-flex  text-2xl font-normal font-BebasNeue leading-6 tracking-wide"
          )}
        >
          Previous
        </div>
        <div
          onClick={onNext}
          className={cn(
            currentPage === Math.ceil(total / 5) || currentPage === totalPage
              ? "cursor-not-allowed opacity-65 border border-slate-300 text-slate-300"
              : "cursor-pointer hover:bg-seedlab-yellow duration-200 hover:bg-gymx-blue border border-gymx-blue text-gymx-blue   hover:text-[#f8f8f8]",

            "w-[160px] h-12 px-3 py-2   justify-center items-center gap-2.5 inline-flex  text-2xl font-normal font-BebasNeue leading-6 tracking-wide"
          )}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default Pagination;
