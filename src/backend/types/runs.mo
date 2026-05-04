import Types "../types/common";

module {
  public type GpxPoint = {
    lat : Float;
    lon : Float;
    timestamp : Types.Timestamp;
  };

  public type Run = {
    id : Types.RunId;
    startTime : Types.Timestamp;
    endTime : Types.Timestamp;
    totalDistanceMeters : Float;
    durationSeconds : Int;
    avgPaceSecsPerKm : Float;
    maxSpeedMps : Float;
    gpxPoints : [GpxPoint];
  };

  public type RunInput = {
    startTime : Types.Timestamp;
    endTime : Types.Timestamp;
    totalDistanceMeters : Float;
    durationSeconds : Int;
    avgPaceSecsPerKm : Float;
    maxSpeedMps : Float;
    gpxPoints : [GpxPoint];
  };
};
