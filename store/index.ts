import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EditedTile {
  tileIndex: string;
  rotationDegree: number;
}

export interface TileState {
  tileName: string;
  setTileName: (tileName: string) => void;
  tileColor: string;
  setTileColor: (tileColor: string) => void;
  activeTilePath: string;
  setActiveTilePath: (activeTilePath: string) => void;
  editedTiles: EditedTile[];
  setEditedTiles: (editedTiles: EditedTile[]) => void;
  activeRotationDegree: number;
  setActiveRotationDegree: (activeRotationDegree: number) => void;
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
      editedTiles: [],
      setEditedTiles: (editedTiles: EditedTile[]) => set({ editedTiles }),
      activeRotationDegree: 0,
      setActiveRotationDegree: (activeRotationDegree: number) =>
        set({ activeRotationDegree }),
    }),
    {
      name: 'tile-choice',
      getStorage: () => localStorage,
    },
  ),
);

export default useTileStore;

