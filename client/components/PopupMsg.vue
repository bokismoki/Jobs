<template>
  <div class="popup_msg fixed z-10 flex">
    <div class="m-auto p-5">
      <div
        class="text-white font-semibold text-sm p-5 rounded text-center max-w-sm border-2 border-white"
        :class="{'bg-red-700': !popupMsg.success, 'bg-vgreen': popupMsg.success}"
      >{{popupMsg.msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupMsg',
  props: ['popupMsg']
}
</script>

<style scoped>
.popup_msg {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>