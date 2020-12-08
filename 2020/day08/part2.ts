import { Directive, VirtualMachine } from "./VirtualMachine.ts";

class SpeculativeVirtualMachine extends VirtualMachine {
  static fork(state: VirtualMachine): VirtualMachine {
    const vm = new VirtualMachine("");
    return Object.assign(vm, {
      instructionPointer: state.instructionPointer,
      instructions: state.instructions.slice(),
      trace: state.trace.slice(0, -1),
      accumulator: state.accumulator,
    });
  }

  protected readonly directives: Record<Directive, (value: number) => void> = {
    acc: (amount) => {
      this.accumulator += amount;
      this.instructionPointer++;
    },
    jmp: (offset) => {
      // create a new VM treating the current instruction as a nop
      const clone = SpeculativeVirtualMachine.fork(this);
      clone.instructions[clone.instructionPointer] = [Directive.NOP, offset];
      this.speculativeExecutions.add(clone);

      this.instructionPointer += offset;
    },
    nop: (value) => {
      // create a new VM treating the current instruction as a jmp
      const clone = SpeculativeVirtualMachine.fork(this);
      clone.instructions[clone.instructionPointer] = [Directive.JMP, value];
      this.speculativeExecutions.add(clone);

      this.instructionPointer++;
    },
  };

  private speculativeExecutions = new Set<VirtualMachine>();
  firstHaltedVm?: VirtualMachine;

  step(): boolean {
    // speculation should only happen once per instruction
    const speculationFinished = this.trace.includes(this.instructionPointer);
    if (!speculationFinished) {
      const isHalted = super.step();
      // this should never happen with the default input
      if (isHalted) return true;
    }

    for (const vm of this.speculativeExecutions) {
      try {
        if (vm.trace.includes(vm.instructionPointer)) {
          vm.abort("Instruction was executed a second time");
        }
        if (vm.step()) {
          this.firstHaltedVm = vm;
          return true;
        }
      } catch (err) {
        console.error(err.stack);
        this.speculativeExecutions.delete(vm);
      }
    }

    return speculationFinished && this.speculativeExecutions.size === 0;
  }
}

const vm = new SpeculativeVirtualMachine(await Deno.readTextFile("input.txt"));

try {
  while (!vm.step()) void 0;
} catch (err) {
  console.error(err.stack);
} finally {
  console.log(vm.firstHaltedVm?.accumulator);
}

export {};
