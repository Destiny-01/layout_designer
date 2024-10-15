import {
  TileCategory as TileCategoryType,
  collectionTiles,
} from "@/data/tileCatgories";
import {
  TileVariation,
  tileCategory,
} from "@/public/assets/tiles/Cadaques/output";
import useTileStore, { useHistoryStore } from "@/store";
import Image from "next/image";

import { useEffect, useState } from "react";
import icons from "./icons";

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
  const setAutoFillPattern = useTileStore((state) => state.setAutoFillPattern);
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
  const { setState, setCurrentIndex } = useHistoryStore();

  const handleTileChoice = (
    tileName: string,
    tilePath?: string,
    category?: number
  ) => {
    setTileName(tileName);
    category && setActiveSubCategory(category);
    tilePath && setActiveTilePath(tilePath);
    setEditedTiles([]);
    setState([]);
    setCurrentIndex(0);
  };

  const autoFill = (item: TileCategoryType) => {
    // const categories = item.subCategories.length;
    const finalArrangement: number[] = [];
    item.subCategories.map((_, i) => finalArrangement.push(i));
    let activeTilePath = "";

    handleTileChoice(item.tileName);
    for (const subCategory of item.subCategories) {
      const matchingTile = subCategory.tileVariation.find(
        (tile) => tile.tileColor === storedTileColor
      );
      if (matchingTile) {
        activeTilePath = matchingTile.tilePath;
        break;
      }
    }

    setActiveTilePath(activeTilePath);
    setAutoFillPattern(finalArrangement);
  };

  const handleDrag = (
    e: React.DragEvent<HTMLDivElement>,
    draggedTilePath: string
  ) => {
    e.dataTransfer.setData("text/plain", `${draggedTilePath}*+=${activeTile}`);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="space-y-3 py-3">
      {collectionTiles.map((item) => {
        return (
          <div key={item.tileName}>
            <button
              className="flex items-center space-x-3 h-fit"
              onClick={() => {
                setShowSubCategory(item.tileName !== activeTile);
                setActiveTile(
                  item.tileName === activeTile ? "" : item.tileName
                );
              }}
            >
              <icons.SmallDownPointer tilt={item.tileName === activeTile} />
              <p
                className={item.tileName === activeTile ? "text-[#C98319]" : ""}
              >
                {item.tileName}
              </p>
            </button>
            {showSubCategory && item.tileName === activeTile && (
              <div className="pl-7 lg:pl-10">
                <div className="grid grid-cols-5 gap-3 items-center py-3 w-fit">
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
                              setAutoFillPattern([]);
                            }}
                          >
                            <div
                              className="z-50 "
                              draggable="true"
                              onDragStart={(e) =>
                                handleDrag(e, tileVariant.tilePath)
                              }
                            >
                              <Image
                                src={tileVariant.tilePath}
                                className="w-12 h-12"
                                width={10}
                                height={10}
                                draggable="false"
                                alt="Tile"
                              />
                            </div>
                          </button>
                        )
                      );
                    });
                  })}
                  {item.subCategories.length > 1 && (
                    <p
                      className="underline cursor-pointer font-medium"
                      onClick={() => autoFill(item)}
                    >
                      Autofill
                    </p>
                  )}
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
