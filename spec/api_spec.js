//
// API specificaiton
// Filename: api_spec.js
//
// Author: Ben N
//
// Description: Testing cve.js against the cve-services API.

describe('CNA operations', () => {
  let cs = null;

  // a testing key for cve-services dev
  let testing_key = 'TCF25YM-39C4H6D-KA32EGF-V5XSHN3';
  let cve_id_1 = 'CVE-1999-0001';
  let cve_id_2 = 'CVE-2022-0004';

  let cna_user = [
    'scottmitchell@range_4.com',
    'range_4',
    testing_key,
  ];

  let admin_user = [
    'admin_short_name',
    'admin_username',
    testing_key,
  ];

  beforeEach(async () => {
    cs = new CveServices('http://localhost:3000/api', '/__src__/sw.js');
    cs.login(...cna_user);
  });

  it('gets CVE IDs', async () => {
    await expectAsync(
      cs.getCveIds()
    ).toBeResolved();
  });

  it('gets CVE ID', async () => {
    await expectAsync(
      cs.getCveId(cve_id_1)
    ).toBeResolved();
  });

  it('reserves CVE ID', async () => {
    await expectAsync(
      cs.reserveCveId()
    ).toBeResolved();
  });

  it('gets CVE ID', async () => {
    await expectAsync(
      cs.getCveId(cve_id_1)
    ).toBeResolved();
  });

  it('updates CVE ID', async () => {
    await expectAsync(
      cs.updateCveId(cve_id_2, 'REJECTED', cna_user[1])
    ).toBeResolved();
  });

  it('gets CVE record by ID', async () => {
    await expectAsync(
      cs.getCve(cve_id_1)
    ).toBeResolved();
  });

  it('gets all CVE records', async () => {
    await expectAsync(
      cs.getCves()
    ).toBeResolved();
  });

  it('gets all rejected CVE records', async () => {
    await expectAsync(
      cs.getCves({state: 'REJECTED'})
    ).toBeResolved();
  });

  it('creates a CVE record', async () => {
    let newCveId = 'CVE-2022-9999';
    let newCveSchema = {
      cnaContainer: {}
    };

    await expectAsync(
      cs.createCve(newCveId)
    ).toBeResolved();
  });

  it('updates a CVE record', async () => {
    await expectAsync(
      cs.updateCve(cve_id_2, {})
    ).toBeResolved();
  });

  it('creates a reject CVE record', async () => {
    let newCveRecId = 'CVE-2022-9991';
    await expectAsync(
      cs.createRejectCve(newCveRecId, {})
    ).toBeResolved();
  });

  it('updates a reject CVE record', async () => {
    let updateCveRecId = 'CVE-2022-9991';
    await expectAsync(
      cs.updateRejectCve(updateCveRecId, {})
    ).toBeResolved();
  });

  it('retrieves own org info', async () => {
    await expectAsync(
      cs.getOrgInfo()
    ).toBeResolved();
  });

  it('update own org ID quota', async () => {
    await expectAsync(
      cs.getOrgIdQuota()
    ).toBeResolved();
  });

  it('retrieves own org users', async () => {
    await expectAsync(
      cs.getOrgUsers()
    ).toBeResolved();
  });
});
