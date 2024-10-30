"use client";
// Tile edit component for small screen

import React, { useEffect, useState } from "react";
import icons from "./icons";
import { collectionTiles, colorVariation } from "@/data/tileCatgories";
import useTileStore, { EditedTile, irregularTile, useHistoryStore } from "@/store";
import { useTransition, animated, config } from "@react-spring/web";
import { toast } from "react-toastify";

function TileEditComponent({ focusedTileSpec: { index: focusedTileIndex, path: focusedTilePath }, editorTabRef }: any) {
  const editedTiles = useTileStore((state) => state.editedTiles);
  const setEditedTiles = useTileStore((state) => state.setEditedTiles);
  const { setState, state, currentIndex, setCurrentIndex } = useHistoryStore();
  const activeTileName = useTileStore((state) => state.tileName);
  const [tileColor, setTileColor] = useState<string>("");
  const zoom = useTileStore((state) => state.zoom);

  const [showColorPanel, setShowColorPanel] = useState(false);
  const [tileEditState, setTileEditState] = useState<
    { editedTileSpec: EditedTile; editedSpecIndex: number } | { editedTileSpec: null; editedSpecIndex: number }
  >();

  const setEdit = (
    action: "flipX" | "flipY" | "color",
    kwargs: { rotationDegree: number } | { rotateStyle: "flipX" | "flipY" | undefined } | { tilePath: string | undefined }
  ) => {
    let to;
    let from;

    if (tileEditState?.editedTileSpec) {
      from = tileEditState.editedTileSpec[Object.keys(kwargs)[0] as keyof EditedTile];
      to = Object.values(kwargs)[0];
      const newArr = [...editedTiles];
      newArr[tileEditState.editedSpecIndex] = { ...tileEditState.editedTileSpec, ...kwargs };
      setEditedTiles(newArr);
    } else {
      from = to = Object.values(kwargs)[0];
      setEditedTiles([
        ...editedTiles,
        { tileIndex: focusedTileIndex, rotationDegree: 0, rotateStyle: undefined, tilePath: focusedTilePath, ...kwargs },
      ]);
    }

    setState([...state, { tileIndex: focusedTileIndex, from, to, action }]);
    setCurrentIndex(currentIndex + 1);
    // tileEditState would be edited by the #1 side effect and is triggered by setEditedTiles call in this block
  };

  const rotateEdit = (direction: "flipX" | "flipY" | "rotate") => {
    let angle = tileEditState?.editedTileSpec?.rotationDegree || 0;
    if (direction === "flipX") {
      angle = angle % 180 === 0 ? 180 - angle : angle - 90;
    } else if (direction === "flipY") {
      angle = !(270 % angle) ? 270 - angle + 90 : angle - 90;
    } else if (direction === "rotate") {
      angle += 90;
    }
    //  console.log(angle, direction);
    setEdit(direction, { rotationDegree: angle });
  };

  const resetEdit = () => {
    setEditedTiles(editedTiles.filter((item) => item.tileIndex !== focusedTileIndex));
    setTileEditState({ editedSpecIndex: -1, editedTileSpec: null });
  };

  const colorEdit = (colorValue: string) => {
    setTileColor(colorValue);
    const specificTile = collectionTiles.find((item) => {
      return item.tileName === activeTileName;
    });
    let specificColorData = null;

    if (specificTile) {
      for (const subCategory of specificTile.subCategories) {
        const matchingTile = subCategory.tileVariation.find(
          (tile) => tile.tileColor === colorValue && focusedTilePath.includes(tile.tilePath.split("-")[0])
        );
        if (matchingTile) {
          specificColorData = matchingTile;
          break;
        }
      }

      if (specificColorData) {
        setEdit("color", { tilePath: specificColorData.tilePath });
      }
    }
  };

  // #1 Side Effect
  useEffect(() => {
    const editIndex = editedTiles.findIndex((tile) => tile.tileIndex === focusedTileIndex);
    setTileEditState({
      editedTileSpec: editedTiles[editIndex],
      editedSpecIndex: editIndex,
    });
  }, [focusedTileIndex, editedTiles]);

  // #2 Side Effect

  const transitions = useTransition(showColorPanel ? [] : [0], {
    from: { opacity: 0, width: "0%" },
    enter: { opacity: 1, width: "100%" },
    config: config.stiff,
  });

  if (zoom < 0.7) {
    toast.info("Zoom in to edit", {
      toastId: "zoomIn",
    });
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <div
        ref={editorTabRef}
        className=" drop-shadow-lg py-3 h-14 flex space-x-5
       shadow-[0px_10px_15px_rgba(0,0,0,0.1),inset_0px_-5px_10px_rgba(0,0,0,0.05)]
        rounded-2xl px-5 mb-7  justify-between items-center border border-gray-200 bg-[#fcf8f0] max-w-[300px]"
      >
        {transitions((style, i) => (
          <animated.div style={style} key={i} className={"flex space-x-5"}>
            {/* Reset Button */}
            <div className="">
              <div
                onClick={() => {
                  rotateEdit('rotate');
                }}
              >
                <icons.Rotate2 />
              </div>
            </div>
            {/* Rotate Right Button */}
            <div className="">
              <div
                onClick={() => {
                  rotateEdit("flipX");
                }}
              >
                <icons.Flip deg={0} />
              </div>

              {/* <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" /> */}
            </div>
            {/* Rotate Left Button --- */}
            {!irregularTile.includes(activeTileName) && (
              <div>
                <div
                  onClick={() => {
                    rotateEdit("flipY");
                  }}
                >
                  <icons.Flip deg={90} />
                </div>

                {/* <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" /> */}
              </div>
            )}
          </animated.div>
        ))}

        {/* Color Button */}
        <div className="flex items-center space-x-4">
          {showColorPanel ? (
            // Cancel button
            <div
              onClick={() => {
                setShowColorPanel(false);
              }}
            >
              <icons.CancelButton />
            </div>
          ) : (
            <div
              onClick={() => {
                setShowColorPanel(true);
              }}
            >
              <icons.ColorPallet />
            </div>
          )}

          {showColorPanel && (
            <div className="flex w-36 h-10 overflow-x-scroll gap-3 scroll-m-2">
              {colorVariation.map((color) => {
                return (
                  <div
                    key={color.colorName}
                    onClick={() => {
                      colorEdit(color.colorName);
                    }}
                  >
                    <div
                      className={` w-8 h-8 rounded-full border ${
                        tileColor === color.colorName ? "border-2 border-yellow-950" : "border border-black"
                      } `}
                      style={{
                        backgroundColor: color.colorHEX,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TileEditComponent;
