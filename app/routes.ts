import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("routes/docs/layout.tsx", { id: "docs-layout" }, [
        route(":library/docs/*", "routes/docs/index.tsx", { id: "docs" }),
        route(":library/examples/*", "routes/docs/example.tsx", { id: "examples" })
    ])
] satisfies RouteConfig;
