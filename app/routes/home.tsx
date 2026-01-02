import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: "VerbPatch" }, { name: "description", content: "Welcome to VerbPatch! Home of headless libraries" }];
}

export default function Home() {
  return <Welcome />;
}
