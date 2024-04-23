import { PublicHousing } from '@/model/public-housing'
import { create } from 'zustand'

type State = {
  selectedHouse: PublicHousing | null
}

type Action = {
  handleSelectHouse: (house: PublicHousing | null) => void
  handleClearHouse: () => void
}

const useSelectHouse = create<State & Action>()((set) => ({
  selectedHouse: null,
  handleSelectHouse: (house) => set({ selectedHouse: house }),
  handleClearHouse: () => set({selectedHouse: null})
}))

export default useSelectHouse
