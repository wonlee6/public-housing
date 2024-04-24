import { fetchNoticeInfo } from '@/service/public_house'
import { useQuery } from '@tanstack/react-query'

const useLHPublicHousing = () => {
  return useQuery({
    queryKey: ['lhLeaseNoticeInfo1'],
    queryFn: fetchNoticeInfo
    // select: (data) => {
    //   if (data && typeof data[1].dsList !== 'undefined') {
    //     return usePublicHousingNotiDetail(data[1].dsList)
    //   }
    // }
  })
}

export default useLHPublicHousing
