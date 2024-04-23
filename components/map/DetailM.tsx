import React, { useCallback, useMemo } from 'react'
import { Text, View } from 'react-native'
import { Marker } from 'react-native-maps'

import { PublicHousing } from '@/model/public-housing'
import useLHPublicHousingDetail from '@/hooks/useLHPublicHousingDetail'
import useSelectHouse from '@/store/useSelectHouse'
import useCoordinateByAddress from '@/hooks/useCoordinateByAddress'

type DetailMarker = {
  publicHousingData: PublicHousing[]
}

export default function DetailM({ publicHousingData }: DetailMarker) {
  const handleSelectHouse = useSelectHouse((state) => state.handleSelectHouse)

  const handleSelectMarker = useCallback((house: PublicHousing) => {
    if (publicHousingData) {
      const findItem = publicHousingData.find((i) => i.PAN_ID === house.PAN_ID)
      handleSelectHouse(findItem ? findItem : null)
    }
  }, [])

  return (
    <>
      {publicHousingData.map((item, index: number) => (
        <Child
          key={item.PAN_ID}
          {...item}
          onSelectMarker={handleSelectMarker}
          index={index}
        />
      ))}
    </>
  )
}

const Child = React.memo(
  (
    props: PublicHousing & {
      onSelectMarker: (house: PublicHousing) => void
      index: number
    }
  ) => {
    const { onSelectMarker, index, ...rest } = props
    const { data, error } = useLHPublicHousingDetail(rest)
    if (data) {
      console.log(data[1], rest.SPL_INF_TP_CD)
    }
    const houseType = rest.SPL_INF_TP_CD
    const isInvalidType = invalidType(houseType)

    const filteredAddress = useMemo(() => {
      let address = ''
      const dsSbd = data ? data[1].dsSbd?.[0] : null
      if (dsSbd) {
        if (
          houseType === '051' ||
          houseType === '061' ||
          houseType === '062' ||
          houseType === '063'
        ) {
          address = dsSbd.LGDN_ADR! + dsSbd.LGDN_DTL_ADR
        } else if (houseType === '050' || houseType === '390') {
          address = dsSbd.LCT_ARA_ADR + dsSbd.LCT_ARA_DTL_ADR
        }
      }
      return address
    }, [data])

    const getCoordinate = useCoordinateByAddress(filteredAddress, rest.PAN_ID)

    const filteredHouseData = useMemo(() => {
      if (data) {
        return {
          ...rest,
          dsSbd: data[1].dsSbd?.[0]
        }
      }
      return undefined
    }, [data])

    if (error || isInvalidType || getCoordinate.error || !getCoordinate.data) {
      return null
    }

    return (
      <Marker
        coordinate={{
          latitude: getCoordinate.data?.latitude + Number(`0.00${index}`),
          longitude: getCoordinate.data?.longitude + Number(`0.00${index}`)
        }}
        onPress={() => props.onSelectMarker(props)}
      >
        <View className='max-w-[100] shadow-md rounded-md'>
          <View className='bg-[#7828C8] w-full flex-col rounded-md'>
            <View className='flex-row items-center justify-center'>
              <View className='bg-neutral-100 rounded-full px-1'>
                <Text className='text-cyan-500 font-bold text-xs'>LH</Text>
              </View>
              <Text className='text-yellow-50 text-center p-1'>
                {filteredHouseData?.AIS_TP_CD_NM ?? ''}
              </Text>
            </View>
            <Text className='p-1 text-center text-ellipsis bg-white text-slate-600'>
              {filteredHouseData?.dsSbd?.LCC_NT_NM ?? ''}
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
