import Link from "next/link";

import {
    HiOutlineThumbUp,
    HiOutlineHome,
    HiOutlineExclamation,
} from "react-icons/hi";

const ConfirmRedirectComponent = ({ shortenedLinkData, redirect }: any) => {
    return (
        <div className="py-44 lg:py-56 container flex flex-col items-center justify-center">
            <h2 className="text-white text-center text-3xl lg:text-4xl mb-2">
                {shortenedLinkData.author.displayName} shared a link with you!
            </h2>
            <hr className="outline-none border-none py-1 my-5 bg-blue-900 rounded-lg w-1/2 lg:w-2/5" />
            <p className="text-white text-center text-2xl lg:text-3xl mb-5">
                Link will take you to another website, is that okay?
            </p>
            <div className="flex items-center justify-center gap-3 mb-5">
                <button
                    onClick={() => {
                        if (!shortenedLinkData.banned) redirect();
                    }}
                    className={`py-3 px-3 rounded-l-lg flex items-center gap-3 text-white border-2 text-lg lg:text-xl ${
                        shortenedLinkData.banned
                            ? "border-white cursor-not-allowed"
                            : "bg-blue-900 border-blue-900 cursor-pointer"
                    }`}
                >
                    {shortenedLinkData.banned ? (
                        <HiOutlineExclamation className="text-white text-xl" />
                    ) : (
                        <HiOutlineThumbUp className="text-white text-xl" />
                    )}
                    {shortenedLinkData.banned
                        ? "This link is banned!"
                        : shortenedLinkData.restricted
                        ? "Yes, redirect me"
                        : "Redirecting..."}
                </button>
                <Link href="/">
                    <a className="py-3 px-3 rounded-r-lg flex items-center gap-3 bg-blue-900 text-white border-2 border-blue-900 text-lg lg:text-xl cursor-pointer">
                        <HiOutlineHome className="text-white text-xl" />
                        Home
                    </a>
                </Link>
            </div>
            {shortenedLinkData.author.role !== "Administrator" ? (
                <p className="text-center text-gray-300 text-xl bg-blue-900 px-2 rounded-lg">
                    Confirm only if you trust source!
                </p>
            ) : (
                <p className="text-center text-gray-300 text-xl bg-blue-900 px-2 rounded-lg">
                    This link is from an Administrator, so you can trust the
                    source!
                </p>
            )}
        </div>
    );
};

export default ConfirmRedirectComponent;
