# Sculpted profiles and semantic mesh emission

Use this reference for reusable profile sweeps, rail skins and caps, oriented branch rings, semantic mesh writers, material slots, and geometry-level diagnostics.

## Contents

- Sculpted frame profile
- Rail mesh emission
- Semantic dimensions and material fit
- Tree ring emission
- Semantic mesh writer
- Selection and LOD
- Observed limitations
- Diagnostics


## Sculpted frame profile

In the `sculpted-gallery-frame` example, the frame is not a beveled box. A
normalized rail coordinate `t` drives a profile assembled from named lobes:

```text
crown:
  0.355 * scale * sin(pi*t)^0.56

inner bead:
  0.105 * scale * exp(-((t - 0.085) / 0.033)^2)

outer bead:
  0.092 * scale * exp(-((t - 0.905) / 0.038)^2)

inner groove:
  -0.115 * scale * exp(-((t - 0.205) / 0.043)^2)

outer groove:
  -0.102 * scale * exp(-((t - 0.735) / 0.052)^2)

shoulder:
  0.045 * scale * exp(-((t - 0.42) / 0.15)^2)

cove:
  -0.035 * scale * exp(-((t - 0.61) / 0.095)^2)
```

`scale = railWidth / 0.75`. The inner and outer ends are blended to controlled
terminal depths, preventing a crown shape from meeting the artwork or wall
with an accidental vertical edge.

The profile uses `92` samples. This is deliberate high curvature
resolution for close hero framing, not a universal default.

## Rail mesh emission

Each of four orientations has its own coordinate mapping. The profile travels
across the rail width while `s` travels along the frame side. Top/bottom rails
use `132` length segments; left/right use `156`.

For every profile sample and length sample, emit:

```text
top vertex at profile depth
bottom vertex at fixed backing depth
UV = (s, t)
```

Then emit:

```text
top skin
bottom skin
inner wall
outer wall
two end caps
```

The index winding helper emits:

```text
a, b, c
b, d, c
```

Normals are computed after all faces are assembled; a bounding sphere is also
computed. Four rail meshes meet at miter-like endpoints because their length
shrinks/expands as `t` moves from inner to outer edge.

## Semantic dimensions and material fit

The frame dimensions are derived:

```text
innerWidth = postWidth
innerHeight = innerWidth / embedAspectRatio
railWidthX = (outerWidth - innerWidth) / 2
railWidthY = (outerHeight - innerHeight) / 2
profileRailWidth = min(railWidthX, railWidthY)
art card Z = rail offset + profileDepth(innerRimT)
```

This keeps artwork, mat, frame profile, and backing coupled. Avoid tuning their
Z positions independently.

The same file pairs the geometry with walnut, antique-gold, and ebony material
bundles. Geometry is judged under grazing spotlights and shadow maps, so profile
depth must create readable highlights without bloom.

## Tree ring emission

The `structured-ash-growth` example under `$threejs-procedural-vegetation`
emits branches as oriented rings. Every branch section owns:

```text
center
orientation
radius
longitudinal fraction
branch level
```

Ring vertices use branch-local radial angle and an explicit seam. Bark UV
length follows branch length and circumference instead of normalizing every
branch to identical density.

Child branches are generated from the growth hierarchy before geometry is
batched. This separation makes it possible to lower radial segments by level
without changing topology ownership.

Leaf cards use canopy-oriented normals rather than only card-plane normals,
showing that generated shading attributes can intentionally differ from
geometric face normals.

## Semantic mesh writer

The `procedural-financial-tower` compiler under
`$threejs-procedural-architecture` accumulates vertices and indices by
material slot. Modules emit semantic geometry into a shared writer rather than
constructing one `Mesh` each.

Preserve this contract:

```text
module plan
  -> transformed semantic vertices
  -> triangles tagged with material slot
  -> grouped BufferGeometry
```

The writer also keeps module transforms and real dimensions outside raw buffer
code. This allows façade, roof, cornice, and ornament generators to share
emission without sharing design logic.

## Selection and LOD

Use:

```text
custom profile mesh
  when silhouette and grazing response define identity

oriented rings
  when hierarchy and taper define identity

semantic mesh writer
  when many varied modules must batch by material

instancing
  only when topology is identical and variation is attribute/transform based
```

Derive LOD from the generator:

- reduce profile samples while retaining crown and groove extrema;
- reduce branch radial segments by branch level;
- replace ornaments with relief only after silhouette contribution is small;
- preserve UV density and material slots across levels.

## Observed limitations

- The gallery frame computes smooth normals across all connected frame faces.
  If hard backing edges become visible, duplicate vertices by smoothing group.
- Its profile and segment counts are expensive for many frames. Cache geometry
  by dimension set and add a lower-detail authored profile.
- The four rails are separate meshes; a larger gallery may need material-based
  merging after transforms are fixed.
- Global `computeVertexNormals()` cannot infer semantic hard edges.
- Generic mesh decimation may erase the narrow beads and grooves that create
  the frame’s material response.

## Diagnostics

Expose:

```text
profile curve with named lobe contributions
profile sample indices
rail orientation and top/bottom skins
face winding and normal direction
UV checker
frame/art/backing depth relationship
tree branch rings and seams
material groups from the mesh writer
triangle, vertex, group, and draw counts
LOD overlay at the design camera
```
