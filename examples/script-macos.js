import exec from 'k6/x/exec';

export default function () {
  // Basic example: print current date
  console.log("-------------------- Example 1 -------------------------------")
  console.log(exec.command("date"));

  // With custom error handling:
  console.log("-------------------- Example 2 -------------------------------")
  try {
    exec.command("ls", ["-a", "/no/such/dir"], {
      "continue_on_error": true
    });
  } catch (e) {
    console.log("ERROR: " + e);
    if (e.value && e.value.stderr) {
      console.log("STDERR: " + String.fromCharCode.apply(null, e.value.stderr));
    }
  }

  // With custom error handling and stdout
  console.log("-------------------- Example 3 -------------------------------")
  try {
    exec.command("sh", ["-c", "echo 'normal output'; echo 'an error' 1>&2; exit 12"], {
      "continue_on_error": true,
      "include_stdout_on_error": true
    });
    console.log("all is well");
  } catch (e) {
    console.log("ERROR: " + e);
    console.log("process_state: " + e.value.process_state);
    console.log("exit_code: " + e.value.process_state.exitCode());
    console.log("success: " + e.value.process_state.success());
    console.log("stderr: " + String.fromCharCode(...e.value.stderr));
    if (e.value.stdout) {
      console.log("stdout: " + String.fromCharCode(...e.value.stdout));
    }
  }

  // Sets an environment variable
  console.log("-------------------- Example 4 -------------------------------")
  console.log(
    exec.command("bash", ["-c", "echo Using environment variable FOO=$FOO"], {
      env: ["FOO=bar"],
    }),
  );

  // With combined stdout and stderr
  console.log("-------------------- Example 5 -------------------------------")
  var output = exec.command("sh", ["-c", "printf 'normal output '; echo 'and an error' 1>&2"], {
    "combine_output": true,
  });
  console.log(output);

  // List files in the current directory (macOS ls with -G for color is ignored in output)
  console.log("-------------------- Example 6 -------------------------------")
  console.log(exec.command("ls", ["-la"], {
    "dir": "/tmp"
  }));
}
