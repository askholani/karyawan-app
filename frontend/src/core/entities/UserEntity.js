class User {
  constructor({
    fullName,
    ktp,
    gender,
    birthPlace,
    birthDate,
    phone,
    province,
    city,
    subdistrict,
    headman,
    email,
    password,
    role = [],
    startContract,
    endContract,
    address,
    bpjsCode,
    martial,
    isActive = true,
    username,
  }) {
    this.username = username;
    this.fullName = fullName;
    this.ktp = ktp;
    this.gender = gender;
    this.birthPlace = birthPlace;
    this.birthDate = birthDate;
    this.phone = phone;
    this.province = province;
    this.city = city;
    this.subdistrict = subdistrict;
    this.headman = headman;
    this.email = email;
    this.password = password;
    this.role = Array.isArray(role) ? role : [role];
    this.startContract = startContract;
    this.endContract = endContract;
    this.address = address;
    this.bpjsCode = bpjsCode;
    this.martial = martial;
    this.isActive = isActive;
  }
}

export default User;
