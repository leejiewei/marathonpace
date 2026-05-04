import WeatherTypes "../types/weather";
import Int "mo:core/Int";
import Text "mo:core/Text";

module {
  public func buildUrl(lat : Float, lon : Float) : Text {
    let latText = lat.toText();
    let lonText = lon.toText();
    "https://api.open-meteo.com/v1/forecast?latitude=" # latText # "&longitude=" # lonText # "&current=temperature_2m,relative_humidity_2m";
  };

  // Parse a known Open-Meteo JSON structure.
  // Response shape: {"current":{"temperature_2m":30.5,"relative_humidity_2m":80},...}
  public func parseWeatherResponse(json : Text) : WeatherTypes.WeatherResult {
    let temperature = extractFloatAfter(json, "\"temperature_2m\":");
    let humidity = extractIntAfter(json, "\"relative_humidity_2m\":");
    { temperature; humidity };
  };

  // Extract a Float value after a given key in a JSON string.
  func extractFloatAfter(text : Text, key : Text) : Float {
    let parts = text.split(#text key);
    switch (parts.next()) {
      case null { 0.0 };
      case (?_) {
        switch (parts.next()) {
          case null { 0.0 };
          case (?after) {
            let trimmed = after.trimStart(#char ' ');
            let numPart = collectNumber(trimmed);
            textToFloat(numPart);
          };
        };
      };
    };
  };

  // Extract an Int value after a given key in a JSON string.
  func extractIntAfter(text : Text, key : Text) : Int {
    let parts = text.split(#text key);
    switch (parts.next()) {
      case null { 0 };
      case (?_) {
        switch (parts.next()) {
          case null { 0 };
          case (?after) {
            let trimmed = after.trimStart(#char ' ');
            let numPart = collectNumber(trimmed);
            switch (Int.fromText(numPart)) {
              case (?n) { n };
              case null { 0 };
            };
          };
        };
      };
    };
  };

  // Parse a float from text by splitting on '.' and combining integer parts.
  func textToFloat(t : Text) : Float {
    let negative = t.startsWith(#char '-');
    let abs = if (negative) { t.trimStart(#char '-') } else { t };
    let dotParts = abs.split(#char '.').toArray();
    let intPart : Int = switch (Int.fromText(dotParts[0])) {
      case (?n) { n };
      case null { 0 };
    };
    let fracFloat : Float = if (dotParts.size() > 1) {
      let fracText = dotParts[1];
      let fracLen = fracText.size();
      let fracInt : Int = switch (Int.fromText(fracText)) {
        case (?n) { n };
        case null { 0 };
      };
      var denom : Float = 1.0;
      var i = 0;
      while (i < fracLen) { denom := denom * 10.0; i += 1 };
      (fracInt : Int).toFloat() / denom;
    } else { 0.0 };
    let result = (intPart : Int).toFloat() + fracFloat;
    if (negative) { -result } else { result };
  };

  // Collect leading numeric characters (digits, '.', '-') from a string.
  func collectNumber(text : Text) : Text {
    var result = "";
    label numLoop for (c in text.toIter()) {
      if ((c >= '0' and c <= '9') or c == '.' or c == '-') {
        result #= Text.fromChar(c);
      } else {
        break numLoop;
      };
    };
    result;
  };
};
