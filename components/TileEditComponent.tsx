import { collectionTiles, colorVariation } from "@/data/tileCatgories";
import useTileStore, { EditedTile, useHistoryStore } from "@/store";
import React, { useEffect, useState } from "react";
import icons from "./icons";

type Props = {
  tileIndex: string;
  zoom: number;
  tilePath: string | undefined;
};

const TileEditComponent = ({
  tileIndex,
  zoom,
  tilePath: initialTilePath,
}: Props) => {
  const activeTileName = useTileStore((state) => state.tileName);
  const activeTilePath = useTileStore((state) => state.activeTilePath);
  const editedTiles = useTileStore((state) => state.editedTiles);
  const { setState, state, currentIndex, setCurrentIndex } = useHistoryStore();

  const activeTile = editedTiles.find((tile) => tile.tileIndex === tileIndex);
  const [showColorPanel, setShowColorPanel] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [updatedTilePath, setUpdatedTilePath] = useState<string | null>(null);
  const [rotationDegree, setRotationDegree] = useState<number>(
    activeTile?.rotationDegree || 0
  );
  const [rotateStyle, setRotateStyle] = useState<
    EditedTile["rotateStyle"] | undefined
  >(activeTile?.rotateStyle);
  const [tilePath, setTilePath] = useState<string>(
    initialTilePath ?? activeTile?.tilePath ?? activeTilePath
  );

  const [tileColor, setTileColor] = useState<string>("");

  const storeUserAction = (
    action: "rotate" | "flipX" | "flipY" | "color",
    from: any,
    to: any
  ) => {
    setState([...state, { tileIndex, from, to, action }]);
    setCurrentIndex(currentIndex + 1);
  };

  const rotateDiv = (direction: "reset" | "flipX" | "flipY") => {
    let newDegree = 0;
    switch (direction) {
      case "reset":
        newDegree = 0;
        setEditedTiles(
          editedTiles.filter((tile) => tile.tileIndex !== tileIndex)
        );
        setTilePath(activeTilePath);
      case "flipX":
        newDegree = rotationDegree > 0 ? 0 : 180;
        break;
      case "flipY":
        newDegree = rotationDegree > 0 ? 0 : 180;
        break;
    }
    direction !== "reset" &&
      storeUserAction(direction, rotationDegree, newDegree);

    direction === "flipX" || direction === "flipY"
      ? setRotateStyle(direction)
      : setRotateStyle(undefined);

    setRotationDegree(newDegree);
  };

  const updateTileData = () => {
    const tileEditData = {
      tileIndex,
      rotationDegree,
      rotateStyle,
      tilePath,
    };

    const index = editedTiles.findIndex((tile) => tile.tileIndex === tileIndex);

    if (index !== -1) {
      editedTiles[index] = tileEditData;
      setEditedTiles([...editedTiles]);
    } else {
      setEditedTiles([...editedTiles, tileEditData]);
    }
  };

  const handleColorPick = () => {
    setShowColorPanel(!showColorPanel);
  };

  const setEditedTilePath = (colorValue: string) => {
    setTileColor(colorValue);
    const specificTile = collectionTiles.find((item) => {
      return item.tileName === activeTileName;
    });
    let specificColorData = null;

    if (specificTile) {
      for (const subCategory of specificTile.subCategories) {
        const matchingTile = subCategory.tileVariation.find(
          (tile) =>
            tile.tileColor === colorValue &&
            tilePath.includes(tile.tilePath.split("-")[0])
        );
        if (matchingTile) {
          specificColorData = matchingTile;
          break;
        }
      }

      if (specificColorData) {
        storeUserAction("color", tilePath, specificColorData.tilePath);
        setTilePath(specificColorData.tilePath);
        setUpdatedTilePath(specificColorData.tilePath);
      }
    }
  };

  const setEditedTiles = useTileStore((state) => state.setEditedTiles);

  const handleTileEdit = (
    editType: "reset" | "flipX" | "flipY" | "colorEdit"
  ) => {
    editType === "reset" && rotateDiv("reset");
    editType === "flipX" && rotateDiv("flipX");
    editType === "flipY" && rotateDiv("flipY");
    editType === "colorEdit" && handleColorPick();
  };

  useEffect(() => {
    if (updatedTilePath !== null && !isFirstLoad) {
      updateTileData();
      setTilePath(updatedTilePath);
    }
    isFirstLoad && setIsFirstLoad(false);
  }, [updatedTilePath]);

  useEffect(() => {
    !isFirstLoad && updateTileData();
  }, [showColorPanel, rotationDegree, tilePath]);

  return (
    <>
      {/* Reset Button */}
      <div
        className="absolute left-1/4 -top-full z-40"
        style={{
          transform: `scale(${zoom < 1 ? 1 / zoom : 1})`,
        }}
      >
        <div
          onClick={() => {
            handleTileEdit("reset");
          }}
        >
          <icons.Rotate2 />
        </div>
        {/* <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" /> */}
      </div>

      {/* Color Button */}
      <div
        className="absolute -right-full top-1/4 z-40"
        style={{
          transform: `scale(${zoom < 1 ? 1 / zoom : 1}) rotate(90deg)`,
        }}
      >
        {showColorPanel && (
          <div className="flex bottom-24 -left-10 rotate-[270deg] w-32 overflow-x-scroll gap-3 py-3 absolute">
            {colorVariation.map((color) => {
              return (
                <button
                  key={color.colorName}
                  onClick={() => {
                    setEditedTilePath(color.colorName);
                  }}
                >
                  <div
                    className={`w-7 h-7 rounded-full border ${
                      tileColor === color.colorName
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
        )}

        {showColorPanel ? (
          // Cancel button
          <div
            onClick={() => {
              handleTileEdit("colorEdit");
            }}
          >
            <icons.CancelButton />
          </div>
        ) : (
          <div
            onClick={() => {
              handleTileEdit("colorEdit");
            }}
          >
            <icons.ColorPallet />
          </div>
        )}
        {/* <div className="w-1 h-10 -ml-1 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" /> */}
      </div>

      {/* Rotate Right Button */}
      <div
        className="absolute -bottom-full left-1/4 z-40"
        style={{
          transform: `scale(${zoom < 1 ? 1 / zoom : 1}) rotate(180deg)`,
        }}
      >
        <div
          onClick={() => {
            handleTileEdit("flipX");
          }}
        >
          <icons.Flip />
        </div>

        {/* <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" /> */}
      </div>

      {/* Rotate Left Button */}
      <div
        className="absolute top-1/4 -left-full  z-40"
        style={{
          transform: `scale(${zoom < 1 ? 1 / zoom : 1}) rotate(270deg)`,
        }}
      >
        <div
          onClick={() => {
            handleTileEdit("flipY");
          }}
        >
          <icons.Flip />
        </div>

        {/* <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" /> */}
      </div>
    </>
  );
};

export default TileEditComponent;
