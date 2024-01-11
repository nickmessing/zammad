import { useScroll } from '@vueuse/core'
import { computedEager, createEventHook } from '@vueuse/shared'
import { ref, type MaybeRefOrGetter, toRef } from 'vue'

import type { Coordinates } from '@/types/common'

// Would be better to get these values from the CSS, or sync somehow, but I'm too lazy to do that today.
const COLUMN_WIDTH = 384
const COLUMN_GAP = 32
const LATERAL_SPACING = 32

export type UseDragReorderOptions = {
  isDragging: boolean
  scrollElement?: HTMLElement
}

export type ReorderEvent = {
  targetIndex: number
}

export function useDragReorder(options: MaybeRefOrGetter<UseDragReorderOptions>) {
  const optionsReference = toRef(options)

  const { x } = useScroll(() => optionsReference.value.scrollElement)
  const currentMouseCoordinates = ref<Coordinates>()

  const reorder = createEventHook<ReorderEvent>()

  // "Space" is the space between two columns.
  const targetSpaceIndex = computedEager(() => {
    if (!optionsReference.value.isDragging || currentMouseCoordinates.value == undefined) {
      return
    }

    const totalLeft = x.value - LATERAL_SPACING + currentMouseCoordinates.value.x

    return Math.floor((totalLeft + COLUMN_WIDTH / 2) / (COLUMN_WIDTH + COLUMN_GAP))
  })

  function handleDragDocumentMouseMove(event: MouseEvent) {
    if (!optionsReference.value.isDragging) {
      return
    }

    currentMouseCoordinates.value = { x: event.clientX, y: event.clientY }
  }
  function handleDragDocumentMouseUp() {
    if (targetSpaceIndex.value != undefined) {
      void reorder.trigger({
        targetIndex: targetSpaceIndex.value,
      })
    }

    document.removeEventListener('mousemove', handleDragDocumentMouseMove)
    document.removeEventListener('mouseup', handleDragDocumentMouseUp)
  }

  function startDragging(event: MouseEvent) {
    currentMouseCoordinates.value = { x: event.clientX, y: event.clientY }

    document.addEventListener('mousemove', handleDragDocumentMouseMove)
    document.addEventListener('mouseup', handleDragDocumentMouseUp)
  }

  return {
    onReorder: reorder.on,
    startDragging,
    targetSpaceIndex,
    currentMouseCoordinates,
  }
}
