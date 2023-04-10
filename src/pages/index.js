import { useState } from "react";
import useSWR from "swr";

import Head from "next/head";

const fetcher = (url) => fetch(url).then((response) => response.json());

import FilterCardComponent from "../components/cards/filter";
import JobCardComponent from "../components/cards/job";

export default function Home() {
  const { data, error } = useSWR("/api/information-data", fetcher);
  const [query, setQuery] = useState([]);

  if (error) return <h1>Error fetching data</h1>;
  if (!data) return <h1>Loading...</h1>;

  const finalData = JSON.parse(data).map((item) => ({
    ...item,
    taggedInformation: [
      item.role,
      item.level,
      ...item.tools,
      ...item.languages,
    ],
  }));

  const filteredJobs = () => {
    if (query.length === 0) return finalData;

    const filtered = finalData.filter((item) =>
      query.every((q) => item.taggedInformation.includes(q))
    );

    return filtered;
  };

  function onFilterClicked(Filter) {
    if (query.includes(Filter)) return;
    setQuery((previous) => {
      return [...previous, Filter];
    });
  }

  function toRemoveFilter(Filter) {
    setQuery((previous) => {
      return previous.filter((value) => value !== Filter);
    });
  }

  function clearItems() {
    setQuery(() => {
      return [];
    });
  }

  return (
    <>
      <Head>
        <title>Job Listings App</title>
      </Head>

      <main className="grid justify-items-center overflow-x-hidden">
        <div className="w-screen h-32 bg-desatured-dary-cyan bg-header-desktop max-sm:bg-header-mobile"></div>

        <div
          className={`w-screen relative min-[345px]:w-9/12 bg-white rounded-lg flex flex-wrap p-4 gap-4 transition-all ${
            query.length < 1 ? "bottom-0 opacity-0" : "opacity-1 bottom-10"
          }`}
        >
          {query.map((index) => {
            return (
              <FilterCardComponent Text={index} onClick={toRemoveFilter} />
            );
          })}
          <p
            className="p-1.5 text-center text-dark-grayish-cyan font-bold ml-auto transition hover:text-desatured-dary-cyan hover:underline hover:cursor-pointer"
            onClick={clearItems}
          >
            Clear
          </p>
        </div>

        <div className="flex flex-col gap-y-8 min-[345px]:w-9/12 mb-8">
          {filteredJobs().map((index) => {
            return (
              <JobCardComponent
                Information={index}
                onClick={onFilterClicked}
                TaggedInformation={index.taggedInformation}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
