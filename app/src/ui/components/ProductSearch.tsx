import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";

export function ProductSearch() {
  const navigate = useNavigate();

  const searchTerm = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.SubmitEvent) => {
    event.preventDefault();
    const searchValue = searchTerm.current?.value.trim();

    if (searchValue) {
      navigate({
        to: "/products/search",
        search: {
          q: searchValue,
          sortBy: "name",
          minRating: 0,
        },
      });
    }
  };

  return (
    <form className="pt-10 pb-8" onSubmit={handleSearch}>
      <label htmlFor="default-search" className="sr-only">
        Search
      </label>
      <search className="grid grid-cols-[1fr_auto] border-2">
        <input
          type="text"
          id="default-search"
          className="text-2xl p-4 focus:border-0 focus:outline-0"
          placeholder="Search product..."
          ref={searchTerm}
          required
        />
        <button type="submit" className="hover:cursor-pointer">
          <span className="material-symbols-outlined  text-4xl! py-2 px-3 hover:bg-neutral-100 rounded-full">
            search
          </span>
        </button>
      </search>
    </form>
  );
}
