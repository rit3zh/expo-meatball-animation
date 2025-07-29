import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { CANVAS_HEIGHT, MAX_SCROLL_Y } from "../constants";

export function useAnimatedCanvasStyle(scrollY: Animated.SharedValue<number>) {
  return useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, MAX_SCROLL_Y], [CANVAS_HEIGHT, 0]),
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, MAX_SCROLL_Y],
          [0, MAX_SCROLL_Y]
        ),
      },
    ],
  }));
}
