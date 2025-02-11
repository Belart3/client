export function kelvinToCelcius(kelvin: number): number {
    const temp = kelvin - 273.15;
  return Math.floor(temp);
}