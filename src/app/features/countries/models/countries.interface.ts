// To parse this data:
//
//   import { Convert } from "./file";
//
//   const welcome = Convert.toWelcome(json);

export interface Welcome {
    flags:   Flags;
    name:    Name;
    capital: string[];
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: NativeName };
}

export interface NativeName {
    official: string;
    common:   string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toWelcome(json: string): Welcome[] {
        return JSON.parse(json);
    }

    public static welcomeToJson(value: Welcome[]): string {
        return JSON.stringify(value);
    }
}
