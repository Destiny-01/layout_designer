"use client";
import Grid from "@/components/Grid";
import icons from "@/components/icons";
import SaveModal from "@/components/SaveModal";
import TileCategory from "@/components/TileCategory";
import { collectionTiles, colorVariation } from "@/data/tileCatgories";
import useTileStore, { HistoryEntry, useHistoryStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [showTile, setShowTile] = useState<boolean>(false);
  const [showSeeAllTile, setShowSeeAllTile] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState<number | null>(null);

  const containerRef = useRef<any>(null);
  const rotationDegree = useTileStore((state) => state.activeRotationDegree);
  const setActiveRotationDegree = useTileStore(
    (state) => state.setActiveRotationDegree
  );
  const editedTiles = useTileStore((state) => state.editedTiles);
  const activeTilePath = useTileStore((state) => state.activeTilePath);
  const setEditedTiles = useTileStore((state) => state.setEditedTiles);
  const zoom = useTileStore((state) => state.zoom);
  const setZoom = useTileStore((state) => state.setZoom);
  const storedTileColor = useTileStore((state) => state.tileColor);

  const tileName = useTileStore((state) => state.tileName);
  const specificTile = collectionTiles.find((item) => {
    return item.tileName === tileName;
  });
  const setTileName = useTileStore((state) => state.setTileName);
  const activeTile = useTileStore((state) => state.tileName);
  const setActiveTilePath = useTileStore((state) => state.setActiveTilePath); //
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

  const [formData, setFormData] = useState({
    width: "",
    height: "",
  });

  const [showSaveBtn, setShowSaveBtn] = useState<boolean>(false);

  const handleInput = (inputName: string, inputValue: string) => {
    setFormData((prevObj) => ({ ...prevObj, [inputName]: inputValue }));
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
      executeAction(newState);
      setCurrentIndex(newIndex);
    }
  };

  const redo = (e: any) => {
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

  const calcSquareMeters = () => {
    // if (containerRef.current) {
    //   const availableWidth = containerRef.current.offsetWidth;
    //   const availableHeight = containerRef.current.offsetHeight;
    //   let containerWidth = customWidth > 20 ? customWidth : availableWidth;

    //   let containerHeight =
    //     customHeight > 20 ? customHeight : availableHeight;
    //   containerHeight =
    //     activeTile === "Rio" && activeTilePath.includes("Rio")
    //       ? containerHeight - 40
    //       : containerHeight;
    //   return `${widthCount} by ${heightCount}`;
    console.log(measurement.columns);
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
          <div className="md:w-fit ">
            <div className="flex  space-x-3 md:space-x-5">
              <div>
                <p className="text-gold text-xs">Height (mm)</p>
                <input
                  type="number"
                  className="md:w-24 w-full h-10 border border-primary rounded-full p-3 mt-2"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                  name="height"
                />
              </div>
              <div>
                <p className="text-gold text-xs">Width (mm)</p>
                <input
                  type="number"
                  className="md:w-24 w-full h-10 border border-primary rounded-full p-3 mt-2"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                  name="width"
                />
              </div>
            </div>
            <p className="pt-5 text-center lg:max-w-52 text-black opacity-40 text-[10px]">
              This visualizer is intended for demonstration purposes only. It
              automatically rounds down to the nearest whole number, providing
              an approximate representation. For accurate planning, please
              verify using your own drawings and measurements. 10% contigency
              buffer not included but recommended for breakages
            </p>
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
                  9x9 {"in"}
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
                  13.5x13.5 {"in"}
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
                <icons.DownPointer showSeeAllTile={showTile} />
              </button>
              {showTile && <TileCategory />}
            </div>

            <div>
              <button
                onClick={() => setShowSeeAllTile(!showSeeAllTile)}
                className="flex space-x-2 items-center"
              >
                <p className="font-mermaid font-bold">See All</p>
                <icons.DownPointer showSeeAllTile={showSeeAllTile} />
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
                <icons.Undo />
              </button>

              <button onClick={redo}>
                <icons.Redo />
              </button>
            </div>
            <div className="md:flex hidden space-x-5 lg:hidden">
              {/* Zoom In Button */}
              <button
                onClick={() => {
                  setZoom(Math.min(zoom + 0.1, 3)); // max zoom in 300%
                }}
              >
                <icons.ZoomIn zoom={zoom} />
              </button>

              {/* Zoom out button */}
              <button
                onClick={() => {
                  setZoom(Math.max(zoom - 0.1, 0.1)); // min zoom out 10%
                }}
              >
                <icons.ZoomOut zoom={zoom} />
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
                      9x9 {"in"}
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
                      13.5x13.5 {"in"}
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
                  <icons.Refresh />
                </button>
                {/* Delete Button */}
                <button onClick={deleteTileChoice}>
                  <icons.Delete />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-auto my-6 lg:h-[500px] md:h-[300px] h-[200px]">
            <Grid containerRef={containerRef} />
          </div>
          <div className="">
            {((((measurement.columns * activeSize * 10) / 1000) *
              (measurement.rows * activeSize * 10)) /
              1000).toFixed(2)}{" "}
            SQUARE METER
          </div>

          <div
            className={`flex items-center justify-between  ${
              activeTilePath.includes("Rio") || tileName === "Rio"
                ? "lg:mt-20 mt-24"
                : "fj"
            }`}
          >
            <div className="flex space-x-7 md:hidden">
              <div>
                <icons.Undo />
              </div>
              <div>
                <icons.Redo />
              </div>
            </div>

            <div className="flex space-x-5 md:hidden">
              {/* Zoom In Button */}
              <button
                onClick={() => {
                  setZoom(Math.min(zoom + 0.1, 3)); // max zoom in 300%
                }}
              >
                <icons.ZoomIn zoom={zoom} />
              </button>

              {/* Zoom out button */}
              <button
                onClick={() => {
                  setZoom(Math.max(zoom - 0.1, 0.1)); // min zoom out 10%
                }}
              >
                <icons.ZoomOut zoom={zoom} />
              </button>
            </div>

            <button
              onClick={randomizeTileChoice}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 md:flex hidden space-x-3 items-center"
            >
              <div>
                <icons.Random />
              </div>

              <p className="text-sm font-medium">Randomise</p>
            </button>

            <button
              onClick={rotateDiv}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 md:flex hidden space-x-3 items-center"
            >
              <div>
                <icons.Rotate />
              </div>

              <p className="text-sm font-medium">Rotate All</p>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 md:flex hidden space-x-3 items-center"
            >
              <div>
                <icons.Save />
              </div>
              <p>Save</p>
            </button>

            <Link href="https://212dimensions.com/my-cart">
              <button className="border border-[#F6E2C4] rounded-full px-5 py-2 md:flex hidden space-x-3 items-center">
                <div>
                  <icons.Cart />
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
                  <icons.Cart />
                </div>

                <p className="text-sm font-medium">Add to Cart</p>
              </button>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 flex md:hidden"
            >
              <icons.Save />
            </button>
          </div>

          <div className={`flex items-center justify-between`}>
            <button
              onClick={randomizeTileChoice}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 flex md:hidden space-x-3 items-center"
            >
              <div>
                <icons.Random />
              </div>

              <p className="text-sm font-medium">Randomise</p>
            </button>

            <button
              onClick={rotateDiv}
              className="border border-[#F6E2C4] rounded-full px-5 py-2 flex md:hidden space-x-3 items-center"
            >
              <div>
                <icons.Rotate />
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
            <icons.ZoomIn zoom={zoom} />
          </button>

          {/* Zoom out button */}
          <button
            onClick={() => {
              setZoom(Math.max(zoom - 0.1, 0.1)); // min zoom out 10%
            }}
          >
            <icons.ZoomOut zoom={zoom} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
