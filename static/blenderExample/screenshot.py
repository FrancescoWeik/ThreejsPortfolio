import bpy, os

# Set render settings for a quick viewport-style image
bpy.context.scene.render.resolution_x = 800
bpy.context.scene.render.resolution_y = 600
bpy.context.scene.render.image_settings.file_format = 'PNG'
output = os.path.join(os.path.dirname(bpy.data.filepath), "preview_viewport.png")

# Try to get or add a camera
if not bpy.context.scene.camera:
    bpy.ops.object.camera_add(location=(6, -6, 5))
    cam = bpy.context.active_object
    cam.rotation_euler = (1.1, 0, 0.785)
    bpy.context.scene.camera = cam

bpy.context.scene.render.filepath = output
bpy.ops.render.render(write_still=True)
print("SAVED:", output)
