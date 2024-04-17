import React, { useState, useEffect, useRef } from 'react';

function Grid() {
  const boxSize = 60; // Size of each box in pixels
  const containerRef = useRef<any>(null);

  const [numRows, setNumRows] = useState(3); // Initial number of rows, adjust as needed
  const [numCols, setNumCols] = useState(3); // Initial number of columns, same as rows

  useEffect(() => {
    const calculateGrid = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;

        // Calculate number of rows and columns based on container width and box size
        const newNumRows = Math.floor(containerWidth / boxSize);
        const newNumCols = Math.floor(containerWidth / boxSize);

        // Set number of rows and columns to be the same
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
  }, []);

  // Create arrays of row and column indices
  const rows = Array.from({ length: numRows }, (_, index) => index);
  const cols = Array.from({ length: numCols }, (_, index) => index);

  return (
    <>
      <div
        className="grid-container rounded-lg my-7 relative"
        ref={containerRef}
      >
        <p className="text-[#616161] text-lg absolute top-1/2 left-1/4">
          Please choose a model
        </p>
        {rows.map((rowIndex) => (
          <div key={rowIndex} className="flex">
            {cols.map((colIndex) => (
              <div
                key={colIndex}
                className="w-16 h-16 bg-[#FAFAFA] border border-[#F1F1F1]"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Grid;

