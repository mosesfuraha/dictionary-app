const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center mt-16 px-4 ">
      <span
        role="img"
        aria-label="confused face"
        className="text-6xl mb-4 mt-14"
      >
        😒
      </span>
      <h2 className="text-2xl font-bold mb-2">No Definitions found</h2>
      <p className="text-gray-500 max-w-xs md:max-w-md lg:max-w-lg">
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at a later time or head to the web
        instead.
      </p>
    </div>
  );
};

export default NotFound;
