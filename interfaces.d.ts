export interface IDbResponseError {
  message: string
}

export interface IDbResponse {
  data?: any
  id?: number
  list?: any[]
  error?: IDbResponseError
}
export interface IDbNotification {
  new_user?: number
  deleted_user?: number
  users_notification?: number
  admin_notification?: number
}
export interface IDbTools {
  connection: PoolConnection | undefined
  release: () => void

  beginTransaction: () => void
  commit: () => void
  rollback: () => void

  select: (query: string, params?: any) => Promise<IDbResponse>
  selectSingle: (query: string, params?: any) => Promise<unknown | null>

  insert: (table_name: TTableNames, params: any) => Promise<IDbResponse>
  insert_or_update: (
    table_name: TTableNames,
    params: any
  ) => Promise<IDbResponse>
  insert_with_query: (
    query: string,
    params?: any,
    table_name?: string
  ) => Promise<IDbResponse>

  update: (
    table_name: TTableNames,
    params: any,
    where?: string
  ) => Promise<IDbResponse>
  update_with_query: (query: string, params?: any) => Promise<IDbResponse>

  delete: (query: string, params?: any) => Promise<IDbResponse>

  queryNonResponse: (query: string, params?: any) => Promise<IDbResponse>
}
