import useDeviceWidth from '@/hooks/useDeviceWidth'; // Path to your custom hook
import Tile from '@/public/assets/tile.svg';
import useTileStore from '@/store';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function Grid() {
  const deviceWidth = useDeviceWidth();
  const boxSize = deviceWidth >= 1024 ? 80 : 60; // Size of each box in pixels
  const containerRef = useRef<any>(null);

  const [numRows, setNumRows] = useState(3); // Initial number of rows, adjust as needed
  const [numCols, setNumCols] = useState(3); // Initial number of columns, same as rows

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

        // Set number of rows and columns
        setNumRows(newNumRows);
        setNumCols(newNumCols);
      }
    };

    // Call calculateGrid initially and on window resize
    calculateGrid();
    window.addEventListener('resize', calculateGrid);

    return () => {
      window.removeEventListener('resize', calculateGrid);
    };
  }, [deviceWidth]);

  // Create arrays of row and column indices
  const rows = Array.from({ length: numRows }, (_, index) => index);
  const cols = Array.from({ length: numCols }, (_, index) => index);

  const tileName = useTileStore((state) => state.tileName);

  return (
    <>
      <div
        className="grid-container rounded-lg my-7 relative"
        ref={containerRef}
      >
        {!tileName && (
          <div className="w-full h-full absolute flex items-center justify-center">
            <p className="text-[#616161] text-lg">Please choose a model</p>
          </div>
        )}
        {rows.map((rowIndex) => (
          <div key={rowIndex} className="flex">
            {cols.map((colIndex) => (
              <div
                key={colIndex}
                className="w-16 h-16 bg-[#FAFAFA] border border-[#F1F1F1]"
                style={{ width: `${boxSize}px`, height: `${boxSize}px` }}
              >
                {rows.length > 3 && tileName === 'Hanoi' && (
                  <Image
                    src={Tile}
                    className="w-full h-full object-cover"
                    alt="Tile"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Grid;

