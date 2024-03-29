import { defineStore, acceptHMRUpdate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { groupBy } from 'lodash'

export const useCartStore = defineStore('CartStore', {
  state: () => {
    return {
      items: useLocalStorage("CartStore:Items", []),
    }
  },
  getters: {
    count: (state) => state.items.length,

    isEmpty: (state) => state.count === 0,

    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name)
      const sorted = Object.keys(grouped).sort()
      let inOrder = {}
      sorted.forEach((key) => (inOrder[key] = grouped[key]))
      return inOrder
    },

    groupCount: (state) => (name) => state.grouped[name].length,

    total: (state) => state.items.reduce((acc, curr) => acc + curr.price, 0),
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count)
      for (let i = 0; i < count; i++) {
        this.items.push({ ...item })
      }
    },

    clearItem(itemName) {
      this.items = this.items.filter((item) => item.name !== itemName)
    },
    setItemCount(item, count) {
        this.clearItem(item.name)
        this.addItems(count, item)
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
