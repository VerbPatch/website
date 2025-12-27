import { NavLink } from "react-router";

const stackblitzUrl = "https://stackblitz.com/github/VerbPatch";

export default function StackBlitzButton({ lib, path, file }: { lib: string; path: string; file: string }) {
  return (
    <NavLink to={`${stackblitzUrl}/headless-${lib}/tree/main/examples/${path}?file=${file}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
      <img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Open in StackBlitz" className="stackblitz-img" />
    </NavLink>
  );
}
