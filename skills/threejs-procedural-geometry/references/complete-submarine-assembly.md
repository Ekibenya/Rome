# Complete procedural hard-surface assembly

Use this reference for dimensioned object plans, reusable loft and sweep
primitives, UV-owned apertures, semantic subassemblies, generated fittings,
and complete-model topology diagnostics.

## Contents

- Design contract and coordinate frame
- Geometry kernel
- Tilted-collar hull and apertures
- Semantic assembly
- Material fit
- Observed limitations
- Diagnostics
- Failure diagnosis

## Design contract and coordinate frame

The `porcelain-brass-submarine` example uses metres, with `+Z` forward and
`+Y` upward. The design contract keeps shape decisions separate from triangle
emission:

```text
dome center = (0, 0.02, 0.92) m
dome radius = 1.00 m
collar tilt = 24 degrees
collar plane offset = 0.14 m

hull tail Z = -1.30 m
hull tail radius = 0.30 m
hull maximum radius = 1.015 m
hull output = 56 rings * 128 radial segments

shroud center Z = -1.76 m
shroud radius = 0.80 m
shroud section width = 0.145 m
shroud section depth = 0.26 m

propeller blade count = 8
propeller radius = 0.62 m
```

The collar plane normal and circular intersection are exact:

```text
nColl = (0, sin(24 degrees), cos(24 degrees))
rimCenter = domeCenter - nColl * 0.14 m
rimRadius = sqrt(1.00^2 - 0.14^2) m
rimU = (1, 0, 0)
rimV = (0, cos(24 degrees), -sin(24 degrees))
```

Every subassembly is positioned from this contract or from a hull sample.
There is no late global scale used to repair mismatched parts.

## Geometry kernel

`gridGeometry` compiles sampled `Vector3[row][column]` plans. Closed rows emit
one explicit seam column. The geometric normal is:

```text
dU = P(row, column + 1) - P(row, column - 1)
dV = P(row + 1, column) - P(row - 1, column)
normal = normalize(cross(dU, dV))
```

At a pole, the fallback normal uses the vector between adjacent row centroids.
The `flip` contract reverses both normal direction and index winding.

`latheZ` revolves an `(radius, Z)` profile around `+Z`. Its longitudinal UV
coordinate is normalized accumulated profile distance:

```text
distance[i] = distance[i - 1]
  + hypot(radius[i] - radius[i - 1], Z[i] - Z[i - 1])
v[i] = distance[i] / distance[last]
```

`sweepTube` uses parallel-transport frames. Each tangent is sampled from its
two neighboring path points. The previous normal rotates around the cross
product of consecutive tangents by their clamped dot-product angle. Rounded
ends add exactly `5` tapered rings at each end.

The fin section is a closed lens profile. For section angle `a`:

```text
chord = 0.5 - 0.5 * cos(a)
side = sin(a)
width = thickness
  * max(sin(pi * chord^0.85), 0)^0.62
point = lerp(leadingEdge, trailingEdge, chord)
  + up * side * width * 0.5
```

These four emitters are shared by the hull, collar, window frames, rails,
fittings, cage, furniture, shroud, propeller, fins, and pods.

## Tilted-collar hull and apertures

The hull is planned at `240` longitudinal samples before the `56` output rings
are emitted. Radius control points are:

```text
(0.995, 0.00), (1.014, 0.07), (1.006, 0.25), (0.958, 0.42),
(0.845, 0.60), (0.645, 0.78), (0.430, 0.92), (0.300, 1.00)
```

Center-Y control points are:

```text
(rimCenterY, 0.00), (0.012, 0.18), (-0.012, 0.50),
(0.020, 0.80), (0.075, 1.00)
```

The collar tilt decays with:

```text
ringTilt(t) = 24 degrees * (1 - smooth01(min(t / 0.34, 1)))
```

The hull `v` coordinate uses accumulated
`hypot(deltaZ, deltaRadius) + abs(deltaCenterY)`. This keeps ornament placement
stable when the output ring count changes.

