import { VirtualMachine } from "./VirtualMachine.ts";

const vm = new VirtualMachine(await Deno.readTextFile("input.txt"));

try {
  while (!vm.step()) {
    if (vm.trace.includes(vm.instructionPointer)) {
      vm.abort("Instruction was executed a second time");
    }
  }
} catch (err) {
  console.error(err.stack);
} finally {
  console.log(vm.accumulator);
}

export {};
