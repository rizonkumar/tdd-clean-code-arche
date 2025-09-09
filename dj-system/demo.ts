import { DJSystem, SimpleLocationTrackMap } from "./src";

console.log("=== DJ System Demo ===\n");

const trackMap = SimpleLocationTrackMap.createTestMap();
let dj = new DJSystem(trackMap);

console.log("1. Initial state:");
console.log(
  `Location: ${dj.getCurrentState().currentLocation?.name ?? "None"}`
);
console.log(`Track: ${dj.getCurrentTrack()?.title ?? "None"}`);
console.log(`State: ${dj.getPlaybackState()}`);
console.log();

console.log("2. First location detection (Home):");
dj = dj.detectLocation({ id: "home", name: "Home" });
console.log(
  `Location: ${dj.getCurrentState().currentLocation?.name ?? "None"}`
);
console.log(`Track: ${dj.getCurrentTrack()?.title ?? "None"}`);
console.log(`State: ${dj.getPlaybackState()}`);
console.log();

console.log("3. Track finished:");
dj = dj.trackFinished();
console.log(
  `Location: ${dj.getCurrentState().currentLocation?.name ?? "None"}`
);
console.log(`Track: ${dj.getCurrentTrack()?.title ?? "None"}`);
console.log(`State: ${dj.getPlaybackState()}`);
console.log();

console.log("4. Detect same location in finished state:");
dj = dj.detectLocation({ id: "home", name: "Home" });
console.log(
  `Location: ${dj.getCurrentState().currentLocation?.name ?? "None"}`
);
console.log(`Track: ${dj.getCurrentTrack()?.title ?? "None"}`);
console.log(`State: ${dj.getPlaybackState()}`);
console.log();

console.log("5. Change to different location while playing:");
dj = dj.detectLocation({ id: "office", name: "Office" });
console.log(
  `Location: ${dj.getCurrentState().currentLocation?.name ?? "None"}`
);
console.log(`Track: ${dj.getCurrentTrack()?.title ?? "None"}`);
console.log(`State: ${dj.getPlaybackState()}`);
console.log(`Pending: ${dj.getCurrentState().pendingLocation?.name ?? "None"}`);
console.log();

console.log("6. Track finishes (should switch to pending location):");
dj = dj.trackFinished();
console.log(
  `Location: ${dj.getCurrentState().currentLocation?.name ?? "None"}`
);
console.log(`Track: ${dj.getCurrentTrack()?.title ?? "None"}`);
console.log(`State: ${dj.getPlaybackState()}`);
console.log();

console.log("=== Demo Complete ===");
