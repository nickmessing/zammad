import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'

import { useDragReorder } from '../useDragReorder'

describe('useDragReorder', () => {
  it('works with non-scrolled element', () => {
    const scrollElement = document.createElement('div')
    const isDragging = ref(true)

    const documentAddEventListenerSpy = vi.spyOn(document, 'addEventListener')
    const documentRemoveEventListenerSpy = vi.spyOn(document, 'removeEventListener')

    const onReorderCallback = vi.fn()

    const { onReorder, startDragging, targetSpaceIndex, currentMouseCoordinates } = useDragReorder(() => ({
      isDragging: isDragging.value,
      scrollElement,
    }))
    onReorder(onReorderCallback)

    expect(targetSpaceIndex.value).toEqual(undefined)
    expect(currentMouseCoordinates.value).toEqual(undefined)
    expect(documentAddEventListenerSpy).not.toHaveBeenCalled()
    expect(documentRemoveEventListenerSpy).not.toHaveBeenCalled()
    expect(onReorderCallback).not.toHaveBeenCalled()

    const initialEvent = new MouseEvent('mousedown', {
      clientX: 100,
      clientY: 150,
    })
    startDragging(initialEvent)

    expect(targetSpaceIndex.value).toEqual(0)
    expect(currentMouseCoordinates.value).toEqual({
      x: 100,
      y: 150,
    })
    expect(documentAddEventListenerSpy).toBeCalledTimes(2)
    expect(documentAddEventListenerSpy).toBeCalledWith('mousemove', expect.any(Function))
    expect(documentAddEventListenerSpy).toBeCalledWith('mouseup', expect.any(Function))
    expect(documentRemoveEventListenerSpy).not.toHaveBeenCalled()
    expect(onReorderCallback).not.toHaveBeenCalled()

    documentAddEventListenerSpy.mockClear()

    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 700,
      clientY: 250,
    })
    document.dispatchEvent(mouseMoveEvent)

    expect(targetSpaceIndex.value).toEqual(2)
    expect(currentMouseCoordinates.value).toEqual({
      x: 700,
      y: 250,
    })
    expect(documentAddEventListenerSpy).not.toHaveBeenCalled()
    expect(documentRemoveEventListenerSpy).not.toHaveBeenCalled()
    expect(onReorderCallback).not.toHaveBeenCalled()

    const mouseUpEvent = new MouseEvent('mouseup')
    document.dispatchEvent(mouseUpEvent)
    expect(targetSpaceIndex.value).toEqual(2)
    expect(currentMouseCoordinates.value).toEqual({
      x: 700,
      y: 250,
    })
    expect(documentAddEventListenerSpy).not.toHaveBeenCalled()
    expect(documentRemoveEventListenerSpy).toHaveBeenCalledTimes(2)
    expect(documentRemoveEventListenerSpy).toBeCalledWith('mousemove', expect.any(Function))
    expect(documentRemoveEventListenerSpy).toBeCalledWith('mouseup', expect.any(Function))
    expect(onReorderCallback).toHaveBeenCalledTimes(1)
    expect(onReorderCallback).toBeCalledWith({
      targetIndex: 2,
    })
  })
  it('works with scrolled element', () => {
    const scrollElement = document.createElement('div')
    scrollElement.scrollLeft = 600
    const isDragging = ref(true)

    const onReorderCallback = vi.fn()

    const { onReorder, startDragging, targetSpaceIndex } = useDragReorder(() => ({
      isDragging: isDragging.value,
      scrollElement,
    }))
    onReorder(onReorderCallback)

    expect(targetSpaceIndex.value).toEqual(undefined)

    const initialEvent = new MouseEvent('mousedown', {
      clientX: 100,
      clientY: 150,
    })
    startDragging(initialEvent)

    expect(targetSpaceIndex.value).toEqual(2)

    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 700,
      clientY: 250,
    })
    document.dispatchEvent(mouseMoveEvent)

    expect(targetSpaceIndex.value).toEqual(3)

    const mouseUpEvent = new MouseEvent('mouseup')
    document.dispatchEvent(mouseUpEvent)
    expect(targetSpaceIndex.value).toEqual(3)
  })
})
