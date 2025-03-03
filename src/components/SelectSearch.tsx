import { useEffect, useRef, useState } from "react";

interface SelectSearchProps {
  subCategory: string[];
  onSelect: (value: string) => void;
}

const SelectSearch = ({ subCategory, onSelect }: SelectSearchProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = subCategory.filter((category) =>
    category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-md focus:outline-none"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <ul className="absolute left-0 w-full mt-1 bg-white border rounded-md shadow-md max-h-40 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((category) => (
              <li
                key={category}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setSearch(category);
                  setIsOpen(false);
                  onSelect(category);
                }}
              >
                {category.toUpperCase()}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectSearch;
