import { MdMoreVert, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg ">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Total Revenue</h1>
                <MdMoreVert className="text-gray-500 cursor-pointer" size={20} />
            </div>
            <div className="mt-4">
                <div className="w-20 h-20 mx-auto">
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
                </div>
                <p className="text-sm font-semibold mt-2">Total sales made today</p>
                <p className="text-lg font-bold">$420</p>
                <p className="text-xs text-gray-500 mt-2">
                    Previous transactions processing. Last payments may not be included.
                </p>
                <div className="flex justify-between mt-4">
                    <div className="flex items-center justify-between">
                        <div className="text-center">
                            <div className="text-sm font-semibold">Target</div>
                            <div className="flex items-center mt-1">
                                <MdKeyboardArrowDown className="text-red-500" size={18} />
                                <div className="text-sm font-semibold ml-1">$12.4k</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="text-sm font-semibold">Last Week</div>
                            <div className="flex items-center mt-1">
                                <MdKeyboardArrowUp className="text-green-500" size={18} />
                                <div className="text-sm font-semibold ml-1">$12.4k</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="text-sm font-semibold">Last Month</div>
                            <div className="flex items-center mt-1">
                                <MdKeyboardArrowUp className="text-green-500" size={18} />
                                <div className="text-sm font-semibold ml-1">$12.4k</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Progress;
