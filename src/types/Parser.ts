import { Metadata } from "./Metadata";


export interface Parser {

  (metaStringOrPath: string): Promise<Metadata>;

}