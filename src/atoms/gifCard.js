export default function GifCard({headline, text, gifLink}) {
    return (
        <div className="p-3 shadow-md rounded-md flex flex-row">
            <img src={gifLink} alt={headline}/>
            <div className="p-4">
                <div className="font-bold text-xl">{headline}</div>
                <div>{text}</div>
            </div>
        </div>
    );
}

