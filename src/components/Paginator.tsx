const Paginator = ({
  currentPage,
  paginate,
  totalPages,
}: {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  totalPages: number;
}) => {
  const pageNumbers: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || i === currentPage) {
      pageNumbers.push(i);
    } else if (
      (i > currentPage + 1 || i < totalPages) &&
      !pageNumbers.includes("...")
    ) {
      pageNumbers.push("...");
    }
  }

  return (
    <>
      {totalPages <= 1 ? null : (
        <div className="paginator flex gap-4 justify-center flex-wrap mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`font-bold ${currentPage === 1 && "hidden"}`}
          >
            Prev
          </button>
          {pageNumbers.map((number, i) => (
            <button
              className={`border-2 p-2 rounded-full w-10 border-primary text-primary hover:bg-primary hover:text-white ${
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
      )}
    </>
  );
};

export default Paginator;
