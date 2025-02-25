import { defineStore, acceptHMRUpdate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { ref, computed } from 'vue';
import type { WatchyItem, ID } from '@/types/watchyItem';

export const useWatchyStore = defineStore('WatchyStore', () => {
  const filterFlag = ref('');
  const editingItemFlag = ref('');
  const watchyItems = useLocalStorage<WatchyItem[]>('watchyItems', [
    {
      id: crypto.randomUUID(),
      title: '(DEMO) Dune 2',
      category: 'Movie',
      country: 'US',
      month: 'January',
      genre: 'Action',
      isUpdating: false,
      updateWeekday: 'Monday',
      isFinished: true,
      rating: 4,
    },
    {
      id: crypto.randomUUID(),
      title: '(DEMO) Emily In Paris - Seaso 4',
      category: 'Drama',
      country: 'US',
      month: 'March',
      genre: 'Romance',
      isUpdating: true,
      updateWeekday: 'Wednesday',
      isFinished: false,
      rating: 1,
    },
  ]);
  const filteredWatchyItems = computed(() => {
    if (!filterFlag.value) {
      return watchyItems.value;
    } else {
      return watchyItems.value.filter(
        (item) => item.category === filterFlag.value
      );
    }
  });

  const editingItem = computed(() => {
    return watchyItems.value.find((item) => item.id === editingItemFlag.value);
  });

  function setEditingItem(id: ID) {
    editingItemFlag.value = id;
  }

  function addWatchyItem(item: WatchyItem) {
    watchyItems.value.push(item);
  }

  function updateWatchyItem(item: WatchyItem) {
    const targetIndex = watchyItems.value.findIndex(
      (currentItem) => currentItem.id === item.id
    );
    watchyItems.value[targetIndex] = item;
  }

  function deleteWatchyItem(id: ID) {
    const targetIndex = watchyItems.value.findIndex(
      (currentItem) => currentItem.id === id
    );
    watchyItems.value.splice(targetIndex, 1);
  }

  function filterWatchyItems(flag: string) {
    filterFlag.value = flag;
  }

  function resetWatchyBoard() {
    watchyItems.value = [];
  }

  return {
    watchyItems,
    filterFlag,
    filteredWatchyItems,
    editingItem,
    setEditingItem,
    addWatchyItem,
    updateWatchyItem,
    deleteWatchyItem,
    filterWatchyItems,
    resetWatchyBoard,
  };
});

// hot module reload fo pinia***
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWatchyStore, import.meta.hot));
}
