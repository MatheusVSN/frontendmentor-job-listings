export default function SpecificTag({ Text, onClick }) {
    function mouseButton1Click() {
        onClick(Text)
    }
    return (
        <p className="text-desatured-dary-cyan font-bold bg-light-grayish-cyan-filter-tablets rounded-lg p-1.5 transition hover:text-white hover:cursor-pointer hover:bg-desatured-dary-cyan" onClick={mouseButton1Click}>{Text}</p>
    )
}