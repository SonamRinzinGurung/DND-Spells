const Paginator = ({
  currentPage,
  paginate,
  totalPages,
}: {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  totalPages: number;
}) => {
  let jumpToPageNumber: number = currentPage;
  const pageNumbers: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || i === currentPage) {
      pageNumbers.push(i);
    } else if (
      (i > currentPage + 1 || i < totalPages) &&
      pageNumbers[pageNumbers.length - 1] !== "..."
    ) {
      pageNumbers.push("...");
    }
  }

  return (
    <>
      {totalPages <= 1 ? null : (
        <div className="paginator flex gap-10 justify-center flex-wrap mt-4">
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => paginate(currentPage - 1)}
              className={`font-bold ${currentPage === 1 && "hidden"}`}
            >
              Prev
            </button>
            {pageNumbers.map((number, i) => (
              <button
                className={`border-2 p-2 rounded-full w-10 h-10 border-primary text-primary hover:bg-primary hover:text-white ${
                  number === currentPage && `bg-primary text-white`
                } transition-colors`}
                key={i}
                onClick={() => typeof number === "number" && paginate(number)}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              className={`font-bold ${currentPage === totalPages && "hidden"}`}
            >
              Next
            </button>
          </div>
          <form>
            <div className="flex">
              <input
                type="number"
                className="border-2 p-2 w-20 border-primary text-primary transition-colors outline-none rounded-none"
                min={1}
                max={totalPages}
                onChange={(e) => (jumpToPageNumber = Number(e.target.value))}
              />
              <button
                type="submit"
                className="font-bold  border-2 border-primary border-l-0 px-2 bg-primary text-white hover:bg-transparent hover:text-black transition-all ease-in-out duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  paginate(jumpToPageNumber);
                }}
              >
                Go To
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Paginator;
