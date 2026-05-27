import bpy, json, os, math

out_dir = os.path.dirname(bpy.data.filepath)

# Get visible objects with their materials and dimensions
result = []
for obj in bpy.data.objects:
    if obj.type not in ('MESH', 'EMPTY') or not obj.visible_get():
        continue
    entry = {
        "name": obj.name,
        "type": obj.type,
        "location": list(obj.location),
        "scale": list(obj.scale),
        "dimensions": list(obj.dimensions) if hasattr(obj, 'dimensions') else [],
        "materials": [s.material.name if s.material else None for s in obj.material_slots],
        "has_geometry_nodes": any(m.type == 'NODES' for m in obj.modifiers) if hasattr(obj, 'modifiers') else False,
        "modifiers": [m.type for m in obj.modifiers] if hasattr(obj, 'modifiers') else [],
    }
    if hasattr(obj, 'modifiers'):
        for m in obj.modifiers:
            if m.type == 'NODES' and hasattr(m, 'node_group') and m.node_group:
                entry["geometry_nodes_group"] = m.node_group.name
    result.append(entry)

path = os.path.join(out_dir, "objects_detail.json")
with open(path, "w") as f:
    json.dump(result, f, indent=2, default=str)
print("Saved:", path)

# Also render from a nicer angle to see the cespuglioni
sc = bpy.context.scene
if not sc.camera:
    bpy.ops.object.camera_add(location=(4, -4, 3))
    cam = bpy.context.active_object
    cam.rotation_euler = (math.radians(60), 0, math.radians(45))
    sc.camera = cam

sc.render.resolution_x = 960
sc.render.resolution_y = 720
sc.render.image_settings.file_format = 'PNG'
sc.render.filepath = os.path.join(out_dir, "preview2.png")
bpy.ops.render.render(write_still=True)
print("Preview2 saved")
