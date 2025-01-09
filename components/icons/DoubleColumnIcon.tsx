import React from "react";
import Svg, { Path, Defs, ClipPath, G } from "react-native-svg";

type DoubleColumnIconProps = {
  size?: number;
  color?: string;
};

export default function DoubleColumnIcon({
  size = 27,
  color = "#f57c00",
}: DoubleColumnIconProps) {
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
            d="M 0.304688 0 L 18.171875 0 L 18.171875 31 L 0.304688 31 Z M 0.304688 0"
            clipRule="nonzero"
          />
        </ClipPath>
        <ClipPath id="clip2">
          <Path
            d="M 21.125 0 L 38.695312 0 L 38.695312 31.007812 L 21.125 31.007812 Z M 21.125 0"
            clipRule="nonzero"
          />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip1)">
        <Path
          fill={color}
          d="M 0.304688 0 L 18.171875 0 L 18.171875 30.988281 L 0.304688 30.988281 Z M 0.304688 0"
          fillOpacity="1"
          fillRule="nonzero"
        />
      </G>
      <G clipPath="url(#clip2)">
        <Path
          fill={color}
          d="M 21.125 0 L 38.878906 0 L 38.878906 31.003906 L 21.125 31.003906 Z M 21.125 0"
          fillOpacity="1"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}
