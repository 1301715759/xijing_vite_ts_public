import { defineStore } from 'pinia'

interface HoveredContextState {
  hoveredUserId: string | null
  hoveredRoomId: string | null
}

export const useHoveredContextStore = defineStore('hoveredContext', {
  state: (): HoveredContextState => ({
    hoveredUserId: null,
    hoveredRoomId: null
  }),
  
  actions: {
    setHoveredUserId(id: string | null) {
      this.hoveredUserId = id
    },
    
    setHoveredRoomId(id: string | null) {
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