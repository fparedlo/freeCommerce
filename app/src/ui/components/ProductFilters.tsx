export type SortOption = "price-asc" | "price-desc" | "rating" | "name";

interface ProductFiltersProps {
  sortBy: SortOption;
  minRating: number;
  onSortChange: (sort: SortOption) => void;
  onMinRatingChange: (rating: number) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  sortBy,
  minRating,
  onSortChange,
  onMinRatingChange,
  onClearFilters,
}: ProductFiltersProps) {
  const hasActiveFilters = minRating > 0;

  return (
    <div className="mb-8 p-6 bg-neutral-50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Filters & Sorting</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-neutral-600 hover:text-black underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sort Dropdown */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium mb-2">
            Sort By
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-black"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>

        {/* Min Rating */}
        <div>
          <label htmlFor="minRating" className="block text-sm font-medium mb-2">
            Min Rating: {minRating > 0 ? `${minRating}★` : "Any"}
          </label>
          <select
            id="minRating"
            value={minRating}
            onChange={(e) => onMinRatingChange(Number(e.target.value))}
            className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-black"
          >
            <option value="0">Any Rating</option>
            <option value="1">1★ & up</option>
            <option value="2">2★ & up</option>
            <option value="3">3★ & up</option>
            <option value="4">4★ & up</option>
            <option value="5">5★ only</option>
          </select>
        </div>
      </div>
    </div>
  );
}
