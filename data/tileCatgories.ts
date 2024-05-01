import {
  TileVariation,
  tileCategory,
} from '@/public/assets/tiles/Cadaques/output';

export interface ColorVariation {
  colorName: string;
  colorHEX: string;
}

export interface TileCategory {
  tileName: string;
  colorVariation: ColorVariation[];
  tileVariation: TileVariation['colorVariation'];
}

export const colorVariation: ColorVariation[] = [
  {
    colorName: 'Blush',
    colorHEX: '#FFF5EF',
  },
  {
    colorName: 'BottleGreen',
    colorHEX: '#092E20',
  },
  {
    colorName: 'Cobalt',
    colorHEX: '#0047AB',
  },
  {
    colorName: 'HighlandGreen',
    colorHEX: '#115740',
  },
  {
    colorName: 'Indigo',
    colorHEX: '#4B0082',
  },
  {
    colorName: 'NestEgg',
    colorHEX: '#FFFDD0',
  },
  {
    colorName: 'Papaya',
    colorHEX: '#FF7D49',
  },
  {
    colorName: 'Sunshine',
    colorHEX: '#FFD700',
  },
  {
    colorName: 'Tan',
    colorHEX: '#D2B48C',
  },
  {
    colorName: 'Terracotta',
    colorHEX: '#E2725B',
  },
  {
    colorName: 'Toffee',
    colorHEX: '#795548',
  },
  {
    colorName: 'Verdigris',
    colorHEX: '#43B3AE',
  },
  {
    colorName: 'Verdigris',
    colorHEX: '#FFFFFF',
  },
];

export const TileCategories: TileCategory[] = [];

export const collectionTiles: TileCategory[] = [
  {
    colorVariation: colorVariation,
    tileName: 'Cadaques',
    tileVariation: tileCategory.colorVariation,
  },
  {
    colorVariation: colorVariation,
    tileName: 'Flora',
  },
  {
    colorVariation: colorVariation,
    tileName: 'Hanoi',
  },
  {
    colorVariation: colorVariation,
    tileName: 'Onda',
  },
  {
    colorVariation: colorVariation,
    tileName: 'Penang',
  },
  {
    colorVariation: colorVariation,
    tileName: 'Posidonia',
  },
  {
    colorVariation: colorVariation,
    tileName: 'Reykjavik',
  },
  {
    colorVariation: colorVariation,
    tileName: 'Rio',
  },
];

