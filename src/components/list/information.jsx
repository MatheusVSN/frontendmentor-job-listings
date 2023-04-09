export default function Information({ Text }) {
    return (<li className="text-xs text-dark-grayish-cyan inline-flex items-center align-baseline before:content-['\00B7'] before:mr-1">
        <p>{Text}</p>
    </li>)
}