import { collectionTiles } from '@/data/tileCatgories';
import {
  TileVariation,
  tileCategory,
} from '@/public/assets/tiles/Cadaques/output';
import useTileStore from '@/store';
import Image from 'next/image';

import { useEffect, useState } from 'react';

type Props = {};

const TileCategory = (props: Props) => {
  const category = [
    'Alphabet',
    'Amphora',
    'Kant',
    'Kobenhavn',
    'Lisboa',
    'Madera',
    'Malaga',
    'Malfa',
    'Plain',
    'Ruta',
    'Single Tiles',
    'Siquijor',
    'Skye',
  ];
  const [showSubCategory, setShowSubCategory] = useState<boolean>(false);

  const setTileName = useTileStore((state) => state.setTileName);
  const storedTileName = useTileStore((state) => state.tileName);
  const storedTileColor = useTileStore((state) => state.tileColor);
  const setTileColor = useTileStore((state) => state.setTileColor);
  const setActiveTilePath = useTileStore((state) => state.setActiveTilePath);

  const handleTileChoice = (tileName: string, tilePath: string) => {
    setTileName(tileName);
    setActiveTilePath(tilePath);
  };

  return (
    <div className="space-y-3 py-3">
      {collectionTiles.map((item) => {
        return (
          <div key={item.tileName}>
            <button
              className="flex items-center space-x-3 h-fit"
              onClick={() => {
                setShowSubCategory(!showSubCategory);
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M7.7175 4.96997L4.77167 7.1808V10.4533C4.77167 11.0133 5.44833 11.2933 5.845 10.8966L8.86667 7.87497C9.35083 7.3908 9.35083 6.6033 8.86667 6.11914L7.7175 4.96997Z"
                  fill="#292D32"
                />
                <path
                  d="M4.77167 3.54662V7.18079L7.7175 4.96996L5.845 3.09746C5.44833 2.70662 4.77167 2.98662 4.77167 3.54662Z"
                  fill="#292D32"
                />
              </svg>
              <p>{item.tileName}</p>
            </button>
            {showSubCategory && item.tileName === storedTileName && (
              <div className="pl-7 lg:pl-10">
                <div className="grid grid-cols-5 gap-3 py-3 w-fit">
                  {item.tileVariation.map(
                    (tileVariant: { tileColor: string; tilePath: string }) => {
                      return (
                        tileVariant.tileColor === storedTileColor && (
                          <button
                            key={tileVariant.tileColor}
                            onClick={() => {
                              handleTileChoice(
                                item.tileName,
                                tileVariant.tilePath,
                              );
                            }}
                          >
                            <Image
                              src={tileVariant.tilePath}
                              className="w-12 h-12"
                              width={10}
                              height={10}
                              alt="Tile"
                            />
                          </button>
                        )
                      );
                    },
                  )}
                </div>

                <div className="grid grid-cols-5 gap-3 py-3 w-fit">
                  {item.colorVariation.map((color) => {
                    return (
                      <button
                        key={color.colorHEX}
                        onClick={() => setTileColor(color.colorName)}
                      >
                        <div
                          className={`w-7 h-7 rounded-full`}
                          style={{
                            backgroundColor: color.colorHEX,
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TileCategory;

