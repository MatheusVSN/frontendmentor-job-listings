import Image from "next/image"

import FeaturedCardComponent from "../cards/featured"
import NewCardComponent from "../cards/new"
import SpecificTagComponent from "../cards/specific-tag"
import ListInformationComponent from "../list/information"

export default function JobCard({ Information, TaggedInformation, onClick }) {
    function onMouseButton1Click(event) {
        onClick(event)
    }

    return (
        <>
            {/* Mobile Version */}
            <div className="bg-white p-4 drop-shadow-xl rounded-lg lg:hidden">
                <div className="relative bottom-10 flex flex-col gap-3">
                    <div>
                        <Image src={Information.logo} width={40} height={40} />
                        <div className="flex items-center gap-2">
                            <p className="mr-4 text-desatured-dary-cyan font-bold">{Information.company}</p>
                            {Information.new == true && <NewCardComponent />}
                            {Information.featured == true && <FeaturedCardComponent />}
                        </div>

                        <p className="font-bold text-sm transition hover:text-desatured-dary-cyan hover:cursor-pointer">{Information.position}</p>

                        <ul className="list-none inline-flex gap-2">
                            <ListInformationComponent Text={Information.postedAt} />
                            <ListInformationComponent Text={Information.contract} />
                            <ListInformationComponent Text={Information.location} />
                        </ul>
                    </div>


                    <div className="outline outline-1 outline-dark-grayish-cyan"></div>

                    <ul className="list-none inline-flex flex-wrap gap-4">
                        {TaggedInformation.map((index) => {
                            return <SpecificTagComponent Text={index} onClick={onMouseButton1Click} />
                        })}
                    </ul>
                </div>
            </div>

            {/* Desktop Version */}
            <div className="bg-white p-4 drop-shadow-xl rounded-lg max-lg:hidden flex gap-2">
                <Image src={Information.logo} width={80} height={80} />
                <div className="grid content-center gap-2">
                    <div className="flex self-baseline gap-2">
                        <p className="mr-2 text-desatured-dary-cyan font-bold">{Information.company}</p>

                        {Information.new == true && <NewCardComponent />}
                        {Information.featured == true && <FeaturedCardComponent />}
                    </div>

                    <p className="font-bold text-sm transition hover:text-desatured-dary-cyan hover:cursor-pointer">{Information.position}</p>

                    <ul className="list-none inline-flex gap-2">
                        <ListInformationComponent Text={Information.postedAt} />
                        <ListInformationComponent Text={Information.contract} />
                        <ListInformationComponent Text={Information.location} />
                    </ul>
                </div>

                <ul className="list-none inline-flex flex-wrap gap-4 content-center self-center ml-auto">
                    {TaggedInformation.map((index) => {
                        return <SpecificTagComponent Text={index} onClick={onMouseButton1Click} />
                    })}
                </ul>
            </div>
        </>
    )
}