import React, { useCallback, useMemo } from 'react'
import { Text, View } from 'react-native'
import { Marker } from 'react-native-maps'
import { PublicHousingDetailModel, PublicHousingModel } from '@/model/public-housing'
import useCoordinateByAddress from '@/hooks/useCoordinateByAddress'
import usePublicHousingNotiDetail from '@/hooks/usePublicHousingNotiDetail'
import useSelectHouse from '@/store/useSelectHouse'

type DetailMarker = {
  publicHousingData: PublicHousingModel | undefined
}
export default function DetailMarker({ publicHousingData }: DetailMarker) {
  const { houseDetailData, pending } = usePublicHousingNotiDetail(
    publicHousingData ? publicHousingData[1].dsList : undefined
  )

  const filteredMarkerData = useMemo(() => {
    if (!houseDetailData) return []
    return houseDetailData.filter((i) => typeof i !== 'undefined')
  }, [houseDetailData])

  if (pending) {
    return null
  }

  return (
    <>
      {/* {(filteredMarkerData as PublicHousingDetailModel[]).map((item, index) => (
        <MarkerConfig key={index} {...item} index={index} />
      ))} */}
    </>
  )
}

const MarkerConfig = React.memo(
  (props: PublicHousingDetailModel & { index?: number }) => {
    const handleSelectHouse = useSelectHouse((state) => state.handleSelectHouse)

    const houseType = (props as any)[0].dsSch[0].SPL_INF_TP_CD
    // console.log(houseType)
    const isInvalidType = invalidType(houseType)

    const 단지정보 = useMemo(() => {
      return props[1]?.dsSbd
    }, [props])

    const handleSelectMarker = useCallback(() => {
      handleSelectHouse(props)
    }, [단지정보])

    if (isInvalidType) {
      return null
    }

    if (!단지정보) {
      return null
    }

    return (
      <>
        {단지정보.map((item, index) => (
          <MarkerComponent
            key={index}
            {...item}
            houseType={houseType}
            onSelectMarker={handleSelectMarker}
          />
        ))}
      </>
    )
  }
)

type DetailHouse = {
  onSelectMarker: () => void
  houseType: string
  LCT_ARA_DTL_ADR: string // 단지 상세 주소
  BZDT_NM?: string
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
  LCC_NT_NM?: string
  LGDN_ADR?: string
  LGDN_DTL_ADR?: string
}

const MarkerComponent = React.memo((props: DetailHouse) => {
  let address = ''
  if (props.houseType === '061' || props.houseType === '051') {
    if (props.LGDN_ADR && props.LGDN_DTL_ADR) {
      address = props.LGDN_ADR + props.LGDN_DTL_ADR
    }
  } else if (props.houseType === '050' || props.houseType === '390') {
    if (props.LCT_ARA_ADR && props.LCT_ARA_DTL_ADR) {
      address = props.LCT_ARA_ADR + props.LCT_ARA_DTL_ADR.split('(')[0].trim()
    }
  }
  const { data, error, isLoading } = useCoordinateByAddress(address)

  if (error || isLoading || !data) {
    return null
  }

  const 단지이름 = props.BZDT_NM ? props.BZDT_NM : props.LCC_NT_NM
  const name = convertName(props.houseType)

  // if (단지이름 === '파주운정3(07,택1) A23') {
  //   data.latitude = 37.7136754
  //   data.longitude = 126.754735
  // }

  return (
    <Marker coordinate={data} onPress={() => props.onSelectMarker()}>
      <View className='max-w-[100] shadow-md rounded-md'>
        <View className='bg-[#7828C8] w-full flex-col rounded-md'>
          <View className='flex-row items-center justify-center'>
            <View className='bg-neutral-100 rounded-full px-1'>
              <Text className='text-cyan-500 font-bold text-xs'>LH</Text>
            </View>
            <Text className='text-yellow-50 text-center p-1'>{name}</Text>
          </View>
          <Text className='p-1 text-center text-ellipsis bg-white text-slate-600'>
            {단지이름}
          </Text>
        </View>
      </View>
    </Marker>
  )
})

function invalidType(SPL_INF_TP_CD: string) {
  switch (SPL_INF_TP_CD) {
    case '050': // 분양주택
    case '051': // 분양주택-전환
    case '060': // 공공임대
    case '061': // 임대주택
    case '131': // 청년매입임대
    case '132': // 신혼부부매입임대
    case '133': // 집주인리모델링
    case '135': // 다가구매입임대
    case '136': // 장기미임대
    case '390': // 신혼희망타운
    case '1315': // 청년매입임대수시
    case '1325': // 신혼부부매입임대수시
      return false
    default:
      return true
  }
}

function convertName(SPL_INF_TP_CD: string) {
  switch (SPL_INF_TP_CD) {
    case '050':
      return '분양주택'
    case '051':
      return '분양주택(전환)'
    case '060':
      return '공공임대'
    case '061':
      return '임대주택'
    case '131':
      return '청년매입임대'
    case '132':
      return '신혼부부매입임대'
    case '135':
      return '다가구매입임대'
    case '136':
      return '장기미임대'
    case '1315':
      return '청년매입임대수시'
    case '1325':
      return '신혼부부매입임대수시'
    case '390':
      return '신혼희망타운'
    default:
      return SPL_INF_TP_CD
  }
}
