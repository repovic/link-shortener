import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { Header, LandingPage, Footer } from "../components";
import dataContext from "../context/dataContext";

const Home: NextPage = () => {
    const { data }: any = useContext(dataContext);
    return (
        <>
            <Head>
                <title>{data.domain.toUpperCase()} - Link Shortener</title>
                <meta
                    name="description"
                    content="Quickly, easily and unlimitedly shorten a long link into a short, easy-to-remember link."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <LandingPage />
            <Footer />
        </>
    );
};

export default Home;
