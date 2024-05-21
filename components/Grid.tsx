import useDeviceWidth from "@/hooks/useDeviceWidth"; // Path to your custom hook
import useTileStore from "@/store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TileEditComponent from "./TileEditComponent";

function Grid({ isMainGrid = true }) {
  const deviceWidth = useDeviceWidth();
  const measurement = useTileStore((state) => state.measurement);
  const customWidth = measurement.customWidth;
  const activeDimension = measurement.activeDimension;
  const setActiveDimension = useTileStore((state) => state.setMeasurement);
  const [boxSize, setBoxSize] = useState(deviceWidth >= 1024 ? 80 : 60); // Size of each box in pixels
  const containerRef = useRef<any>(null);
  const [numRows, setNumRows] = useState(3); // Initial number of rows, adjust as needed
  const [numCols, setNumCols] = useState(3); // Initial number of columns, same as rows

  useEffect(() => {
    if (customWidth && activeDimension) {
      if (activeDimension === "cm") {
        setBoxSize(customWidth * 5);
      } else if (activeDimension === "in") {
        setBoxSize(customWidth * 7.5);
      }
    }
  }, [customWidth, activeDimension]);

  useEffect(() => {
    const calculateGrid = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;

        // Calculate number of rows and columns based on container width and box size
        const newNumCols = Math.floor(containerWidth / boxSize);
        const newNumRows =
          deviceWidth >= 1024
            ? Math.floor(containerWidth / 2 / boxSize)
            : Math.floor(containerWidth / boxSize);
        console.log(containerWidth);

        // Set number of rows and columns
        setNumRows(newNumRows);
        setActiveDimension({
          ...measurement,
          rows: newNumRows,
          columns: newNumCols,
        });
        setNumCols(newNumCols);
      }
    };

    // Call calculateGrid initially and on window resize
    // calculateGrid();
    calculateGrid();
    window.addEventListener("resize", calculateGrid);

    return () => {
      window.removeEventListener("resize", calculateGrid);
    };
    if (isMainGrid) {
    }
  }, [deviceWidth, boxSize, isMainGrid]);

  // Create arrays of row and column indices
  const rows = Array.from({ length: numRows }, (_, index) => index);
  const cols = Array.from({ length: numCols }, (_, index) => index);

  const activeTilePath = useTileStore((state) => state.activeTilePath);

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
        } grid-container rounded-lg my-7 relative`}
        ref={containerRef}
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
                  className="w-16 h-16 bg-[#FAFAFA] border border-[#F1F1F1]"
                  style={{ width: `${boxSize}px`, height: `${boxSize}px` }}
                >
                  {rows.length > 3 && activeTilePath !== "" && (
                    <button
                      onClick={() => {
                        setActiveTileIndex(`${colIndex}-${rowIndex}`);
                      }}
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
                                  : {
                                      rotate: `${activeTile.rotationDegree}deg`,
                                    }
                              }
                            />
                          )}
                        </>
                      )}

                      {activeTileIndex === `${colIndex}-${rowIndex}` && (
                        <TileEditComponent
                          tileIndex={activeTileIndex}
                          boxSize={boxSize}
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
