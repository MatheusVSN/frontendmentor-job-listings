import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

import JobCardComponent from "../components/cards/job";
import FilterCardComponent from "../components/cards/filter";

export default function Home() {
  const { data, error } = useSWR("/api/information-data", fetcher);

  if (error) return;
  if (!data) return;

  const finalData = JSON.parse(data);

  return (
    <>
      <head>
        <title>Job Listings App</title>
      </head>

      <main className="bg-light-grayish-cyan-background grid justify-items-center overflow-x-hidden">
        <div className="w-screen h-32 bg-desatured-dary-cyan bg-header-desktop max-sm:bg-header-mobile"></div>

        <div className="w-screen min-[345px]:w-9/12 bg-white rounded-lg relative bottom-8 flex flex-wrap p-4 gap-4">
          <FilterCardComponent Text={"Frontend"} />
          <p className="p-1.5 text-center text-dark-grayish-cyan font-bold ml-auto transition hover:text-desatured-dary-cyan hover:underline hover:cursor-pointer">
            Clear
          </p>
        </div>

        <div className="flex flex-col gap-y-8 min-[345px]:w-9/12 mb-8">
          {finalData.map((index) => {
            return (
              <JobCardComponent
                Information={index}
                TaggedInformation={[
                  index.role,
                  index.level,
                  ...index.tools,
                  ...index.languages,
                ]}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
