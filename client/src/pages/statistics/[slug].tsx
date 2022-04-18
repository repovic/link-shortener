import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";

import { Header, Footer, StatisticsPage } from "../../components";
import dataContext from "../../context/dataContext";

import axiosService from "../../services/axiosService";

const Page: NextPage = ({ shortenedLinkData }: any) => {
    const { data }: any = useContext(dataContext);
    return (
        <>
            <Head>
                <title>
                    {data.domain.toUpperCase()} - Statistics for shortened link
                </title>
            </Head>
            <Header />
            <StatisticsPage shortenedLinkData={shortenedLinkData} />
            <Footer />
        </>
    );
};

export async function getServerSideProps(context: any) {
    const { slug } = context.query;
    var payload;
    !slug.includes("favicon") &&
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
            shortenedLinkData: (await payload) || "404",
        },
    };
}

export default Page;
