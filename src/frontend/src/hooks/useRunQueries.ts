import { createActor } from "@/backend";
import type { Run } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllRuns() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Run[]>({
    queryKey: ["runs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRuns();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRunById(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Run | null>({
    queryKey: ["run", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRunById(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteRun() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteRun(id);
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["runs"] });
      queryClient.removeQueries({ queryKey: ["run", id.toString()] });
    },
  });
}
