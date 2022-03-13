//
// Service Worker Middleware spec
// Filename: sw_middleware_spec.js
//
// Author: Ben N
//
// Description: Tests the instantiation of the SW middleware by the library
// and its operation in transferring request data.
//

describe("Service worker", () => {
  let mw =  new CveServicesMiddleware();
  let user = {
    user: "user_1",
    org: "org_1",
    key: "12345abcdef",
  };

  it("installs", () => {
    expect(mw).toBeInstanceOf(CveServicesMiddleware);
  });

  it("destroys", () => {
    mw.destroy();
  });

  it("sets credentials", () => {
    mw.setCredentials(user);
  });
});
