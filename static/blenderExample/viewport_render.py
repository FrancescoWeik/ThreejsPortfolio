import bpy, os, math

out_dir = os.path.dirname(bpy.data.filepath)
sc = bpy.context.scene

if not sc.camera:
    bpy.ops.object.camera_add(location=(5, -5, 4))
    cam = bpy.context.active_object
    cam.rotation_euler = (math.radians(55), 0, math.radians(45))
    sc.camera = cam

sc.render.engine = 'BLENDER_EEVEE'
sc.render.resolution_x = 1200
sc.render.resolution_y = 900
sc.render.image_settings.file_format = 'PNG'
sc.render.filepath = os.path.join(out_dir, "preview_eevee.png")
bpy.ops.render.render(write_still=True)
print("EEVEE preview saved")
