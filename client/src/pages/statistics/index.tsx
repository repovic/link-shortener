import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";

import { Header, StatisticsPage, Footer } from "../../components";
import dataContext from "../../context/dataContext";

const Page: NextPage = () => {
    const { data }: any = useContext(dataContext);
    return (
        <>
            <Head>
                <title>
                    {data.domain.toUpperCase()} - Statistics for shortened link
                </title>
                <meta
                    name="description"
                    content="Want to track statistics of your shortened links? Just paste your shortened link or even slug and press the button below."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <StatisticsPage />
            <Footer />
        </>
    );
};

export default Page;
