import { formatarDataBR } from "./formatarDataBR";

describe("formatarDataBR", () => {
  it("deve formatar data ISO para BR", () => {
    expect(formatarDataBR("2025-07-20")).toBe("20/07/2025");
    expect(formatarDataBR("1980-05-15")).toBe("15/05/1980");
    expect(formatarDataBR("2000-01-01")).toBe("01/01/2000");
    expect(formatarDataBR("1999-12-31")).toBe("31/12/1999");
  });

  it("deve lidar com datas incompletas", () => {
    expect(formatarDataBR("2025-07")).toBe("undefined/07/2025");
    expect(formatarDataBR("2025")).toBe("undefined/undefined/2025");
  });

  it("deve lidar com datas invertidas (não ISO)", () => {
    expect(formatarDataBR("20-07-2025")).toBe("2025/07/20");
  });
});
