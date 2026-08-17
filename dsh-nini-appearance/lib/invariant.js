//#region src/invariant.ts
const PACKAGE_NAME = "dsh-nini-appearance";
/** Cordis companion plugin name. */
const name = "client-nini-appearance-invariant";
/** Service required before the companion can reserve package ownership. */
const inject = ["invariants"];
/**
* No runtime invariant: the settings scope validates and publishes the
* durable appearance section, while the DOM applier forwards every accepted
* snapshot into the theme registry and retracts it on dispose. Schema/scope
* agreement is covered by this package's schema and applier behavior specs.
*/
const install = () => {};
/**
* Register this package's invariant companion.
* @param ctx - Cordis context carrying the invariant service.
* @returns the installed registration's disposer after setup succeeds.
*/
const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//#endregion
export { apply, inject, name };
