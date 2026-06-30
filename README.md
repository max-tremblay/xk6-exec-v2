# xk6-exec-v2

Fork of [grafana/xk6-exec](https://github.com/grafana/xk6-exec) updated for k6 v2 (`go.k6.io/k6/v2`).

> **Disclaimer:** This fork is maintained for personal use. Issues and pull requests are welcome but will be handled on a best-effort basis with no guaranteed response time or SLA.

This is a [k6](https://go.k6.io/k6) extension using the
[xk6](https://github.com/grafana/xk6) system.

## Build

To build a `k6` binary with this extension, first ensure you have the prerequisites:

- [Go toolchain](https://go101.org/article/go-toolchain.html)
- Git

Then:

1. Install `xk6`:
  ```shell
  go install go.k6.io/xk6/cmd/xk6@latest
  ```

2. Build the binary:
  ```shell
  xk6 build --with github.com/max-tremblay/xk6-exec-v2@latest
  ```

## Development

To make development a little smoother, use the `Makefile` in the root folder. The default target will format your code, run tests, and create a `k6` binary with your local code rather than from GitHub.

```bash
make
```

Once built, you can run your newly extended `k6` using:
```shell
./k6 run examples/script.js
# or on macOS:
./k6 run examples/script-macos.js
```

## Configuration

| Option | Description |
|---|---|
| `dir` | Working directory for the command |
| `continue_on_error` | Instead of calling `log.Fatal`, return the error as a catchable JS exception |
| `include_stdout_on_error` | When the command fails, include stdout in the error object alongside stderr |
| `combine_output` | Merge stdout and stderr into a single output string |
| `env` | Additional environment variables (`["KEY=value"]`) |

See `examples/script-macos.js` for full usage examples.

## Example

```javascript
import exec from 'k6/x/exec';

export default function () {
  // Simple command
  console.log(exec.command("date"));

  // Catch a failed command without stopping k6
  try {
    exec.command("ls", ["-a", "/no/such/dir"], { continue_on_error: true });
  } catch (e) {
    console.log("caught: " + e);
  }
}
```
