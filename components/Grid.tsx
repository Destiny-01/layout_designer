import useDeviceWidth from "@/hooks/useDeviceWidth"; // Path to your custom hook
import useTileStore from "@/store";
import Image from "next/image";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import TileEditComponent from "./TileEditComponent";
import { collectionTiles } from "@/data/tileCatgories";

const Grid = ({ isMainGrid = true, containerRef }: any) => {
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
  // const [boxSize, setBoxSize] = useState(deviceWidth >= 1024 ? 80 : 60); // Size of each box in pixels
  const [numRows, setNumRows] = useState(3); // Initial number of rows, adjust as needed
  const [numCols, setNumCols] = useState(3); // Initial number of columns, same as rows
  const [scale, setScale] = useState(1);
  const singleTile = useRef<any>(null);
  const zoom = useTileStore((state) => state.zoom);

  console.log(zoom, scale);

  useEffect(() => {
    if (customWidth && activeDimension) {
      if (activeDimension === "cm") {
        // setBoxSize(customWidth * 5);
      } else if (activeDimension === "in") {
        // setBoxSize(customWidth * 7.5);
      }
    }
  }, [customWidth, activeDimension]);

  const boxSize = activeSize > 9 ? 64 * 1.5 : 64;
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
    isMainGrid && calculateGrid();
    // calculateGrid();
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
  const activeSubCategory = useTileStore((state) => state.activeSubCategory);
  const autoFillPattern = useTileStore((state) => state.autoFillPattern);
  console.log({ editedTiles });

  const [activeTileIndex, setActiveTileIndex] = useState<string | null>(null);

  const getIndex = (tileIndex: string) => {
    let position = editedTiles.findIndex(
      (tile) => tile.tileIndex === tileIndex
    );
    return position;
  };
  console.log(boxSize, rows, numRows, numCols);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveTileIndex("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeCollection = collectionTiles.find(
    (tile) => tile.tileName === activeTile
  );
  const renderAutoFill = (
    fillTilePath: string,
    colIndex: number,
    initialRowIndex: number
  ) => {
    console.log(fillTilePath);
    const rows = Math.floor(autoFillPattern.length / 2);
    if (
      activeCollection &&
      activeCollection.subCategories.length > 1 &&
      autoFillPattern.length > 0
    ) {
      if (autoFillPattern.length < 3) {
        const singleCategory =
          activeCollection.subCategories[initialRowIndex % 2];
        return (
          singleCategory?.tileVariation.find(
            (tile) => tile.tileColor === tileColor
          )?.tilePath || singleCategory?.tileVariation[0].tilePath
        );
      }
      // console.log(autoFillPattern, fillTilePath);
      const definiteIndex = (initialRowIndex - 1) % rows; //+ 1;
      // if (colIndex % 2 === 0) {
      let rowIndex =
        initialRowIndex + 1 > rows ? definiteIndex : initialRowIndex;
      let index = Math.abs(
        colIndex % 2 === 0
          ? // ? (((rowIndex === 0 ? rowIndex : rowIndex + 2) - 1) %
            //     autoFillPattern.length) +
            //   1
            rowIndex % 2 === 0
            ? rowIndex + 1 > rows
              ? rowIndex - rows
              : rowIndex
            : (rowIndex === 0 ? rowIndex : rowIndex - 2) - 1
          : rowIndex % 2 === 0
          ? rowIndex + 1 - rows
          : rowIndex + 2
      );
      const singleCategory = activeCollection.subCategories[index];
      !singleCategory && console.log(singleCategory, rowIndex, rows, index);
      // console.log(
      //   singleCategory,
      //   fillTilePath,
      //   tileColor,
      //   singleCategory?.tileVariation.find(
      //     (tile) => tile.tileColor === tileColor
      //   )?.tilePath
      // );
      return (
        //   editedTiles.find(
        //   (tile) => tile.tileIndex === `${colIndex}-${rowIndex}`
        // )?.tilePath ??
        singleCategory?.tileVariation.find(
          (tile) => tile.tileColor === tileColor
        )?.tilePath || singleCategory?.tileVariation[0].tilePath
      );
      // } else {
      //   return
      // }
    } else {
      return fillTilePath;
    }
  };

  const handleSpacing = useCallback(() => {
    const activeTileIndexes = activeTileIndex?.split("-");
    let margin = "";
    if (activeTileIndexes) {
      margin = activeTileIndexes[0] === "0" ? margin + " ml-20" : "ml-0";
      margin =
        activeTileIndexes[1] === "0" ? margin + " mt-20" : margin + " mt-0";
      margin =
        activeTileIndexes[0] === String(cols.length - 1)
          ? margin + " mr-20"
          : margin + " mr-0";
      margin =
        activeTileIndexes[1] === String(rows.length - 1)
          ? margin + " mb-20"
          : margin + " mb-0";

      return margin;
    }
  }, [activeTileIndex]);

  return (
    <>
      <div
        className={`${handleSpacing()} grid-container w-full origin-top-left rounded-lg relative h-full`}
        ref={containerRef}
        style={{
          transform: `scale(${scale * zoom})`,
          transformOrigin: "top left",
          // width: `${numCols * boxSize}px`,
          // height: `${numRows * boxSize}px`,
        }}
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
                console.log({
                  activeTile,
                  colIndex,
                  rowIndex,
                  editedTiles,
                  tile: singleTile.current?.offsetWidth,
                  boxSize,
                });
              // console.log(
              //   getIndex(`${colIndex}-${rowIndex}`),
              //   activeTile,
              //   activeTilePath
              // );
              return (
                // <div
                // className={`${
                //   ""
                //   // activeSize === 13 ? "w-24 h-24" : "w-16 h-16"
                // } bg-[#FAFAFA] border border-[#F1F1F1]`}
                // style={{
                //   width: `fit-content`,
                //   height: `fit-content`,
                // width: `${
                //   singleTile.current?.offsetWidth > 20
                //     ? singleTile.current?.offsetWidth
                //     : boxSize * scale * zoom
                // }px`,
                // height: `${
                //   singleTile.current?.offsetHeight > 20
                //     ? singleTile.current?.offsetHeight
                //     : boxSize * scale * zoom
                // }px`,
                // }}
                // >
                rows.length > 1 &&
                activeTilePath !== "" && (
                  <button
                    key={colIndex}
                    onClick={() => {
                      setActiveTileIndex(`${colIndex}-${rowIndex}`);
                    }}
                    ref={singleTile}
                    className="relative bg-[#FAFAFA] border border-[#F1F1F1]"
                  >
                    {getIndex(`${colIndex}-${rowIndex}`) === -1 ? (
                      <Image
                        // src={activeTilePath}
                        src={renderAutoFill(activeTilePath, colIndex, rowIndex)}
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
                        {editedTiles[getIndex(`${colIndex}-${rowIndex}`)]
                          .tilePath && (
                          <Image
                            src={
                              // renderAutoFill(
                              editedTiles[getIndex(`${colIndex}-${rowIndex}`)]
                                .tilePath ?? ""
                              // colIndex,
                              // rowIndex
                              // )
                            }
                            width={"0"}
                            height={"0"}
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
                        tilePath={renderAutoFill(
                          activeTilePath,
                          colIndex,
                          rowIndex
                        )}
                        boxSizeHeight={singleTile.current?.offsetHeight}
                        boxSizeWidth={singleTile.current?.offsetWidth}
                      />
                    )}
                  </button>
                )
                // </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
