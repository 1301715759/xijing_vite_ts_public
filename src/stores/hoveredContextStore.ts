import { defineStore } from 'pinia'

interface HoveredContextState {
  hoveredUserId: number | null
  hoveredRoomId: number | null
}

export const useHoveredContextStore = defineStore('hoveredContext', {
  state: (): HoveredContextState => ({
    hoveredUserId: null,
    hoveredRoomId: null
  }),
  
  actions: {
    setHoveredUserId(id: number | null) {
      this.hoveredUserId = id
    },
    
    setHoveredRoomId(id: number | null) {
      this.hoveredRoomId = id
    },
    
 
    clearAllHoveredContexts() {
      this.hoveredUserId = null
      this.hoveredRoomId = null

    },
    
    clearHoveredUser() {
      this.hoveredUserId = null
    },
    
    clearHoveredRoom() {
      this.hoveredRoomId = null
    },
    
  },
  
  getters: {
    hasHoveredUser: (state) => !!state.hoveredUserId,
    hasHoveredRoom: (state) => !!state.hoveredRoomId,
  }
})