
export enum Protocol {
  odata = "odata",
  soap = "soap",
  swagger = "swagger",
}

export interface Metadata {

  /**
   * api name
   */
  name: string;

  /**
   * entity types
   */
  entities: Array<Entity>;

  /**
   * base endpoint for api
   */
  endpoint?: string;

  /**
   * metadata protocol
   */
  protocol: Protocol;

}

export enum EntityOperation {

  create = "create",
  update = "update",
  delete = "delete",
  read = "read",

}


export interface Entity {

  /**
   * entity name
   */
  name: string;
  /**
   * entity fields
   */
  fields: Array<Field>;
  description?: string;
  /**
   * entity associations
   */
  associations: Array<Association>;
  /**
   * allowed entity operations
   */
  operations: EntityOperation[];
  /**
   * addtional path for entitty
   */
  path: string;

}

export interface Field {

  key?: boolean;
  name: string;
  description?: string;
  type: string;
  readonly?: boolean;
  nullable?: boolean;
  format?: string;
  sample?: string;

}

export interface Association extends Field {

  Multiplicity?: string;

}