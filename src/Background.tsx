import React from 'react';

interface Props {
    /** The URL of the background image to load. */
    readonly source: string;
}

/** Background is a fullscreen background image. */
const Background: React.FC<Props> = ({ children, source }) => (
    <div style={{
        backgroundImage: `url("${source}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        margin: 0,
        overflow: "hidden",
        width: "100vw",
    }}>
        {children}
    </div>
)

export default Background;
