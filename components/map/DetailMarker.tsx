import React, { useId, useMemo } from 'react'
import { Text, View } from 'react-native'
import { Marker } from 'react-native-maps'

import { DsSbdModel, PublicHousing } from '@/model/public-housing'
import useLHPublicHousingDetail from '@/hooks/useLHPublicHousingDetail'
import useSelectHouse from '@/store/useSelectHouse'
import useCoordinateByAddress from '@/hooks/useCoordinateByAddress'
import { isHouseType } from '@/lib/utils'
import useRegion from '@/store/useRegion'

type DetailMarker = {
  publicHousingData: PublicHousing[]
  isRatio: boolean
}

export default function DetailMarker({ publicHousingData, isRatio }: DetailMarker) {
  const id = useId()
  return (
    <>
      {publicHousingData.map((item) => (
        <MarkerContainer key={id + item.PAN_ID} {...item} isRatio={isRatio} />
      ))}
    </>
  )
}

const MarkerContainer = React.memo((props: PublicHousing & { isRatio: boolean }) => {
  const { isRatio, ...rest } = props
  const { data, error } = useLHPublicHousingDetail(rest)

  const id = useId()

  const houseType = rest.SPL_INF_TP_CD
  const isInvalidType = isHouseType(houseType)

  const filteredHouseData = useMemo(() => {
    if (data && data[1] && data[1].dsSbd) {
      return {
        ...rest,
        dsSbd: data[1].dsSbd
      }
    }
    return undefined
  }, [data])

  if (error || !isInvalidType) {
    return null
  }

  return (
    <>
      {filteredHouseData?.dsSbd?.map((item, index) => (
        <MarkerComponent
          key={`${id}-${index}`}
          {...item}
          index={index}
          pan_id={props.PAN_ID}
          houseType={houseType}
          houseTypeName={props.AIS_TP_CD_NM}
          isRatio={isRatio}
        />
      ))}
    </>
  )
})

const titleColor = {
  행복주택: '#7828C8',
  공공임대: '#2A7E3B',
  영구임대: '#CC4E00',
  분양주택: '#CA244D',
  국민임대: '#0D74CE',
  매입임대: '#585958'
} as const

type Color = keyof typeof titleColor

const MarkerComponent = React.memo(
  (
    props: DsSbdModel & {
      pan_id: string
      houseType: string
      houseTypeName: string
      isRatio: boolean
      index: number
    }
  ) => {
    const { pan_id, houseType, index, houseTypeName, isRatio, ...rest } = props

    const handleSelectHouse = useSelectHouse((state) => state.handleSelectHouse)
    const handleSelectMarker = useRegion((state) => state.handleSelectMarker)
    const id = useId()

    // case '131': // 청년매입임대
    // case '132': // 신혼부부매입임대
    // case '133': // 집주인리모델링
    // case '135': // 다가구매입임대
    // case '136': // 장기미임대
    // case '390': // 신혼희망타운
    // case '1315': // 청년매입임대수시
    // case '1325': // 신혼부부매입임대수시
    const filteredAddress = useMemo(() => {
      let address = ''
      if (
        houseType === '051' ||
        houseType === '061' ||
        houseType === '062' ||
        houseType === '063'
      ) {
        address = rest.LGDN_ADR! + rest.LGDN_DTL_ADR
      } else if (houseType === '050' || houseType === '390' || houseType === '060') {
        address = rest.LCT_ARA_ADR + rest.LCT_ARA_DTL_ADR
      }
      return address
    }, [rest, houseType])

    const { data, error, isLoading } = useCoordinateByAddress(filteredAddress, id)

    if (error || isLoading || !data) {
      return null
    }

    const color = titleColor[houseTypeName as Color]

    const lat = data.latitude + Number(`0.000${index + randomNum()}`)
    const lng = data.longitude + Number(`0.000${index + randomNum()}`)

    return (
      <>
        {isRatio ? (
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lng
            }}
            onPress={() => {
              handleSelectHouse(pan_id)
              handleSelectMarker({ latitude: lat, longitude: lng })
            }}
          >
            <View className='max-w-[100] rounded-md'>
              <View
                className='w-full flex-col rounded-md'
                style={{ backgroundColor: color }}
              >
                <View className='flex-row items-center justify-center'>
                  <View className='rounded-full bg-neutral-100 px-1'>
                    <Text className='text-xs font-bold text-cyan-500'>LH</Text>
                  </View>
                  <Text className='p-1 text-center text-yellow-50'>
                    {houseTypeName ?? ''}
                  </Text>
                </View>
                <Text className='text-ellipsis bg-white p-1 text-center text-slate-600'>
                  {rest?.LCC_NT_NM ?? rest?.BZDT_NM ?? ''}
                </Text>
              </View>
            </View>
          </Marker>
        ) : null}
      </>
    )
  }
)

function randomNum(): number {
  return Math.floor(Math.random() * 10)
}
