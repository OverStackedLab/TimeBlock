import React from "react";
import Svg, { Path } from "react-native-svg";

type SingleColumnIconProps = {
  size?: number;
  color?: string;
};

export default function SingleColumnIcon({
  size = 24,
  color = "#000",
}: SingleColumnIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" title="TripleColumns">
      <Path d="M5 5v14h14V5H5z" fill={color} />
    </Svg>
  );
}
