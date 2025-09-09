export interface Track {
  readonly id: string;
  readonly title: string;
}

export interface Location {
  readonly id: string;
  readonly name: string;
}

export interface LocationTracks {
  readonly location: Location;
  readonly tracks: readonly Track[];
}

export type PlaybackState = "stopped" | "playing" | "finished";

export interface DJState {
  readonly currentLocation: Location | null;
  readonly currentTrack: Track | null;
  readonly playbackState: PlaybackState;
  readonly playedTracks: Map<string, Set<string>>;
  readonly pendingLocation: Location | null;
}

export interface DJResult {
  readonly newState: DJState;
  readonly action: "play" | "stop" | "none";
  readonly track?: Track;
}

export interface LocationTrackMap {
  getTracks(locationId: string): readonly Track[];
}
