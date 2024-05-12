import useDeviceWidth from '@/hooks/useDeviceWidth'; // Path to your custom hook
import useTileStore from '@/store';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import TileEditComponent from './TileEditComponent';

function Grid() {
  const deviceWidth = useDeviceWidth();
  const customWidth = useTileStore((state) => state.measurement).customWidth;
  const activeDimension = useTileStore(
    (state) => state.measurement,
  ).activeDimension;
  const [boxSize, setBoxSize] = useState(deviceWidth >= 1024 ? 80 : 60); // Size of each box in pixels
  const containerRef = useRef<any>(null);
  const [numRows, setNumRows] = useState(3); // Initial number of rows, adjust as needed
  const [numCols, setNumCols] = useState(3); // Initial number of columns, same as rows

  useEffect(() => {
    if (customWidth && activeDimension) {
      if (activeDimension === 'cm') {
        setBoxSize(customWidth * 5);
      } else if (activeDimension === 'in') {
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
  }, [deviceWidth, boxSize]);

  // Create arrays of row and column indices
  const rows = Array.from({ length: numRows }, (_, index) => index);
  const cols = Array.from({ length: numCols }, (_, index) => index);

  const activeTilePath = useTileStore((state) => state.activeTilePath);

  const activeRotationDegree = useTileStore(
    (state) => state.activeRotationDegree,
  );

  const { editedTiles } = useTileStore();

  const [activeTileIndex, setActiveTileIndex] = useState<string | null>(null);

  let index = -1;

  const getIndex = (tileIndex: string) => {
    let position = editedTiles.findIndex(
      (tile) => tile.tileIndex === tileIndex,
    );
    return position;
  };

  return (
    <>
      <div
        className="grid-container rounded-lg my-7 relative"
        ref={containerRef}
      >
        {rows.length > 3 && !activeTilePath && (
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
                {rows.length > 3 && activeTilePath !== '' && (
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
                      <Image
                        src={activeTilePath}
                        width={16}
                        height={16}
                        className="w-full h-full object-cover"
                        alt="Tile"
                        style={{
                          rotate: `${editedTiles[getIndex(`${colIndex}-${rowIndex}`)].rotationDegree}deg`,
                        }}
                      />
                    )}

                    {activeTileIndex === `${colIndex}-${rowIndex}` && (
                      <TileEditComponent tileIndex={activeTileIndex} />
                    )}
                  </button>
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

