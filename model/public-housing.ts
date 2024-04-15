export type PublicHousingModel = {
  dsList: PublicHousing[]
  resHeader: any[]
  dsSch?: undefined
}[]

export type PublicHousing = {
  AIS_TP_CD: string // 매물유형코드
  AIS_TP_CD_NM: string // 공고세부유형명
  ALL_CNT: string // 전체조회건수
  CCR_CNNT_SYS_DS_CD: string // 고객센터연계시스템구분코드
  CLSG_DT: string // 공고마감일
  CNP_CD_NM: string // 지역명
  DTL_URL: string // 공고상세URL
  DTL_URL_MOB: string // 공고상세URL 같음 ???
  PAN_DT: string // 모집공고일
  PAN_ID: string // 공고아이디
  PAN_NM: string // 공고명
  PAN_NT_ST_DT: string // 공고게시일
  PAN_SS: string // 공고상태
  RNUM: string // 순번
  SPL_INF_TP_CD: string // 공급정보구분코드
  UPP_AIS_TP_CD: string // 상위매물유형코드
  UPP_AIS_TP_NM: string // 공고유형명
}
