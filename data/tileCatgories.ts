import {
  TileColorVariation,
  tileCategory,
} from "@/public/assets/tiles/Cadaques/output";

import { tileCategory as AlphabetTileCategory } from "@/public/assets/tiles/Alphabet/output";
import { tileCategory as AmphoraTileCategory } from "@/public/assets/tiles/Amphora/output";
import { tileCategory as FloraTileCategory } from "@/public/assets/tiles/Flora/output";
import { tileCategory as HanoiTileCategory } from "@/public/assets/tiles/Hanoi/output";
import { tileCategory as KantTileCategory } from "@/public/assets/tiles/Kant/output";
import { tileCategory as KobenhavnTileCategory } from "@/public/assets/tiles/Kobenhavn/output";
import { tileCategory as LisboaTileCategory } from "@/public/assets/tiles/Lisboa/output";
import { tileCategory as MaderaTileCategory } from "@/public/assets/tiles/Madera/output";
import { tileCategory as MalagaTileCategory } from "@/public/assets/tiles/Malaga/output";
import { tileCategory as MalfaTileCategory } from "@/public/assets/tiles/Malfa/output";
import { tileCategory as OndaTileCategory } from "@/public/assets/tiles/Onda/output";
import { tileCategory as PenangTileCategory } from "@/public/assets/tiles/Penang/output";
import { tileCategory as PlainTileCategory } from "@/public/assets/tiles/Plain/output";
import { tileCategory as PoiseTileCategory } from "@/public/assets/tiles/Posidonia/output";
import { tileCategory as ReyTileCategory } from "@/public/assets/tiles/Reykjavik/output";
import { tileCategory as RioTileCategory } from "@/public/assets/tiles/Rio/output";
import { tileCategory as RutaTileCategory } from "@/public/assets/tiles/Ruta/output";
import { tileCategory as SiquijorTileCategory } from "@/public/assets/tiles/Siquijor/output";
import { tileCategory as SkyeTileCategory } from "@/public/assets/tiles/Skye/output";

export interface ColorVariation {
  colorName: string;
  colorHEX: string;
}

export interface TileCategory {
  tileName: string;
  colorVariation: ColorVariation[];
  subCategories: {
    id: number;
    tileVariation: TileColorVariation[];
  }[];
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
    tileName: "Alphabet",
    subCategories: AlphabetTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Amphora",
    subCategories: AmphoraTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Cadaques",
    subCategories: tileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Flora",
    subCategories: FloraTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Hanoi",
    subCategories: HanoiTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Kant",
    subCategories: KantTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Kobenhavn",
    subCategories: KobenhavnTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Lisboa",
    subCategories: LisboaTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Madera",
    subCategories: MaderaTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Malaga",
    subCategories: MalagaTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Malfa",
    subCategories: MalfaTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Onda",
    subCategories: OndaTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Penang",
    subCategories: PenangTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Plain",
    subCategories: PlainTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 13,
    price13by13: 16,
  },
  {
    colorVariation: colorVariation,
    tileName: "Posidonia",
    subCategories: PoiseTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 13,
    price13by13: 16,
  },
  {
    colorVariation: colorVariation,
    tileName: "Reykjavik",
    subCategories: ReyTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 13,
    price13by13: 16,
  },
  {
    colorVariation: colorVariation,
    tileName: "Rio",
    subCategories: RioTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 20,
    price13by13: 20,
  },
  {
    colorVariation: colorVariation,
    tileName: "Ruta",
    subCategories: RutaTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Siquijor",
    subCategories: SiquijorTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
  {
    colorVariation: colorVariation,
    tileName: "Skye",
    subCategories: SkyeTileCategory.subCategories.map((category, i) => ({
      id: i,
      tileVariation: category.colorVariation,
    })),
    price9by9: 10.5,
    price13by13: 12.5,
  },
];
