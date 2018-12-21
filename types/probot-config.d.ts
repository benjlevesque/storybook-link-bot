import { Context } from "probot";

export default function<T>(
  context: Context,
  fileName: string,
  defaultConfig?: T,
  deepMergeOptions?: any
): T;
