"use client";
import React, { useEffect, useState } from "react";
import useTileStore from "@/store";
import { collectionTiles } from "@/data/tileCatgories";
import icons from "@/components/icons";
import { useRootLayoutContext } from "@/contexts/RootLayoutContext";

function Preiew() {
  const activeSize = useTileStore((state) => state.activeSize);
  const measurement = useTileStore((state) => state.measurement);
  const editedTiles = useTileStore((state) => state.editedTiles);
  const tileColor = useTileStore((state) => state.tileColor);
  const activeTileName = useTileStore((state) => state.tileName);
  const [infoTable, setInfoTable] = useState<
    {
      name: string;
      color: string;
      qty: any;
      price: number;
    }[]
  >([]);
  const { tilePreviewDataUrl } = useRootLayoutContext();

  const parseUrl = (url: string): string => {
    const parts = url.split("/");
    const collection = parts[parts.length - 2];
    const match = url.match(/\/([A-Za-z0-9]+)-([A-Za-z-]+)\.svg$/);
    if (match) {
      const colorPart = match[2].split("-");
      const color = colorPart.map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))).join("");
      return `${collection}-${color}`;
    }
    return "";
  };

  useEffect(() => {
    const details: any = {
      [`${activeTileName}-${tileColor}`]: measurement.columns * measurement.rows - editedTiles.length,
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
            ? (collectionTiles.find((item) => item.tileName === key.split("-")[0])?.price9by9 || 0) * details[key]
            : (collectionTiles.find((item) => item.tileName === key.split("-")[0])?.price13by13 || 0) * details[key],
      });
    }

    setInfoTable(infoTable);
  }, []);

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = tilePreviewDataUrl.current;
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
        <h1 className="text-xl font-semibold md:text-3xl text-center align-middle mb-3">Layout Visualiser</h1>

        <button onClick={() => handleDownloadImage()} className="border border-[#F6E2C4] rounded-full px-5 py-2 flex mb-4 space-x-3 items-center">
          <div>
            <icons.Save />
          </div>

          <p className="text-sm font-medium hidden">Save as image</p>
        </button>
      </div>

      {/* Image Box */}
      <div className="border-2 bg-gray-300 h-64 flex justify-center items-center mb-6">
        {/* <p className="text-gray-400">Image to be centred in here</p> */}

        <img className="h-4/5" src={tilePreviewDataUrl.current || localStorage.getItem("tilePreviewDataUrl")|| undefined} alt="No selection was made" />
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
        <div key={i} className="grid grid-cols-4 md:grid-cols-5 text-center text-sm mb-4">
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
        <span className="text-lg font-semibold col-start-2 md:col-start-3">Total</span>
        <span className="text-lg col-start-3 md:col-start-4">{(measurement.columns || 1) * (measurement.rows || 1)} tiles</span>
        <span className="text-lg col-sta">&#8364;{infoTable.reduce((total, item) => total + item.price, 0)}</span>
      </div>

      {/* Disclaimer Section */}
      <p className="text-xs text-center text-gray-500">
        Our visualiser is intended for demonstration purposes only. It automatically rounds down to the nearest whole number, providing an approximate
        representation. For accurate planning, please verify using your own drawings and measurements. 10% contingency buffer not included but
        recommended for breakages. Shipping not included.
      </p>
    </div>
  );
}

export default Preiew;
