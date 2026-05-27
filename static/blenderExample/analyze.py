import bpy, json, os, math

out_dir = os.path.dirname(bpy.data.filepath)
result = {}

# ── Objects ───────────────────────────────────────────────────────────────────
objects = []
for obj in bpy.data.objects:
    entry = {
        "name": obj.name,
        "type": obj.type,
        "location": list(obj.location),
        "rotation_euler": [math.degrees(a) for a in obj.rotation_euler],
        "scale": list(obj.scale),
        "visible": obj.visible_get(),
    }
    if obj.data and hasattr(obj.data, 'vertices'):
        entry["vertex_count"] = len(obj.data.vertices)
    objects.append(entry)
result["objects"] = objects

# ── Materials & Shader Nodes ─────────────────────────────────────────────────
def node_to_dict(node):
    d = {"name": node.name, "type": node.type, "inputs": {}, "outputs": {}}
    for inp in node.inputs:
        try:
            val = inp.default_value
            if hasattr(val, '__iter__'):
                val = list(val)
            else:
                val = val
            d["inputs"][inp.name] = val
        except Exception:
            pass
    if node.type == 'RGB':
        try:
            d["color"] = list(node.color)
        except Exception:
            pass
    if node.type == 'VALUE':
        try:
            d["value"] = node.outputs[0].default_value
        except Exception:
            pass
    if hasattr(node, 'image') and node.image:
        d["image"] = node.image.name
    if hasattr(node, 'blend_type'):
        d["blend_type"] = node.blend_type
    if hasattr(node, 'operation'):
        d["operation"] = node.operation
    return d

materials = {}
for mat in bpy.data.materials:
    if not mat.use_nodes:
        materials[mat.name] = {"use_nodes": False, "color": list(mat.diffuse_color)}
        continue
    nodes = [node_to_dict(n) for n in mat.node_tree.nodes]
    links = [{"from": l.from_node.name + "." + l.from_socket.name,
              "to":   l.to_node.name   + "." + l.to_socket.name}
             for l in mat.node_tree.links]
    materials[mat.name] = {"use_nodes": True, "nodes": nodes, "links": links}
result["materials"] = materials

# ── Collections ───────────────────────────────────────────────────────────────
result["collections"] = [c.name for c in bpy.data.collections]

# ── Scene settings ────────────────────────────────────────────────────────────
sc = bpy.context.scene
result["scene"] = {
    "name": sc.name,
    "frame_current": sc.frame_current,
    "render_engine": sc.render.engine,
}

# ── World / background ────────────────────────────────────────────────────────
if bpy.context.scene.world and bpy.context.scene.world.use_nodes:
    result["world_nodes"] = [node_to_dict(n) for n in bpy.context.scene.world.node_tree.nodes]

# ── Save JSON ─────────────────────────────────────────────────────────────────
json_path = os.path.join(out_dir, "scene_data.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, default=str)
print("JSON saved to:", json_path)

# ── Render a preview (add camera if missing) ──────────────────────────────────
if not sc.camera:
    bpy.ops.object.camera_add(location=(6, -5, 5))
    cam = bpy.context.active_object
    cam.rotation_euler = (math.radians(55), 0, math.radians(45))
    sc.camera = cam

sc.render.resolution_x = 960
sc.render.resolution_y = 720
sc.render.image_settings.file_format = 'PNG'
img_path = os.path.join(out_dir, "preview.png")
sc.render.filepath = img_path
bpy.ops.render.render(write_still=True)
print("Preview saved to:", img_path)
