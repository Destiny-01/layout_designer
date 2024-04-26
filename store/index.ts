import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TileState {
  tileName: string;
  setTileName: (tileName: string) => void;
}

const useTileStore = create(
  persist<TileState>(
    (set) => ({
      tileName: '',
      setTileName: (tile: string) => set({ tileName: tile }),
    }),
    {
      name: 'tile-choice',
      getStorage: () => localStorage,
    },
  ),
);

export default useTileStore;

