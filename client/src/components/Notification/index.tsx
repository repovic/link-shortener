import { HiOutlineX } from "react-icons/hi";

const NotificationComponent = ({
    message,
    type,
    isShown,
    closeNotification,
}: any) => {
    return (
        <div
            className={`fixed ${
                isShown ? "right-0" : "right-[-91.666667%] lg:right-[-400px]"
            } top-[8.5rem] max-w-[500px] w-11/12 lg:w-[400px] p-5 flex items-center justify-between bg-black border-l-4 ${
                type == "success" ? "border-l-blue-900" : "border-l-red-900"
            } rounded-l-lg z-[1338] transition-all duration-500 ease-in-out`}
        >
            <p className="text-white text-xl pr-3">{message}</p>
            <HiOutlineX
                onClick={closeNotification}
                className="text-white text-4xl cursor-pointer"
            />
        </div>
    );
};

export default NotificationComponent;
