import {
  TileVariation,
  tileCategory,
} from "@/public/assets/tiles/Cadaques/output";

import { tileCategory as FloraTileCategory } from "@/public/assets/tiles/Flora/output";
import { tileCategory as HanoiTileCategory } from "@/public/assets/tiles/Hanoi/output";
import { tileCategory as OndaTileCategory } from "@/public/assets/tiles/Onda/output";
import { tileCategory as PenangTileCategory } from "@/public/assets/tiles/Penang/output";
import { tileCategory as PoiseTileCategory } from "@/public/assets/tiles/Posidonia/output";
import { tileCategory as ReyTileCategory } from "@/public/assets/tiles/Reykjavik/output";
import { tileCategory as RioTileCategory } from "@/public/assets/tiles/Rio/output";

export interface ColorVariation {
  colorName: string;
  colorHEX: string;
}

export interface TileCategory {
  tileName: string;
  colorVariation: ColorVariation[];
  tileVariation: TileVariation["colorVariation"];
  price9by9: number;
  price13by13: number;
}

export const colorVariation: ColorVariation[] = [
  {
    colorName: "Blush",
    colorHEX: "#FFF5EF",
  },
  {
    colorName: "BottleGreen",
    colorHEX: "#092E20",
  },
  {
    colorName: "Cobalt",
    colorHEX: "#0047AB",
  },
  {
    colorName: "HighlandGreen",
    colorHEX: "#115740",
  },
  {
    colorName: "Indigo",
    colorHEX: "#4B0082",
  },
  {
    colorName: "NestEgg",
    colorHEX: "#FFFDD0",
  },
  {
    colorName: "Papaya",
    colorHEX: "#FF7D49",
  },
  {
    colorName: "Sunshine",
    colorHEX: "#FFD700",
  },
  {
    colorName: "Tan",
    colorHEX: "#D2B48C",
  },
  {
    colorName: "Terracotta",
    colorHEX: "#E2725B",
  },
  {
    colorName: "Toffee",
    colorHEX: "#795548",
  },
  {
    colorName: "Verdigris",
    colorHEX: "#43B3AE",
  },
  {
    colorName: "White",
    colorHEX: "#FFFFFF",
  },
];

export const TileCategories: TileCategory[] = [];

export const collectionTiles: TileCategory[] = [
  {
    colorVariation: colorVariation,
    tileName: "Cadaques",
    tileVariation: tileCategory.colorVariation,
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Flora",
    tileVariation: FloraTileCategory.colorVariation,
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Hanoi",
    tileVariation: HanoiTileCategory.colorVariation,
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Onda",
    tileVariation: OndaTileCategory.colorVariation,
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Penang",
    tileVariation: PenangTileCategory.colorVariation,
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Posidonia",
    tileVariation: PoiseTileCategory.colorVariation,
    price9by9: 13,
    price13by13: 16,
  },
  {
    colorVariation: colorVariation,
    tileName: "Reykjavik",
    tileVariation: ReyTileCategory.colorVariation,
    price9by9: 13,
    price13by13: 16,
  },
  {
    colorVariation: colorVariation,
    tileName: "Rio",
    tileVariation: RioTileCategory.colorVariation,
    price9by9: 20,
    price13by13: 20,
  },
];
