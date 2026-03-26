const event = document.querySelector("#event");
const dl = document.createElement("dl");

const eventList = async () => {
  try {
    const src = "./data/events.json";
    const eventfetch = await fetch(src);
    const jsonData = await eventfetch.json();
    let data = [];
    data = await jsonData.events;
    if (eventfetch.ok) {
      data.forEach((item) => {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");

        dt.textContent = item.name;
        dd.textContent = new Date(item.date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "2-digit",
        });
        dl.appendChild(dt);
        dl.appendChild(dd);
      });
      event.appendChild(dl);
    } else {
      throw Error(eventfetch.text);
    }
  } catch (error) {
    console.log(error);
  }
};

eventList();
