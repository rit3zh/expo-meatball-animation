import { Extrapolate, rect, rrect } from "@shopify/react-native-skia";
import {
  interpolate,
  interpolateColor,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { AVATAR_SIZE, BLUR_HEIGHT, MAX_SCROLL_Y } from "../constants";
import { AnimationValues } from "../types";

export function useAnimationValues(screenWidth: number): AnimationValues {
  const avatarWidth = useSharedValue(AVATAR_SIZE);
  const avatarPositionX = useSharedValue((screenWidth - AVATAR_SIZE) / 2);
  const avatarPositionY = useSharedValue(MAX_SCROLL_Y);
  const currentScrollY = useSharedValue(0);
  const blurRadius = useSharedValue(0);
  const overlayTint = useSharedValue("transparent");
  const headerOpacity = useSharedValue(0);

  const avatarBounds = useDerivedValue(() =>
    rrect(
      rect(
        avatarPositionX.value,
        avatarPositionY.value,
        avatarWidth.value,
        avatarWidth.value
      ),
      avatarWidth.value / 2,
      avatarWidth.value / 2
    )
  );

  const colorTransform = useDerivedValue(() => {
    const animationProgress = interpolate(
      currentScrollY.value,
      [0, MAX_SCROLL_Y],
      [0, 1],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    );

    return [
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      25 * (1 - animationProgress),
      -8 * (1 - animationProgress),
    ];
  });

  useDerivedValue(() => {
    avatarWidth.value = interpolate(
      currentScrollY.value,
      [0, MAX_SCROLL_Y / 2],
      [AVATAR_SIZE, 0]
    );
    avatarPositionX.value = (screenWidth - avatarWidth.value) / 2;
    avatarPositionY.value = interpolate(
      currentScrollY.value,
      [0, MAX_SCROLL_Y],
      [MAX_SCROLL_Y, 0]
    );
    blurRadius.value = interpolate(
      currentScrollY.value,
      [0, BLUR_HEIGHT, 35],
      [0, 12, 0]
    );
    overlayTint.value = interpolateColor(
      currentScrollY.value,
      [0, BLUR_HEIGHT],
      ["transparent", "#000"]
    );

    // Make header appear earlier and more gradually
    headerOpacity.value = interpolate(
      currentScrollY.value,
      [20, MAX_SCROLL_Y - 10], // Starts at scroll position 20, fully visible at 60
      [0, 1],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      }
    );
  });

  return {
    avatarWidth,
    avatarPositionX,
    avatarPositionY,
    currentScrollY,
    blurRadius,
    overlayTint,
    avatarBounds,
    colorTransform,
    headerOpacity,
  };
}
