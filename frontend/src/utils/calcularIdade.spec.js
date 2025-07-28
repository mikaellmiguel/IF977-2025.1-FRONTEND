import { calcularIdade } from "./calcularIdade";

describe("calcularIdade", () => {
  const realDate = Date;

  function mockDate(fixedDate) {
    globalThis.Date = class extends Date {
      constructor(...args) {
        if (args.length) {
          // eslint-disable-next-line constructor-super
          return super(...args);
        }
        return new realDate(fixedDate);
      }
      static now() {
        return new realDate(fixedDate).getTime();
      }
    };
  }

  afterEach(() => {
    globalThis.Date = realDate;
  });

  it("deve calcular idade corretamente antes do aniversário", () => {
    mockDate("2025-07-20");
    expect(calcularIdade("2000-08-01")).toBe(24);
  });

  it("deve calcular idade corretamente depois do aniversário", () => {
    mockDate("2025-08-02");
    expect(calcularIdade("2000-08-01")).toBe(25);
  });

  it("deve calcular idade corretamente no dia do aniversário", () => {
    mockDate("2025-08-01");
    expect(calcularIdade("2000-08-01")).toBe(25);
  });

  it("deve calcular idade para anos bissextos", () => {
    mockDate("2024-02-28");
    expect(calcularIdade("2000-02-29")).toBe(23);
    mockDate("2024-03-01");
    expect(calcularIdade("2000-02-29")).toBe(24);
  });

  it("deve retornar 0 para data de nascimento igual à data atual", () => {
    mockDate("2025-07-20");
    expect(calcularIdade("2025-07-20")).toBe(0);
  });

  it("deve lidar com datas inválidas", () => {
    mockDate("2025-07-20");
    expect(calcularIdade("")).toBeNaN();
    expect(calcularIdade("data-invalida")).toBeNaN();
  });
});
