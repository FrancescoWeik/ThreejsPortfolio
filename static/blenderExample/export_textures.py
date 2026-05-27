import bpy, os

out_dir = os.path.join(os.path.dirname(bpy.data.filepath), "textures_export")
os.makedirs(out_dir, exist_ok=True)

for img in bpy.data.images:
    if img.name == 'Render Result':
        continue
    try:
        filepath = os.path.join(out_dir, img.name)
        if not os.path.splitext(img.name)[1]:
            filepath += '.png'
        img.save_render(filepath)
        print(f"Saved: {img.name} -> {filepath}")
    except Exception as e:
        # Try packing and saving
        try:
            img.filepath_raw = filepath
            img.save()
            print(f"Saved (raw): {img.name}")
        except Exception as e2:
            print(f"FAILED: {img.name} -> {e} | {e2}")
