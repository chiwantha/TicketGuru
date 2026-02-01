import Button from "../../button/button/Button";
import { IoSearch } from "react-icons/io5";

const EventSearch = () => {
  return (
    <div
      className="w-full rounded-lg p-4 bg-linear-to-r from-orange-500 via-orange-600 to-orange-500
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  "
    >
      <div className="md:col-span-3 col-span-2">
        <input
          placeholder="Search Event"
          type="text"
          className="bg-white rounded-md py-2 w-full px-4 outline-none"
        />
      </div>
      <div className="w-full col-span-2 grid grid-cols-2 items-center gap-4">
        <div className="min-w-0 truncate text-left text-sm text-gray-600">
          <input
            placeholder="Search Event"
            type="text"
            className="bg-white rounded-md py-2 w-full px-4 outline-none"
          />
        </div>

        <div className="min-w-0 truncate text-right text-sm text-gray-600 ">
          <input
            placeholder="Search Event"
            type="text"
            className="bg-white rounded-md py-2 w-full px-4  outline-none"
          />
        </div>
      </div>
      <div className="sm:col-span-2 md:col-span-1 col-span-2">
        <Button
          bg={`bg-orange-700  opacity-75 cursor-not-allowed `}
          title={
            <span className="flex items-center justify-center text-xl gap-2">
              <span className="font-bold text-2xl">
                <IoSearch />
              </span>{" "}
              Search
            </span>
          }
          wfull={true}
        />
      </div>
    </div>
  );
};

export default EventSearch;
