<template>
    <div class="mini-room-view">
        {{ roomId }}
        <div class="seats-view" :class="{'hudong':roomMode === 0||roomMode === 18, 'piaxi':roomMode == 3||roomMode == 16, 'diantai':roomMode == 2, 'shetuan':roomMode == 13}">
            <template v-for="idx in getLayout(props.roomMode)">
                <div class="seat-item">
                    <div class="seat">
                        <template v-for="seat in roomSeatsList">
                            <div v-if="seat.idx === idx - 1" >
                                <PopoverCard
                                    :id="seat.user?.id || 0"
                                    :img="seat.user?.avatar || ''"
                                    :gender="seat.user?.gender || 0"
                                    card-type="user"
                                    size="medium"
                                    placeholder="miniroom"
                                />
                                <p class="nickname" :class="{'female':seat.user?.gender === 2, 'male':seat.user?.gender !== 2}">{{ seat.user?.nickname }}</p>
                            </div>
                            
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { useRoomSeats } from '@/hooks/useRoomDetail'
import PopoverCard from '@/components/PopoverCard.vue'
const props = defineProps({
  roomId: {
    type: Number,
    default: 0
  },
  roomMode: {
    type: Number,
    default: 3
  }
})
const getLayout = (roomMode: number) => {
  switch (roomMode) {
    case 0:
      return 9;
    case 3:
      return 8;
    case 2:
      return 4;
    case 13:
      return 12;
    case 18:
      return 12;
    default:
      return 8;
  }
}
const { dataList: roomSeatsList, loadRoomSeats } = useRoomSeats(props.roomId.toString());
loadRoomSeats();
console.log('props.roomId', props.roomId, "roomMode", props.roomMode);
console.log('roomSeatsList', roomSeatsList.value);
</script>

<style scoped lang="scss">
.mini-room-view {
    position: absolute;
    width: calc(100% - 65px);
    height: 300px;
    top: 65px;
    left: 12.5px;
    padding: 0 20px 0 20px;
    background-color: #ffffff0f;
    border-bottom-left-radius: 10px;
    backdrop-filter: blur(6px)
}
.seats-view {
    justify-content: center;
    
    display: grid;
    padding-top: 20px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    &.hudong, &.shetuan{
        height: 240px;
        grid-template-rows: 80px 80px 80px;
    }
    &.hudong :first-child 
    {
        grid-column: span 4 / span 4;
    }
    
    &.piaxi, &.diantai{
        height: 160px;
        padding-top: 40px;
    }
    .seat-item {
        // background-color: #414141;
        // border:1px solid #fff;
        display: flex;
        justify-content: center;
        .seat {
            position: relative;
            width: 60px;
            height: 60px;
            border-radius: 100%;
            background-color: #666666;
        }
        .seat>div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .nickname {
            position: absolute;
            bottom: -36px;
            font-size: 15px;
            color: #fff;
            white-space: nowrap;
            &.female {
                color: #E87BBD;
            }
            &.male {
                color: #5BC2D9;
            }
        }
    }
    
}

</style>
