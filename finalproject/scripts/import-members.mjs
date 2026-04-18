// import
export const importToLocal = async () => {
  try {
    const src = "./data/members.json";
    const data = await fetch(src);
    if (data.ok) {
      const members = await data.json();
      //   All data will be change in local storage because It no possible to save directly in json file without backend...
      localStorage.setItem("MemberData", JSON.stringify(members));
    } else {
      throw Error(data.text);
    }
  } catch (err) {
    console.log(err);
  }
};
