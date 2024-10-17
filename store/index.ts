import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EditedTile {
  tileIndex: string;
  rotationDegree: number;
  rotateStyle: "flipX" | "flipY" | undefined;
  tilePath: string | undefined;
}

export interface Dimension {
  customWidth: number;
  customHeight: number;
  rows: number;
  columns: number;
  activeDimension: "cm";
}

export interface TileState {
  tileName: string;
  setTileName: (tileName: string) => void;
  tileColor: string;
  setTileColor: (tileColor: string) => void;
  autoFillPattern: number[];
  setAutoFillPattern: (AutoFillPattern: number[]) => void;
  activeTilePath: string;
  setActiveTilePath: (activeTilePath: string) => void;
  activeSubCategory: number;
  setActiveSubCategory: (activeSubCategory: number) => void;
  editedTiles: EditedTile[];
  setEditedTiles: (editedTiles: EditedTile[]) => void;
  activeRotationDegree: number;
  setActiveRotationDegree: (activeRotationDegree: number) => void;
  measurement: Dimension;
  setMeasurement: (measurement: Dimension) => void;
  activeSize: number;
  setActiveSize: (activeSize: number) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
}
export interface HistoryEntry {
  tileIndex: string | null;
  from: any;
  to: any;
  action: "rotate" | "flipX" | "flipY" | "color";
}

export interface HistoryState {
  currentIndex: number;
  state: HistoryEntry[];
  setState: (state: HistoryEntry[]) => void;
  setCurrentIndex: (currentIndex: number) => void;
}

export const useHistoryStore = create(
  persist<HistoryState>(
    (set) => ({
      currentIndex: -1,
      state: [],
      setState: (state: HistoryState["state"]) => set({ state }),
      setCurrentIndex: (currentIndex: number) => set({ currentIndex }),
    }),
    {
      name: "history",
      getStorage: () => localStorage,
    }
  )
);

const useTileStore = create(
  persist<TileState>(
    (set) => ({
      tileName: "Cadaques",
      setTileName: (tileName: string) => set({ tileName }),
      tileColor: "Blush",
      autoFillPattern: [],
      setAutoFillPattern: (autoFillPattern: number[]) =>
        set({ autoFillPattern }),
      setTileColor: (tileColor: string) => set({ tileColor }),
      activeTilePath: "", //
      setActiveTilePath: (activeTilePath: string) => set({ activeTilePath }),
      activeSubCategory: 0, //
      setActiveSubCategory: (activeSubCategory: number) =>
        set({ activeSubCategory }),
      editedTiles: [],
      setEditedTiles: (editedTiles: EditedTile[]) => set({ editedTiles }),
      activeRotationDegree: 0, //
      setActiveRotationDegree: (activeRotationDegree: number) =>
        set({ activeRotationDegree }),
      measurement: {
        activeDimension: "cm",
        customHeight: 0,
        customWidth: 0,
        rows: 3,
        columns: 3,
      },
      setMeasurement: (measurement: Dimension) => set({ measurement }),
      activeSize: 9,
      setActiveSize: (activeSize: number) => set({ activeSize }),
      zoom: 1,
      setZoom: (zoom: number) => set({ zoom }),
    }),
    {
      name: "tile-choice",
      getStorage: () => localStorage,
    }
  )
);
export const irregularTile = [
  "Kant",
  "Madera",
  "Malaga",
  "Plain",
  "Rio",
  "Ruta",
  "Penang",
];

export default useTileStore;
