import { DYNAMIC_ISLAND_HEIGHT, DYNAMIC_ISLAND_WIDTH } from "@/constants";
import { AnimationValues } from "@/types";
import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Image,
  Paint,
  RoundedRect,
  SkImage,
} from "@shopify/react-native-skia";
import React from "react";
import Animated from "react-native-reanimated";
import { animatedCanvasStyles as styles } from "./AnimatedCanvas.styles";

interface AnimatedCanvasProps {
  animationValues: AnimationValues;
  canvasStyle: any;
  avatarImageSource: SkImage | null;
  screenWidth: number;
}

export const AnimatedCanvas: React.FC<AnimatedCanvasProps> = ({
  animationValues,
  canvasStyle,
  avatarImageSource,
  screenWidth,
}) => {
  const {
    avatarWidth,
    avatarPositionX,
    avatarPositionY,
    blurRadius,
    overlayTint,
    avatarBounds,
    colorTransform,
  } = animationValues;

  return (
    <Animated.View style={canvasStyle}>
      <Canvas style={styles.canvas}>
        <Group
          layer={
            <Paint>
              <Blur blur={blurRadius} />
              <ColorMatrix matrix={colorTransform.value} />
            </Paint>
          }
        >
          <Group clip={avatarBounds}>
            <Image
              image={avatarImageSource}
              height={avatarWidth}
              width={avatarWidth}
              fit="cover"
              x={avatarPositionX}
              y={avatarPositionY}
            />
            <Circle
              r={avatarWidth}
              cx={avatarPositionX.value + avatarWidth.value / 2}
              cy={avatarPositionY.value + avatarWidth.value / 2}
              color={overlayTint}
            />
          </Group>
          <RoundedRect
            r={28}
            width={DYNAMIC_ISLAND_WIDTH}
            height={DYNAMIC_ISLAND_HEIGHT}
            x={(screenWidth - DYNAMIC_ISLAND_WIDTH) / 2}
            y={18}
          />
        </Group>
      </Canvas>
    </Animated.View>
  );
};
