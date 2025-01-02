import useDeviceWidth from "@/hooks/useDeviceWidth"; // Path to your custom hook
import useTileStore, { irregularTile } from "@/store";
import Image from "next/image";
import React, {  useEffect, useMemo, useState } from "react";
import { collectionTiles } from "@/data/tileCatgories";
import { toast } from "react-toastify";

const Grid = ({ isMainGrid = true, focusedTileSpec: { index: focusedTileIndex }, setFocusedTile, gridRef: containerRef }: any) => {
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
  const [numRows, setNumRows] = useState(measurement.rows);
  const [numCols, setNumCols] = useState(measurement.columns);
  const zoom = useTileStore((state) => state.zoom);
  const boxSize = activeSize * 10;
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

        // setScale(newScale);
      }
    };

    // Call calculateGrid initially and on window resize
    isMainGrid && calculateGrid();
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

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>, index: string) => {
    e.preventDefault();
    if (irregularTile.includes(activeTile)) {
      toast.info("Can't drop here", {
        toastId: ";)",
      });
    }
    const editedIndex = getIndex(index);
    const data = e.dataTransfer.getData("text/plain");
    const [_tilePath, tileName] = data.split("*+=");

    if (tileName && irregularTile.includes(tileName) === irregularTile.includes(activeTile)) {
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

  const handleDrag = (e: React.DragEvent<HTMLButtonElement>, draggedTilePath: string) => {
    console.log("here");
    e.dataTransfer.setData("text/plain", `${draggedTilePath}*+=${activeTile}`);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: string) => {
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
    setFocusedTile(index, pathCache[index] || activeTilePath, [(rect.left + rect.right) / 2, rect.bottom + 20]);
  };

  useEffect(() => {
    if (window.outerWidth < 450 && numCols > 16) {
      console.log("here");
      toast.info("Rotate your device for a better experience", {
        toastId: ":)",
      });
    }
  }, [numCols]);

  return (
    <div
      className={` grid-container space-y-[1.5px] w-full origin-top-left rounded-lg relative h-full`}
      ref={containerRef}
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "top left",
      }}
    >
      { !activeTilePath && (
        <div className="w-full h-full absolute flex items-center justify-center">
          <p className="text-[#616161] text-lg">Please choose a model</p>
        </div>
      )}
      {rows.map((rowIndex) => {
        return (
          <div key={rowIndex} className="flex space-x-[1.5px]">
            {cols.map((colIndex) => {
              const editedTile = editedTiles[getIndex(`${colIndex}-${rowIndex}`)];

              return (
                rows.length > 0 &&
                activeTilePath !== "" && (
                  <button
                    key={colIndex}
                    onClick={(e) => {
                      handleClick(e, `${colIndex}-${rowIndex}`);
                    }}
                    className={`   border-0 border-[#F1F1F1] h-full w-full overflow-hidden relative  `}
                    onDragOver={handleDragOver}
                    onDragStart={(e) => handleDrag(e, editedTile?.tilePath || pathCache[`${colIndex}-${rowIndex}`] || activeTilePath)}
                    onDrop={(e) => handleDrop(e, `${colIndex}-${rowIndex}`)}
                    style={
                      focusedTileIndex === `${colIndex}-${rowIndex}`
                        ? {
                            zIndex: 10,
                            borderStyle: "none",
                            borderWidth: "0px",
                            boxShadow: "0 -3px 16px rgba(0, 0, 0, 0.3)",
                            scale: 1.09,
                            transformOrigin: "49.8% 49.8%",
                          }
                        : {}
                    }
                  >
                    {getIndex(`${colIndex}-${rowIndex}`) === -1 ? (
                      <Image
                        src={pathCache[`${colIndex}-${rowIndex}`] || activeTilePath}
                        width={"0"}
                        height={"0"}
                        className="w-full h-auto object-cover relative "
                        alt="Tile"
                        style={{
                          rotate: `${activeRotationDegree}deg`,
                          transformOrigin: "49.8% 49.8%",
                          scale: 1.04,
                        }}
                      />
                    ) : (
                      <>
                        {editedTile.tilePath && (
                          <Image
                            src={editedTile.tilePath ?? ""}
                            width={"0"}
                            height={"0"}
                            className="w-full h-auto object-cover relative"
                            alt="Tile"
                            style={{
                              rotate: `${editedTile?.rotationDegree}deg`,
                              transformOrigin: "49.8% 49.8%",
                              scale: 1.04,
                            }}
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
