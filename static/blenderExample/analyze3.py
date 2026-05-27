import bpy, json, os, math

out_dir = os.path.dirname(bpy.data.filepath)
result = {}

# Extract particle system details
particles_info = {}
for obj in bpy.data.objects:
    if not hasattr(obj, 'particle_systems'):
        continue
    for ps in obj.particle_systems:
        s = ps.settings
        entry = {
            "object": obj.name,
            "ps_name": ps.name,
            "count": s.count,
            "render_type": s.render_type,
            "instance_object": s.instance_object.name if s.instance_object else None,
            "instance_collection": s.instance_collection.name if s.instance_collection else None,
            "size": s.particle_size,
            "size_random": s.size_random,
            "emit_from": s.emit_from,
        }
        particles_info[f"{obj.name}_{ps.name}"] = entry

result["particle_systems"] = particles_info

# Get all collections and their objects
collections = {}
for col in bpy.data.collections:
    collections[col.name] = [o.name for o in col.objects]
result["collections"] = collections

# Get geometry nodes details
gn_groups = {}
for ng in bpy.data.node_groups:
    nodes_info = []
    for node in ng.nodes:
        d = {"name": node.name, "type": node.type}
        if hasattr(node, 'inputs'):
            for inp in node.inputs:
                try:
                    val = inp.default_value
                    if hasattr(val, '__iter__') and not isinstance(val, str):
                        val = list(val)
                    d.setdefault("inputs", {})[inp.name] = str(val)
                except:
                    pass
        nodes_info.append(d)
    gn_groups[ng.name] = nodes_info

result["node_groups"] = gn_groups

# Save
path = os.path.join(out_dir, "advanced_data.json")
with open(path, "w") as f:
    json.dump(result, f, indent=2, default=str)
print("Saved:", path)
