import {
  Location,
  Track,
  DJState,
  DJResult,
  LocationTrackMap,
  PlaybackState,
} from "./DJData";

export class DJSystem {
  private readonly trackMap: LocationTrackMap;
  private readonly state: DJState;

  constructor(trackMap: LocationTrackMap, initialState?: DJState) {
    this.trackMap = trackMap;
    this.state = initialState ?? this.createInitialState();
  }

  detectLocation(newLocation: Location): DJSystem {
    const hasCurrentLocation = this.state.currentLocation !== null;
    const isSameLocation =
      hasCurrentLocation && this.state.currentLocation!.id === newLocation.id;
    const isPlaying = this.state.playbackState === "playing";

    let result: DJResult;

    if (!hasCurrentLocation) {
      result = this.handleLocationUpdate(newLocation);
    } else if (isSameLocation) {
      if (this.state.playbackState === "finished") {
        result = this.handleSameLocationFinished();
      } else {
        result = {
          newState: this.state,
          action: "none",
        };
      }
    } else if (isPlaying) {
      result = {
        newState: {
          ...this.state,
          pendingLocation: newLocation,
        },
        action: "none",
      };
    } else if (this.state.playbackState === "finished") {
      result = this.handleLocationUpdate(newLocation);
    } else {
      result = this.handleLocationUpdate(newLocation);
    }

    return new DJSystem(this.trackMap, result.newState);
  }

  trackFinished(): DJSystem {
    if (this.state.pendingLocation) {
      const result = this.handlePendingLocation();
      return new DJSystem(this.trackMap, result.newState);
    }

    if (!this.state.currentLocation) {
      return this;
    }

    // If already in finished state, calling trackFinished again should stop
    if (this.state.playbackState === "finished") {
      const result = {
        newState: {
          ...this.state,
          playbackState: "stopped" as const,
          currentTrack: null,
        },
        action: "stop" as const,
      };
      return new DJSystem(this.trackMap, result.newState);
    }

    // Check if there are more tracks available for current location
    const tracks = this.trackMap.getTracks(this.state.currentLocation.id);
    const hasMoreTracks = this.hasMoreTracksAvailable(tracks);

    if (!hasMoreTracks) {
      if (tracks.length === 1) {
        // Single track finished, stay in finished state for potential replay
        const result = {
          newState: {
            ...this.state,
            playbackState: "finished" as const,
            currentTrack: null,
          },
          action: "none" as const,
        };
        return new DJSystem(this.trackMap, result.newState);
      } else {
        // Multiple tracks exhausted, stop playback
        const result = {
          newState: {
            ...this.state,
            playbackState: "stopped" as const,
            currentTrack: null,
          },
          action: "stop" as const,
        };
        return new DJSystem(this.trackMap, result.newState);
      }
    }

    // More tracks available, set to finished state
    const result = {
      newState: {
        ...this.state,
        playbackState: "finished" as const,
        currentTrack: null,
      },
      action: "none" as const,
    };

    return new DJSystem(this.trackMap, result.newState);
  }

  getCurrentState(): DJState {
    return this.state;
  }

  getCurrentTrack(): Track | null {
    return this.state.currentTrack;
  }

  getPlaybackState(): PlaybackState {
    return this.state.playbackState;
  }

  private handleLocationUpdate(newLocation: Location): DJResult {
    const tracks = this.trackMap.getTracks(newLocation.id);
    if (tracks.length === 0) {
      return {
        newState: {
          ...this.state,
          currentLocation: newLocation,
          currentTrack: null,
          playbackState: "stopped",
          pendingLocation: null,
        },
        action: "none",
      };
    }

    const trackToPlay = this.selectTrackForLocation(tracks, newLocation.id);

    const newPlayedTracks = this.addPlayedTrack(newLocation.id, trackToPlay.id);

    return {
      newState: {
        ...this.state,
        currentLocation: newLocation,
        currentTrack: trackToPlay,
        playbackState: "playing",
        playedTracks: newPlayedTracks,
        pendingLocation: null,
      },
      action: "play",
      track: trackToPlay,
    };
  }

