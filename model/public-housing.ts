export type PublicHousingModel = (
  | {
      dsSch: {
        PAN_ED_DT: string
        PG_SZ: string
        PAN_ST_DT: string
        PAGE: string
        PAN_SS: string
      }[]
      dsList?: undefined
      resHeader?: undefined
    }
  | {
      dsList: PublicHousing[]
      resHeader: {
        RS_DTTM: string
        SS_CODE: string
      }[]
      dsSch?: undefined
    }
)[]

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

/**
 *  @field dsCtrtPlc - 접수처정보
 *  @field dsSbd - 단지정보
 *  @field dsSbdAhfl - 단지별첨부파일정보
 *  @field dsSplScdl - 공급일정
 *  @field dsSplScdl01 - 공급일정-입찰
 *  @field dsSplScdl02 - 공급일정-추첨
 *  @field dsAhflInfo - 첨부파일정보
 *  @field dsEtcInfo - 기타정보
 *
 */

/**
 *
 *  @field SPL_INF_TP_CD
 *  @description
 *  050 - 분양주택, 051 - 분양주택 - 분양전환, 060 - 공공임대, 061 - 임대주택 - 50년공공임대, 062 - 국민임대, 063 - 행복주택
 *  130 - 청년신혼부부 매입임대리츠, 131 - 청년매입임대, 132 - 신혼부부매입임대, 133 - 집주인 리모델링, 134 - 기숙사형 매입임대,
 *  135 - 다가구 매입임대, 136 - 장기미임대 매입임대 137 - 청년전세임대, 138 - 신혼부부전세임대, 140 - 다자녀전세임대
 *  1325 신혼부부매입임대수시, 143 - 전세형매입임대, 144 - 공공전세주택
 *  223 - 임대상가(입찰), 224 - 임대상가(공모심사)
 *  390 - 신혼희망타운,
 *
 */
export type PublicHousingDetailModel = (
  | {
      dsSch: {
        PAN_ID: string
        CCR_CNNT_SYS_DS_CD: string
        SPL_INF_TP_CD: string
        UPP_AIS_TP_CD: string
        AIS_TP_CD: string
      }[]
      dsSplScdl?: undefined
      dsSbdAhflNm?: undefined
      dsSbdNm?: undefined
      dsEtcInfo?: undefined
      dsAhflInfo?: undefined
      dsSbd?: undefined
      dsSbdAhfl?: undefined
      dsCtrtPlcNm?: undefined
      dsEtcInfoNm?: undefined
      dsAhflInfoNm?: undefined
      dsCtrtPlc?: undefined
      dsSplScdlNm?: undefined
      resHeader?: undefined
    }
  | {
      dsSplScdl: {
        RMK: string
        PZWR_ANC_DT: string
        CTRT_ED_DT: string
        HS_SBSC_ACP_TRG_CD_NM: string
        ACP_DTTM: string
        PZWR_PPR_SBM_ST_DT: string
        SPL_SCD_GUD_FCTS: string
        CTRT_ST_DT: string
        PZWR_PPR_SBM_ED_DT: string
      }[]
      dsSbdAhflNm: {
        BZDT_NM: string
        AHFL_URL: string
        SL_PAN_AHFL_DS_CD_NM: string
        CMN_AHFL_NM: string
      }[]
      dsSbdNm: {
        LCT_ARA_DTL_ADR: string
        BZDT_NM: string
        EDC_FCL_CTS: string
        MIN_MAX_RSDN_DDO_AR: string
        SUM_TOT_HSH_CNT: string
        TFFC_FCL_CTS: string
        LCT_ARA_ADR: string
        CVN_FCL_CTS: string
        HTN_FMLA_DS_CD_NM: string
        IDT_FCL_CTS: string
        SPL_INF_GUD_FCTS: string
        MVIN_XPC_YM: string
      }[]
      dsEtcInfo: {
        ETC_FCTS: string
        PAN_DTL_CTS: string
      }[]
      dsAhflInfo: {
        AHFL_URL: string
        SL_PAN_AHFL_DS_CD_NM: string
        CMN_AHFL_NM: string
      }[]
      dsSbd: DsSbdModel[]
      dsSbdAhfl: {
        BZDT_NM: string
        AHFL_URL: string
        SL_PAN_AHFL_DS_CD_NM: string
        CMN_AHFL_NM: string
      }[]
      dsCtrtPlcNm: {
        SIL_OFC_BCLS_DT: string
        CTRT_PLC_DTL_ADR: string
        SIL_OFC_GUD_FCTS: string
        CTRT_PLC_ADR: string
        SIL_OFC_DT: string
        TSK_SCD_CTS: string
        SIL_OFC_TLNO: string
        SIL_OFC_OPEN_DT: string
      }[]
      dsEtcInfoNm: {
        ETC_FCTS: string
        PAN_DTL_CTS: string
      }[]
      dsAhflInfoNm: {
        AHFL_URL: string
        SL_PAN_AHFL_DS_CD_NM: string
        CMN_AHFL_NM: string
      }[]
      dsCtrtPlc: {
        SIL_OFC_BCLS_DT: string
        CTRT_PLC_DTL_ADR: string
        SIL_OFC_GUD_FCTS: string
        CTRT_PLC_ADR: string
        SIL_OFC_DT: string
        TSK_SCD_CTS: string
        SIL_OFC_TLNO: string
        SIL_OFC_OPEN_DT: string
      }[]
      dsSplScdlNm: {
        RMK: string
        PZWR_ANC_DT: string
        CTRT_ED_DT: string
        HS_SBSC_ACP_TRG_CD_NM: string
        ACP_DTTM: string
        PZWR_PPR_SBM_ST_DT: string
        SPL_SCD_GUD_FCTS: string
        CTRT_ST_DT: string
        PZWR_PPR_SBM_ED_DT: string
      }[]
      resHeader: {
        RS_DTTM: string
        SS_CODE: string
      }[]
      dsSch?: undefined
    }
)[]

export type DsSbdModel = {
  LCT_ARA_DTL_ADR: string // 단지 상세 주소
  BZDT_NM: string
  EDC_FCL_CTS: string
  MIN_MAX_RSDN_DDO_AR: string
  SUM_TOT_HSH_CNT: string
  TFFC_FCL_CTS: string
  LCT_ARA_ADR: string // 단지 주소
  CVN_FCL_CTS: string
  HTN_FMLA_DS_CD_NM: string
  IDT_FCL_CTS: string
  SPL_INF_GUD_FCTS: string
  MVIN_XPC_YM: string
  LCC_NT_NM?: string // 단지 이름
  LGDN_ADR?: string
  LGDN_DTL_ADR?: string
  SBD_LGO_NM?: string
}
