import React from "react";
import Svg, { Path, ClipPath, Defs, G } from "react-native-svg";

type TrippleColumnIconProps = {
  size?: number;
  color?: string;
};

export default function TrippleColumnIcon({
  size = 27,
  color = "#f57c00",
}: TrippleColumnIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 39 31.5"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <ClipPath id="103cd32e33">
          <Path
            d="M 0.304688 0 L 11.746094 0 L 11.746094 31.007812 L 0.304688 31.007812 Z M 0.304688 0 "
            clip-rule="nonzero"
          />
        </ClipPath>
        <ClipPath id="79bdff4806">
          <Path
            d="M 13.777344 0 L 25.222656 0 L 25.222656 31.007812 L 13.777344 31.007812 Z M 13.777344 0 "
            clip-rule="nonzero"
          />
        </ClipPath>
        <ClipPath id="651da5523f">
          <Path
            d="M 27.4375 0 L 38.695312 0 L 38.695312 31.007812 L 27.4375 31.007812 Z M 27.4375 0 "
            clip-rule="nonzero"
          />
        </ClipPath>
      </Defs>
      <G clip-path="url(#103cd32e33)">
        <Path
          fill={color}
          d="M 0.304688 0 L 11.746094 0 L 11.746094 31.023438 L 0.304688 31.023438 Z M 0.304688 0 "
          fill-opacity="1"
          fill-rule="nonzero"
        />
      </G>
      <G clip-path="url(#79bdff4806)">
        <Path
          fill={color}
          d="M 13.777344 0 L 25.222656 0 L 25.222656 31.023438 L 13.777344 31.023438 Z M 13.777344 0 "
          fill-opacity="1"
          fill-rule="nonzero"
        />
      </G>
      <G clip-path="url(#651da5523f)">
        <Path
          fill={color}
          d="M 27.4375 0 L 38.878906 0 L 38.878906 31.023438 L 27.4375 31.023438 Z M 27.4375 0 "
          fill-opacity="1"
          fill-rule="nonzero"
        />
      </G>
    </Svg>
  );
}
