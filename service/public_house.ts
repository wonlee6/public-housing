import { PublicHousingDetailModel, PublicHousingModel } from '@/model/public-housing'

const serviceKey = encodeURIComponent(process.env.EXPO_PUBLIC_API_KEY!)
export async function fetchNoticeInfo(): Promise<PublicHousingModel> {
  const address = 'http://apis.data.go.kr/B552555/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1'
  const pageSize = `${encodeURIComponent('PG_SZ')}=${encodeURIComponent('50')}`
  const page = `${encodeURIComponent('PAGE')}=${encodeURIComponent('1')}`
  const 공고중 = `${encodeURIComponent('PAN_SS')}=${encodeURIComponent('공고중')}`
  const startDate = `${encodeURIComponent('PAN_ST_DT')}=${encodeURIComponent('20240410')}`
  const url = `${address}?serviceKey=${serviceKey}&${pageSize}&${page}&${공고중}&${startDate}`

  const response = await fetch(url)
  return await response.json()
}

/**
 *  @param SPL_INF_TP_CD
 *  @description 공급정보구분코드
 *  @param PAN_ID
 *  @description 공고아이디
 *  @param CCR_CNNT_SYS_DS_CD
 *  @description 고객센터연계시스템구분코드
 *  @param UPP_AIS_TP_CD
 *  @description 상위매물유형코드
 *  @param AIS_TP_CD
 *  @description 매물유형코드
 *
 */
type RequestNotiInfo = {
  PAN_ID: string
  SPL_INF_TP_CD: string
  CCR_CNNT_SYS_DS_CD: string
  UPP_AIS_TP_CD: string
  AIS_TP_CD?: string
}

export async function fetchNoticeInfoDetail(
  request: RequestNotiInfo
): Promise<PublicHousingDetailModel> {
  const 분양임대공고별상세정보조회 =
    'http://apis.data.go.kr/B552555/lhLeaseNoticeDtlInfo1/getLeaseNoticeDtlInfo1'
  const 공급정보구분코드 = `${encodeURIComponent('SPL_INF_TP_CD')}=${encodeURIComponent(
    request.SPL_INF_TP_CD
  )}`
  const 고객센터연계시스템구분코드 = `${encodeURIComponent(
    'CCR_CNNT_SYS_DS_CD'
  )}=${encodeURIComponent(request.CCR_CNNT_SYS_DS_CD)}`
  const 공고아이디 = `${encodeURIComponent('PAN_ID')}=${encodeURIComponent(
    request.PAN_ID
  )}`
  const 상위매물유형코드 = `${encodeURIComponent('UPP_AIS_TP_CD')}=${encodeURIComponent(
    request.UPP_AIS_TP_CD
  )}`
  let notiInfoUrl = `${분양임대공고별상세정보조회}?serviceKey=${serviceKey}&${공급정보구분코드}&${고객센터연계시스템구분코드}&${공고아이디}&${상위매물유형코드}`

  if (request.AIS_TP_CD) {
    const 매물유형코드 = `${encodeURIComponent('AIS_TP_CD')}=${encodeURIComponent(
      request.AIS_TP_CD
    )}`
    notiInfoUrl += `&${매물유형코드}`
  }

  const response = await fetch(notiInfoUrl)
  return await response.json()
}

export async function getCoordinateByAddress(address: string) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=kr&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`
  )
  return await response.json()
  // const { lat, lng } = data.results[0].geometry.location
  // return {
  //   latitude: lat,
  //   longitude: lng
  // }
}
