import OutCall "mo:caffeineai-http-outcalls/outcall";
import WeatherTypes "../types/weather";
import WeatherLib "../lib/weather";

mixin () {
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public func fetchWeather(lat : Float, lon : Float) : async WeatherTypes.WeatherResult {
    let url = WeatherLib.buildUrl(lat, lon);
    let json = await OutCall.httpGetRequest(url, [], transform);
    WeatherLib.parseWeatherResponse(json);
  };
};
