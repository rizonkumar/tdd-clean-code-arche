import { Track, LocationTrackMap } from "./DJData";

export class SimpleLocationTrackMap implements LocationTrackMap {
  private readonly locationTracks: Map<string, readonly Track[]>;

  constructor(locationTracks: Map<string, readonly Track[]>) {
    this.locationTracks = locationTracks;
  }

  getTracks(locationId: string): readonly Track[] {
    return this.locationTracks.get(locationId) ?? [];
  }

  static createTestMap(): SimpleLocationTrackMap {
    const tracks = new Map<string, readonly Track[]>([
      [
        "home",
        [
          { id: "home-track-1", title: "Home Song 1" },
          { id: "home-track-2", title: "Home Song 2" },
          { id: "home-track-3", title: "Home Song 3" },
        ],
      ],
      [
        "office",
        [
          { id: "office-track-1", title: "Office Song 1" },
          { id: "office-track-2", title: "Office Song 2" },
        ],
      ],
      ["gym", [{ id: "gym-track-1", title: "Gym Song 1" }]],
      ["park", []],
    ]);

    return new SimpleLocationTrackMap(tracks);
  }
}
