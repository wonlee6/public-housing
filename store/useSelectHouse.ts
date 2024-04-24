import { create } from 'zustand'

type State = {
  selectedHouse: string | null
}

type Action = {
  handleSelectHouse: (PAN_ID: string) => void
  handleClearHouse: () => void
}

const useSelectHouse = create<State & Action>()((set) => ({
  selectedHouse: null,
  handleSelectHouse: (PAN_ID) => set({ selectedHouse: PAN_ID }),
  handleClearHouse: () => set({ selectedHouse: null })
}))

export default useSelectHouse
