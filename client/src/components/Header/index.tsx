import { useState, useContext, useEffect } from "react";
import Link from "next/link";

import {
    HiOutlineScissors,
    HiOutlineTrendingUp,
    HiOutlineAtSymbol,
    HiOutlineLogin,
    HiOutlineUserCircle,
    HiOutlineChevronDown,
    HiOutlineLogout,
    HiOutlineEye,
    HiOutlineTable,
    HiOutlineChevronUp,
    HiOutlineMenuAlt3,
    HiOutlineX,
} from "react-icons/hi";

import userContext from "../../context/userContext";
import dataContext from "../../context/dataContext";

const HeaderComponent = ({}) => {
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { data }: any = useContext(dataContext);

    const { userData }: any = useContext(userContext);
    return (
        <div className="bg-black sticky top-0 left-0 z-[1337]">
            <div className="container flex items-center justify-between z-[1337]">
                <h1
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                    }}
                    className="py-8 text-white text-2xl whitespace-nowrap text-ellipsis overflow-hidden lg:text-3xl z-[1337]"
                >
                    <Link href="/#">
                        <a>
                            <span className="bg-blue-900 px-5 rounded-lg">
                                {data.domain.toUpperCase()}
                            </span>{" "}
                            | Link Shortener
                        </a>
                    </Link>
                </h1>
                <ul className="hidden lg:flex items-center justify-items-stretch gap-5 text-white text-xl">
                    <HeaderListItem
                        href="/#shorten-link"
                        Icon={HiOutlineScissors}
                        label="Shorten"
                    />
                    <HeaderListItem
                        href="/statistics"
                        Icon={HiOutlineTrendingUp}
                        label="Statistics"
                    />
                    <HeaderListItem
                        href="https://www.repovic.ga/#contact"
                        newTab={true}
                        Icon={HiOutlineAtSymbol}
                        label="Contact"
                    />
                    {!userData.authToken ? (
                        <Link
                            href={`${process.env.NEXT_PUBLIC_SIGNUP_URL}?callback=http://${data.host}/`}
                            passHref={true}
                        >
                            <a>
                                <li className="py-4 px-2 flex items-center gap-1 select-none cursor-pointer bg-blue-900 rounded-lg">
                                    <HiOutlineLogin className="text-white text-2xl" />
                                    Sign Up
                                </li>
                            </a>
                        </Link>
                    ) : (
                        <div className="relative">
                            <li
                                onClick={() => {
                                    setIsAccountMenuOpen(!isAccountMenuOpen);
                                }}
                                className={`py-4 px-2 flex items-center gap-1 select-none cursor-pointer bg-blue-900 ${
                                    isAccountMenuOpen
                                        ? "rounded-t-lg"
                                        : "rounded-lg"
                                }`}
                            >
                                <HiOutlineUserCircle className="text-white text-2xl" />
                                {userData.data.displayName}
                                {isAccountMenuOpen ? (
                                    <HiOutlineChevronUp className="text-white text-2xl" />
                                ) : (
                                    <HiOutlineChevronDown className="text-white text-2xl" />
                                )}
                            </li>
                            {isAccountMenuOpen && (
                                <ul
                                    onClick={() => {
                                        setIsAccountMenuOpen(false);
                                    }}
                                    className="absolute w-full bg-blue-900 right-0 py-2 px-2 rounded-b-lg flex flex-col justify-center"
                                >
                                    <Link href="/#your-links">
                                        <a>
                                            <li className="py-2 flex items-center justify-between gap-5 text-white text-xl cursor-pointer">
                                                <HiOutlineTable className="text-white text-2xl" />
                                                Your links
                                            </li>
                                        </a>
                                    </Link>
                                    <Link
                                        href="https://www.repovic.ga/profile"
                                        passHref={true}
                                    >
                                        <a target="_blank">
                                            <li className="py-2 flex items-center justify-between gap-5 text-white text-xl cursor-pointer">
                                                <HiOutlineEye className="text-white text-2xl" />
                                                User Profile
                                            </li>
                                        </a>
                                    </Link>
                                    <Link href="/signout">
                                        <a>
                                            <li className="py-2 flex items-center gap-5 justify-between text-white text-xl cursor-pointer">
                                                <HiOutlineLogout className="text-white text-2xl" />
                                                Sign Out
                                            </li>
                                        </a>
                                    </Link>
                                </ul>
                            )}
                        </div>
                    )}
                </ul>
                <ul
                    className={`container fixed ${
                        isMobileMenuOpen ? "left-0" : "left-[-100%]"
                    } top-0 z-[1336] lg:hidden bg-black text-white text-2xl gap-5 w-full h-full flex flex-col items-stretch justify-center transition-all duration-500`}
                >
                    <Link href="/#">
                        <a>
                            <li
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                }}
                                className="px-2 py-4 flex items-center justify-start gap-3"
                            >
                                <HiOutlineScissors />
                                Shorten
                            </li>{" "}
                        </a>
                    </Link>
                    <Link href="/statistics">
                        <a>
                            <li
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                }}
                                className="px-2 py-4 flex items-center justify-start gap-3"
                            >
                                <HiOutlineTrendingUp />
                                Statistics
                            </li>
                        </a>
                    </Link>
                    <Link
                        href="https://www.repovic.ga/#contact"
                        passHref={true}
                    >
                        <a>
                            <li
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                }}
                                className="px-2 py-4 flex items-center justify-start gap-3"
                            >
                                <HiOutlineAtSymbol />
                                Contact
                            </li>
                        </a>
                    </Link>
                    {!userData.authToken ? (
                        <Link
                            href={`${process.env.NEXT_PUBLIC_SIGNUP_URL}?callback=http://${data.host}/`}
                            passHref={true}
                        >
                            <a>
                                <li className="py-4 px-2 flex items-center justify-between gap-1 select-none cursor-pointer bg-blue-900 rounded-lg">
                                    <HiOutlineLogin className="text-white text-2xl" />
                                    Sign Up
                                    <div />
                                </li>
                            </a>
                        </Link>
                    ) : (
                        <div className="relative">
                            <li
                                onClick={() => {
                                    setIsAccountMenuOpen(!isAccountMenuOpen);
                                }}
                                className={`w-full py-4 px-2 flex items-center justify-between gap-1 select-none cursor-pointer bg-blue-900 ${
                                    isAccountMenuOpen
                                        ? "rounded-t-lg"
                                        : "rounded-lg"
                                }`}
                            >
                                <HiOutlineUserCircle className="text-white text-2xl" />
                                {userData.data.displayName}
                                {isAccountMenuOpen ? (
                                    <HiOutlineChevronUp className="text-white text-2xl" />
                                ) : (
                                    <HiOutlineChevronDown className="text-white text-2xl" />
                                )}
                            </li>
                            {isAccountMenuOpen && (
                                <ul
                                    onClick={() => {
                                        setIsAccountMenuOpen(false);
                                    }}
                                    className="absolute w-full bg-blue-900 right-0 py-2 px-2 rounded-b-lg"
                                >
                                    <Link href="/#your-links">
                                        <a>
                                            <li
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="py-2 flex items-center gap-5 text-white text-xl cursor-pointer"
                                            >
                                                <HiOutlineTable className="text-white text-2xl" />
                                                Your links
                                            </li>
                                        </a>
                                    </Link>
                                    <Link
                                        href="https://www.repovic.ga/profile"
                                        passHref={true}
                                    >
                                        <a target="_blank">
                                            <li
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="py-2 flex items-center gap-5 text-white text-xl cursor-pointer"
                                            >
                                                <HiOutlineEye className="text-white text-2xl" />
                                                User Profile
                                            </li>
                                        </a>
                                    </Link>
                                    <Link href="/signout">
                                        <a>
                                            <li
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="py-2 flex items-center gap-5 text-white text-xl cursor-pointer"
                                            >
                                                <HiOutlineLogout className="text-white text-2xl" />
                                                Sign Out
                                            </li>
                                        </a>
                                    </Link>
                                </ul>
                            )}
                        </div>
                    )}
                </ul>
                <button
                    onClick={() => {
                        setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}
                    className="flex p-2 lg:hidden items-center justify-center text-white text-3xl z-[1337] cursor-pointer"
                >
                    {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
                </button>
            </div>
        </div>
    );
};

const HeaderListItem = ({ label, Icon, href, newTab = false }: any) => {
    return (
        <Link href={href} passHref={true}>
            <a target={`${newTab ? "_blank" : ""}`}>
                <li className="py-8 flex items-center gap-1 cursor-pointer">
                    {Icon && <Icon className="text-white text-2xl" />}
                    {label}
                </li>
            </a>
        </Link>
    );
};

export default HeaderComponent;
