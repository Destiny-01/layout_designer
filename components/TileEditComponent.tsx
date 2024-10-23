import { collectionTiles, colorVariation } from "@/data/tileCatgories";
import useTileStore, {
  EditedTile,
  useHistoryStore,
  irregularTile,
} from "@/store";
import React, { useEffect, useState } from "react";
import icons from "./icons";
import {  toast } from "react-toastify";


const TileEditComponent = ({
  handleTileEdit,
  showColorPanel,
  tileColor,
  setEditedTilePath,
  zoom,
  scale,
}: any) => {

  if (scale * zoom < 0.3) {
    toast.info("Zoom in to edit", {
      toastId: "zoomIn",
    });
    return null;
  }
  return (
    <>
      <div className="w-36 h-36 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hidden sm:block z-20">
        {/* Reset Button */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-50">
          <div
            onClick={() => {
              handleTileEdit("rotate");
            }}
          >
            <icons.Rotate2 />
          </div>
          {/* <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" /> */}
        </div>

        {/* Color Button */}
        <div className="absolute top-1/2 right-0 w-12 h-12 translate-x-1/2 -translate-y-1/2 bg-red flex z-50">
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

          {showColorPanel && (
            <div className="flex  w-32 overflow-x-scroll gap-3 py-3 absolute left-full top-0">
              {colorVariation.map((color) => {
                return (
                  <button
                    key={color.colorName}
                    onClick={() => {
                      setEditedTilePath(color.colorName);
                    }}
                  >
                    <div
                      className={` w-5 h-5 md:w-7 md:h-7 rounded-full border ${
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
          {/* <div className="w-1 h-10 -ml-1 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" /> */}
        </div>

        {/* Rotate Right Button */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50">
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
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-50">
          <div
            onClick={() => {
              handleTileEdit("flipY");
            }}
          >
            <icons.Flip />
          </div>

          {/* <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" /> */}
        </div>
      </div>
    </>
  );
};

export default TileEditComponent;
