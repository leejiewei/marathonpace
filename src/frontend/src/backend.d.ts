import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RunInput {
    startTime: Timestamp;
    maxSpeedMps: number;
    endTime: Timestamp;
    avgPaceSecsPerKm: number;
    totalDistanceMeters: number;
    gpxPoints: Array<GpxPoint>;
    durationSeconds: bigint;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface WeatherResult {
    temperature: number;
    humidity: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type RunId = bigint;
export interface GpxPoint {
    lat: number;
    lon: number;
    timestamp: Timestamp;
}
export interface Run {
    id: RunId;
    startTime: Timestamp;
    maxSpeedMps: number;
    endTime: Timestamp;
    avgPaceSecsPerKm: number;
    totalDistanceMeters: number;
    gpxPoints: Array<GpxPoint>;
    durationSeconds: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface backendInterface {
    deleteRun(id: RunId): Promise<boolean>;
    fetchWeather(lat: number, lon: number): Promise<WeatherResult>;
    getAllRuns(): Promise<Array<Run>>;
    getRunById(id: RunId): Promise<Run | null>;
    saveRun(input: RunInput): Promise<Run>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
