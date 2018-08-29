import { DocumentGenerator } from "../types/Generator";
import { cwd } from "process";
import { writeFileSync } from "fs";
import { join } from "path";
import { Document, Packer, Paragraph, Table } from "docx";
import { forEach, concat } from "lodash";


export const MSWordGenerator: DocumentGenerator = async (metadata, output_path = cwd()) => {
    const output_filename = join(output_path, `${metadata.name || "output"}.docx`)
    const document = new Document();

    forEach(metadata.entities, ({ fields, associations, name, description, operations, path }) => {

        document.addParagraph(new Paragraph(`${name}`).heading1())

        const entityDictionary = new Table(fields.length + associations.length, 3);


        forEach(concat(fields, associations), ({ name, nullable, description, type }, index) => {
            entityDictionary.getRow(index).getCell(0).addContent(new Paragraph(name))
            entityDictionary.getRow(index).getCell(1).addContent(new Paragraph(description))
            entityDictionary.getRow(index).getCell(2).addContent(new Paragraph(type))
        })

        document.addTable(entityDictionary)

    })

    await saveDocumentFile(document, output_filename);
}

export const saveDocumentFile = async (document: Document, target: string) => {
    const packer = new Packer();
    const buffer = await packer.toBuffer(document);
    writeFileSync(target, buffer);
}