import "jest"

import { join } from "path";
import { parseC4COData } from "../../src/metadata/c4codata";

describe('c4codata test', () => {

  test('should parse odata', async () => {
    const meta = await parseC4COData(join(__dirname, "./metadata.xml"))
    expect(meta)
  });

});