import { SEP } from "https://deno.land/std/path/mod.ts";

export enum Directive {
  ACC = "acc",
  JMP = "jmp",
  NOP = "nop",
}

export class VirtualMachine {
  static parse(line: string): [Directive, number] {
    const [, directive, value] = line.match(/^([a-z]+) ((?:\+|-)\d+)$/)!;
    return [directive as Directive, Number(value)];
  }

  static serialize([directive, value]: [Directive, number]): string {
    return `${directive} ${value < 0 ? value : "+" + value}`;
  }

  protected readonly directives: Record<Directive, (value: number) => void> = {
    acc: (amount) => {
      this.accumulator += amount;
      this.instructionPointer++;
    },
    jmp: (offset) => {
      this.instructionPointer += offset;
    },
    nop: (value) => {
      // do nothing
      this.instructionPointer++;
    },
  };

  instructionPointer = 0;
  readonly instructions: [Directive, number][];
  readonly trace: number[] = [];

  accumulator = 0;

  constructor(program: string) {
    this.instructions = program.split("\n")
      .filter(Boolean)
      .map(VirtualMachine.parse);
  }

  abort(reason: string): never {
    const error = new Error(reason);
    error.stack = `ABORT: ${reason}\n    at ${
      VirtualMachine.serialize(this.instructions[this.instructionPointer])
    } (${Deno.cwd()}${SEP}input.txt:${this.instructionPointer + 1})`;
    throw error;
  }

  step(): boolean {
    this.trace.push(this.instructionPointer);
    const [directive, value] = this.instructions[this.instructionPointer];
    this.directives[directive](value);

    return this.instructionPointer === this.instructions.length;
  }
}

if (import.meta.main) {
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
}
