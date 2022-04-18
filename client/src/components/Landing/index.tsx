import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import axiosService from "../../services/axiosService";

import {
    HiOutlineLogin,
    HiOutlineChevronDoubleDown,
    HiOutlineChevronDown,
    HiOutlineChevronUp,
    HiOutlineScissors,
    HiOutlineClipboardCopy,
    HiOutlineBeaker,
    HiOutlineArrowSmRight,
    HiOutlineTable,
} from "react-icons/hi";

import userContext from "../../context/userContext";
import { useRouter } from "next/router";
import dataContext from "../../context/dataContext";

const LandingPage = ({}) => {
    const [longLink, setLongLink] = useState("");
    const [customizationEnabled, setCustomizationEnabled] = useState(false);
    const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState("2lnk.ga/");
    const [slug, setSlug] = useState("");
    const [shortenedLink, setShortenedLink] = useState("");
    const [shortenedLinks, setShortenedLinks]: any = useState([]);
    const [showRedirectLinkExecuted, setShowRedirectLinkExecuted] =
        useState(true);

    const { data }: any = useContext(dataContext);

    const { userData }: any = useContext(userContext);

    const router = useRouter();

    useEffect(() => {
        const getShortenedLinksByAuthor = async () => {
            if (userData.authToken) {
                await axiosService
                    .get(`/url/?author=${userData.data._id}`)
                    .then(({ data }) => {
                        setShortenedLinks(data.payload);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };
        getShortenedLinksByAuthor();
    }, [userData, shortenedLink]);

    const shortenLink = async (e: any) => {
        try {
            e.preventDefault();
            if (longLink == "") return;
            if (slug !== "") {
                await axiosService
                    .post(
                        "/url",
                        { redirectTo: longLink, slug },
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem(
                                        "auth-token"
                                    )}` || "",
                            },
                        }
                    )
                    .then(({ data }) => {
                        if (data.success) {
                            setSlug(data?.payload?.slug);
                            setShortenedLink(
                                `${selectedDomain}${data?.payload?.slug}`
                            );
                        } else {
                            router.push(
                                {
                                    pathname: "/",
                                    query: {
                                        notificationMessage:
                                            data.error?.message,
                                        notificationType: "error",
                                    },
                                },
                                undefined,
                                { shallow: true }
                            );
                        }
                    });
            } else {
                await axiosService
                    .post(
                        "/url",
                        { redirectTo: longLink },
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem(
                                        "auth-token"
                                    )}` || "",
                            },
                        }
                    )
                    .then(({ data }) => {
                        if (data.success) {
                            setSlug(data?.payload?.slug);
                            setShortenedLink(
                                `${selectedDomain}${data?.payload?.slug}`
                            );
                        } else {
                            router.push(
                                {
                                    pathname: "/",
                                    query: {
                                        notificationMessage:
                                            data.error?.message,
                                        notificationType: "error",
                                    },
                                },
                                undefined,
                                { shallow: true }
                            );
                        }
                    });
            }
        } catch (err: any) {
            router.push(
                {
                    pathname: "/",
                    query: {
                        notificationMessage:
                            err?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                },
                undefined,
                { shallow: true }
            );
            console.error(err);
        }
    };

    const copyToClipboard = (text: string) => {
        try {
            navigator.clipboard.writeText(text);
            router.push(
                {
                    pathname: "/",
                    query: {
                        notificationMessage:
                            "Successfully copied to clipboard!",
                        notificationType: "success",
                    },
                },
                undefined,
                { shallow: true }
            );
        } catch (err) {
            console.log(err);
        }
    };

    const showRedirectLink = async (id: any) => {
        if (showRedirectLinkExecuted) {
            setShowRedirectLinkExecuted(false);
            await axiosService
                .get(`/url/${id}/redirect`)
                .then(({ data }) => {
                    if (data.success) {
                        alert(data.payload.redirectTo);
                    } else {
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
                    setShowRedirectLinkExecuted(true);
                })
                .catch((error) => {
                    console.log(error);
                    setShowRedirectLinkExecuted(true);
                });
        }
    };

    useEffect(() => {
        setSlug(slug?.replace(/ /g, "-"));
    }, [slug]);

    return (
        <>
            <div
                className={`container ${
                    userData.authToken ? "lg:py-20 lg:pb-0" : "lg:py-28"
                } py-10 flex flex-col-reverse lg:flex-row items-center gap-20 justify-center lg:justify-between`}
            >
                <div className="flex flex-col flex-1">
                    <h1 className="text-white text-3xl lg:text-4xl">
                        Tired of long links?
                    </h1>
                    <hr className="outline-none border-none py-1 my-2 mb-4 bg-blue-900 rounded-lg w-1/2 lg:w-2/5" />
                    <p className="text-white text-xl lg:text-2xl">
                        <span className="underline">Quickly</span>,{" "}
                        <span className="underline">easily</span> and{" "}
                        <span className="underline">unlimitedly</span> shorten a
                        long link into a short,{" "}
                        <span className="bg-blue-900 px-3 rounded-lg">
                            easy-to-remember
                        </span>{" "}
                        link.
                    </p>
                    <div className="w-full lg:w-1/3">
                        {userData.authToken ? (
                            <Link href="#shorten-link">
                                <a>
                                    <p className="py-4 px-2 mt-4 text-xl lg:text-2xl flex items-center justify-center gap-3 cursor-pointer text-white bg-blue-900 rounded-lg">
                                        <HiOutlineChevronDoubleDown className="text-white text-2xl" />
                                        Get Started
                                    </p>
                                </a>
                            </Link>
                        ) : (
                            <Link
                                href={`${process.env.NEXT_PUBLIC_SIGNUP_URL}?callback=http://${data.host}/`}
                            >
                                <a>
                                    <p className="py-4 px-2 mt-4 text-xl lg:text-2xl flex items-center justify-center gap-3 cursor-pointer text-white bg-blue-900 rounded-lg">
                                        <HiOutlineLogin className="text-white text-2xl" />
                                        Sign Up
                                    </p>
                                </a>
                            </Link>
                        )}
                    </div>
                    {userData.authToken ? (
                        <p className="text-gray-300 text-xl text-left mt-3">
                            Signed in as {userData.data.displayName}. Not you?{" "}
                            <Link href="/signout">
                                <a>
                                    <span className="underline text-blue-900 cursor-pointer">
                                        Sign out
                                    </span>
                                </a>
                            </Link>
                        </p>
                    ) : (
                        <p className="text-gray-300 text-xl text-left mt-3">
                            Please{" "}
                            <Link
                                href={`${process.env.NEXT_PUBLIC_SIGNIN_URL}?callback=http://${data.host}/`}
                            >
                                <a>
                                    <span className="underline text-blue-900 cursor-pointer">
                                        Sign In
                                    </span>
                                </a>
                            </Link>{" "}
                            /{" "}
                            <Link
                                href={`${process.env.NEXT_PUBLIC_SIGNUP_URL}?callback=http://${data.host}/`}
                            >
                                <a>
                                    <span className="underline text-blue-900 cursor-pointer">
                                        Sign Up
                                    </span>
                                </a>
                            </Link>{" "}
                            to start shortening your links.
                        </p>
                    )}
                </div>
                <div className="flex flex-col flex-1 items-center lg:items-end">
                    <img
                        className="w-2/3"
                        src="/assets/short-url-illustration.svg"
                    />
                </div>
            </div>
            {userData.authToken && (
                <>
                    <div id="shorten-link" className="py-24"></div>
                    <div className="container pb-20 overflow-hidden flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center gap-1">
                            <HiOutlineScissors className="text-white text-2xl lg:text-4xl" />
                            <h1 className="text-white text-3xl lg:text-4xl">
                                Shorten Link
                            </h1>
                        </div>
                        <hr className="outline-none border-none py-1 my-6 bg-blue-900 rounded-lg w-1/2 lg:w-2/5" />
                        {shortenedLink ? (
                            <>
                                <p className="text-white text-2xl text-left mb-5">
                                    Here is your shortened link:
                                </p>

                                <div className="w-full lg:w-auto flex items-center justify-between mb-5">
                                    <div className="relative">
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
                                                        setSelectedDomain(
                                                            "2lnk.ga/"
                                                        );
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
                                                        setSelectedDomain(
                                                            "rpvc.ga/"
                                                        );
                                                    }}
                                                    className="flex items-center gap-1"
                                                >
                                                    rpvc.ga/
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        className="w-full lg:w-auto py-3 px-2 bg-black border-blue-900 border-2 outline-none text-white text-lg lg:text-xl transition-all cursor-pointer"
                                        value={slug}
                                        disabled
                                        type="text"
                                    />
                                    <button
                                        onClick={() => {
                                            copyToClipboard(
                                                `${selectedDomain}${slug}`
                                            );
                                        }}
                                        className="py-3 px-3 rounded-r-lg flex items-center gap-3 bg-blue-900 text-white border-2 border-blue-900 text-lg lg:text-xl"
                                    >
                                        <HiOutlineClipboardCopy className="text-white text-xl" />{" "}
                                        Copy
                                    </button>
                                </div>

                                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-5 mb-5">
                                    <div className="w-full lg:w-auto flex items-center gap-1">
                                        <Link
                                            href={`http://${selectedDomain}${slug}`}
                                            passHref={true}
                                        >
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full lg:w-auto py-3 px-3 rounded-l-lg flex items-center gap-3 bg-blue-900 text-white border-2 border-blue-900 text-xl"
                                            >
                                                <HiOutlineBeaker className="text-white text-xl" />{" "}
                                                Try it
                                            </a>
                                        </Link>
                                        <Link href={`/statistics/${slug}`}>
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full lg:w-auto py-3 px-3 rounded-r-lg flex items-center gap-3 bg-blue-900 text-white border-2 border-blue-900 text-xl"
                                            >
                                                <HiOutlineScissors className="text-white text-xl" />{" "}
                                                Statistics
                                            </a>
                                        </Link>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setCustomizationEnabled(false);
                                            setShortenedLink("");
                                            setLongLink("");
                                            setSlug("");
                                        }}
                                        className="w-full lg:w-auto py-3 px-3 rounded-lg flex items-center gap-3 bg-blue-900 text-white border-2 border-blue-900 text-xl"
                                    >
                                        <HiOutlineScissors className="text-white text-xl" />{" "}
                                        Shorten another link
                                    </button>
                                </div>

                                <p className="text-white text-lg lg:text-xl text-left mb-5">
                                    User will be asked to confirm redirect to
                                    the long link to prevent abuse.
                                </p>
                            </>
                        ) : (
                            <>
                                <form className="w-full lg:w-auto">
                                    <div className="w-full lg:w-auto flex items-center justify-center mb-5">
                                        <input
                                            className="w-full lg:w-[500px] py-3 px-5 rounded-l-lg bg-black border-white focus:border-blue-900 border-2 outline-none text-white text-lg lg:text-xl transition-all"
                                            placeholder="Paste a long link here"
                                            inputMode="url"
                                            value={longLink}
                                            onChange={(e) =>
                                                setLongLink(e.target.value)
                                            }
                                            type="text"
                                        />
                                        <button
                                            onClick={shortenLink}
                                            type="submit"
                                            className="py-3 px-3 rounded-r-lg flex items-center gap-3 bg-blue-900 text-white border-2 border-blue-900 text-lg lg:text-xl"
                                        >
                                            <HiOutlineScissors className="text-white text-xl" />
                                            Shorten
                                        </button>
                                    </div>
                                </form>
                                {customizationEnabled ? (
                                    <>
                                        <div className="w-full lg:w-auto flex items-center justify-center mb-5">
                                            <div className="relative">
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
                                                        className="absolute w-full text-right py-3 px-3 rounded-b-lg flex flex-col items-center gap-5 bg-blue-900 text-white border-2 border-blue-900 text-xl cursor-pointer z-10"
                                                    >
                                                        <div
                                                            onClick={() => {
                                                                setIsDomainDropdownOpen(
                                                                    !isDomainDropdownOpen
                                                                );
                                                                setSelectedDomain(
                                                                    "2lnk.ga/"
                                                                );
                                                            }}
                                                            className="flex items-center gap-1 text-lg lg:text-xl"
                                                        >
                                                            2lnk.ga/
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                setIsDomainDropdownOpen(
                                                                    !isDomainDropdownOpen
                                                                );
                                                                setSelectedDomain(
                                                                    "rpvc.ga/"
                                                                );
                                                            }}
                                                            className="flex items-center gap-1 text-lg lg:text-xl"
                                                        >
                                                            rpvc.ga/
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                className="w-full lg-w-auto py-3 px-2 rounded-r-lg bg-black border-white focus:border-blue-900 border-2 outline-none text-white text-lg lg:text-xl transition-all"
                                                placeholder="awesome-link"
                                                value={slug}
                                                onChange={(e) =>
                                                    setSlug(e.target.value)
                                                }
                                                type="text"
                                            />
                                        </div>
                                        <p
                                            className="text-white text-lg lg:text-xl"
                                            onClick={() =>
                                                setCustomizationEnabled(false)
                                            }
                                        >
                                            Click{" "}
                                            <span
                                                className="bg-blue-900 px-2 select-none rounded-lg cursor-pointer"
                                                onClick={() => {
                                                    setCustomizationEnabled(
                                                        true
                                                    );
                                                    setSlug("");
                                                }}
                                            >
                                                here
                                            </span>{" "}
                                            if you want to use random slug.
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-white text-lg lg:text-xl">
                                        Click{" "}
                                        <span
                                            className="bg-blue-900 px-2 select-none rounded-lg cursor-pointer"
                                            onClick={() => {
                                                setCustomizationEnabled(true);
                                            }}
                                        >
                                            here
                                        </span>{" "}
                                        if you want to customize slug.
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </>
            )}
            {userData.authToken && (
                <>
                    <div id="your-links" className="py-20"></div>
                    <div className="container flex flex-col pb-10 lg:pb-32 items-center justify-center">
                        <div className="flex items-center justify-center gap-1">
                            <HiOutlineTable className="text-white text-2xl lg:text-4xl" />
                            <h1 className="text-white text-3xl lg:text-4xl">
                                Your Links
                            </h1>
                        </div>
                        <hr className="outline-none border-none py-1 my-6 bg-blue-900 rounded-lg w-2/5" />

                        {shortenedLinks.length > 0 && (
                            <div className="flex items-center justify-center mb-8 gap-5">
                                <p className="text-white text-xl lg:text-2xl">
                                    Preferred domain:
                                </p>
                                <div className="relative">
                                    <div
                                        onClick={() => {
                                            setShortenedLink("");
                                            setCustomizationEnabled(false);
                                            setLongLink("");
                                            setSlug("");
                                            setIsDomainDropdownOpen(
                                                !isDomainDropdownOpen
                                            );
                                        }}
                                        className={`select-none py-3 px-3 ${
                                            !customizationEnabled &&
                                            isDomainDropdownOpen
                                                ? "rounded-tr-lg"
                                                : "rounded-r-lg"
                                        } flex items-center gap-5 bg-blue-900 text-white border-2 border-blue-900 text-lg lg:text-xl cursor-pointer`}
                                    >
                                        {!customizationEnabled &&
                                        isDomainDropdownOpen ? (
                                            <HiOutlineChevronUp className="text-white text-2xl" />
                                        ) : (
                                            <HiOutlineChevronDown className="text-white text-2xl" />
                                        )}
                                        {selectedDomain}
                                    </div>
                                    {!customizationEnabled &&
                                        !shortenedLink &&
                                        isDomainDropdownOpen && (
                                            <div
                                                onClick={() => {
                                                    setIsDomainDropdownOpen(
                                                        !isDomainDropdownOpen
                                                    );
                                                }}
                                                className="absolute w-full text-right py-3 px-3 rounded-b-lg flex flex-col items-center gap-5 bg-blue-900 text-white border-2 border-blue-900 text-lg lg:text-xl cursor-pointer z-10"
                                            >
                                                <div
                                                    onClick={() => {
                                                        setIsDomainDropdownOpen(
                                                            !isDomainDropdownOpen
                                                        );
                                                        setSelectedDomain(
                                                            "2lnk.ga/"
                                                        );
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
                                                        setSelectedDomain(
                                                            "rpvc.ga/"
                                                        );
                                                    }}
                                                    className="flex items-center gap-1"
                                                >
                                                    rpvc.ga/
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        )}

                        {shortenedLinks.length > 0 ? (
                            shortenedLinks.map((link: any) => (
                                <div
                                    key={link._id}
                                    className="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-3 justify-center mb-10 lg:mb-5"
                                >
                                    <div className="w-full lg:w-auto flex items-center justify-center">
                                        <div
                                            onClick={() => {}}
                                            className={`select-none py-3 px-3 rounded-l-lg flex items-center gap-5 bg-blue-900 text-white border-2 border-blue-900 text-xl`}
                                        >
                                            {selectedDomain}
                                        </div>
                                        <input
                                            className="w-full py-3 px-2 lg:w-[200px] bg-black border-blue-900 border-2 outline-none text-white text-xl transition-all"
                                            value={link.slug}
                                            disabled
                                            type="text"
                                        />
                                        <button
                                            onClick={() => {
                                                copyToClipboard(
                                                    `${selectedDomain}${link.slug}`
                                                );
                                            }}
                                            className="py-3 px-3 rounded-r-lg flex items-center gap-3 bg-blue-900 text-white border-2 border-blue-900 text-xl"
                                        >
                                            <HiOutlineClipboardCopy className="text-white text-xl" />
                                            Copy
                                        </button>
                                    </div>
                                    <HiOutlineArrowSmRight className="text-white text-3xl rotate-90 lg:rotate-0" />

                                    <div
                                        onClick={(e) => {
                                            showRedirectLink(link._id);
                                        }}
                                        className="w-full lg:w-auto text-white py-2 px-2 text-xl flex items-center justify-center lg:justify-start gap-5 bg-blue-900 rounded-lg cursor-pointer"
                                    >
                                        Click here to show redirect link
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center text-2xl">
                                You don&apos;t have any shortened links yet.
                            </p>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default LandingPage;
