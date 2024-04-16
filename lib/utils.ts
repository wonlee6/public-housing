import { LatLng } from 'react-native-maps'

export const getCoordinateByAddress = async (address: string): Promise<LatLng> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=kr&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`
  )
  const data = await response.json()
  const { lat, lng } = data.results[0].geometry.location
  return {
    latitude: lat,
    longitude: lng
  }
}

export function convertCityName(CNP_CD_NM: string): string {
  switch (CNP_CD_NM) {
    case '서울특별시':
      return '서울'
    case '경기도':
      return '경기'
    case '대전광역시':
      return '대전'
    case '충청남도':
      return '충남'
    case '세종특별자치시':
      return '세종'
    case '충청북도':
      return '충북'
    case '인천광역시':
      return '인천'
    case '광주광역시':
      return '광주'
    case '전라남도':
      return '전남'
    case '전라북도':
      return '전북'
    case '부산광역시':
      return '부산'
    case '경상남도':
      return '경남'
    case '울산광역시':
      return '울산'
    case '제주특별자치도':
      return '제주'
    case '대구광역시':
      return '대구'
    case '경상북도':
      return '경북'
    default:
      return CNP_CD_NM
  }
}

export function getRatioByProvince(province: string) {
  switch (province) {
    case '서울':
      return 0.09
    case '강원':
      return 0.4
    case '대전':
      return 0.035
    case '충남':
      return 0.3
    case '세종':
      return 0.025
    case '충북':
      return 0.24
    case '경기':
      return 0.2
    case '광주':
      return 0.06
    case '전남':
      return 0.5
    case '전북':
      return 0.3
    case '부산':
      return 0.09
    case '경남':
      return 0.4
    case '울산':
      return 0.2
    case '제주':
      return 0.3
    case '대구':
      return 0.07
    case '경북':
      return 0.4
    default:
      return 1
  }
}
