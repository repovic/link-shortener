import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { Header, ConfirmRedirect, Footer } from "../components";

import axiosService from "../services/axiosService";

import { useRouter } from "next/router";
import dataContext from "../context/dataContext";

const Page: NextPage = ({ shortenedLinkData }: any) => {
    const { data }: any = useContext(dataContext);
    const router = useRouter();

    const redirect = async () => {
        try {
            await axiosService
                .get(`/url/${shortenedLinkData._id}/redirect`)
                .then(({ data }: any) => {
                    if (data.success) {
                        router.replace(data.payload.redirectTo);
                    } else {
                        router.push(
                            {
                                pathname: `/${shortenedLinkData.slug}`,
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
                .catch((err: any) => {
                    console.log(err);
                });
        } catch (error) {}
    };

    useEffect(() => {
        if (shortenedLinkData._id) {
            if (!shortenedLinkData.restricted) {
                redirect();
            }
        } else {
            router.replace("/");
        }
    }, [shortenedLinkData]);

    return (
        <>
            <Head>
                <title>{data.domain.toUpperCase()} - Link Shortener</title>{" "}
            </Head>
            <Header />
            {shortenedLinkData._id && (
                <ConfirmRedirect
                    shortenedLinkData={shortenedLinkData}
                    redirect={redirect}
                />
            )}
            <Footer />
        </>
    );
};

export async function getServerSideProps(context: any) {
    const { slug } = context.query;
    var payload;
    !slug.includes("favicon") &&
        !slug.includes("authToken") &&
        (await axiosService
            .get(`/url/${slug}`)
            .then(({ data }: any) => {
                if (!data.payload.restricted) {
                    payload = data.payload;
                } else {
                    payload = data.payload;
                }
            })
            .catch((err: any) => {
                console.log(err);
            }));

    return {
        props: {
            shortenedLinkData: (await payload) || {},
        },
    };
}

export default Page;
