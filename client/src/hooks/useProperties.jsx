import { useQuery } from "react-query"
import { getAllProperties } from "../utils/api"
export const useProperties = () => {
    const {data, isError, isLoading, refetch} = useQuery(
        //name of query,  query function ,  flag, do not fetch the data each time the window focuses        ,  
        "allProperties", getAllProperties, {refetchOnWindowFocus:false}
    )
  return {

    data, isError, isLoading, refetch
  }
}