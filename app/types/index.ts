import { NextRequest } from 'next/server';

/**
 * @description APIのRequestボディに型を付与する
 * @interface ExtendNextRequest
 * @extends {NextRequest}
 * @template T
 */
export interface ExtendNextRequest<T> extends NextRequest {
  json: () => Promise<T>;
}

/**
 * @description Issues画面で使用するAPIのRequestボディ
 * @export
 * @interface IssuesRequest
 */
export interface IssuesRequest {
  name: string;
  owner: string;
}
