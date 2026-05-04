import List "mo:core/List";
import Types "../types/common";
import RunTypes "../types/runs";
import RunsLib "../lib/runs";

mixin (runs : List.List<RunTypes.Run>, runCounter : { var value : Nat }) {
  public func saveRun(input : RunTypes.RunInput) : async RunTypes.Run {
    RunsLib.saveRun(runs, runCounter, input);
  };

  public query func getAllRuns() : async [RunTypes.Run] {
    RunsLib.getAllRuns(runs);
  };

  public query func getRunById(id : Types.RunId) : async ?RunTypes.Run {
    RunsLib.getRunById(runs, id);
  };

  public func deleteRun(id : Types.RunId) : async Bool {
    RunsLib.deleteRun(runs, id);
  };
};
