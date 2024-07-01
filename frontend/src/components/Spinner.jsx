import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Spinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <BeatLoader
        color={"black"}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
