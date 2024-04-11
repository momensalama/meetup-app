import type { Ref } from 'vue'
import { useEventListener } from './useEventListener'

export function useOnClickOutside(rootEl: Ref<HTMLElement | null>, callback: () => any) {
  useEventListener(window, 'mouseup', (e: Event) => {
    const clickedEl = e.target as HTMLElement

    // skip if the root element contains the clicked element
    if (rootEl.value?.contains(clickedEl)) {
      return
    }

    // otherwise execute the action
    callback()
  })
}
