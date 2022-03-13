//
// Credential Management Specs
// Filename: cred_mgmt_spec.js
//
// Author: Ben N
//

describe("Credential management", () => {
  let cs = null;

  let user_1 = [
    "cna_short_name",
    "cna_username",
    "api_key",
  ];

  let user_2 = [
    "cna_short_name_2",
    "cna_username_2",
    "api_key",
  ];

  let user_3 = [
    "cna_short_name_2",
    "cna_username_2",
    "api_key",
    0,                          // instant timeout
  ];

  beforeEach(() => {
    cs = new CveServices();
  });

  it("Registers new user", () => {
    expect(
      cs.login(...args)
    ).toBe(true);
  });

  it("Logs out session", () => {
    expect(
      cs.login(...user_1)
    ).toBe(true);

    expect(
      cs.logout()
    ).toBe(true);
  });

  it("Rejects API methods without creds", async () => {
    await expectAsync(cs.getCveIds()).toBeRejectedWith(CredentialError);
  });

  it("Rejects API methods after logout", async () => {
     expect(
      cs.login(...user_1)
    ).toBe(true);

    expect(
      cs.logout()
    ).toBe(true);

    await expectAsync(cs.getCveIds()).toBeRejectedWith(CredentialError);
  })

  it("Does not logout empty session", () => {
    expect(
      cs.logout()
    ).toBe(false);
  });

  it("Switches accounts", () => {
    expect(
      cs.login(user_1)
    ).toBe(true);

    // Convention 1: call login multiple times
    expect(
      cs.login(user_2)
    ).toBe(true);

    // Convention 2: logout then login
    expect(
      cs.logout(user_1)
    ).toBe(true);

    expect(
      cs.login(user_1)
    ).toBe(true);
  });

  it("Times out credentials", async () => {
    expect(
      cs.login(...user_3)
    ).toBe(true);

    await expectAsync(
      cs.getCveIds()
    ).toBeRejectedWith(CredentialError);
  });
});
