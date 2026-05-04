import { u as useActor, b as useQuery, a as useMutation, c as createActor } from "./backend-DEIwFg3h.js";
import { b as useQueryClient } from "./index-BYrLvhks.js";
function useGetAllRuns() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["runs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRuns();
    },
    enabled: !!actor && !isFetching
  });
}
function useGetRunById(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["run", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRunById(id);
    },
    enabled: !!actor && !isFetching
  });
}
function useDeleteRun() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteRun(id);
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["runs"] });
      queryClient.removeQueries({ queryKey: ["run", id.toString()] });
    }
  });
}
export {
  useGetRunById as a,
  useDeleteRun as b,
  useGetAllRuns as u
};
