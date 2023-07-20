export async function getLocation(query: string): Promise<Coordinates[]> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`;
  const res = await fetch(url);
  const data = (await res.json()) as any;

  return (
    data?.results?.map((result: any) => ({
      id: result.id,
      latitude: result.latitude,
      longitude: result.longitude,
      name: result.name,
      country: result.country,
    })) || []
  );
}

export type Coordinates = {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  id: string;
};
