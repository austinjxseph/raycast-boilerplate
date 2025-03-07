/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-documentation` command */
  export type SearchDocumentation = ExtensionPreferences & {}
  /** Preferences accessible in the `search-classes` command */
  export type SearchClasses = ExtensionPreferences & {
  /** Measuring Unit - Measuring unit to use for spacing-related properties */
  "measuringUnit": "rem" | "px",
  /** Default Action - Action to perform when pressing enter */
  "defaultAction": "selector" | "css" | "class"
}
  /** Preferences accessible in the `search-colors` command */
  export type SearchColors = ExtensionPreferences & {}
  /** Preferences accessible in the `search-components` command */
  export type SearchComponents = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-documentation` command */
  export type SearchDocumentation = {}
  /** Arguments passed to the `search-classes` command */
  export type SearchClasses = {}
  /** Arguments passed to the `search-colors` command */
  export type SearchColors = {}
  /** Arguments passed to the `search-components` command */
  export type SearchComponents = {}
}


declare module "swift:*" {
  function run<T = unknown, U = any>(command: string, input?: U): Promise<T>;
  export default run;
	export class SwiftError extends Error {
    stderr: string;
    stdout: string;
  }
}
