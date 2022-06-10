function XButton(props) {
    return (
        <button onClick={props.handleClick} className="p-2 flex-col inline-flex items-center justify-center text-black">
            <svg className="h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div className="-mt-2">Close</div>
        </button>
        
    );
}

export default XButton;