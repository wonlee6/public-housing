import { useCallback } from 'react'
import { UseQueryResult, useQueries } from '@tanstack/react-query'
import { PublicHousing, PublicHousingDetailModel } from '@/model/public-housing'
import { fetchNoticeInfoDetail } from '@/service/public_house'

const usePublicHousingNotiDetail = (data: PublicHousing[] | undefined) => {
  const handleCombine = useCallback(
    (result: UseQueryResult<PublicHousingDetailModel, Error>[]) => {
      return {
        houseDetailData: result.map((i) => i.data),
        pending: result.some((i) => i.isPending)
      }
    },
    []
  )

  if (typeof data === 'undefined') {
    return {
      houseDetailData: [],
      pending: true
    }
  }
  return useQueries({
    queries: data.map((item, index) => ({
      queryKey: [`${item.PAN_ID}-${String(index)}`, item.PAN_ID],
      queryFn: () =>
        fetchNoticeInfoDetail({
          PAN_ID: item.PAN_ID,
          CCR_CNNT_SYS_DS_CD: item.CCR_CNNT_SYS_DS_CD,
          SPL_INF_TP_CD: item.SPL_INF_TP_CD,
          UPP_AIS_TP_CD: item.UPP_AIS_TP_CD,
          AIS_TP_CD: item.AIS_TP_CD
        })
    })),
    combine: handleCombine
  })
}

export default usePublicHousingNotiDetail
