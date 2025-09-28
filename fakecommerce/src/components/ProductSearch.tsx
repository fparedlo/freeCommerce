export default function ProductSearch() {
  return (
    <form className="">
      <label htmlFor="default-search" className="sr-only">
        Search
      </label>
      <search className="grid grid-cols-[1fr_auto] border-2">
        <input
          type="text"
          id="default-search"
          className="text-2xl p-4 focus:border-0 focus:outline-0 focus:no-c"
          placeholder="Search products..."
          required
        />
        <button type="submit" className="px-4 hover:cursor-pointer">
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </search>
    </form>
  );
}
