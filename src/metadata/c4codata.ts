import {
  parseODataMetadata,
  getEntityCollectionDefault,
  getEntityTypeByEntityCollection,
} from "c4codata/lib/generator";
import { ODataMetadata } from "c4codata/lib/generator/meta_odata";
import { readFileSync } from "fs";
import { isAbsolute } from "path";
import { Parser } from "../types/Parser";
import { Metadata, Entity, Field, Association, EntityOperation } from "../types/Metadata";
import { forEach, first, map } from "lodash";

export const parseC4COData: Parser = async (metadataOrPath: string) => {
  var metadataString = metadataOrPath;

  if (isAbsolute(metadataOrPath)) {
    metadataString = readFileSync(metadataOrPath, "utf8")
  }

  var meta = await parseODataMetadata(metadataString)

  return mapC4CODataMetadataToMetadata(meta)
}

export const mapC4CODataMetadataToMetadata = (odataMetadata: ODataMetadata): Metadata => {

  const metadata = { entities: [] }

  const collections = getEntityCollectionDefault(odataMetadata)

  forEach(collections, c => {

    const entityType = first(getEntityTypeByEntityCollection(odataMetadata, c));

    const keys = map(entityType.Key, k => k.PropertyRef[0].$.Name)

    const entity: Entity = {
      name: entityType.$.Name,
      description: entityType.$["sap:label"],
      fields: [],
      operations: [],
      associations: [],
      path: c.$.Name,
    }

    entity.operations.push(EntityOperation.read);

    if (Boolean(c.$["sap:creatable"])) {
      entity.operations.push(EntityOperation.create)
    }

    if (Boolean(c.$["sap:updatable"])) {
      entity.operations.push(EntityOperation.update)
    }

    if (Boolean(c.$["sap:deletable"])) {
      entity.operations.push(EntityOperation.delete)
    }

    forEach(entityType.Property, p => {

      const field: Field = {
        name: p.$.Name,
        description: p.$["sap:label"],
        type: p.$.Type,
        key: keys.indexOf(p.$.Name) >= 0,
        nullable: Boolean(p.$.Nullable),
        readonly: !(Boolean(p.$["sap:updatable"])),
      }
      entity.fields.push(field)

    })

    forEach(entityType.NavigationProperty, n => {
      const association: Association = {
        name: n.$.Name,
        type: n.$.ToRole,
        key: false,
      }
      entity.associations.push(association)
    })

    metadata.entities.push(entity)

  })

  return metadata;

}