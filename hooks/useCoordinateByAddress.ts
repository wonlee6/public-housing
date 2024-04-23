import { getCoordinateByAddress } from '@/service/public_house'
import { useQuery } from '@tanstack/react-query'

const useCoordinateByAddress = (address: string, id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => {
      if (!address) return
      return getCoordinateByAddress(address)
    },
    select: (data) => {
      const { lat, lng } = data.results[0].geometry.location
      return {
        latitude: lat,
        longitude: lng
      }
    }
  })
}

export default useCoordinateByAddress
