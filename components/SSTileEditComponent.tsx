"use client";
// Tile edit component for small screen

import React, { useState } from "react";
import icons from "./icons";
import { colorVariation } from "@/data/tileCatgories";

function SSTileEditComponent({
  focusedTileIndex,
  handleTileEdit,
  showColorPanel,
  tileColor,
  setEditedTilePath,
}: any) {
  if (!focusedTileIndex.length) return null;
  return (
    <div className="w-full  flex justify-center sm:hidden">
      <div
        className=" drop-shadow-lg
       shadow-[0px_10px_15px_rgba(0,0,0,0.1),inset_0px_-5px_10px_rgba(0,0,0,0.05)]
        rounded-2xl px-5 mb-7 flex justify-between items-center border border-gray-200 bg-[#fcf8f0] max-w-[300px]"
      >
        {showColorPanel ? (
          <div></div>
        ) : (
          <>
            {/* Reset Button */}
            <div className="">
              <div
                onClick={() => {
                  handleTileEdit("rotate");
                }}
              >
                <icons.Rotate2 />
              </div>
            </div>

            {/* Rotate Right Button */}
            <div className="">
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
            <div>
              <div
                onClick={() => {
                  handleTileEdit("flipY");
                }}
              >
                <icons.Flip deg={90} />
              </div>

              {/* <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" /> */}
            </div>
          </>
        )}

        {/* Color Button */}
        <div className="flex">
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
            <div className="flex  w-32 overflow-x-scroll gap-3 py-3">
              {colorVariation.map((color) => {
                return (
                  <button
                    key={color.colorName}
                    onClick={() => {
                      setEditedTilePath(color.colorName);
                    }}
                  >
                    <div
                      className={` w-7 h-7 rounded-full border ${
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
      </div>
    </div>
  );
}

export default SSTileEditComponent;