Window ownership remains in hull UV space. The center is `(0.345, 0.205)`, the
half extents are `(0.052, 0.135)`, and the other side mirrors `u` with `1 - u`.
The hull material cuts the aperture from the atlas red channel. Two swept
brass outlines use scales `1.06` and `1.22`. Nine glazing rows contract toward
the window center by `0.985`, with outward bulge:

```text
bulge = sqrt(max(1 - contraction^2, 0))
offset = 0.004 m + 0.028 m * bulge
```

The cut-out, frame, and glazing therefore share one parameterization instead
of three independently placed approximations.

## Semantic assembly

The submarine is a hierarchy of role-specific meshes:

- the hull owns its skin, aperture mask, collar, bead, and rivets;
- flank spears sample hull position and normal, then align a revolved profile
  to the local hull tangent;
- the step, handle, vent, lamps, and flanges are independent fittings;
- the dome owns glazing, latitude rings, meridian ribs, headlight, and crown
  lantern;
- the cabin owns the deck, chair, helm, gauges, and telegraph lever;
- the stern owns the tail cone, collars, superelliptic shroud, struts,
  propeller, halo, lamp, and spike;
- each fin owns its lens loft, gilt perimeter, inset line, and lamp pod.

The eight propeller blades share one geometry because their topology and
material are identical. The thirty collar rivets use one instanced sphere.
Parts with different topology retain separate meshes and semantic names.

## Material fit

The model generates its effect-owned texture inputs at construction time:

- a `2048 * 1024` hull atlas stores window cut-out, gold ornament, and soft
  grime channels;
- a `512 * 512` Sobel-derived normal map stores the six-cell diamond quilt;
- a `128 * 128` gauge texture stores twelve ticks and the fixed needle pose.

Porcelain, brass, glass, leather, walnut, lamp, and gauge materials remain
separate because their shading and transparency contracts differ. The hull is
double-sided: front faces mix porcelain, gold, and grime; back faces use the
interior dark color. Glass uses transmission `1.0`, IOR `1.52`, thickness
`0.05 m`, roughness `0.035`, and attenuation distance `2.5 m`.

## Observed limitations

- The hull aperture is an alpha-tested material cut-out rather than a boolean
  topology opening. The separate glazing and frame make the visible assembly
  complete, but the hull boundary has no emitted interior wall.
- The model targets close hero framing. The `128`-segment hull, `96`-segment
  dome, repeated sweep sections, and furnished interior are not a distant LOD.
- Triangle evidence counts one copy of shared geometry. Instanced rivets and
  repeated propeller-blade draws need separate instance accounting when a
  renderer budget is the question.
- Generated canvas textures require a browser canvas implementation.
- Motion animates the propeller, helm, and whole-object float; it is presentation
  motion, not a physical vehicle simulation.

## Diagnostics

The example records `part` and `tris` whenever a defining geometry is emitted.
Report that list together with total draw calls and renderer triangles; no one
number represents both unique geometry storage and repeated draws.

Use the gallery modes as follows:

- `final`: complete assembly with generated materials;
- `topology`: wireframe across every material role;
- `hull-loft`: isolated wireframe hull skin showing the `56 * 128` output grid.
- `no-glass`: complete opaque assembly with transmissive glazing hidden.

Also inspect the alpha-tested window boundary, mirrored fin winding, glass
depth order, shared propeller blade, and the transition from tilted collar
rings to the untilted stern frame.

## Failure diagnosis

| Symptom | Check |
| --- | --- |
| hull turns inside out | `gridGeometry` normal flip and index winding must change together |
| sweep twists abruptly | parallel-transport normal rotation or a duplicate interior path point is invalid |
| ornament drifts when tessellation changes | hull UV `v` must use accumulated plan distance, not output-ring index alone |
| window frame misses the cut-out | cut-out, frame, and glazing must share the same hull UV outline |
| mirrored fins shade inward | mirror transform, loft winding, and material side ownership are inconsistent |
| propeller memory multiplies by eight | all eight blade meshes must share one blade geometry |
| cabin disappears through the hull | hull back-face material or alpha aperture ownership has been removed |
| topology mode changes silhouette | the debug path is changing visibility or transforms instead of material wireframe only |
