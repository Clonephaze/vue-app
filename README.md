# Vue 3 + TypeScript + Sass SPA Setup

We've created a Vite-based Vue 3 project with the following structure and configuration:

```
src/
├── layouts/
│   ├── DefaultLayout.vue
│   └── BlankLayout.vue
├── router/
│   └── index.ts
├── styles/
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _index.scss
│   └── main.scss
├── views/
│   └── Home.vue
├── App.vue
└── main.ts
```

## Key Features:

1. **Dynamic Routing**:
   - Automatically generates routes based on .vue files in the `views/` directory
   - Supports dynamic parameters using bracket notation (e.g. `views/[id].vue`)
   - Automatically adds navigation links to the App.vue

2. **Flexible Layout System**:
   - Defines a `DefaultLayout` and `BlankLayout`
   - Layouts can be specified per-route using `defineOptions`
   - The `App.vue` component renders the appropriate layout

3. **Sass Structure**:
   - Utilizes the `@use` and `@forward` syntax to manage Sass imports
   - Global variables and mixins are defined in separate partials
   - The `main.scss` file imports the index file for global styles

4. **TypeScript Configuration**:
   - Configured to work with Vue 3 and the dynamic router setup
   - No longer relies on specific view file names, making the setup more flexible

To add a new page, simply create a new .vue file in the `views/` directory. The router and navigation will be updated automatically. You can also specify a custom layout per-page using `defineOptions`.

This setup provides a solid foundation for building a Vue 3 application with TypeScript and Sass, with a focus on flexibility and maintainability.