import React from "react";
import Svg, { Path } from "react-native-svg";

type TrippleColumnIconProps = {
  size?: number;
  color?: string;
};

export default function TrippleColumnIcon({
  size = 24,
  color = "#000",
}: TrippleColumnIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" title="TripleColumns">
      <Path
        d="M14.67 5v14H9.33V5zm1 14H21V5h-5.33zm-7.34 0V5H3v14z"
        fill={color}
      />
    </Svg>
  );
}
