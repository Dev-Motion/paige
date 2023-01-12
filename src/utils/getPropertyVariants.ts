import * as Stitches from "@stitches/react";

import { theme, CSS } from "stitches.config";

type availableProperties =
  | "colors"
  | "space"
  | "sizes"
  | "radii"
  | "fontSizes"
  | "fonts"
  | "fontWeights"
  | "zIndices";

const generatePattern = (property: availableProperties): [string, RegExp] => {
  return [
    `$--${property}--`,
    RegExp(`"([^"]*?\\$--${property}--[^"]*?)"`, "g"),
  ];
};

export const generatePropertyVariants = <T extends availableProperties>(
  property: T,
  css: Stitches.CSS
) => {
  const cssString = JSON.stringify(css);
  return Object.values(theme[property]).reduce((prev, propertyToken) => {
    const [PATTERN, REGEX] = generatePattern(property);
    const substringToReplace = REGEX.exec(cssString);
    if (!substringToReplace?.length)
      throw Error(
        `No Color ${property} provided., cssString:${cssString} regex:${REGEX} pattern:${PATTERN}`
      );
    const replacedSubstring = substringToReplace[0].replace(
      PATTERN,
      `$${propertyToken.token}`
    );

    const replacedString = cssString.replace(
      substringToReplace[0],
      replacedSubstring
    );

    return { ...prev, [propertyToken.token]: JSON.parse(replacedString) };
  }, {}) as Record<keyof typeof theme[T], Stitches.CSS>;
};

export function getVariants<T extends availableProperties>(
  property: T,
  style: CSS
): Record<keyof typeof theme[T], CSS> {
  const cssString = JSON.stringify(style);

  return Object.values(theme[property]).reduce((prev, propertyToken) => {
    return {
      ...prev,
      [propertyToken.token]: JSON.parse(
        cssString.replace("$$", `$${propertyToken.token}`)
      ),
    };
  });
}
