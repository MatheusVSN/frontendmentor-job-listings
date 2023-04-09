import Image from "next/image"

import RemoveIcon from "../../../public/images/icon-remove.svg"

export default function FilterCard({ Text, onClick }) {
    function removeFilter() {
        onClick(Text)
    }

    return (
        <div className="flex">
            <p className="text-desatured-dary-cyan font-bold bg-light-grayish-cyan-filter-tablets p-1.5 text-sm h-full">{Text}</p>
            <Image className="bg-desatured-dary-cyan p-2 object-scale-down transition hover:cursor-pointer hover:text-white hover:bg-black" src={RemoveIcon} alt="Remove" height={30} onClick={removeFilter} />
        </div>
    )
}