function hexToRGB(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b] as const;
}
const MAX_COLOR_RANGE = 256;
function colorPerception(hex1: string, hex2: string) {
  const [R1, G1, B1] = hexToRGB(hex1);
  const [R2, G2, B2] = hexToRGB(hex2);
  const meanR = 0.5 * (R1 + R2);
  const deltaR = R1 - R2;
  const deltaG = G1 - G2;
  const deltaB = B1 - B2;
  return Math.sqrt(
    (2 + meanR / MAX_COLOR_RANGE) * deltaR ** 2 +
      4 * deltaG ** 2 +
      (2 + (MAX_COLOR_RANGE - 1 - meanR) / MAX_COLOR_RANGE) * deltaB ** 2
  );
}

export function euclideanDistance(hex1: string, hex2: string) {
  const [R1, G1, B1] = hexToRGB(hex1);
  const [R2, G2, B2] = hexToRGB(hex2);

  const deltaR = R1 - R2;
  const deltaG = G1 - G2;
  const deltaB = B1 - B2;
  return Math.sqrt(deltaR ** 2 + deltaG ** 2 + deltaB ** 2);
}
export default colorPerception;
