import type { NextPage } from "next";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Header, Footer } from "../components";
import userContext from "../context/userContext";

const Home: NextPage = () => {
    const { setUserData }: any = useContext(userContext);
    const router = useRouter();

    useEffect(() => {
        localStorage.setItem("auth-token", "");
        setUserData({
            authToken: "",
            data: {},
        });
        router.push({
            pathname: "/",
            query: {
                notificationMessage: `Successfuly signed out! 👋`,
                notificationType: "success",
            },
        });
    }, []);

    return (
        <>
            <Header />
            <Footer />
        </>
    );
};

export default Home;
