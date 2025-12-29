import type { Route } from "../+types/root";

export interface RouteLoaderParams extends Route.LoaderArgs {

}

export interface ExampleRLParams extends Route.LoaderArgs {
    file: string;
}