import { request } from "node:https";

/*
 * One GET on a brand-new connection.
 *
 * The CMS backend runs on two Fly.io machines that do not hold the same data
 * (lib/cms.ts). fetch() keeps connections alive, and Fly routes a reused
 * connection back to the same machine, so retrying over fetch kept hitting
 * the machine that answered first. A fresh connection per attempt
 * (agent: false) lets each retry reach either machine.
 */
export function freshGet(url: string, timeoutMs = 4000) {
  return new Promise<{ status: number; contentType: string; body: Buffer }>((resolve, reject) => {
    const req = request(url, { method: "GET", agent: false, headers: { Accept: "application/json, image/*" } }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () =>
        resolve({
          status: res.statusCode ?? 0,
          contentType: String(res.headers["content-type"] ?? ""),
          body: Buffer.concat(chunks),
        }),
      );
      res.on("error", reject);
    });
    req.setTimeout(timeoutMs, () => req.destroy(new Error(`timeout after ${timeoutMs}ms: ${url}`)));
    req.on("error", reject);
    req.end();
  });
}
