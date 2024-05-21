import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Grid from "./Grid";
import useTileStore from "@/store";
import { collectionTiles } from "@/data/tileCatgories";

function SaveModal({ onClose }: { onClose: () => void }) {
  const modalRef: any = useRef(null);
  const activeTileName = useTileStore((state) => state.tileName);
  const activeSize = useTileStore((state) => state.activeSize);
  const activeTilePath = useTileStore((state) => state.activeTilePath);
  const measurement = useTileStore((state) => state.measurement);

  const specificTile = collectionTiles.find((item) => {
    return item.tileName === activeTileName;
  });
  // Close modal when clicking outside of it
  const handleClickOutside = useCallback(
    (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);
  console.log(measurement);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-md"></div>
      <div
        ref={modalRef}
        className="relative mx-4 lg:py-8 py-4 rounded-xl lg:px-7 px-3 shadow-modal-shadow border border-milk bg-white w-[550px] max-wmd text-center"
      >
        <h2 className="text-gray900 mt-6 mb-2 text-2xl lg:text-[28px]">
          Order Summary
        </h2>
        <div className="pointer-events-none pl-6 scale50 mx-auto">
          <Grid isMainGrid={false} />
        </div>
        <div className="flex mt-6 justify-between">
          <p>1 {specificTile?.tileName} tile</p>
          <p>
            &#8364;
            {activeSize === 13
              ? specificTile?.price13by13
              : specificTile?.price9by9}
          </p>
        </div>
        <div className="flex justify-between mt-3">
          <p>
            {(measurement.columns || 1) * (measurement.rows || 1)}{" "}
            {specificTile?.tileName} tiles
          </p>
          <p>
            &#8364;
            {(measurement.columns || 1) *
              (measurement.rows || 1) *
              ((activeSize === 13
                ? specificTile?.price13by13
                : specificTile?.price9by9) || 0)}
          </p>
        </div>
        <button
          onClick={() => alert("Added to cart successfully")}
          className="border border-[#F6E2C4] rounded-full px-5 py-2 mt-4 flex mx-auto space-x-3 items-center"
        >
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.16661 9.31332C3.07327 10.4 3.93327 11.3333 5.0266 11.3333H12.1266C13.0866 11.3333 13.9266 10.5467 13.9999 9.59333L14.3599 4.59333C14.4399 3.48666 13.5999 2.58665 12.4866 2.58665H3.87995"
                stroke="#CC9C53"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.33374 1.3333H2.49374C3.21374 1.3333 3.78041 1.9533 3.72041 2.66663L3.38708 6.69995"
                stroke="#CC9C53"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.8333 14.6667C11.2936 14.6667 11.6667 14.2936 11.6667 13.8333C11.6667 13.3731 11.2936 13 10.8333 13C10.3731 13 10 13.3731 10 13.8333C10 14.2936 10.3731 14.6667 10.8333 14.6667Z"
                stroke="#CC9C53"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.49959 14.6667C5.95983 14.6667 6.33293 14.2936 6.33293 13.8333C6.33293 13.3731 5.95983 13 5.49959 13C5.03936 13 4.66626 13.3731 4.66626 13.8333C4.66626 14.2936 5.03936 14.6667 5.49959 14.6667Z"
                stroke="#CC9C53"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 5.3333H14"
                stroke="#CC9C53"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-sm text-gray-500 font-medium">Add to Cart</p>
        </button>
      </div>
    </div>
  );
}

export default SaveModal;
