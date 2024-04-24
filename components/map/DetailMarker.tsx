import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import { Marker } from 'react-native-maps'

import { DsSbdModel, PublicHousing } from '@/model/public-housing'
import useLHPublicHousingDetail from '@/hooks/useLHPublicHousingDetail'
import useSelectHouse from '@/store/useSelectHouse'
import useCoordinateByAddress from '@/hooks/useCoordinateByAddress'
import { isHouseType } from '@/lib/utils'

type DetailMarker = {
  publicHousingData: PublicHousing[]
}

export default function DetailMarker({ publicHousingData }: DetailMarker) {
  return (
    <>
      {publicHousingData.map((item) => (
        <MarkerContainer key={item.PAN_ID} {...item} />
      ))}
    </>
  )
}

const MarkerContainer = React.memo((props: PublicHousing) => {
  const { data, error } = useLHPublicHousingDetail(props)

  const houseType = props.SPL_INF_TP_CD
  const isInvalidType = isHouseType(houseType)

  const filteredHouseData = useMemo(() => {
    if (data && data[1] && data[1].dsSbd) {
      return {
        ...props,
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

const titleColor = {
  행복주택: '#7828C8',
  공공임대: '#2A7E3B',
  영구임대: '#CC4E00',
  분양주택: '#D13415',
  국민임대: '#0D74CE'
} as const

type Color = keyof typeof titleColor

const MarkerComponent = React.memo(
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

    const color = titleColor[houseTypeName as Color]

    return (
      <Marker
        coordinate={{
          latitude: data.latitude + Number(`0.00${index}`),
          longitude: data.longitude + Number(`0.00${index}`)
        }}
        onPress={() => handleSelectHouse(pan_id)}
      >
        <View className='max-w-[100] rounded-md shadow-md'>
          <View className={`w-full flex-col rounded-md bg-[${color}]`}>
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
