import { useState, useEffect } from "react";
import Link from "next/link";

import axiosService from "../../services/axiosService";
import { useRouter } from "next/router";

import {
    HiOutlineBeaker,
    HiOutlineCalendar,
    HiOutlineChevronDown,
    HiOutlineChevronUp,
    HiOutlineClipboardCopy,
    HiOutlineCursorClick,
    HiOutlineGlobe,
    HiOutlineHome,
    HiOutlineLink,
    HiOutlineLogin,
    HiOutlineScissors,
    HiOutlineTrendingUp,
    HiOutlineUserCircle,
} from "react-icons/hi";

const StatisticsPage = ({ shortenedLinkData }: any) => {
    const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState("2lnk.ga");
    const [redirectTo, setRedirectTo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [slug, setSlug] = useState("");

    const router = useRouter();

    const getRedirectToValue = async () => {
        if (!redirectTo && !isLoading) {
            setIsLoading(true);
            await axiosService
                .get(`/url/${shortenedLinkData._id}/redirect`)
                .then(({ data }) => {
                    if (data.success) {
                        setIsLoading(false);
                        setRedirectTo(data.payload.redirectTo);
                        alert(data.payload.redirectTo);
                    } else {
                        setIsLoading(false);
                        setRedirectTo("");
                        router.push(
                            {
                                pathname: "/",
                                query: {
                                    notificationMessage: data?.error?.message,
                                    notificationType: "error",
                                },
                            },
                            undefined,
                            { shallow: true }
                        );
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    setRedirectTo("");
                    console.log(error);
                });
        } else if (!isLoading) {
            alert(redirectTo);
        }
    };

    useEffect(() => {
        if (shortenedLinkData == "404") {
            router.push(
                {
                    pathname: "/statistics",
                    query: {
                        notificationMessage:
                            "Shortened link with that slug was not found :(",
                        notificationType: "error",
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [shortenedLinkData]);

    if (!shortenedLinkData?.slug) {
        return (
            <div className="container w-full lg:w-auto py-16 lg:py-44 flex flex-col lg:flex-row gap-20 items-center justify-between">
                <div className="w-full lg:w-auto flex flex-col flex-1">
                    <h1 className="text-white text-3xl lg:text-4xl">
                        Want to track statistics of your shortened links?
                    </h1>
                    <hr className="outline-none border-none py-1 my-2 mb-4 bg-blue-900 rounded-lg w-2/5" />
                    <p className="text-white text-xl lg:text-2xl">
                        Just paste your{" "}
                        <span className="bg-blue-900 px-3 rounded-lg">
                            shortened link
                        </span>{" "}
                        or{" "}
                        <span className="bg-blue-900 px-3 rounded-lg">
                            even slug
                        </span>{" "}
                        and{" "}
                        <span className="underline">
                            press the button below
                        </span>
                        .
                    </p>
                    <input
                        className="w-full lg:w-[500px] my-5 py-3 px-5 rounded-lg bg-black border-white focus:border-blue-900 border-2 outline-none text-white text-lg lg:text-xl transition-all"
                        placeholder="Paste a shortened link or slug here"
                        onChange={(e) => {
                            if (
                                e.target.value.match(
                                    /(http[s]?:\/\/)?([^\/\s]+\/)/
                                )
                            ) {
                                setSlug(
                                    e.target.value.replace(
                                        /(http[s]?:\/\/)?([^\/\s]+\/)/,
                                        ""
                                    )
                                );
                            } else {
                                setSlug(e.target.value);
                            }
                        }}
                        type="text"
                    />
                    <div className="w-full lg:w-1/3">
                        {slug ? (
                            <Link href={`/statistics/${slug}`}>
                                <a>
                                    <p className="py-4 px-2 text-2xl flex items-center justify-center gap-3 cursor-pointer text-white bg-blue-900 rounded-lg">
                                        <HiOutlineTrendingUp className="text-white text-2xl" />
                                        Statistics
                                    </p>
                                </a>
                            </Link>
                        ) : (
                            <p className="py-4 px-2 text-2xl flex items-center justify-center gap-3 cursor-pointer text-white bg-blue-900 rounded-lg">
                                <HiOutlineTrendingUp className="text-white text-2xl" />
                                Statistics
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col flex-1 items-center lg:items-end">
                    <img className="w-2/3" src="/assets/statistics.svg" />
                </div>
            </div>
        );
    }

    return (
        <div className="container py-16 lg:py-40 flex flex-col-reverse lg:flex-row gap-20 items-center justify-between">
            <div className="w-full lg:w-auto flex flex-1 flex-col">
                <div className="flex items-center gap-3">
                    <HiOutlineTrendingUp className="text-white text-4xl" />
                    <h1 className="text-white text-3xl lg:text-4xl">
                        Statistics for shortened link
                    </h1>
                </div>
                <hr className="outline-none border-none py-1 my-6 bg-blue-900 rounded-lg w-3/4" />
                <ul className="text-white flex flex-col text-xl lg:text-2xl gap-2">
                    <li className="flex items-center gap-3">
                        <HiOutlineScissors />
                        Slug:{" "}
                        <span className="underline text-blue-900">
                            {shortenedLinkData.slug}
                        </span>
                    </li>
                    <li className="flex items-center gap-3">
                        <HiOutlineCursorClick />
                        Redirects:{" "}
                        <span className="underline text-blue-900">
                            {shortenedLinkData.numberOfRedirects}
                        </span>
                    </li>
                    <li className="w-full lg:w-3/4 flex flex-wrap items-center overflow-hidden gap-3">
                        <HiOutlineLink />
                        Redirect link:{" "}
                        <span
                            onClick={getRedirectToValue}
                            className="bg-blue-900 px-3 text-2xl rounded-lg cursor-pointer"
                        >
                            Click here to show
                        </span>
                    </li>
                    <li className="flex items-center gap-3">
                        <HiOutlineGlobe />
                        Accessible link:{" "}
                    </li>
                    <div className="w-full lg:w-3/4 flex items-center">
                        <div className="relative flex-1">
                            <div
                                onClick={() => {
                                    setIsDomainDropdownOpen(
                                        !isDomainDropdownOpen
                                    );
                                }}
                                className={`select-none py-3 px-3 ${
                                    isDomainDropdownOpen
                                        ? "rounded-tl-lg"
                                        : "rounded-l-lg"
                                } flex items-center gap-5 bg-blue-900 text-white border-2 border-blue-900 text-xl cursor-pointer`}
                            >
                                {isDomainDropdownOpen ? (
                                    <HiOutlineChevronUp className="text-white text-2xl" />
                                ) : (
                                    <HiOutlineChevronDown className="text-white text-2xl" />
                                )}
                                {selectedDomain}
                            </div>
                            {isDomainDropdownOpen && (
                                <div
                                    onClick={() => {
                                        setIsDomainDropdownOpen(
                                            !isDomainDropdownOpen
                                        );
                                    }}
                                    className="absolute w-full text-right py-3 px-3 rounded-b-lg flex flex-col items-center gap-5 bg-blue-900 text-white border-2 border-blue-900 text-xl cursor-pointer"
                                >
                                    <div
                                        onClick={() => {
                                            setIsDomainDropdownOpen(
                                                !isDomainDropdownOpen
                                            );
                                            setSelectedDomain("2lnk.ga");
                                        }}
                                        className="flex items-center gap-1"
                                    >
                                        2lnk.ga/
                                    </div>
                                    <div
                                        onClick={() => {
                                            setIsDomainDropdownOpen(
                                                !isDomainDropdownOpen
                                            );
                                            setSelectedDomain("rpvc.ga");
                                        }}
                                        className="flex items-center gap-1"
                                    >
                                        rpvc.ga/
                                    </div>
                                </div>
                            )}
                        </div>
                        <input
                            className="w-full lg:w-auto py-3 px-2 flex-1 bg-black border-blue-900 border-2 rounded-r-lg outline-none text-white text-xl transition-all cursor-pointer"
                            value={shortenedLinkData.slug}
                            disabled
                            type="text"
                        />
                    </div>
                    <li className="w-full lg:w-3/4 flex flex-wrap flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <HiOutlineUserCircle />
                            Created by:
                        </div>
                        <div className="flex p-2 gap-5 bg-blue-900 rounded-lg">
                            <img
                                src={shortenedLinkData.author?.avatarUrl}
                                draggable={false}
                                className="w-[75px] rounded-lg"
                            />
                            <div className="flex flex-col justify-center gap-1">
                                <span className="text-white text-xl">
                                    {shortenedLinkData.author?.displayName}
                                </span>
                                <span className="text-white text-xl">
                                    {shortenedLinkData.author?.email}
                                </span>
                            </div>
                        </div>
                    </li>
                    <hr className="outline-none border-none py-1 my-6 bg-blue-900 rounded-lg w-3/4" />

                    {shortenedLinkData.createdAt !==
                        shortenedLinkData.updatedAt && (
                        <li className="flex items-center flex-wrap gap-3">
                            <HiOutlineCalendar />
                            Last redirect:{" "}
                            <span className="underline text-blue-900">
                                {new Date(
                                    shortenedLinkData?.updatedAt
                                ).toLocaleString("sr-RS")}
                            </span>
                        </li>
                    )}
                    <li className="flex items-center gap-3">
                        <HiOutlineCalendar />
                        Created:{" "}
                        <span className="underline text-blue-900">
                            {new Date(
                                shortenedLinkData?.createdAt
                            ).toLocaleString("sr-RS")}
                        </span>
                    </li>
                </ul>
                <div className="flex items-center w-full lg:w-3/4 gap-1 my-5">
                    <Link
                        href={`http://${selectedDomain}/${shortenedLinkData.slug}`}
                        passHref={true}
                    >
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-3 flex-1 rounded-l-lg flex items-center justify-center gap-3 bg-blue-900 text-white border-2 border-blue-900 text-lg lg:text-xl"
                        >
                            <HiOutlineBeaker className="text-white text-xl" />{" "}
                            Try it
                        </a>
                    </Link>
                    <Link href={`/statistics/`}>
                        <a className="py-3 px-3 flex-1 rounded-r-lg flex items-center justify-center gap-3 bg-blue-900 text-white border-2 border-blue-900 text-lg lg:text-xl">
                            <HiOutlineHome className="text-white text-xl" /> Go
                            Back
                        </a>
                    </Link>
                </div>
                <p className="text-white text-xl text-left">
                    Statistics of all shortened links are publicly available.
                </p>
            </div>
            <div className="flex flex-col flex-1 items-center lg:items-end">
                <img className="w-2/3" src="/assets/statistics-2.svg" />
            </div>
        </div>
    );
};

export default StatisticsPage;
