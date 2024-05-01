import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TileState {
  tileName: string;
  setTileName: (tileName: string) => void;
  tileColor: string;
  setTileColor: (tileColor: string) => void;
  activeTilePath: string;
  setActiveTilePath: (activeTilePath: string) => void;
}

const useTileStore = create(
  persist<TileState>(
    (set) => ({
      tileName: 'Cadaques',
      setTileName: (tileName: string) => set({ tileName }),
      tileColor: 'Blush',
      setTileColor: (tileColor: string) => set({ tileColor }),
      activeTilePath: '',
      setActiveTilePath: (activeTilePath: string) => set({ activeTilePath }),
    }),
    {
      name: 'tile-choice',
      getStorage: () => localStorage,
    },
  ),
);

export default useTileStore;

