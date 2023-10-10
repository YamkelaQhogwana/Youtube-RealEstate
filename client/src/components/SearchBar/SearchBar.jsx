 import { HiLocationMarker } from "react-icons/hi";
 const SearchBar = ({filter, setFilter}) => {
  
  return (
    <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input type="text" value={filter} onChange={(e)=> setFilter(e.target.value)} placeholder="Search by title/city/country " />
            <button className="button">Search</button>
    </div>
  )
}

export default SearchBar;