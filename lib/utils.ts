import { LatLng } from 'react-native-maps'

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

export function getMapInfoByProvince(province: string): LatLng & { ratio: number } {
  switch (province) {
    case '서울':
      return {
        latitude: 37.5642135,
        longitude: 127.0016985,
        ratio: 0.35
      }
    case '인천':
      return {
        latitude: 37.45639,
        longitude: 126.70528,
        ratio: 0.2
      }
    case '강원':
      return {
        latitude: 37.5642135,
        longitude: 128.2716985,
        ratio: 1.3
      }
    case '대전':
      return {
        latitude: 36.34174114321101,
        longitude: 127.40736600783121,
        ratio: 0.27
      }
    case '충남':
      return {
        latitude: 36.667882031144636,
        longitude: 126.6538360304482,
        ratio: 1
      }
    case '세종':
      return {
        latitude: 36.4875,
        longitude: 127.28167,
        ratio: 0.2
      }
    case '충북':
      return {
        latitude: 36.867923322966554,
        longitude: 127.8666107930661,
        ratio: 0.8
      }
    case '경기':
      return {
        latitude: 37.5642135,
        longitude: 127.0016985,
        ratio: 0.5
      }
    case '전남':
      return {
        latitude: 34.87472824025082,
        longitude: 126.89897919603526,
        ratio: 1.4
      }
    case '전북':
      return {
        latitude: 35.829042037259754,
        longitude: 127.12378141310465,
        ratio: 1
      }
    case '부산':
      return {
        latitude: 35.17944,
        longitude: 129.07556,
        ratio: 0.4
      }
    case '경남':
      return {
        latitude: 35.29221113278547,
        longitude: 128.30333757310564,
        ratio: 1.5
      }
    case '울산':
      return {
        latitude: 35.53889,
        longitude: 129.31667,
        ratio: 0.4
      }
    case '제주도':
      return {
        latitude: 33.39067201222793,
        longitude: 126.55830400820281,
        ratio: 0.7
      }
    case '대구':
      return {
        latitude: 35.87222,
        longitude: 128.6025,
        ratio: 0.4
      }
    case '대전':
      return {
        latitude: 36.35111,
        longitude: 127.385,
        ratio: 0.4
      }
    case '경북':
      return {
        latitude: 36.116736544822416,
        longitude: 128.90167264519448,
        ratio: 1.4
      }
    case '광주':
      return {
        latitude: 35.154469239959916,
        longitude: 126.84363683896488,
        ratio: 0.3
      }
    default:
      return {
        latitude: 37.5642135,
        longitude: 127.0016985,
        ratio: 0.4
      }
  }
}
