import Link from "next/link";
import {
    AiOutlineGithub,
    AiOutlineMail,
    AiOutlineInstagram,
} from "react-icons/ai";

const FooterComponent = ({}) => {
    return (
        <div className="bg-black">
            <div className="container flex flex-col lg:flex-row items-center justify-center lg:justify-between">
                <p className="py-8 text-white text-xl text-center lg:text-2xl">
                    Copyright &copy; 2021-{new Date().getFullYear()}{" "}
                    <Link href="https://www.repovic.ga/" passHref={true}>
                        <a>
                            <span className="underline text-blue-900">
                                Vasilije Repović
                            </span>
                        </a>
                    </Link>{" "}
                    - All rights reserved!
                </p>
                <div className="pt-0 py-8 flex items-center gap-3">
                    <Link href="https://github.com/repovic" passHref={true}>
                        <a>
                            <div className="p-2 flex items-center bg-blue-900 rounded-lg cursor-pointer">
                                <AiOutlineGithub className="text-white text-2xl" />
                            </div>
                        </a>
                    </Link>
                    <Link href="mailto:admin@repovic.ga" passHref={true}>
                        <a>
                            <div className="p-2 flex items-center bg-blue-900 rounded-lg cursor-pointer">
                                <AiOutlineMail className="text-white text-2xl" />
                            </div>
                        </a>
                    </Link>
                    <Link
                        href="https://instagram.com/v.repovic"
                        passHref={true}
                    >
                        <a>
                            <div className="p-2 flex items-center bg-blue-900 rounded-lg cursor-pointer">
                                <AiOutlineInstagram className="text-white text-2xl" />
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FooterComponent;
