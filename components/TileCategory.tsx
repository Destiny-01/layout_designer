import { collectionTiles } from "@/data/tileCatgories";
import {
  TileVariation,
  tileCategory,
} from "@/public/assets/tiles/Cadaques/output";
import useTileStore from "@/store";
import Image from "next/image";

import { useEffect, useState } from "react";

type Props = {};

const TileCategory = (props: Props) => {
  const category = [
    "Alphabet",
    "Amphora",
    "Kant",
    "Kobenhavn",
    "Lisboa",
    "Madera",
    "Malaga",
    "Malfa",
    "Plain",
    "Ruta",
    "Single Tiles",
    "Siquijor",
    "Skye",
  ];
  const [activeTile, setActiveTile] = useState("");
  const [showSubCategory, setShowSubCategory] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const setTileName = useTileStore((state) => state.setTileName);
  const setActiveRotationDegree = useTileStore(
    (state) => state.setActiveRotationDegree
  );
  // const storedTileName = useTileStore((state) => state.tileName);
  const storedTileColor = useTileStore((state) => state.tileColor);
  const setTileColor = useTileStore((state) => state.setTileColor);
  const setActiveSubCategory = useTileStore(
    (state) => state.setActiveSubCategory
  );
  const setActiveTilePath = useTileStore((state) => state.setActiveTilePath);
  const setEditedTiles = useTileStore((state) => state.setEditedTiles);

  const handleTileChoice = (
    tileName: string,
    tilePath: string,
    category: number
  ) => {
    setTileName(tileName);
    setActiveSubCategory(category);
    setActiveTilePath(tilePath);
    setEditedTiles([]);
  };

  return (
    <div className="space-y-3 py-3">
      {collectionTiles.map((item) => {
        return (
          <div key={item.tileName}>
            <button
              className="flex items-center space-x-3 h-fit"
              onClick={() => {
                console.log(item.tileName, activeTile, showSubCategory);
                setShowSubCategory(item.tileName !== activeTile);
                setActiveTile(
                  item.tileName === activeTile ? "" : item.tileName
                );
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-0.5 transition-all"
                style={
                  item.tileName === activeTile
                    ? { rotate: "90deg" }
                    : { rotate: "0deg" }
                }
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
              <p
                className={item.tileName === activeTile ? "text-[#C98319]" : ""}
              >
                {item.tileName}
              </p>
            </button>
            {showSubCategory && item.tileName === activeTile && (
              <div className="pl-7 lg:pl-10">
                <div className="grid grid-cols-5 gap-3 py-3 w-fit">
                  {item.subCategories.map((category, index) => {
                    return category.tileVariation.map((tileVariant) => {
                      return (
                        tileVariant.tileColor === storedTileColor && (
                          <button
                            key={tileVariant.tileColor}
                            onClick={() => {
                              handleTileChoice(
                                item.tileName,
                                tileVariant.tilePath,
                                index
                              );
                              setActiveRotationDegree(0);
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
                    });
                  })}
                </div>

                <div className="grid grid-cols-5 gap-3 py-3 w-fit">
                  {item.colorVariation.map((color) => {
                    const isInFirstArray = item.subCategories
                      .find((category) => category.id === activeCategory)
                      ?.tileVariation.some(
                        (obj) => obj.tileColor === color.colorName
                      );

                    return (
                      <button
                        key={color.colorName}
                        onClick={() => setTileColor(color.colorName)}
                        className={`${isInFirstArray ? "flex" : "hidden"}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full border ${
                            storedTileColor === color.colorName
                              ? "border-2 border-yellow-950"
                              : "border border-black"
                          } `}
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
