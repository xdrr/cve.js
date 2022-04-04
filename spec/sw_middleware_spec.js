//
// Service Worker Middleware spec
// Filename: sw_middleware_spec.js
//
// Author: Ben N
//
// Description: Tests the instantiation of the SW middleware by the library
// and its operation in transferring request data.
//

describe("Middleware", () => {
  let user = {
    user: "user_1",
    org: "org_1",
    key: "12345abcdef",
  };

  let new_mw = () => {
    return new CveServicesMiddleware('http://localhost:8080/api', '__src__/sw.js');
  }

  it("installs", () => {
    let mw = new_mw();
    expect(mw).toBeInstanceOf(CveServicesMiddleware);
  });

  it("destroys", async () => {
    let mw = new_mw();

    await expectAsync(
      mw.destroy()
    ).toBeResolvedTo(false);
  });
});
