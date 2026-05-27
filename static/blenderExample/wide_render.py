import bpy, os, math

out_dir = os.path.dirname(bpy.data.filepath)
sc = bpy.context.scene

# Wide angle, far back to see the whole scene
if not sc.camera:
    bpy.ops.object.camera_add(location=(10, -10, 7))
    cam = bpy.context.active_object
    cam.rotation_euler = (math.radians(52), 0, math.radians(45))
    sc.camera = cam
else:
    sc.camera.location = (10, -10, 7)
    sc.camera.rotation_euler = (math.radians(52), 0, math.radians(45))

sc.render.engine = 'BLENDER_EEVEE'
sc.render.resolution_x = 1600
sc.render.resolution_y = 900
sc.render.image_settings.file_format = 'PNG'
sc.render.filepath = os.path.join(out_dir, "preview_wide.png")
bpy.ops.render.render(write_still=True)
print("Wide preview saved")

# Also print all object world positions
for obj in bpy.data.objects:
    if obj.type == 'MESH' and obj.visible_get():
        print(f"VISIBLE MESH: {obj.name} at {list(obj.matrix_world.translation)}")
