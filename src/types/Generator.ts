import { Metadata } from "./Metadata";


export interface DocumentGenerator {
    (
        /**
         * standard metadata
         */
        metadata: Metadata,
        /**
         * document out put path, default is process current work directory
         */
        output_path?: string
    ): Promise<void>;
}