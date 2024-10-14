"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useTileStore from "@/store";
import { collectionTiles } from "@/data/tileCatgories";
import Image from "next/image";
import icons from "@/components/icons";
import { toPng } from "html-to-image";

function Preiew() {
  const activeSize = useTileStore((state) => state.activeSize);
  const activeTile = useTileStore((state) => state.tileName);
  const measurement = useTileStore((state) => state.measurement);
  const editedTiles = useTileStore((state) => state.editedTiles);
  const autoFillPattern = useTileStore((state) => state.autoFillPattern);
  const tileColor = useTileStore((state) => state.tileColor);
  const activeTilePath = useTileStore((state) => state.activeTilePath);
  const activeRotationDegree = useTileStore(
    (state) => state.activeRotationDegree
  );
  const zoom = useTileStore((state) => state.zoom);
  const [image, setImage] = useState("");
  const activeTileName = useTileStore((state) => state.tileName);
  const [infoTable, setInfoTable] = useState<
    {
      name: string;
      color: string;
      qty: any;
      price: number;
    }[]
  >([]);
  const activeCollection = collectionTiles.find(
    (tile) => tile.tileName === activeTile
  );
  const divRef = useRef<HTMLDivElement | null>(null);

  const renderAutoFill = (
    fillTilePath: string,
    colIndex: number,
    initialRowIndex: number
  ) => {
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
      const definiteIndex = (initialRowIndex - 1) % rows; //+ 1;
      let rowIndex =
        initialRowIndex + 1 > rows ? definiteIndex : initialRowIndex;
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

      return (
        singleCategory?.tileVariation.find(
          (tile) => tile.tileColor === tileColor
        )?.tilePath || singleCategory?.tileVariation[0].tilePath
      );
    } else {
      return fillTilePath;
    }
  };

  const getIndex = useMemo(
    () => (tileIndex: string) => {
      return editedTiles.findIndex((tile) => tile.tileIndex === tileIndex);
    },
    [editedTiles] // Dependency: Recompute only when `editedTiles` changes
  );


  const parseUrl = (url: string): string => {
    const parts = url.split("/");
    const collection = parts[parts.length - 2];
    const match = url.match(/\/([A-Za-z0-9]+)-([A-Za-z-]+)\.svg$/);
    if (match) {
      const colorPart = match[2].split("-");
      const color = colorPart
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");
      return `${collection}-${color}`;
    }
    return "";
  };

  useEffect(() => {
    const details: any = {
      [`${activeTileName}-${tileColor}`]:
        measurement.columns * measurement.rows - editedTiles.length,
    };
    for (let i = 0; i < editedTiles.length; i++) {
      const element = editedTiles[i];
      const name = parseUrl(element.tilePath as string);
      details[name] = (details[name] || 0) + 1;
    }
    const infoTable = [];
    for (const key in details) {
      infoTable.push({
        name: key.split("-")[0],
        color: key.split("-")[1],
        qty: details[key],
        price:
          activeSize === 9
            ? (collectionTiles.find(
                (item) => item.tileName === key.split("-")[0]
              )?.price9by9 || 0) * details[key]
            : (collectionTiles.find(
                (item) => item.tileName === key.split("-")[0]
              )?.price13by13 || 0) * details[key],
      });
    }

    setInfoTable(infoTable);
  }, []);

  useEffect(() => {
    const render = () => {
      if (divRef.current) {
        const style = {
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          width: `${divRef.current.offsetWidth}px`,
          height: `${divRef.current.offsetHeight}px`,
        };

        toPng(divRef.current, {
          width: divRef.current.scrollWidth * zoom,
          height: divRef.current.scrollHeight * zoom,
          style,
        })
          .then((dataUrl: string) => {
            const img = document.createElement("img") as HTMLImageElement;
            img.src = dataUrl;
            setImage(dataUrl);
          })
          .catch((error: Error) => {
            console.error("Oops, something went wrong!", error);
          })
          .finally(() => console.log("done"));
      }
    };
    var pf = performance.now();
    render();
  }, []);

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "component.png";
    link.click();
  };

  return (
    <div className="lg:px-24 md:px-16 px-6 py-6 ">
      <div className=" sm:flex sm:justify-between text-sm sm:text-lg text-center mb-8">
        <div className="mb-4">
          <p>Vico Della Tofa, 55</p>
          <p>Quartier Spagnoli | Napoli</p>
          <p>80132 | Italia</p>
        </div>
        <div className="mb-4">
          <p>Via Nuova Villa, 68a</p>
          <p>San Giovanni à Teduccio | Napoli</p>
          <p>80146 | Italia</p>
        </div>
        <div className="mb-4">
          <p>hello@212dimensions.com</p>
          <p>www.212dimensions.com</p>
          <p>@212dimensions</p>
        </div>
      </div>

      {/* Layout Visualiser Title */}
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-semibold md:text-3xl text-center align-middle mb-3">
          Layout Visualiser
        </h1>

        <button
          onClick={() => handleDownloadImage()}
          className="border border-[#F6E2C4] rounded-full px-5 py-2 flex mb-4 space-x-3 items-center"
        >
          <div>
            <icons.Save />
          </div>

          <p className="text-sm font-medium hidden">Save as image</p>
        </button>
      </div>

      {/* Image Box */}
      <div className="border-2 bg-gray-300 h-64 flex justify-center items-center mb-6">
        {/* <p className="text-gray-400">Image to be centred in here</p> */}

        <div
          ref={divRef}
          className="h-4/5 gap-px"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${measurement.columns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${measurement.rows}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: measurement.rows }).map((_, j) =>
            Array.from({ length: measurement.columns }).map((_, i) => {
              const editedTile = editedTiles[getIndex(`${i}-${j}`)];
              return (
                activeTilePath !== "" && (
                  <div key={`${i}-${j}`}>
                    {getIndex(`${i}-${j}`) === -1 ? (
                      <Image
                        src={renderAutoFill(activeTilePath, i, j)}
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
                            className="w-full h-full object-cover"
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
                  </div>
                )
                // </div>
              );
            })
          )}
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 md:grid-cols-5 w-full border-b border-gray-300 mb-4 text-center">
        <span>Pattern</span>
        <span>Colour</span>
        <span className="hidden md:block">Size</span>
        <span>Quantity</span>
        <span>Cost</span>
      </div>

      {/* Table Data - (You can add rows dynamically here) */}
      {infoTable.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-4 md:grid-cols-5 text-center text-sm mb-4"
        >
          <span>{item.name} tile</span>
          <span>{item.color}</span>
          <span className="hidden md:block">{`${activeSize}x${activeSize}`}</span>
          <span>{item.qty} tiles</span>
          <span>
            &#8364;
            {item.price}
          </span>
        </div>
      ))}

      {/* Total Section */}
      <div className="grid grid-cols-4 md:grid-cols-5 text-center mb-6">
        <span className="text-lg font-semibold col-start-2 md:col-start-3">
          Total
        </span>
        <span className="text-lg col-start-3 md:col-start-4">
          {(measurement.columns || 1) * (measurement.rows || 1)} tiles
        </span>
        <span className="text-lg col-sta">
          &#8364;{infoTable.reduce((total, item) => total + item.price, 0)}
        </span>
      </div>

      {/* Disclaimer Section */}
      <p className="text-xs text-center text-gray-500">
        Our visualiser is intended for demonstration purposes only. It
        automatically rounds down to the nearest whole number, providing an
        approximate representation. For accurate planning, please verify using
        your own drawings and measurements. 10% contingency buffer not included
        but recommended for breakages. Shipping not included.
      </p>
    </div>
  );
}

export default Preiew;
