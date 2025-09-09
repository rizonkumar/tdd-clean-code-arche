import { DJSystem, SimpleLocationTrackMap, Location } from "../src";

describe("DJSystem", () => {
  let trackMap: SimpleLocationTrackMap;
  let dj: DJSystem;

  const home: Location = { id: "home", name: "Home" };
  const office: Location = { id: "office", name: "Office" };
  const gym: Location = { id: "gym", name: "Gym" };
  const park: Location = { id: "park", name: "Park" };

  beforeEach(() => {
    trackMap = SimpleLocationTrackMap.createTestMap();
    dj = new DJSystem(trackMap);
  });

  describe("Initial state", () => {
    it("should start with no location and stopped playback", () => {
      const state = dj.getCurrentState();
      expect(state.currentLocation).toBeNull();
      expect(state.currentTrack).toBeNull();
      expect(state.playbackState).toBe("stopped");
      expect(state.pendingLocation).toBeNull();
    });
  });

  describe("First location detection", () => {
    it("should start playing track when location is first detected", () => {
      const result = dj.detectLocation(home);

      expect(result.getCurrentTrack()?.id).toBe("home-track-1");
      expect(result.getPlaybackState()).toBe("playing");
      expect(result.getCurrentState().currentLocation?.id).toBe("home");
    });

    it("should not play any track if location has no tracks", () => {
      const result = dj.detectLocation(park);

      expect(result.getCurrentTrack()).toBeNull();
      expect(result.getPlaybackState()).toBe("stopped");
      expect(result.getCurrentState().currentLocation?.id).toBe("park");
    });
  });

  describe("Location change scenarios", () => {
    it("should set pending location when location changes while playing", () => {
      let result = dj.detectLocation(home);
      result = result.detectLocation(office);

      expect(result.getCurrentTrack()?.id).toBe("home-track-1");
      expect(result.getPlaybackState()).toBe("playing");
      expect(result.getCurrentState().currentLocation?.id).toBe("home");
      expect(result.getCurrentState().pendingLocation?.id).toBe("office");
    });

    it("should immediately play track when location changes and not playing", () => {
      let result = dj.detectLocation(home);
      result = result.trackFinished(); // Now in finished state
      result = result.detectLocation(office); // Should immediately play office track

      expect(result.getCurrentTrack()?.id).toBe("office-track-1");
      expect(result.getPlaybackState()).toBe("playing");
      expect(result.getCurrentState().currentLocation?.id).toBe("office");
      expect(result.getCurrentState().pendingLocation).toBeNull();
    });

    it("should play track for pending location when current track finishes", () => {
      let result = dj.detectLocation(home);
      result = result.detectLocation(office);
      result = result.trackFinished();

      expect(result.getCurrentTrack()?.id).toBe("office-track-1");
      expect(result.getPlaybackState()).toBe("playing");
      expect(result.getCurrentState().currentLocation?.id).toBe("office");
      expect(result.getCurrentState().pendingLocation).toBeNull();
    });

    it("should not change state when detecting same location", () => {
      let result = dj.detectLocation(home);
      const originalState = result.getCurrentState();
      result = result.detectLocation(home);

      expect(result.getCurrentState()).toEqual(originalState);
    });
  });

  describe("Track finished scenarios", () => {
    it("should set finished state when track finishes in same location", () => {
      let result = dj.detectLocation(home);
      result = result.trackFinished();

      expect(result.getCurrentTrack()).toBeNull();
      expect(result.getPlaybackState()).toBe("finished");
    });

    it("should play different track when location detected in finished state", () => {
      let result = dj.detectLocation(home);
      result = result.trackFinished();
      result = result.detectLocation(home);

      expect(result.getCurrentTrack()?.id).toBe("home-track-2");
      expect(result.getPlaybackState()).toBe("playing");
    });

    it("should cycle back to first track when all tracks played", () => {
      let result = dj.detectLocation(home);
      result = result.trackFinished();
      result = result.detectLocation(home);
      result = result.trackFinished();
      result = result.detectLocation(home);
      result = result.trackFinished();
      result = result.detectLocation(home);

      expect(result.getCurrentTrack()?.id).toBe("home-track-1");
      expect(result.getPlaybackState()).toBe("playing");
    });

    it("should handle single track location finishing", () => {
      let result = dj.detectLocation(gym);
      result = result.trackFinished();

      expect(result.getCurrentTrack()).toBeNull();
      expect(result.getPlaybackState()).toBe("finished");

      result = result.detectLocation(gym);
      expect(result.getCurrentTrack()?.id).toBe("gym-track-1");
      expect(result.getPlaybackState()).toBe("playing");
    });

    it("should handle track finished when no current location", () => {
      const result = dj.trackFinished();

      expect(result.getCurrentTrack()).toBeNull();
      expect(result.getPlaybackState()).toBe("stopped");
    });
  });

  describe("Complex scenarios", () => {
    it("should handle rapid location changes", () => {
      let result = dj.detectLocation(home);
      result = result.detectLocation(office);
      result = result.detectLocation(gym);
      result = result.detectLocation(office);

      expect(result.getCurrentState().pendingLocation?.id).toBe("office");
      expect(result.getCurrentTrack()?.id).toBe("home-track-1");

      result = result.trackFinished();
      expect(result.getCurrentTrack()?.id).toBe("office-track-1");
      expect(result.getCurrentState().pendingLocation).toBeNull();
    });

    it("should handle location change to no-track location while playing", () => {
      let result = dj.detectLocation(home);
      result = result.detectLocation(park);
      result = result.trackFinished();

      expect(result.getCurrentTrack()).toBeNull();
      expect(result.getPlaybackState()).toBe("stopped");
      expect(result.getCurrentState().currentLocation?.id).toBe("park");
    });

    it("should maintain played tracks history per location", () => {
      let result = dj.detectLocation(home); // plays home-track-1
      result = result.trackFinished(); // finished
      result = result.detectLocation(office); // plays office-track-1
      result = result.trackFinished(); // finished
      result = result.detectLocation(home); // same location in finished -> plays home-track-2

      expect(result.getCurrentTrack()?.id).toBe("home-track-2");

      result = result.trackFinished(); // finished
      result = result.detectLocation(home); // same location in finished -> plays home-track-3

      expect(result.getCurrentTrack()?.id).toBe("home-track-3");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty track list", () => {
      const emptyMap = new SimpleLocationTrackMap(new Map());
      const emptyDJ = new DJSystem(emptyMap);

      const result = emptyDJ.detectLocation(home);
      expect(result.getCurrentTrack()).toBeNull();
      expect(result.getPlaybackState()).toBe("stopped");
    });

    it("should handle track finished with no tracks available", () => {
      let result = dj.detectLocation(gym);
      result = result.trackFinished();
      result = result.trackFinished();

      expect(result.getCurrentTrack()).toBeNull();
      expect(result.getPlaybackState()).toBe("stopped");
    });
  });
});
