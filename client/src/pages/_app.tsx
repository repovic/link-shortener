import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosService from "../services/axiosService";

import UserContext from "../context/userContext";
import NotificationContext from "../context/notificationContext";
import DataContext from "../context/dataContext";

import { Notification } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
    const [userData, setUserData] = useState({
        authToken: "",
        data: {},
    });

    const [notification, setNotification] = useState({
        message: null,
        type: null,
        isShown: false,
    });

    const [data, setData] = useState({
        domain: "rpvc.ga",
        host: "rpvc.ga",
    });

    const checkLoggedIn = async (withNotification: Boolean = false) => {
        const authToken = localStorage.getItem("auth-token");
        if (!authToken) {
            localStorage.setItem("auth-token", "");
            return;
        }

        await axiosService
            .post("auth/check-token/", undefined, {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem("auth-token")}` || "",
                },
            })
            .then(({ data }: any) => {
                if (data.success) {
                    setUserData({
                        authToken: authToken,
                        data: data.payload,
                    });
                    if (withNotification) {
                        showNotification(
                            `Successfully signed in as @${data.payload.username}! 👋`,
                            "success"
                        );
                    }
                } else {
                    console.error(data.error.message);
                    localStorage.setItem("auth-token", "");
                    setUserData({
                        authToken: "",
                        data: {},
                    });
                }
            })
            .catch((error: any) => {
                console.error(error);
                localStorage.setItem("auth-token", "");
                setUserData({
                    authToken: "",
                    data: {},
                });
            });
    };

    const router = useRouter();

    useEffect(() => {
        checkLoggedIn();
        if (window) {
            const allowedDomains = ["rpvc.ga", "2lnk.ga"];
            setData({
                domain: allowedDomains.includes(window.location.hostname)
                    ? window.location.hostname
                    : "rpvc.ga",
                host: window.location.host,
            });
        }
    }, []);

    const showNotification = (message: any, type: any) => {
        closeNotification();

        setNotification({
            message: message,
            type: type,
            isShown: true,
        });
    };

    const closeNotification = () => {
        setNotification({
            message: null,
            type: null,
            isShown: false,
        });
    };

    var notificationClearTimeout: any;
    useEffect(() => {
        clearTimeout(notificationClearTimeout);
        notificationClearTimeout = setTimeout(closeNotification, 10000);
    }, [notification.isShown]);

    useEffect(() => {
        const { authToken }: any = router.query;
        if (authToken) {
            localStorage.setItem("auth-token", authToken);
            checkLoggedIn(true);
            router.replace("/");
        }

        if (window.location.toString().indexOf("#") > 0) {
            router.replace(
                window.location
                    .toString()
                    .substring(0, window.location.toString().indexOf("#"))
            );
        }

        const { notificationMessage, notificationType } = router.query;
        if (notificationMessage && notificationType) {
            showNotification(notificationMessage, notificationType);
            router.replace(
                window.location
                    .toString()
                    .substring(0, window.location.toString().indexOf("?")),
                "",
                { shallow: true }
            );
        }
    }, [router]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <NotificationContext.Provider
                value={{ notification, showNotification }}
            >
                <DataContext.Provider value={{ data, setData }}>
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        isShown={notification.isShown}
                        closeNotification={closeNotification}
                    />
                    <Component {...pageProps} />
                </DataContext.Provider>
            </NotificationContext.Provider>
        </UserContext.Provider>
    );
}

export default MyApp;
