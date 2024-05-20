import React from "react";

const Loader = () => {
  return (
    <div className="flex h-[100dvh] w-screen items-center justify-center">
      <img src="/car-loading-animation.gif" alt="Loading..." className="h-32"/>
    </div>
  );
};

export default Loader;
