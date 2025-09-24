const Pagination = ({ pages, setPage, page, startPage, setStartPage }) => {

    const handlePrev = () => {
        setStartPage(prev => Math.max(1, prev - 5));
    }

    const handleNext = () => {
        setStartPage(prev => prev + 5 > pages ? prev + (pages - prev + 1) : prev + 5);
    }

    return (
        <div className="flex gap-4 justify-center items-center my-5">
            <button
                className="btn btn-info"
                onClick={handlePrev}
                disabled={startPage == 1}
            >
                prev
            </button>
            <div className="flex gap-2">
                {Array.from({ length: Math.min(5, pages - startPage + 1) }, (_, i) => (
                    <button
                        key={i + startPage}
                        className={`btn mx-2 ${page == startPage + i ?
                            "btn-info" :
                            "btn-info btn-outline"
                            }`}
                        onClick={() => setPage(startPage + i)}
                    >{i + startPage}</button>
                ))}
            </div>
            <button
                className="btn btn-info"
                onClick={handleNext}
                disabled={startPage + 4 >= pages}
            >
                next
            </button>
        </div>
    )
}

export default Pagination;
