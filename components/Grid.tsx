import useDeviceWidth from "@/hooks/useDeviceWidth"; // Path to your custom hook
import useTileStore from "@/store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TileEditComponent from "./TileEditComponent";

function Grid({ isMainGrid = true }) {
  const deviceWidth = useDeviceWidth();
  const measurement = useTileStore((state) => state.measurement);
  const customWidth = measurement.customWidth;
  const customHeight = measurement.customHeight;
  const activeDimension = measurement.activeDimension;
  const setActiveDimension = useTileStore((state) => state.setMeasurement);
  const activeSize = useTileStore((state) => state.activeSize);
  const activeTile = useTileStore((state) => state.tileName);
  const activeTilePath = useTileStore((state) => state.activeTilePath);
  // const [boxSize, setBoxSize] = useState(deviceWidth >= 1024 ? 80 : 60); // Size of each box in pixels
  const containerRef = useRef<any>(null);
  const [numRows, setNumRows] = useState(3); // Initial number of rows, adjust as needed
  const [numCols, setNumCols] = useState(3); // Initial number of columns, same as rows
  const [scale, setScale] = useState(1);
  const singleTile = useRef<any>(null);

  useEffect(() => {
    if (customWidth && activeDimension) {
      if (activeDimension === "cm") {
        // setBoxSize(customWidth * 5);
      } else if (activeDimension === "in") {
        // setBoxSize(customWidth * 7.5);
      }
    }
  }, [customWidth, activeDimension]);

  const boxSize = activeSize > 9 ? 80 : 64;
  useEffect(() => {
    const calculateGrid = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.offsetWidth;
        const availableHeight = containerRef.current.offsetHeight;
        let containerWidth = customWidth > 20 ? customWidth : availableWidth;
        // containerWidth =
        //   activeDimension === "in" ? containerWidth * 0.393701 : containerWidth;
        let containerHeight =
          customHeight > 20 ? customHeight : availableHeight;
        containerHeight =
          activeTile === "Rio" && activeTilePath.includes("Rio")
            ? containerHeight - 40
            : containerHeight;
        // containerHeight =
        //   activeDimension === "in"
        //     ? containerHeight * 0.393701
        //     : containerHeight;

        const newNumCols = Math.floor(containerWidth / boxSize);
        const newNumRows = Math.floor(containerHeight / boxSize);
        // const newNumCols = Math.floor(containerWidth / boxSize);
        // const newNumRows =
        //   deviceWidth >= 1024
        //     ? Math.floor(containerWidth / 2 / boxSize)
        //     : Math.floor(containerWidth / boxSize);
        console.log(containerWidth, containerHeight, customWidth, boxSize);

        // Set number of rows and columns
        setNumRows(newNumRows);
        setActiveDimension({
          ...measurement,
          rows: newNumRows,
          columns: newNumCols,
        });
        setNumCols(newNumCols);

        // Calculate scale factor to fit the container within the available space
        const widthScale = availableWidth / containerWidth;
        const heightScale = availableHeight / containerHeight;
        const newScale = Math.min(widthScale, heightScale);

        setScale(newScale);
      }
    };

    // Call calculateGrid initially and on window resize
    // calculateGrid();
    calculateGrid();
    window.addEventListener("resize", calculateGrid);

    return () => {
      window.removeEventListener("resize", calculateGrid);
    };
  }, [
    deviceWidth,
    activeSize,
    activeTile,
    customWidth,
    customHeight,
    activeTilePath,
    isMainGrid,
    activeDimension,
  ]);

  // Create arrays of row and column indices
  const rows = Array.from({ length: numRows }, (_, index) => index);
  const cols = Array.from({ length: numCols }, (_, index) => index);

  const activeRotationDegree = useTileStore(
    (state) => state.activeRotationDegree
  );

  const editedTiles = useTileStore((state) => state.editedTiles);
  console.log({ editedTiles });

  const [activeTileIndex, setActiveTileIndex] = useState<string | null>(null);

  const getIndex = (tileIndex: string) => {
    let position = editedTiles.findIndex(
      (tile) => tile.tileIndex === tileIndex
    );
    return position;
  };
  console.log(boxSize, rows, numRows, numCols);

  return (
    <>
      <div
        className={`${
          !isMainGrid && "wfit mx-auto"
        } grid-container w-full origin-top-left h-[500px] rounded-lg my-7 relative min-h-32`}
        ref={containerRef}
        style={{ scale: scale }}
      >
        {rows.length > 3 && !activeTilePath && (
          <div className="w-full h-full absolute flex items-center justify-center">
            <p className="text-[#616161] text-lg">Please choose a model</p>
          </div>
        )}
        {rows.map((rowIndex) => (
          <div key={rowIndex} className="flex">
            {cols.map((colIndex) => {
              const activeTile =
                editedTiles[getIndex(`${colIndex}-${rowIndex}`)];
              activeTile &&
                console.log({ activeTile, colIndex, rowIndex, editedTiles });
              return (
                <div
                  key={colIndex}
                  className={`${
                    activeSize === 13 ? "w-20 h-20" : "w-16 h-16"
                  } bg-[#FAFAFA] border border-[#F1F1F1]`}
                  style={{ width: `${boxSize}px`, height: `${boxSize}px` }}
                >
                  {rows.length > 3 && activeTilePath !== "" && (
                    <button
                      onClick={() => {
                        setActiveTileIndex(`${colIndex}-${rowIndex}`);
                      }}
                      ref={singleTile}
                      className="relative"
                    >
                      {getIndex(`${colIndex}-${rowIndex}`) === -1 ? (
                        <Image
                          src={activeTilePath}
                          width={16}
                          height={16}
                          className="w-full h-full object-cover"
                          alt="Tile"
                          style={{
                            rotate: `${activeRotationDegree}deg`,
                          }}
                        />
                      ) : (
                        <>
                          {activeTile.rotateStyle === "flipX" &&
                            console.log(activeTile, {
                              transform: `rotateX(${activeTile.rotationDegree})`,
                            })}
                          {editedTiles[getIndex(`${colIndex}-${rowIndex}`)]
                            .tilePath && (
                            <Image
                              src={
                                editedTiles[getIndex(`${colIndex}-${rowIndex}`)]
                                  .tilePath ?? ""
                              }
                              width={16}
                              height={16}
                              className="w-full h-full object-cover"
                              alt="Tile"
                              style={
                                activeTile.rotateStyle === "flipX"
                                  ? {
                                      transform: `rotateY(${activeTile.rotationDegree}deg)`,
                                    }
                                  : activeTile.rotateStyle === "flipY"
                                  ? {
                                      transform: `rotateX(${activeTile.rotationDegree}deg)`,
                                    }
                                  : {}
                              }
                            />
                          )}
                        </>
                      )}

                      {activeTileIndex === `${colIndex}-${rowIndex}` && (
                        <TileEditComponent
                          tileIndex={activeTileIndex}
                          boxSizeHeight={singleTile.current?.offsetHeight}
                          boxSizeWidth={singleTile.current?.offsetWidth}
                        />
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default Grid;
