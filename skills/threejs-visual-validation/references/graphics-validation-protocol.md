# Graphics validation protocol

Use this protocol to evaluate authored graphics through deterministic final
frames, mechanism-isolation views, temporal evidence, scale tests, seed sweeps,
and explicit GPU budgets.

## Contents

- Acceptance principle
- Visual contract
- Required inspection controls
- Mechanism-specific evidence
- No-post and isolation gates
- Determinism and captures
- Temporal validation
- Performance and resolution
- Rejection criteria
- Sign-off record

## Acceptance principle

Accept an implementation only when all four layers agree:

```text
declared visual mechanism
  -> inspectable implementation
  -> diagnostic evidence
  -> final image that satisfies the visual contract
```

Code plausibility is insufficient. A visually weak result means the mechanism
is incomplete, misweighted, or badly presented. A beautiful final frame is
also insufficient when it hides field instability, broken depth, temporal
failure, or dependence on post-processing.

## Visual contract

Write this before tuning:

```ts
type VisualContract = {
  subject: string
  identity: string[]
  silhouette: string[]
  materialSeparation: string[]
  motion: string[]
  cameraEnvelope: {
    near: number
    design: number
    far: number
  }
  lightingEnvelope: string[]
  invariants: string[]
  allowedDivergences: string[]
  frameBudgetMs: number
  memoryBudgetMB?: number
}
```

Each invariant must be observable. Replace “looks cinematic” with statements
such as:

```text
the primary rim remains visible without bloom
the water horizon does not reveal the mesh boundary
tree card roots remain attached under maximum wind
planet coast width is stable from orbit to mid approach
cloud history rejects across a foreground disocclusion
```

When matching a supplied visual reference, record the mechanisms that create
its identity and every deliberate divergence in backend, resolution, asset,
scale, or composition. Do not substitute a generic category match for the
specific visual contract.

## Required inspection controls

Any runnable inspection surface should expose the controls relevant to its
mechanism:

```text
pause / resume
fixed time or time scale
fixed seed
fixed camera bookmarks
viewport and DPR
quality tier
debug mode
canvas capture
runtime metrics
reset history
```

At minimum, provide:

- one design camera;
- near and far camera bookmarks;
- final and no-post views;
- every controlling field or pass needed to prove the mechanism;
- a deterministic reset;
- visible runtime errors and performance metrics.

Controls must alter the actual pipeline. A debug dropdown that only changes a
label is worse than no diagnostic because it creates false confidence.

## Mechanism-specific evidence

### Procedural growth

Report topology separately from final composition:

```text
branch jobs by level
terminal continuations by level
lateral children by level
ring and leaf-card counts
branch and leaf bounds
seed
```

Inspect:

- hierarchy-only;
- continuation branches;
- foliage roots and rounded normals;
- final composition;
- maximum wind;
- at least three seeds.

The species identity must survive the seed sweep. Seed changes may alter
branch placement and crown asymmetry; they may not turn one growth model into
another.

### Spectral water

Require:

```text
disjoint wavelength ownership per cascade
independent FFT impulse and frequency tests
height and horizontal displacement fields
transformed derivative maps
Jacobian or breaking metric
persistent foam history
shared sky/reflection parameters
```

Inspect individual cascades, resolved normals, breaking/foam state, and final
shading. A plausible ocean frame does not prove that the FFT, derivatives, or
history are correct.

### Analytic water

Require displacement and normals to derive from the same wave bundle. Inspect:

```text
displacement only
resolved normals
Fresnel
reflection
refraction
absorption or thickness estimate
crest response and foam
```

Test near-grazing views, far-horizon minification, and a high-DPR capture.
Reject sparkling micro-bands that survive below one pixel.

### Planet fields and atmosphere

Require:

```text
undeformed sphere direction
macro height
continents and coast
climate or biome causes
resolved normals and roughness
surface lighting without atmosphere
atmosphere only
combined final
```

Inspect orbit, mid approach, and close approach. Surface and atmosphere must
share body center, radius, sun direction, and scale conversion. A shell that
looks acceptable only against black space is not sufficient evidence of
ground-to-space continuity.

### Volumetric clouds

Require:

```text
weather channels
base-shape density
detail erosion
bounded ray interval
beauty transmittance
lighting contribution
history confidence or rejection
cloud shadow
```

Test camera translation, foreground disocclusion, sun-angle changes, and
quality-tier transitions. Still frames cannot validate temporal reconstruction.

### Curved-ray and volumetric effects

Expose:

