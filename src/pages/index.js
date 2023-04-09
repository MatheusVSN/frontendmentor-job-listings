import { useMemo, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

import FilterCardComponent from "../components/cards/filter";
import JobCardComponent from "../components/cards/job";

export default function Home() {
  const { data, error } = useSWR("/api/information-data", fetcher);
  const [query, setQuery] = useState([]);

  if (error) return;
  if (!data) return;

  const finalData = JSON.parse(data);
  finalData.map((index) => {
    index.taggedInformation = [
      index.role,
      index.level,
      ...index.tools,
      ...index.languages,
    ];
  });

  const filteredJobs = useMemo(() => {
    let finalSearch = [];

    for (let index = 0; index < finalData.length; index += 1) {
      let presumedElement = finalData[index];
      let taggedInfoArray = presumedElement.taggedInformation;

      for (let queryIndex = 0; queryIndex < query.length; queryIndex++) {
        let searchString = query[queryIndex];
        let Result = taggedInfoArray.includes(searchString);

        if (Result) {
          if (finalSearch.indexOf(presumedElement) > -1) continue;
          finalSearch.push(presumedElement);
          continue;
        }

        if (finalSearch.indexOf(presumedElement) > -1) {
          finalSearch.splice(finalSearch.indexOf(presumedElement));
        }
      }
    }

    return query.length > 0 ? finalSearch : finalData;
  }, [query]);

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
      <head>
        <title>Job Listings App</title>
      </head>

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
          {filteredJobs.map((index) => {
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
