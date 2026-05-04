import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

function isHotHumidTime(temp: number, humidity: number): boolean {
  const hour = new Date().getHours();
  return temp > 30 && humidity > 80 && hour >= 11 && hour <= 16;
}

export function useWeather(lat: number | null, lon: number | null) {
  const { actor, isFetching } = useActor(createActor);

  const query = useQuery<{ temperature: number; humidity: number }>({
    queryKey: ["weather", lat, lon],
    queryFn: async () => {
      if (!actor || lat === null || lon === null) {
        return { temperature: 0, humidity: 0 };
      }
      const result = await actor.fetchWeather(lat, lon);
      return {
        temperature: result.temperature,
        humidity: Number(result.humidity),
      };
    },
    enabled: !!actor && !isFetching && lat !== null && lon !== null,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  const weather = query.data;
  const temperature = weather?.temperature ?? 0;
  const humidity = weather?.humidity ?? 0;

  return {
    temperature,
    humidity,
    isHotHumid: isHotHumidTime(temperature, humidity),
    isLoading: query.isLoading,
    error: query.error,
  };
}
