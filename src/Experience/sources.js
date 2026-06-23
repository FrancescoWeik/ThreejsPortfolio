import projects from './projects.js'

//Each project's image is preloaded as a texture, named `projectImage_<node>`
const projectImageSources = projects
    .filter((project) => project.imagePath)
    .map((project) => ({
        name: `projectImage_${project.node}`,
        type: 'texture',
        path: project.imagePath
    }))

export default [
    {
        name: "ironDuckCardModel",
        type: "gltfModel",
        path: 'models/IronDuckCard/IronDuckCard.glb'
    },
    ...projectImageSources
]
