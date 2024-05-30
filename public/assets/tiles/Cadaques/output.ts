export type TileColorVariation = {
  tileColor: string;
  tilePath: string;
};

export interface TileVariation {
  tileName: string;
  subCategories: {
    colorVariation: TileColorVariation[];
  }[];
}

export const tileCategory: TileVariation = {
  tileName: "Cadaques",
  subCategories: [
    {
      colorVariation: [
        {
          tileColor: "Blush",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Blush.svg",
        },
        {
          tileColor: "BottleGreen",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Bottle-Green.svg",
        },
        {
          tileColor: "Cobalt",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Cobalt.svg",
        },
        {
          tileColor: "HighlandGreen",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Highland-Green.svg",
        },
        {
          tileColor: "Indigo",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Indigo.svg",
        },
        {
          tileColor: "NestEgg",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Nest-Egg.svg",
        },
        {
          tileColor: "Papaya",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Papaya.svg",
        },
        {
          tileColor: "Sunshine",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Sunshine.svg",
        },
        {
          tileColor: "Tan",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Tan.svg",
        },
        {
          tileColor: "Terracotta",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Terracotta.svg",
        },
        {
          tileColor: "Toffee",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Toffee.svg",
        },
        {
          tileColor: "Verdigris",
          tilePath: "/assets/tiles/Cadaques/Cadaques-Verdigris.svg",
        },
        {
          tileColor: "White",
          tilePath: "/assets/tiles/Cadaques/Cadaques-White.svg",
        },
      ],
    },
  ],
};
