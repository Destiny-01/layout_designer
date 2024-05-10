import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EditedTile {
  tileIndex: string;
  rotationDegree: number;
}

export interface Dimension {
  customWidth: number;
  customHeight: number;
  activeDimension: 'cm' | 'in';
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
  measurement: Dimension;
  setMeasurement: (measurement: Dimension) => void;
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
      measurement: {
        activeDimension: 'cm',
        customHeight: 0,
        customWidth: 0,
      },
      setMeasurement: (measurement: Dimension) => set({ measurement }),
    }),
    {
      name: 'tile-choice',
      getStorage: () => localStorage,
    },
  ),
);

export default useTileStore;

