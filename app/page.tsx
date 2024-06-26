"use client";
import Grid from "@/components/Grid";
import SaveModal from "@/components/SaveModal";
import TileCategory from "@/components/TileCategory";
import { collectionTiles, colorVariation } from "@/data/tileCatgories";
import useTileStore, { HistoryEntry, useHistoryStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [showTile, setShowTile] = useState<boolean>(false);
  const [showSeeAllTile, setShowSeeAllTile] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState<number | null>(null);

  const containerRef = useRef<any>(null);
  const rotationDegree = useTileStore((state) => state.activeRotationDegree);
  const editedTiles = useTileStore((state) => state.editedTiles);
  const activeTilePath = useTileStore((state) => state.activeTilePath);
  const setEditedTiles = useTileStore((state) => state.setEditedTiles);
  const zoom = useTileStore((state) => state.zoom);
  const setZoom = useTileStore((state) => state.setZoom);
  const setActiveRotationDegree = useTileStore(
    (state) => state.setActiveRotationDegree
  );
  const storedTileColor = useTileStore((state) => state.tileColor);

  const tileName = useTileStore((state) => state.tileName);
  const specificTile = collectionTiles.find((item) => {
    return item.tileName === tileName;
  });
  const setTileName = useTileStore((state) => state.setTileName);
  const setActiveTilePath = useTileStore((state) => state.setActiveTilePath);
  const setMeasurement = useTileStore((state) => state.setMeasurement);
  const measurement = useTileStore((state) => state.measurement);
  const state = useHistoryStore((state) => state.state);
  const setCurrentIndex = useHistoryStore((state) => state.setCurrentIndex);
  const currentIndex = useHistoryStore((state) => state.currentIndex);

  const rotateDiv = () => {
    let newDegree = rotationDegree + 90;
    if (newDegree >= 360) {
      newDegree = 0;
    }
    setActiveRotationDegree(newDegree);
    updateRotationDegrees(newDegree);
  };

  const updateRotationDegrees = (newRotationDegree: number) => {
    const updatedTiles = editedTiles.map((tile) => ({
      ...tile,
      rotationDegree: 0,
      rotateStyle: undefined,
    }));
    setEditedTiles(updatedTiles);
  };
  console.log({ rotationDegree, editedTiles });

  const randomizeTileChoice = () => {
    const numTiles = collectionTiles.length;
    const randomIndex = Math.floor(Math.random() * numTiles);
    const randomTileData = collectionTiles[randomIndex];
    setTileName(randomTileData.tileName);
    setActiveTilePath(
      randomTileData.subCategories[0].tileVariation[0].tilePath
    );
    setEditedTiles([]);
  };

  const deleteTileChoice = () => {
    setTileName("");
    setActiveTilePath("");
  };

  const [formData, setFormData] = useState<{
    width: string | number;
    height: string | number;
  }>({
    width: 0,
    height: 0,
  });

  const [showSaveBtn, setShowSaveBtn] = useState<boolean>(false);

  const handleInput = (inputName: string, inputValue: string) => {
    setFormData({ ...formData, [inputName]: inputValue });
  };

  const executeAction = (newState: HistoryEntry, isUndo = true) => {
    const currentTile = editedTiles.find(
      (tile) => tile.tileIndex === newState.tileIndex
    );
    const index = editedTiles.findIndex(
      (tile) => tile.tileIndex === newState.tileIndex
    );

    if (currentTile) {
      switch (newState.action) {
        case "rotate":
          currentTile.rotationDegree = isUndo ? newState.from : newState.to;
          break;
        case "flipX":
          currentTile.rotationDegree = isUndo ? newState.from : newState.to;
          currentTile.rotateStyle = "flipX";
          break;
        case "flipY":
          currentTile.rotationDegree = isUndo ? newState.from : newState.to;
          currentTile.rotateStyle = "flipY";
          break;
        case "color":
          currentTile.tilePath = isUndo ? newState.from : newState.to;
          break;

        default:
          break;
      }

      if (index !== -1) {
        editedTiles[index] = currentTile;
        setEditedTiles([...editedTiles]);
      } else {
        setEditedTiles([...editedTiles, currentTile]);
      }
    }
  };

  const undo = (e: any) => {
    if (currentIndex >= 0) {
      const newIndex = currentIndex - 1;
      const newState = state[newIndex];
      console.log(newState, newIndex, state.length);
      executeAction(newState);
      setCurrentIndex(newIndex);
    }
  };

  const redo = (e: any) => {
    console.log(currentIndex, state.length);
    if (currentIndex < state.length && currentIndex !== -1) {
      const newIndex = currentIndex;
      const newState = state[newIndex];
      executeAction(newState, false);
      setCurrentIndex(newIndex + 1);
    }
  };

  const customWidth = Number(formData.width);
  const customHeight = Number(formData.height);

  const saveDimension = () => {
    setMeasurement({
      ...measurement,
      customWidth,
      customHeight,
    });
  };

  const handleTileChoice = (tileName: string, tilePath: string) => {
    setTileName(tileName);
    setActiveTilePath(tilePath);
    setEditedTiles([]);
  };

  useEffect(() => {
    formData.width && formData.height && setShowSaveBtn(true);
  }, [formData]);

  const activeSize = useTileStore((state) => state.activeSize);
  const setActiveSize = useTileStore((state) => state.setActiveSize);

  useEffect(() => {
    setActiveSize(9);
    setZoom(1);
  }, []);

  useEffect(() => {
    const newPrice =
      (activeSize > 9 ? specificTile?.price13by13 : specificTile?.price9by9) ||
      0;
    console.log(activeSize, newPrice, specificTile);
    setPrice(
      measurement.columns && measurement.rows
        ? measurement.columns * measurement.rows * newPrice
        : null
    );
  }, [tileName, measurement.rows, measurement.columns]);

  useEffect(() => {
    setMeasurement({
      ...measurement,
      customWidth: customWidth > activeSize ? customWidth : activeSize,
      customHeight: customHeight > activeSize ? customHeight : activeSize,
    });
  }, [activeSize]);

  return (
    <div className="w-full lg:px-20 p-7 flex items-start flex-col lg:flex-row">
      <div className="lg:max-w-[25%] lg:w-fit w-full lg:mr-10">
        <div className="flex lg:items-start items-end gap-5 justify-between lg:flex-col">
          <div className="md:w-fit flex space-x-3 md:space-x-5">
            <div>
              <p className="text-gold text-xs">Height</p>
              <input
                type="number"
                className="md:w-24 w-full h-10 border border-primary rounded-full p-3 mt-2"
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                name="height"
              />
            </div>
            <div>
              <p className="text-gold text-xs">Width</p>
              <input
                type="number"
                className="md:w-24 w-full h-10 border border-primary rounded-full p-3 mt-2"
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                name="width"
              />
            </div>
          </div>

          <div className="border border-primary rounded-full w-52 h-10 md:flex mt-5 hidden bg-[#FBFBFB]">
            <button
              onClick={() => {
                setActiveSize(9);
              }}
              className={`${
                activeSize < 13.5
                  ? "w-2/5 h-full rounded-full p-1 shadow-inner bg-gradient-to-br from-[#CA9A51] to-[#E4B979]"
                  : "w-2/5 h-full rounded-full p-1 bg-[#FBFBFB]"
              } `}
            >
              <div
                className={`${
                  activeSize < 13.5 ? "bg-[#CE9640]" : "bg-[#FBFBFB]"
                } w-full h-full rounded-full  flex items-center justify-center`}
              >
                <p
                  className={`text-xs font-semibold ${
                    activeSize < 13.5 ? "text-white" : "text-black"
                  }`}
                >
                  9x9 {measurement.activeDimension}
                </p>
              </div>
            </button>
            <button
              onClick={() => {
                setActiveSize(13.5);
              }}
              className={`w-3/5 h-full rounded-full p-1 ${
                activeSize >= 13.5 ? "bg-[#CE9640]" : "bg-[#FBFBFB]"
              }`}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <p
                  className={`text-xs font-semibold ${
                    activeSize >= 13.5 ? "text-white" : "text-black"
                  }`}
                >
                  13.5x13.5 {measurement.activeDimension}
                </p>
              </div>
            </button>
          </div>
        </div>

        {showSaveBtn && (
          <button
            type="button"
            className={`my-2 px-5 py-3 rounded-lg text-white bg-[#303825]`}
            onClick={saveDimension}
          >
            Save
          </button>
        )}

        <div>
          <div className="flex space-x-7 py-7 lg:flex-col lg:space-x-0 lg:space-y-3">
            <div>
              <button
                className="flex space-x-2 items-center"
                onClick={() => {
                  setShowTile(!showTile);
                }}
              >
                <p className="font-mermaid font-bold">Pick Collection</p>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-0.5 transition-all"
                  style={showTile ? { rotate: "-180deg" } : { rotate: "0deg" }}
                >
                  <path
                    d="M12.0078 9.63749L10.0428 11.6025C9.4653 12.18 8.5203 12.18 7.9428 11.6025L3.0603 6.71249"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.9402 6.71249L14.1602 7.49249"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {showTile && <TileCategory />}
            </div>
            <div>
              <button
                onClick={() => setShowSeeAllTile(!showSeeAllTile)}
                className="flex space-x-2 items-center"
              >
                <p className="font-mermaid font-bold">See All</p>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-0.5 transition-all"
                  style={
                    showSeeAllTile ? { rotate: "-180deg" } : { rotate: "0deg" }
                  }
                >
                  <path
                    d="M12.0078 9.63749L10.0428 11.6025C9.4653 12.18 8.5203 12.18 7.9428 11.6025L3.0603 6.71249"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.9402 6.71249L14.1602 7.49249"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {showSeeAllTile &&
                collectionTiles.map((item) => {
                  return item.subCategories.map((category) => {
                    return category.tileVariation.map(
                      (tileVariant) =>
                        tileVariant.tileColor === storedTileColor && (
                          <button
                            key={tileVariant.tileColor}
                            onClick={() => {
                              handleTileChoice(
                                item.tileName,
                                tileVariant.tilePath
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
          </div>
        </div>
      </div>

      {/* SideGrid */}

      <div className="w-full lg:max-w-[calc(100vw-33%-28px)] gap-8 lg:border-l-2 border-[#F5F5F5] lg:pl-10 flex items-end">
        <div className="w-full">
          <div className="w-full flex items-center justify-between">
            <div className="md:flex space-x-7 hidden">
              <button onClick={undo}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity={currentIndex >= 0 ? "1" : "0.5"}>
                    <path
                      d="M9.14986 6.92499H3.44153"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.94153 15.2583H12.6082C14.9082 15.2583 16.7749 13.3917 16.7749 11.0917C16.7749 8.79165 14.9082 6.92499 12.6082 6.92499"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.35831 9.00834L3.22498 6.875L5.35831 4.74167"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>

              <button onClick={redo}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    opacity={
                      currentIndex < state.length && currentIndex !== -1
                        ? "1"
                        : "0.5"
                    }
                  >
                    <path
                      d="M10.8501 6.92499H16.5584"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.0584 15.2583H7.39176C5.09176 15.2583 3.2251 13.3917 3.2251 11.0917C3.2251 8.79165 5.09176 6.92499 7.39176 6.92499"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.6414 9.00834L16.7747 6.875L14.6414 4.74167"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </div>
            <div className="md:flex hidden space-x-5 lg:hidden">
              {/* Zoom In Button */}
              <button
                onClick={() => {
                  setZoom(Math.min(zoom + 0.1, 3)); // max zoom in 300%
                }}
              >
                <svg
                  width="34"
                  height="33"
                  viewBox="0 0 34 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="1">
                    <ellipse
                      cx="16.9342"
                      cy="16.5"
                      rx="16.9342"
                      ry="16.5"
                      fill={zoom >= 3 ? "#FDECD1" : "#FFE3B7"}
                    />
                    <path
                      d="M15.4333 15.9092H18.386"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.9099 17.3855V14.4329"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.7929 10.1811C19.8931 10.1811 22.4029 12.6909 22.4029 15.7911C22.4029 18.8914 19.8931 21.4011 16.7929 21.4011C13.6926 21.4011 11.1829 18.8914 11.1829 15.7911C11.1829 13.6062 12.4289 11.7165 14.2536 10.7894"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.9918 21.9916L21.8108 20.8105"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>

              {/* Zoom out button */}
              <button
                onClick={() => {
                  setZoom(Math.max(zoom - 0.1, 0.1)); // min zoom out 10%
                }}
              >
                <svg
                  width="35"
                  height="34"
                  viewBox="0 0 35 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="1">
                    <circle
                      cx="17.8684"
                      cy="17"
                      r="17"
                      fill={zoom <= 0.1 ? "#FDECD1" : "#FFE3B7"}
                    />
                    <path
                      d="M16.2036 16.936H19.1677"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.686 11.1856C20.7983 11.1856 23.3178 13.7051 23.3178 16.8174C23.3178 19.9297 20.7983 22.4492 17.686 22.4492C14.5737 22.4492 12.0542 19.9297 12.0542 16.8174C12.0542 14.624 13.3051 12.727 15.1369 11.7962"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23.9115 23.042L22.7258 21.8564"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </div>
            <div className="flex w-full md:w-fit items-center justify-between">
              <div className="border border-primary rounded-full w-52 h-10 flex md:hidden bg-[#FBFBFB]">
                <button
                  onClick={() => {
                    setActiveSize(9);
                  }}
                  className={`${
                    activeSize < 13.5
                      ? "w-2/5 h-full rounded-full p-1 shadow-inner bg-gradient-to-br from-[#CA9A51] to-[#E4B979]"
                      : "w-2/5 h-full rounded-full p-1 bg-[#FBFBFB]"
                  } `}
                >
                  <div
                    className={`${
                      activeSize < 13.5 ? "bg-[#CE9640]" : "bg-[#FBFBFB]"
                    } w-full h-full rounded-full  flex items-center justify-center`}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        activeSize < 13.5 ? "text-white" : "text-black"
                      }`}
                    >
                      9x9 {measurement.activeDimension}
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveSize(13.5);
                  }}
                  className={`w-3/5 h-full rounded-full p-1 ${
                    activeSize >= 13.5 ? "bg-[#CE9640]" : "bg-[#FBFBFB]"
                  }`}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <p
                      className={`text-xs font-semibold ${
                        activeSize >= 13.5 ? "text-white" : "text-black"
                      }`}
                    >
                      13.5x13.5 {measurement.activeDimension}
                    </p>
                  </div>
                </button>
              </div>

              <div className="flex mt-0 space-x-7">
                <button
                  onClick={() => {
                    setEditedTiles([]);
                    setZoom(1);
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="1">
                      <path
                        d="M15.0087 16.6584C13.617 17.7084 11.8753 18.3334 10.0003 18.3334C5.40032 18.3334 2.59199 13.7 2.59199 13.7M2.59199 13.7H6.35866M2.59199 13.7V17.8667M18.3337 10C18.3337 11.5167 17.9253 12.9417 17.217 14.1667M5.02533 3.30835C6.40866 2.27502 8.12532 1.66669 10.0003 1.66669C15.5587 1.66669 18.3337 6.30002 18.3337 6.30002M18.3337 6.30002V2.13335M18.3337 6.30002H14.6337M1.66699 10C1.66699 8.48335 2.06699 7.05835 2.77533 5.83335"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </button>
                {/* Delete Button */}
                <button onClick={deleteTileChoice}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="1">
                      <path
                        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.08301 4.14169L7.26634 3.05002C7.39967 2.25835 7.49967 1.66669 8.90801 1.66669H11.0913C12.4997 1.66669 12.608 2.29169 12.733 3.05835L12.9163 4.14169"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.6748 18.3334H7.32484C4.99984 18.3334 4.92484 17.3167 4.83317 16.0083L4.2915 7.61668"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.7084 7.61668L15.1667 16.0083"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.6084 13.75H11.3834"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.6833 10.4167H12.0833"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.91699 10.4167H8.60866"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-auto my-6 lg:h-[500px] md:h-[300px] h-[200px]">
            <Grid containerRef={containerRef} />
          </div>

          <div
            className={`flex items-center justify-between ${
              activeTilePath.includes("Rio") || tileName === "Rio"
                ? "lg:mt-20 mt-24"
                : "fj"
            }`}
          >
            <div className="flex space-x-7 md:hidden">
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="1">
                    <path
                      d="M9.14986 6.92499H3.44153"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.94153 15.2583H12.6082C14.9082 15.2583 16.7749 13.3917 16.7749 11.0917C16.7749 8.79165 14.9082 6.92499 12.6082 6.92499"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.35831 9.00834L3.22498 6.875L5.35831 4.74167"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="1">
                    <path
                      d="M10.8501 6.92499H16.5584"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.0584 15.2583H7.39176C5.09176 15.2583 3.2251 13.3917 3.2251 11.0917C3.2251 8.79165 5.09176 6.92499 7.39176 6.92499"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.6414 9.00834L16.7747 6.875L14.6414 4.74167"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="flex space-x-5 md:hidden">
              {/* Zoom In Button */}
              <button
                onClick={() => {
                  setZoom(Math.min(zoom + 0.1, 3)); // max zoom in 300%
                }}
              >
                <svg
                  width="34"
                  height="33"
                  viewBox="0 0 34 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="1">
                    <ellipse
                      cx="16.9342"
                      cy="16.5"
                      rx="16.9342"
                      ry="16.5"
                      fill={zoom >= 3 ? "#FDECD1" : "#FFE3B7"}
                    />
                    <path
                      d="M15.4333 15.9092H18.386"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.9099 17.3855V14.4329"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.7929 10.1811C19.8931 10.1811 22.4029 12.6909 22.4029 15.7911C22.4029 18.8914 19.8931 21.4011 16.7929 21.4011C13.6926 21.4011 11.1829 18.8914 11.1829 15.7911C11.1829 13.6062 12.4289 11.7165 14.2536 10.7894"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.9918 21.9916L21.8108 20.8105"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>

              {/* Zoom out button */}
              <button
                onClick={() => {
                  setZoom(Math.max(zoom - 0.1, 0.1)); // min zoom out 10%
                }}
              >
                <svg
                  width="35"
                  height="34"
                  viewBox="0 0 35 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="1">
                    <circle
                      cx="17.8684"
                      cy="17"
                      r="17"
                      fill={zoom <= 0.1 ? "#FDECD1" : "#FFE3B7"}
                    />
                    <path
                      d="M16.2036 16.936H19.1677"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.686 11.1856C20.7983 11.1856 23.3178 13.7051 23.3178 16.8174C23.3178 19.9297 20.7983 22.4492 17.686 22.4492C14.5737 22.4492 12.0542 19.9297 12.0542 16.8174C12.0542 14.624 13.3051 12.727 15.1369 11.7962"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23.9115 23.042L22.7258 21.8564"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </div>

            <button
              onClick={randomizeTileChoice}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 md:flex hidden space-x-3 items-center"
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
                    d="M12.4466 12.4467L13.9266 11.7067V9.85336M9.47991 6.52002L7.99991 7.26003L9.47991 6.52002ZM7.99991 7.26003L6.51991 6.52002L7.99991 7.26003ZM7.99991 7.26003V9.11336V7.26003ZM13.9266 4.29336L12.4466 5.03336L13.9266 4.29336ZM13.9266 4.29336L12.4466 3.55336L13.9266 4.29336ZM13.9266 4.29336V6.14669V4.29336ZM9.47991 2.07336L7.99991 1.33336L6.51991 2.07336H9.47991ZM2.07324 4.29336L3.55324 3.55336L2.07324 4.29336ZM2.07324 4.29336L3.55324 5.03336L2.07324 4.29336ZM2.07324 4.29336V6.14669V4.29336ZM7.99991 14.6667L6.51991 13.9267L7.99991 14.6667ZM7.99991 14.6667L9.47991 13.9267L7.99991 14.6667ZM7.99991 14.6667V12.8134V14.6667ZM3.55324 12.4467L2.07324 11.7067V9.85336L3.55324 12.4467Z"
                    stroke="#CC9C53"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="text-sm font-medium">Randomise</p>
            </button>

            <button
              onClick={rotateDiv}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 md:flex hidden space-x-3 items-center"
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
                    d="M2.22021 8.88663C2.22021 12.08 4.80688 14.6666 8.00022 14.6666C11.1935 14.6666 13.7802 12.08 13.7802 8.88663C13.7802 7.69996 13.4202 6.59329 12.8069 5.67329M9.92688 3.38663C9.34688 3.21329 8.70688 3.09996 8.00022 3.09996C5.86021 3.09996 3.98688 4.26663 2.99355 5.99329"
                    stroke="#CC9C53"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0866 3.54669L8.15991 1.33336"
                    stroke="#CC9C53"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0868 3.54668L7.84009 5.18668"
                    stroke="#CC9C53"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="text-sm font-medium">Rotate All</p>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 md:flex hidden space-x-3 items-center"
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
                    d="M14.6671 3.40665V10.98C14.6671 11.9467 13.9737 12.3533 13.1271 11.8867L10.6671 10.5133V5.99332C10.6671 4.85332 9.73375 3.92 8.59375 3.92H5.33374V3.40665C5.33374 2.26665 6.26706 1.33333 7.40706 1.33333H12.5938C13.7338 1.33333 14.6671 2.26665 14.6671 3.40665Z"
                    stroke="#CC9C53"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.33374 13.5667C1.33374 14.5334 2.02707 14.9401 2.87374 14.4734L5.49373 13.0134C5.77373 12.8601 6.22708 12.8601 6.50708 13.0134L9.12708 14.4734C9.97374 14.9401 10.6671 14.5334 10.6671 13.5667V5.99338C10.6671 4.85338 9.73375 3.92006 8.59375 3.92006H3.40706C2.26706 3.92006 1.33374 4.85338 1.33374 5.99338V10.3401"
                    stroke="#CC9C53"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p>Save</p>
            </button>

            <Link href="https://212dimensions.com/my-cart">
              <button className="border border-[#F6E2C4] rounded-full px-5 py-2 md:flex hidden space-x-3 items-center">
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

                <p className="text-sm font-medium">Add to Cart</p>
              </button>
            </Link>

            <div className="flex space-x-5">
              <p className="font-bold">TOTAL:</p>
              {activeTilePath && price ? (
                <p>
                  &#8364;
                  {Math.round(price)}
                </p>
              ) : (
                <p>-- --</p>
              )}
            </div>
          </div>
          {isModalOpen && (
            <SaveModal
              containerRef={containerRef}
              onClose={() => setIsModalOpen(false)}
            />
          )}

          <div className="md:hidden flex items-center justify-between py-5">
            <div className="w-10" />
            <Link href="https://212dimensions.com/my-cart">
              <button className="border border-[#F6E2C4] rounded-full px-5 py-2 flex md:hidden space-x-3 items-center">
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

                <p className="text-sm font-medium">Add to Cart</p>
              </button>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 flex md:hidden"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6671 3.40665V10.98C14.6671 11.9467 13.9737 12.3533 13.1271 11.8867L10.6671 10.5133V5.99332C10.6671 4.85332 9.73375 3.92 8.59375 3.92H5.33374V3.40665C5.33374 2.26665 6.26706 1.33333 7.40706 1.33333H12.5938C13.7338 1.33333 14.6671 2.26665 14.6671 3.40665Z"
                  stroke="#CC9C53"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.33374 13.5667C1.33374 14.5334 2.02707 14.9401 2.87374 14.4734L5.49373 13.0134C5.77373 12.8601 6.22708 12.8601 6.50708 13.0134L9.12708 14.4734C9.97374 14.9401 10.6671 14.5334 10.6671 13.5667V5.99338C10.6671 4.85338 9.73375 3.92006 8.59375 3.92006H3.40706C2.26706 3.92006 1.33374 4.85338 1.33374 5.99338V10.3401"
                  stroke="#CC9C53"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className={`flex items-center justify-between`}>
            <button
              onClick={randomizeTileChoice}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 flex md:hidden space-x-3 items-center"
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
                    d="M12.4466 12.4467L13.9266 11.7067V9.85336M9.47991 6.52002L7.99991 7.26003L9.47991 6.52002ZM7.99991 7.26003L6.51991 6.52002L7.99991 7.26003ZM7.99991 7.26003V9.11336V7.26003ZM13.9266 4.29336L12.4466 5.03336L13.9266 4.29336ZM13.9266 4.29336L12.4466 3.55336L13.9266 4.29336ZM13.9266 4.29336V6.14669V4.29336ZM9.47991 2.07336L7.99991 1.33336L6.51991 2.07336H9.47991ZM2.07324 4.29336L3.55324 3.55336L2.07324 4.29336ZM2.07324 4.29336L3.55324 5.03336L2.07324 4.29336ZM2.07324 4.29336V6.14669V4.29336ZM7.99991 14.6667L6.51991 13.9267L7.99991 14.6667ZM7.99991 14.6667L9.47991 13.9267L7.99991 14.6667ZM7.99991 14.6667V12.8134V14.6667ZM3.55324 12.4467L2.07324 11.7067V9.85336L3.55324 12.4467Z"
                    stroke="#CC9C53"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="text-sm font-medium">Randomise</p>
            </button>

            <button
              onClick={rotateDiv}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 flex md:hidden space-x-3 items-center"
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
                    d="M2.22021 8.88663C2.22021 12.08 4.80688 14.6666 8.00022 14.6666C11.1935 14.6666 13.7802 12.08 13.7802 8.88663C13.7802 7.69996 13.4202 6.59329 12.8069 5.67329M9.92688 3.38663C9.34688 3.21329 8.70688 3.09996 8.00022 3.09996C5.86021 3.09996 3.98688 4.26663 2.99355 5.99329"
                    stroke="#CC9C53"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0866 3.54669L8.15991 1.33336"
                    stroke="#CC9C53"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0868 3.54668L7.84009 5.18668"
                    stroke="#CC9C53"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="text-sm font-medium">Rotate All</p>
            </button>
          </div>
        </div>

        <div className="lg:flex flex-col mb-16 space-y-5 hidden">
          {/* Zoom in button */}
          <button
            onClick={() => {
              setZoom(Math.min(zoom + 0.1, 3)); // max zoom in 300%
            }}
          >
            <svg
              width="34"
              height="33"
              viewBox="0 0 34 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="1">
                <ellipse
                  cx="16.9342"
                  cy="16.5"
                  rx="16.9342"
                  ry="16.5"
                  fill={zoom >= 3 ? "#FDECD1" : "#FFE3B7"}
                />
                <path
                  d="M15.4333 15.9092H18.386"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.9099 17.3855V14.4329"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.7929 10.1811C19.8931 10.1811 22.4029 12.6909 22.4029 15.7911C22.4029 18.8914 19.8931 21.4011 16.7929 21.4011C13.6926 21.4011 11.1829 18.8914 11.1829 15.7911C11.1829 13.6062 12.4289 11.7165 14.2536 10.7894"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.9918 21.9916L21.8108 20.8105"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>

          {/* Zoom out button */}
          <button
            onClick={() => {
              setZoom(Math.max(zoom - 0.1, 0.1)); // min zoom out 10%
            }}
          >
            <svg
              width="35"
              height="34"
              viewBox="0 0 35 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="1">
                <circle
                  cx="17.8684"
                  cy="17"
                  r="17"
                  fill={zoom <= 0.1 ? "#FDECD1" : "#FFE3B7"}
                />
                <path
                  d="M16.2036 16.936H19.1677"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.686 11.1856C20.7983 11.1856 23.3178 13.7051 23.3178 16.8174C23.3178 19.9297 20.7983 22.4492 17.686 22.4492C14.5737 22.4492 12.0542 19.9297 12.0542 16.8174C12.0542 14.624 13.3051 12.727 15.1369 11.7962"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.9115 23.042L22.7258 21.8564"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
