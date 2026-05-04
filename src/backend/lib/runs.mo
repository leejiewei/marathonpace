import List "mo:core/List";
import Types "../types/common";
import RunTypes "../types/runs";
import Int "mo:core/Int";

module {
  public func saveRun(
    runs : List.List<RunTypes.Run>,
    counter : { var value : Nat },
    input : RunTypes.RunInput,
  ) : RunTypes.Run {
    let id = counter.value;
    counter.value += 1;
    let run : RunTypes.Run = {
      id;
      startTime = input.startTime;
      endTime = input.endTime;
      totalDistanceMeters = input.totalDistanceMeters;
      durationSeconds = input.durationSeconds;
      avgPaceSecsPerKm = input.avgPaceSecsPerKm;
      maxSpeedMps = input.maxSpeedMps;
      gpxPoints = input.gpxPoints;
    };
    runs.add(run);
    run;
  };

  public func getAllRuns(runs : List.List<RunTypes.Run>) : [RunTypes.Run] {
    let arr = runs.toArray();
    arr.sort(func(a, b) = Int.compare(b.startTime, a.startTime));
  };

  public func getRunById(
    runs : List.List<RunTypes.Run>,
    id : Types.RunId,
  ) : ?RunTypes.Run {
    runs.find(func(r) { r.id == id });
  };

  public func deleteRun(
    runs : List.List<RunTypes.Run>,
    id : Types.RunId,
  ) : Bool {
    let before = runs.size();
    let kept = runs.filter(func(r) { r.id != id });
    runs.clear();
    runs.append(kept);
    runs.size() < before;
  };
};
