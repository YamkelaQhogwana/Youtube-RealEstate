import { useState } from "react"
import PropertyCard from "../../components/PropertyCard/PropertyCard"
import SearchBar from "../../components/SearchBar/SearchBar"
import { useProperties } from "../../hooks/useProperties"
import "./Properties.css"
import {PuffLoader} from "react-spinners"
export const Properties = () => {
  const [filter, setFilter] = useState("");
  const {data, isError, isLoading} = useProperties();
  if(isError){
    return(
      <div className="wrapper">
        Error while fetching data
      </div>

    )
  }

  if(isLoading){
    return(
      <div className="wrapper flexCenter" style={{height : "60vh"}}>
        <PuffLoader
        height = "80"
        width = "80"
        radius = {1}
        color = "#4066ff"
        aria-label = "puff-loading"
        >

        </PuffLoader>
      </div>
    )
  }
  return (
    <div className="wrapper">
        <div className="flexColCenter paddings innerWidth properties-container">
          <SearchBar filter={filter} setFilter={setFilter}/>
          <div className="paddings flexCenter properties">
          {
            // data.map((card, i)=> (<PropertyCard card={card} key={i}/>))

            data
              .filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))
          }
        </div>
        </div>
    </div>
  )
}