import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cubicApi } from "../utils/path.util";

const STYLE_LABEL =
  " text-white/40  text-base font-normal font-BebasNeue h-[19px]";
const STYLE_VALUE = "text-white text-base font-normal font-Inter";
const STYLE_SPACE = "flex flex-col space-y-2.5";

const CubicDialog = ({
  openDialog = false,
  setOpenDialog = () => {},
  detail,
  setDetail,
  getInquiryType = () => {},
  reloadData = () => {},
}) => {
  return (
    <Dialog open={openDialog}>
      <DialogContent
        onClose={() => {
          setOpenDialog(false);
        }}
        // classNameXIcon="right-[50px] top-[60px] w-10 h-10 flex j"
        className=" max-w-[718px] h-[80vh] bg-[#3a3a3a]  !rounded-none border-none p-[60px] "
        // hideXicon={true}
      >
        <DialogTitle className="text-white text-2xl font-normal font-BebasNeue leading-[38px] ">
          Inquiry{" "}
        </DialogTitle>

        <div className="space-y-5 ">
          <div className={STYLE_SPACE}>
            <div className={STYLE_LABEL}>Name</div>
            <div className={STYLE_VALUE}>{detail.name}</div>
          </div>
          <div className={STYLE_SPACE}>
            <div className={STYLE_LABEL}>Phone Number</div>
            <div className={STYLE_VALUE}>{detail.phone}</div>
          </div>
          <div className={STYLE_SPACE}>
            <div className={STYLE_LABEL}>Email</div>
            <div className={STYLE_VALUE}>{detail.email}</div>
          </div>

          <div className="overflow-x-hidden  overflow-y-auto scrollbar ">
            <div className="  h-[25vh] flex flex-col space-y-[2px]">
              <div className={STYLE_LABEL}>Message</div>
              <div className={STYLE_VALUE}>{detail.message}</div>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-center items-center cursor-pointer">
          <div
            className="w-[182px] h-11 px-[30px] py-2.5 rounded-3xl  justify-center items-center gap-2.5 inline-flex"
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            <div className="text-center text-white text-base font-normal font-['Noto Sans Thai']">
              OK
            </div>
          </div>
        </div> */}
        <div className="flex justify-center items-center">
          <div
            className="bg-red-500 cursor-pointer p-4 w-[200px] rounded-xl flex items-center justify-center"
            onClick={async () => {
              try {
                await cubicApi.delete(`/inquiry/${detail._id}`);
                setOpenDialog(false);
                setDetail({});
                reloadData();
              } catch (error) {
                console.error("Error deleting inquiry:", error);
              }
            }}
          >
            <div className="text-white"> Delete</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CubicDialog;
