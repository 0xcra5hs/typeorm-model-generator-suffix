/* eslint-disable @typescript-eslint/no-unused-vars */
import { plural } from "pluralize";
import * as changeCase from "change-case";
import { Relation } from "./models/Relation";
import { RelationId } from "./models/RelationId";
import { Entity } from "./models/Entity";
import { Column } from "./models/Column";

let pluralize: boolean;

export function enablePluralization(value: boolean) {
    pluralize = value;
}

export function relationIdName(
    relationId: RelationId,
    relation: Relation,
    owner?: Entity
): string {
    const columnOldName = relationId.fieldName;

    const isRelationToMany =
        relation.relationType === "OneToMany" ||
        relation.relationType === "ManyToMany";
    let newColumnName = columnOldName.replace(/[0-9]$/, "");

    if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
        newColumnName = newColumnName.substring(0, newColumnName.length - 1);
    }
    if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
        newColumnName = newColumnName.substring(0, newColumnName.length - 1);
    }
    if (isRelationToMany && pluralize) {
        newColumnName = plural(newColumnName);
    }

    return newColumnName;
}

export function relationName(relation: Relation, owner?: Entity): string {
    const columnOldName = relation.fieldName;

    const isRelationToMany =
        relation.relationType === "OneToMany" ||
        relation.relationType === "ManyToMany";
    let newColumnName = columnOldName.replace(/[0-9]$/, "");

    if (
        newColumnName.toLowerCase().endsWith("id") &&
        !newColumnName.toLowerCase().endsWith("guid")
    ) {
        newColumnName = newColumnName.substring(
            0,
            newColumnName.toLowerCase().lastIndexOf("id")
        );
    }
    if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
        newColumnName = newColumnName.substring(0, newColumnName.length - 1);
    }
    if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
        newColumnName = newColumnName.substring(0, newColumnName.length - 1);
    }
    if (isRelationToMany && pluralize) {
        newColumnName = plural(newColumnName);
    }
    return newColumnName;
}

export function entityName(
    oldEntityName: string,
    suffixName: string,
    entity?: Entity
): string {
    return oldEntityName + suffixName;
}

export function columnName(oldColumnName: string, column?: Column): string {
    return oldColumnName;
}

export function fileName(
    oldFileName: string,
    suffixFileName: string,
    suffixClassName: string
): string {
    // Remove the suffixClassName from oldFileName
    const newFileName = oldFileName.replace(suffixClassName, "");

    // Convert to camelCase: make the first character lowercase
    const baseName = newFileName.charAt(0).toLowerCase() + newFileName.slice(1);

    // Append the suffixFileName
    const result = baseName + suffixFileName;
    return result;
}
