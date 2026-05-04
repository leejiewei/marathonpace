import List "mo:core/List";
import RunTypes "types/runs";
import RunsApiMixin "mixins/runs-api";
import WeatherApiMixin "mixins/weather-api";

actor {
  let runs = List.empty<RunTypes.Run>();
  let runCounter = { var value : Nat = 0 };

  include RunsApiMixin(runs, runCounter);
  include WeatherApiMixin();
};
