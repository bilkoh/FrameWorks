import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Heading, Link, Flex, Container } from "@chakra-ui/react";
import { OptionsPanel, ResultsPanel } from "../components/layout";
import styles from "../styles/Home.module.css";

import { createContext, useContext, useState } from "react";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const FrameworksContext = createContext();

const Display = () => {
  const cxt = useContext(FrameworksContext);

  const [options, setOptions] = useState({});

  return (
    <Container maxWidth="container.xl">
      <Flex py={20}>
        <OptionsPanel setOptions={setOptions} />

        <ResultsPanel controlContext={cxt} options={options} />
      </Flex>
    </Container>
  );
};

const Home = () => {
  let { data, error } = useSWR("/api/frameworks/sp", fetcher);
  const spData = data;

  ({ data, error } = useSWR("/api/frameworks/csf", fetcher));
  const csfData = data;

  ({ data, error } = useSWR("/api/frameworks/all", fetcher));
  const allData = data;

  if (spData && csfData && allData)
    console.log(spData[0], csfData[0], allData[0]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Framework Maps</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading as="h1" size="4xl">
          Welcome to <Link href="#">Framework Maps</Link>
        </Heading>

        <FrameworksContext.Provider
          value={{ sp: spData, csf: csfData, all: allData }}
        >
          <Display />
        </FrameworksContext.Provider>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
