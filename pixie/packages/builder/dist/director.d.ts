import { WalletBuilder } from "./builder";
export declare class Director {
    private builder;
    setBuilder(builder: WalletBuilder): void;
    buildDopplerCloneWebWallet(): void;
    buildDopplerCloneServerWallet(): void;
}
