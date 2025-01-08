import React from "react";
import Svg, { Path } from "react-native-svg";

type DoubleColumnIconProps = {
  size?: number;
  color?: string;
};

export default function DoubleColumnIcon({
  size = 24,
  color = "#000",
}: DoubleColumnIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" title="TripleColumns">
      <Path d="M12 5v14H7V5h5zM17 19h5V5h-5v14z" fill={color} />
    </Svg>
  );
}
