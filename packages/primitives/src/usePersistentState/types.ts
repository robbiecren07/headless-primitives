export interface UsePersistentStateOptions<T = any> {
  key: string // Storage key
  defaultValue: T // Initial value if nothing stored
  storage?: Storage // window.localStorage (default) or sessionStorage, etc.
  serialize?: (v: T) => string // Custom serializer
  deserialize?: (v: string) => T // Custom deserializer
}