  private handlePendingLocation(): DJResult {
    const pendingLocation = this.state.pendingLocation!;
    const tracks = this.trackMap.getTracks(pendingLocation.id);

    if (tracks.length === 0) {
      return {
        newState: {
          ...this.state,
          currentLocation: pendingLocation,
          currentTrack: null,
          playbackState: "stopped",
          pendingLocation: null,
        },
        action: "stop",
      };
    }

    const trackToPlay = this.selectTrackForLocation(tracks, pendingLocation.id);

    const newPlayedTracks = this.addPlayedTrack(
      pendingLocation.id,
      trackToPlay.id
    );

    return {
      newState: {
        ...this.state,
        currentLocation: pendingLocation,
        currentTrack: trackToPlay,
        playbackState: "playing",
        playedTracks: newPlayedTracks,
        pendingLocation: null,
      },
      action: "play",
      track: trackToPlay,
    };
  }

  private handleSameLocationFinished(): DJResult {
    const currentLocation = this.state.currentLocation!;
    const tracks = this.trackMap.getTracks(currentLocation.id);

    if (tracks.length === 0) {
      return {
        newState: {
          ...this.state,
          currentTrack: null,
          playbackState: "stopped",
        },
        action: "stop",
      };
    }

    const trackToPlay = this.selectTrackForLocation(tracks, currentLocation.id);

    const newPlayedTracks = this.addPlayedTrack(
      currentLocation.id,
      trackToPlay.id
    );

    return {
      newState: {
        ...this.state,
        currentTrack: trackToPlay,
        playbackState: "playing",
        playedTracks: newPlayedTracks,
      },
      action: "play",
      track: trackToPlay,
    };
  }

  private handleNoMoreTracks(): DJResult {
    return {
      newState: {
        ...this.state,
        currentTrack: null,
        playbackState: "stopped",
      },
      action: "stop",
    };
  }

  private selectTrackForLocation(
    tracks: readonly Track[],
    locationId: string
  ): Track {
    if (tracks.length === 0) throw new Error("No tracks available");

    const playedTrackIds = this.state.playedTracks.get(locationId) ?? new Set();
    const availableTracks = tracks.filter(
      (track) => !playedTrackIds.has(track.id)
    );

    if (availableTracks.length > 0) {
      return availableTracks[0];
    }

    // All tracks have been played for this location
    // Clear played tracks and start over (cycle)
    const currentTrack = this.state.currentTrack;
    if (currentTrack && tracks.length > 1) {
      // Try to avoid the current track
      const otherTracks = tracks.filter(
        (track) => track.id !== currentTrack.id
      );
      if (otherTracks.length > 0) {
        return otherTracks[0];
      }
    }

    // Return first track (cycling back)
    return tracks[0];
  }

  private hasMoreTracksAvailable(tracks: readonly Track[]): boolean {
    if (!this.state.currentLocation) return false;

    const playedTrackIds =
      this.state.playedTracks.get(this.state.currentLocation.id) ?? new Set();
    return tracks.some((track) => !playedTrackIds.has(track.id));
  }

  private addPlayedTrack(
    locationId: string,
    trackId: string
  ): Map<string, Set<string>> {
    const newPlayedTracks = new Map(this.state.playedTracks);
    const locationTracks = newPlayedTracks.get(locationId) ?? new Set();

    const tracks = this.trackMap.getTracks(locationId);
    const shouldClear = locationTracks.size >= tracks.length;

    const updatedLocationTracks = shouldClear
      ? new Set<string>()
      : new Set(locationTracks);
    updatedLocationTracks.add(trackId);

    newPlayedTracks.set(locationId, updatedLocationTracks);
    return newPlayedTracks;
  }

  private createInitialState(): DJState {
    return {
      currentLocation: null,
      currentTrack: null,
      playbackState: "stopped",
      playedTracks: new Map(),
      pendingLocation: null,
    };
  }
}
