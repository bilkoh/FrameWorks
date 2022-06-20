import React, { useState } from "react";
import { Context } from "../src/context";

// main layout
import { Main } from "../src/layout/Main";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Index = () => {
  // Fetching frameworkData
  let { data, error } = useSWR("/api/frameworks/all", fetcher);
  const allData = data;
  // ({ data, error } = useSWR("/api/frameworks/csf", fetcher));
  // const csfData = data;
  // ({ data, error } = useSWR("/api/frameworks/sp", fetcher));
  // const spData = data;
  console.log(allData);

  // we use filter array in context to find current state of filter settings
  const [filter, setFilter] = useState();

  // we use detailRefs object to store DOM location of Detail component
  // so we can scroll into view later
  const [detailRefs, setDetailRefs] = useState({});

  // This is the context object we'll pass thru the app
  const ctxValue = {
    filter: [filter, setFilter],
    detailRefs: [detailRefs, setDetailRefs],
  };

  return (
    <Context.Provider value={ctxValue}>
      <Main frameworkData={allData} />
    </Context.Provider>
  );
};

export default Index;
