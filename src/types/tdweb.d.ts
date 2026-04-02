interface TdClientOptions {
  logVerbosityLevel?: number;
  mode?: string;
  instanceName?: string;
  readOnly?: boolean;
  isBackground?: boolean;
  useDatabase?: boolean;
  wasmUrl?: string;
}

interface TdClient {
  send(request: Record<string, unknown>): Promise<unknown>;
  onUpdate: ((update: Record<string, unknown>) => void) | null;
}

declare const tdweb: {
  default: new (options: TdClientOptions) => TdClient;
};
