export const memberList = async (number, vip) => {
  // read the json and return it in array.
  // parameters: number = number of random member for output
  // output: array of members
  try {
    const src = "./data/members.json";
    const membersfetch = await fetch(src);
    const jsonData = await membersfetch.json();
    let data = [];
    if (vip)
      data = jsonData.members.filter((item) => {
        return item.level >= 2;
      });
    else {
      data = await jsonData.members;
    }
    if (membersfetch.ok) {
      if (number > 0) {
        let randomData = [];
        let numbers = [];
        if (number > data.length) {
          number = data.length;
        }
        while (randomData.length < number) {
          let random = Math.floor(Math.random() * data.length);
          let exists = numbers.includes(random);
          if (!exists) {
            numbers.push(random);
            randomData.push(data[random]);
          }
        }
        return randomData;
      } else {
        return data;
      }
    } else {
      throw Error(membersfetch.text);
    }
  } catch (error) {
    console.log(error);
  }
};
