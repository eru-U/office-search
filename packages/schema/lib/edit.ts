/**
 * 文字列が空なら null に、そうでなければ変換処理を行うプレプロセッサ
 * @returns 
 */
export const emptyToNull = (val: unknown) => (val === "" ? null : val);