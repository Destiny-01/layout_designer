import useDeviceWidth from "@/hooks/useDeviceWidth"; // Path to your custom hook
import useTileStore, { irregularTile } from "@/store";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { collectionTiles } from "@/data/tileCatgories";

const Grid = ({ isMainGrid = true, focusedTileIndex, setFocusedTileIndex, setFocusedTilePath, gridRef: containerRef }: any) => {
  // const Grid = forwardRef(({ isMainGrid = true }: any, containerRef: any) => {
  const deviceWidth = useDeviceWidth();
  const measurement = useTileStore((state) => state.measurement);
  const customWidth = measurement.customWidth;
  const customHeight = measurement.customHeight;
  const activeDimension = measurement.activeDimension;
  const setActiveDimension = useTileStore((state) => state.setMeasurement);
  const activeSize = useTileStore((state) => state.activeSize);
  const activeTile = useTileStore((state) => state.tileName);
  const tileColor = useTileStore((state) => state.tileColor);
  const activeTilePath = useTileStore((state) => state.activeTilePath);
  const [numRows, setNumRows] = useState(measurement.rows); // Initial number of rows, adjust as needed
  const [numCols, setNumCols] = useState(measurement.columns); // Initial number of columns, same as rows
  const [scale, setScale] = useState(1);
  const singleTile = useRef<any>(null);
  const zoom = useTileStore((state) => state.zoom);
  const boxSize = activeSize * 10; // converted to (mm)
  const [pathCache, setPathCathe] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const calculateGrid = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.offsetWidth;
        const availableHeight = containerRef.current.offsetHeight;
        let containerWidth = customWidth > 20 ? customWidth : availableWidth;

        let containerHeight = customHeight > 20 ? customHeight : availableHeight;
        containerHeight = activeTile === "Rio" && activeTilePath.includes("Rio") ? containerHeight - 40 : containerHeight;

        const newNumCols = Math.floor(containerWidth / boxSize);
        const newNumRows = Math.floor(containerHeight / boxSize);

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
    isMainGrid && calculateGrid();
    // calculateGrid();
    window.addEventListener("resize", calculateGrid);

    return () => {
      window.removeEventListener("resize", calculateGrid);
    };
  }, [deviceWidth, activeSize, activeTile, customWidth, customHeight, activeTilePath, isMainGrid, activeDimension]);


  // Create arrays of row and column indices
  const rows = Array.from({ length: numRows }, (_, index) => index);
  const cols = Array.from({ length: numCols }, (_, index) => index);

  const activeRotationDegree = useTileStore((state) => state.activeRotationDegree);

  const editedTiles = useTileStore((state) => state.editedTiles);
  const setEditedTiles = useTileStore((state) => state.setEditedTiles);
  const autoFillPattern = useTileStore((state) => state.autoFillPattern);

  const getIndex = useMemo(
    () => (tileIndex: string) => {
      return editedTiles.findIndex((tile) => tile.tileIndex === tileIndex);
    },
    [editedTiles] // Dependency: Recompute only when `editedTiles` changes
  );

  const activeCollection = collectionTiles.find((tile) => tile.tileName === activeTile);

  useEffect(() => {
    const renderAutoFill = (fillTilePath: string, colIndex: number, initialRowIndex: number) => {
      const rows = Math.floor(autoFillPattern.length / 2);
      if (activeCollection && activeCollection.subCategories.length > 1 && autoFillPattern.length > 0) {
        if (autoFillPattern.length < 3) {
          const singleCategory = activeCollection.subCategories[initialRowIndex % 2];
          return singleCategory?.tileVariation.find((tile) => tile.tileColor === tileColor)?.tilePath || singleCategory?.tileVariation[0].tilePath;
        }
        const definiteIndex = (initialRowIndex - 1) % rows; //+ 1;
        let rowIndex = initialRowIndex + 1 > rows ? definiteIndex : initialRowIndex;
        let index = Math.abs(
          colIndex % 2 === 0
            ? rowIndex % 2 === 0
              ? rowIndex + 1 > rows
                ? rowIndex - rows
                : rowIndex
              : (rowIndex === 0 ? rowIndex : rowIndex - 2) - 1
            : rowIndex % 2 === 0
            ? rowIndex + 1 - rows
            : rowIndex + 2
        );
        const singleCategory = activeCollection.subCategories[index];

        return singleCategory?.tileVariation.find((tile) => tile.tileColor === tileColor)?.tilePath || singleCategory?.tileVariation[0].tilePath;
      } else {
        return fillTilePath;
      }
    };

    let pathCache: { [key: string]: string } = {};
    for (let i = 0; i < cols.length; i++) {
      for (let j = 0; j < rows.length; j++) {
        pathCache[`${i}-${j}`] = renderAutoFill(activeTilePath, i, j);
      }
    }
    setPathCathe(pathCache);
  }, [rows.length, cols.length, activeTilePath, autoFillPattern, tileColor]);

  const handleSpacing = useCallback(() => {
    const focusedTileIndexes = focusedTileIndex?.split("-");
    let margin = "";
    if (focusedTileIndexes) {
      margin = focusedTileIndexes[0] === "0" ? margin + " ml-20" : "ml-0";
      margin = focusedTileIndexes[1] === "0" ? margin + " mt-20" : margin + " mt-0";
      margin = focusedTileIndexes[0] === String(cols.length - 1) ? margin + " mr-20" : margin + " mr-0";
      margin = focusedTileIndexes[1] === String(rows.length - 1) ? margin + " mb-20" : margin + " mb-0";

      return margin;
    }
  }, [focusedTileIndex]);

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>, index: string) => {
    e.preventDefault();
    const editedIndex = getIndex(index);
    const data = e.dataTransfer.getData("text/plain");
    const [_tilePath, tileName] = data.split("*+=");

    if (irregularTile.includes(tileName) === irregularTile.includes(activeTile)) {
      let newArr = [...editedTiles];
      if (editedIndex !== -1) {
        newArr[editedIndex].tilePath = _tilePath;
      } else {
        const editedSpec = {
          tileIndex: index,
          rotationDegree: 0,
          rotateStyle: undefined,
          tilePath: _tilePath,
        };
        newArr.push(editedSpec);
      }
      setEditedTiles(newArr);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.dataTransfer.effectAllowed = "move";
  };

  const handleClick = (index: string) => {
    setFocusedTileIndex(index);
    setFocusedTilePath(pathCache[index] || activeTilePath);
  };

  return (
    <div
      className={`${handleSpacing()} grid-container w-full origin-top-left rounded-lg relative h-full`}
      ref={containerRef}
      style={{
        transform: `scale(${scale * zoom})`,
        transformOrigin: "top left",
      }}
    >
      {rows.length > 3 && !activeTilePath && (
        <div className="w-full h-full absolute flex items-center justify-center">
          <p className="text-[#616161] text-lg">Please choose a model</p>
        </div>
      )}
      {rows.map((rowIndex) => {
        return (
          <div key={rowIndex} className="flex">
            {cols.map((colIndex) => {
              const editedTile = editedTiles[getIndex(`${colIndex}-${rowIndex}`)];

              return (
                rows.length > 0 &&
                activeTilePath !== "" && (
                  <button
                    key={colIndex}
                    onClick={() => {
                      handleClick(`${colIndex}-${rowIndex}`);
                    }}
                    ref={singleTile}
                    className={` relative bg-[#FAFAFA] border border-[#F1F1F1]`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, `${colIndex}-${rowIndex}`)}
                    style={
                      focusedTileIndex === `${colIndex}-${rowIndex}`
                        ? {
                            transform: `scale(1.06)`,
                            zIndex: 10,
                            borderWidth: 0,
                            boxShadow: "0 -3px 16px rgba(0, 0, 0, 0.3)",
                          }
                        : {}
                    }
                  >
                    {getIndex(`${colIndex}-${rowIndex}`) === -1 ? (
                      <Image
                        src={pathCache[`${colIndex}-${rowIndex}`] || activeTilePath}
                        width={"0"}
                        height={"0"}
                        className="w-full h-full object-cover"
                        alt="Tile"
                        style={{
                          rotate: `${activeRotationDegree}deg`,
                        }}
                      />
                    ) : (
                      <>
                        {editedTile.tilePath && (
                          <Image
                            src={editedTile.tilePath ?? ""}
                            width={"0"}
                            height={"0"}
                            className="w-full h-full object-cover inline-block"
                            alt="Tile"
                            style={
                              editedTile.rotateStyle === "flipX"
                                ? {
                                    transform: `rotateY(${editedTile.rotationDegree}deg)`,
                                  }
                                : editedTile.rotateStyle === "flipY"
                                ? {
                                    transform: `rotateX(${editedTile.rotationDegree}deg)`,
                                  }
                                : {
                                    rotate: `${editedTile.rotationDegree}deg`,
                                  }
                            }
                          />
                        )}
                      </>
                    )}
                  </button>
                )
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
