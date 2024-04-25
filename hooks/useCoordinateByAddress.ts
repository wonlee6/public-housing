import { getCoordinateByAddress } from '@/service/public_house'
import { useQuery } from '@tanstack/react-query'

const useCoordinateByAddress = (address: string, pan_id: string) => {
  return useQuery({
    queryKey: [address, pan_id],
    queryFn: () => getCoordinateByAddress(address),
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
