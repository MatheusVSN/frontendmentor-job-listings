import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

import JobCardComponent from "../components/cards/job";

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

      <main className="bg-light-grayish-cyan-background grid justify-items-center">
        <div className="w-screen h-32 bg-desatured-dary-cyan bg-header-desktop max-sm:bg-header-mobile"></div>
        <div className="w-screen min-[345px]:w-9/12 h-20 bg-white rounded-lg relative bottom-10">
          
        </div>

        <div className="flex flex-col gap-y-8 min-[345px]:w-9/12">
          {finalData.map((index) => {
            return <JobCardComponent Information={index} />;
          })}
        </div>
      </main>
    </>
  );
}
