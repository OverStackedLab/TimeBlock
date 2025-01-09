import React from "react";
import Svg, { Path, Defs, ClipPath, G } from "react-native-svg";

type SingleColumnIconProps = {
  size?: number;
  color?: string;
};

export default function SingleColumnIcon({
  size = 27,
  color = "#f57c00",
}: SingleColumnIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 39 31.5"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <ClipPath id="clip1">
          <Path
            d="M 0.304688 0 L 38.695312 0 L 38.695312 31.007812 L 0.304688 31.007812 Z M 0.304688 0"
            clipRule="nonzero"
          />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip1)">
        <Path
          fill={color}
          d="M 0.304688 0 L 39.671875 0 L 39.671875 31.007812 L 0.304688 31.007812 Z M 0.304688 0"
          fillOpacity="1"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}
