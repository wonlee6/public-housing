import { initRegionLocation } from '@/data/inital-region'
import { PublicHousing } from '@/model/public-housing'
import { create } from 'zustand'

export type NoticeListModel = {
    name: string
    city: string
    count: number
    children?: PublicHousing[]
  }

type State = {
  publicHouse: NoticeListModel[]
}

type Action = {
  getPublicHouse: (publicHouse: PublicHousing[]) => void
}

type Test = {
    city: string
    count: number
    children: PublicHousing[]
}

const useLHPublicHouse = create<State & Action>()((set) => ({
  publicHouse: [],
  getPublicHouse: (publicHouse) => set(() => {
    const filteredData = publicHouse.reduce((acc: Test[], cur) => {
        const findItem = acc.find((v) => v.city === cur.CNP_CD_NM)
        if (findItem) {
          return acc.map((i) =>
            i.city === cur.CNP_CD_NM ? { ...i, count: i.count + 1, children: [...i.children, cur] } : i
          )
        } else {
          return [...acc, { city: cur.CNP_CD_NM, count: 1, children: [cur] }]
        }
    }, [])

    const regionData = initRegionLocation.map((item) => {
      const findItem = filteredData.find((i) => i.city === item.city)
      if (findItem) {
        return {
          ...item,
          ...findItem,
          count: findItem.count
        }
      }
      return {
        ...item,
        count: 0
      }
    })

    return {
        publicHouse: regionData
    }
  }),
}))

export default useLHPublicHouse
