import { PublicHousingDetailModel } from '@/model/public-housing'
import { create } from 'zustand'

type State = {
  selectedHouse: PublicHousingDetailModel | null
}

type Action = {
  handleSelectHouse: (house: PublicHousingDetailModel) => void
}

const useSelectHouse = create<State & Action>()((set) => ({
  selectedHouse: null,
  handleSelectHouse: (house) => set({ selectedHouse: house })
}))

export default useSelectHouse
