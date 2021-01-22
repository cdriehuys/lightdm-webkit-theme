import React from "react";

interface Props {
  readonly blur: boolean;
  /** The URL of the background image to load. */
  readonly source: string;
}

/** Background is a fullscreen background image. */
const Background: React.FC<Props> = ({ blur, source }) => (
  <div
    style={{
      backgroundImage: `url("${source}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      filter: blur ? "blur(10px)" : "",
      height: "100vh",
      margin: 0,
      position: "absolute",
      transition: "filter .5s ease-in",
      width: "100vw",
      zIndex: -1,
    }}
  />
);

export default Background;
