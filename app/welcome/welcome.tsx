import { CgFileDocument } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa6";
import { LuCalendarClock } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { NavLink } from "react-router";

export function Welcome() {
  const scrollToView = (viewId: string) => {
    const target = document.getElementById(viewId);
    if (!target) return;

    target.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  };
  return (
    <main className="hide-scrollbar overflow-hidden">
      <div className="h-dvh flex items-center justify-center">
        <div className="border-2 border-base-300 rounded-xl h-78 w-100 relative py-8">
          <h1 className="text-center text-4xl bold font-[Chewy]">Welcome</h1>
          <div className="divider mx-6 text-lg">to</div>
          <div className="bg-[url(/verbpatch_logo.png)] h-40 bg-cover bg-center"></div>
          <div className="text-right text-lg me-2 font-[Chewy]">home of headless libraries</div>

          <div className="text-center mt-4 flex justify-center cursor-pointer" onClick={() => scrollToView("calendar-box")}>
            <FaChevronDown size={32} className="animate-bounce" />
          </div>
        </div>
      </div>
      <div id="calendar-box" className="calendar-box h-dvh flex items-center justify-center">
        <div className="border-2 border-base-300 rounded-xl h-78 w-100 relative p-8 flex flex-col justify-between">
          <div className="rotate-15 bg-base-100 absolute -top-5 -right-5">
            <LuCalendarClock size={78} color="var(--color-base-content)" className="animate-bounce" />
          </div>
          <h2 className="text-center text-4xl bold font-[Chewy]">Headless Calendar</h2>
          <p>Headless Calendar is a powerful, unstyled, and highly customizable engine for building calendar and scheduling experiences in your JavaScript applications.</p>
          <div className="text-center">
            <NavLink to={"/Calendar/docs/introduction"} className={"btn btn-ghost"}>
              <CgFileDocument /> Docs
            </NavLink>
            <NavLink to={"https://github.com/VerbPatch/headless-calendar"} className={"btn btn-ghost"} target="_blank">
              <SiGithub />
              Source
            </NavLink>
          </div>
        </div>
      </div>
    </main>
  );
}