```text
integration bounds
step or iteration count
accumulated steering
density contribution
remaining transmittance
background lookup direction
capped or invalid pixels
```

Use a stress camera that approaches the singular or highest-curvature region.
Reject NaNs, persistent capped bands, and unexplained asymmetry.

### Temporal surfaces

Expose the complete state transition:

```text
previous history
current deposit or erase input
next history
blurred scene
static structure
composite mask
resolved normal/refraction
```

Test reset, resize, pointer release, repeated deposition, frame-rate changes,
and long idle decay. Per-frame decay must be converted to a
frame-rate-independent response.

### Shadows and post-processing

For shadows, inspect:

```text
level ownership
committed light-space centers
texel grid
levels refreshed this frame
cross-level blend weights
normal bias in world units
unshadowed outside-coverage weight
```

For post effects, inspect the pre-effect signal, contribution, and final
composite. Tone mapping and output conversion must have one owner.

## No-post and isolation gates

Every example with image effects must expose:

```text
final
no bloom or presentation treatment
effect contribution only
controlling field or mask
normal / depth / history when relevant
```

Reject when:

- bloom supplies the only readable silhouette;
- atmosphere hides flat planet fields;
- post blur hides aliasing;
- a normal map implies waves absent from displaced geometry;
- temporal output cannot show previous state, deposit, and next state;
- a raymarch cannot reveal iteration pressure or capped pixels;
- shadows are judged only in the final graded image.

## Determinism and captures

Freeze:

```text
seed
camera transform and projection
viewport
DPR
time or paused state
quality tier
backend
asset versions
```

Capture:

```text
design view
near/detail view
far/silhouette view
no-post baseline
one controlling diagnostic
one failure-sensitive diagnostic
one stress condition
```

Use exact camera matrices or named camera bookmarks. Reproducing a comparison
by manually orbiting until it “looks close” invalidates image evidence.

For stochastic pixels, either freeze the stochastic sequence or compare a
stable accumulated result. Do not loosen image thresholds until they stop
detecting real regressions.

## Temporal validation

Use fixed-duration clips or sampled checkpoints for:

- camera motion;
- object motion;
- history accumulation and rejection;
- shadow-cache refresh;
- ocean foam persistence;
- cloud reconstruction;
- wind deformation;
- particle birth, death, and pool reuse.

Record at least:

```text
t = 0 reset
t = first visible response
t = steady state
t = disocclusion or invalidation
t = recovery
```

Inspect at normal playback speed and frame-by-frame. Still captures cannot
prove the absence of shimmer, swimming, stale history, or lifetime pops.

## Performance and resolution

Report:

```text
CPU frame time
GPU frame time when available
draw calls
triangles / points / instances
simulation resolution
render-target count, format, and dimensions
active quality tier
cache updates this frame
estimated GPU memory
```

Never infer GPU cost solely from CPU frame time. Run a warm-up period before
recording and separate shader compilation from steady-state cost.

When reducing quality, identify the preserved mechanism and expected loss:

| Reduction | Preserve | Expected loss |
| --- | --- | --- |
| lower cloud beauty resolution | density organization and lighting | edge fidelity and thin wisps |
| fewer atmosphere view steps | shared scattering model | horizon smoothness |
| smaller spectral grids | cascade and FFT architecture | high-frequency wave richness |
| reduced shadow update budget | stable committed maps | delayed coarse-level refresh |
| lower frost blur DPR | history and structure | refraction smoothness |

Do not silently lower resolution until a frame looks fast enough.

## Rejection criteria

Delete or withhold an example when any applies:

- it is visually weaker than the supplied reference in the target feature;
- its code is mostly generic material or noise boilerplate;
- mechanism-defining constants or ownership were replaced by guesses;
- it has no diagnostic mode proving the claimed mechanism;
- it relies on post-processing to manufacture missing form;
- it contains undisclosed backend, algorithm, asset, or scale divergences;
- deterministic reset or fixed-camera capture is impossible;
- the implementation cannot meet its declared performance envelope;
- the available evidence is too weak to support excellence-level guidance.

## Sign-off record

Record:

```text
skill and example ID
visual contract and invariants
Three.js version and backend
viewport, DPR, camera bookmark, seed, and time
mechanisms exercised
deliberate divergences
debug modes inspected
temporal cases inspected
performance and memory metrics
known defects
review decision
```

Publish only accepted examples. Repeat the same evidence set whenever
mechanism code, Three.js version, renderer backend, camera, or quality tier
changes.
