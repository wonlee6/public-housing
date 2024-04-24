import React, { useCallback, useMemo } from 'react'
import { Text, View } from 'react-native'
import { Marker } from 'react-native-maps'

import { DsSbdModel, PublicHousing } from '@/model/public-housing'
import useLHPublicHousingDetail from '@/hooks/useLHPublicHousingDetail'
import useSelectHouse from '@/store/useSelectHouse'
import useCoordinateByAddress from '@/hooks/useCoordinateByAddress'

type DetailMarker = {
  publicHousingData: PublicHousing[]
}

export default function DetailM({ publicHousingData }: DetailMarker) {
  return (
    <>
      {publicHousingData.map((item) => (
        <Child key={item.PAN_ID} {...item} />
      ))}
    </>
  )
}

const Child = React.memo((props: PublicHousing) => {
  const { data, error } = useLHPublicHousingDetail(props)

  const houseType = props.SPL_INF_TP_CD
  const isInvalidType = invalidType(houseType)

  const filteredHouseData = useMemo(() => {
    if (data && data[1] && data[1].dsSbd) {
      return {
        ...props,
        dsSbd: data[1].dsSbd
      }
    }
    return undefined
  }, [data])

  if (error || isInvalidType) {
    return null
  }

  return (
    <>
      {filteredHouseData?.dsSbd?.map((item, index) => (
        <MarkerChild
          key={index}
          {...item}
          pan_id={props.PAN_ID}
          houseType={houseType}
          index={index}
          houseTypeName={props.AIS_TP_CD_NM}
        />
      ))}
    </>
  )
})

const MarkerChild = React.memo(
  (
    props: DsSbdModel & {
      pan_id: string
      houseType: string
      houseTypeName: string
      index: number
    }
  ) => {
    const { pan_id, houseType, houseTypeName, index, ...rest } = props

    const handleSelectHouse = useSelectHouse((state) => state.handleSelectHouse)

    const filteredAddress = useMemo(() => {
      let address = ''
      if (
        houseType === '051' ||
        houseType === '061' ||
        houseType === '062' ||
        houseType === '063'
      ) {
        address = rest.LGDN_ADR! + rest.LGDN_DTL_ADR
      } else if (houseType === '050' || houseType === '390') {
        address = rest.LCT_ARA_ADR + rest.LCT_ARA_DTL_ADR
      }
      return address
    }, [rest])

    const { data, error, isLoading } = useCoordinateByAddress(filteredAddress, index)

    if (error || isLoading || !data) {
      return null
    }

    return (
      <Marker
        coordinate={{
          latitude: data.latitude + Number(`0.00${index}`),
          longitude: data.longitude + Number(`0.00${index}`)
        }}
        onPress={() => handleSelectHouse(pan_id)}
      >
        <View className='max-w-[100] rounded-md shadow-md'>
          <View className='w-full flex-col rounded-md bg-[#7828C8]'>
            <View className='flex-row items-center justify-center'>
              <View className='rounded-full bg-neutral-100 px-1'>
                <Text className='text-xs font-bold text-cyan-500'>LH</Text>
              </View>
              <Text className='p-1 text-center text-yellow-50'>
                {houseTypeName ?? ''}
              </Text>
            </View>
            <Text className='text-ellipsis bg-white p-1 text-center text-slate-600'>
              {rest?.LCC_NT_NM ?? ''}
            </Text>
          </View>
        </View>
      </Marker>
    )
  }
)

function invalidType(SPL_INF_TP_CD: string) {
  switch (SPL_INF_TP_CD) {
    case '050': // 분양주택
    case '051': // 분양주택-전환
    case '060': // 공공임대
    case '061': // 임대주택
    case '062': // 영구임대
    case '063': // 행복주택
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

// function convertName(SPL_INF_TP_CD: string) {
//   switch (SPL_INF_TP_CD) {
//     case '050':
//       return '분양주택'
//     case '051':
//       return '분양주택(전환)'
//     case '060':
//       return '공공임대'
//     case '061':
//       return '임대주택'
//     case '131':
//       return '청년매입임대'
//     case '132':
//       return '신혼부부매입임대'
//     case '135':
//       return '다가구매입임대'
//     case '136':
//       return '장기미임대'
//     case '1315':
//       return '청년매입임대수시'
//     case '1325':
//       return '신혼부부매입임대수시'
//     case '390':
//       return '신혼희망타운'
//     default:
//       return SPL_INF_TP_CD
//   }
// }
