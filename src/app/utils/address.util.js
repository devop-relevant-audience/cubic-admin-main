import postcodesTH from "../../lib/json/postcodes/th.json";

import provinceTH from "../../lib/json/changwats/th.json";
import districtTH from "../../lib/json/amphoes/th.json";
import subDistrictTH from "../../lib/json/tambons/th.json";

import provinceEN from "../../lib/json/changwats/en.json";
import districtEN from "../../lib/json/amphoes/en.json";
import subDistrictEN from "../../lib/json/tambons/en.json";

export const getProvinceIdTH = (province) => {
  const data = provinceTH.th.changwats;
  const result = data.find((el) => el.name === province);
  return result ? result.pid : "";
};

export const getProvinceNameENFromPid = (pid) => {
  const data = provinceEN.en.changwats;
  const result = data.find((el) => el.pid === pid);
  return result ? result.name : "";
};

export const getDistrictIdTh = (district) => {
  const data = districtTH.th.amphoes;
  const result = data.find((el) => el.name === district);
  return result ? result.pid : "";
};

export const getDistrictENFromPid = (pid) => {
  const data = districtEN.en.amphoes;
  const result = data.filter((el) => el.pid === pid);
  return result ? result[0].name : "";
};

export const getSubDistrictIdTH = (subDistrict) => {
  const data = subDistrictTH.th.tambons;
  const result = data.find((el) => el.name === subDistrict);
  return result ? result.pid : "";
};

export const getSubDistrictENFromPid = (pid) => {
  const data = subDistrictEN.en.tambons;
  const result = data.filter((el) => el.pid === pid);

  return result ? result[0].name : "";
};

function getFull(value) {
  const { district, amphoe, province, zipcode } = value;
  return `${district} ${amphoe} ${province} ${zipcode}`;
}

export const setUpAddressTH = () => {
  const data = postcodesTH.th.postcodes;

  const result = data.map((el) => ({
    label: getFull(el),
    value: getFull(el),
    sub_district: el.district,
    district: el.amphoe,
    province: el.province,
    postcode: String(el.zipcode),
  }));

  return result;
};

export const setUpAddressEN = () => {
  let result = [
    {
      district: "aaa",
      label: "aaa",
      postcode: "10240",
      province: "aaa",
      sub_district: "aaa",
      value: "aaa",
    },
    {
      district: "bbb",
      label: "bbb",
      postcode: "10240",
      province: "bbb",
      sub_district: "bbb",
      value: "bbb",
    },
  ];
  return result;
};
