import { PublicHousing } from '@/model/public-housing'
import { fetchNoticeInfoDetail } from '@/service/public_house'
import { useQuery } from '@tanstack/react-query'

const useLHPublicHousingDetail = (data: PublicHousing) => {
  return useQuery({
    queryKey: [data.PAN_ID],
    queryFn: () =>
      fetchNoticeInfoDetail({
        PAN_ID: data.PAN_ID,
        CCR_CNNT_SYS_DS_CD: data.CCR_CNNT_SYS_DS_CD,
        SPL_INF_TP_CD: data.SPL_INF_TP_CD,
        UPP_AIS_TP_CD: data.UPP_AIS_TP_CD,
        AIS_TP_CD: data.AIS_TP_CD
      })
  })
}

export default useLHPublicHousingDetail
