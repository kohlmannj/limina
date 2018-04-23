/* tslint:disable variable-name */
export const text = (label: string, value: any) => value;
export const boolean = (label: string, value: boolean) => value;
export const number = (label: string, value: number, options: Record<string, number>) => value;
export const color = (label: string, value: string) => value;
export const object = (label: string, value: any) => value;
export const array = (label: string, value: any[], separator = ',') => value;
export const select = (label: string, options: Record<string, any>, value: string) => value;
export const date = (label: string, value: any) => value;
