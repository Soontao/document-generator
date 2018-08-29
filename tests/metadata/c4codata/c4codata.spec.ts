import "jest"

import { join } from "path";
import { C4CODataParser } from "../../../src/metadata/c4codata";
import { MSWordGenerator } from "../../../src/generator/MSWord";


describe('c4codata test', () => {

  test('should parse odata', async () => {
    const meta = await C4CODataParser(join(__dirname, "./metadata.xml"))
    expect(meta)
  });

  test('should ', async () => {
    await MSWordGenerator(
      await C4CODataParser(join(__dirname, "./metadata.xml")),
      join(__dirname, "../../tmp")
    )
  });

});